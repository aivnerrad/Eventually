import "./SalePage.css"
import { useSelector } from "react-redux";
import { useParams, useHistory } from "react-router";
import { useEffect, useState } from "react";
import { csrfFetch } from "../../store/csrf";
import { NavLink } from "react-router-dom";
import GMap from "../Map";

const SalePage = () => {
  const currentUser = useSelector((state) => state.session.user);
  const [currentSale, setCurrentSale] = useState({})
  const [attendees, setAttendees] = useState([])
  const [attending, setAttending] = useState(false)
  const { id } = useParams();
  const saleId = Number(id)
  const history = useHistory();
  const [markerPosition, setMarkerPosition] = useState({})
  const apiKey = "AIzaSyCO6reNBQBx40kM_O0zam9OhwYlWYFcejQ"
  const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const markers = [];

  useEffect(() => {
    async function getSale() {
      const salesResponse = await fetch(`/api/sales/${id}`);
      const salesData = await salesResponse.json();
      setCurrentSale(salesData.currentSale)
      return salesData
    }
    async function getAllAttendees() {
        const response = await csrfFetch(`/api/sales/${saleId}/attendees`);
        const data = await response.json()
        setAttendees(data)
        return data
    }
    getSale()
    getAllAttendees()

  }, [attending, saleId])
  useEffect(() => window.scrollTo(0,0), [])
  useEffect(() => {
    (async function geocodeFetch() {
      if(currentSale?.streetAddress?.length > 1){ // Don't fetch if there isn't an address
          const response = await csrfFetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${currentSale.streetAddress}&key=${apiKey}`)
          console.log("response ------>>", response)
          const data = await response.json()
          console.log("data", data)
          if(data.status === 'OK'){ //Don't set position if the results come back empty
            setMarkerPosition(data.results[0].geometry.location)
          }
        }
    })()
  },[currentSale])
  useEffect(() => {
    console.log("markerPosition", markerPosition)
    if(Object.keys(markerPosition).length === 2) markers.push({position: markerPosition})
  }, [markerPosition, currentSale, attending])
console.log("SALE PAGE MARKERS ARRAY",markers)
  const handleDelete = async(e) => {
    e.preventDefault()
    let alert = window.prompt("Are you sure you want to delete this sale? If so, type yes in the box below.")
    if(alert.toLowerCase() === 'yes'){
      await csrfFetch(`/api/sales/${saleId}`, {
        method: 'DELETE'
      })
      return history.push("/")
    }
    else{
      return
    }
  }
  const handleAttend = async(e) => {
    e.preventDefault()
    const newAttendee = {
      userId: currentUser.id,
      saleId
    }
    const response = await csrfFetch(`/api/sales/${saleId}/attendees`, {
      method: 'POST',
      body: JSON.stringify({...newAttendee})
    })
    const attendeesList = await response.json()
    setAttending(!attending)
    return attendeesList;
  }

  const deleteAttend = async(e) => {
    e.preventDefault()
    const attendeeToDelete = {
      userId: currentUser.id,
      saleId
    }
    const response = await csrfFetch(`/api/sales/${saleId}/attendees`, {
      method: 'DELETE',
      body: JSON.stringify({...attendeeToDelete})
    })
    setAttending(!attending)
    return response
  }

  let theRightButtons;
  if (currentUser && currentUser.id === currentSale.hostId) {
    theRightButtons = (
      <div id="sale-owner-buttons-div">
        <NavLink to={`/sales/${currentSale.id}/edit`}>Edit Sale</NavLink>
        <div onClick={handleDelete}>Delete Sale</div>
      </div>
    );
  } else if (currentUser  && attendees.filter(attendee => attendee.userId === currentUser.id).length > 0) {
    theRightButtons = (
      <>
       <form onSubmit={deleteAttend}>
         <button id="attending-button" type="submit">Nevermind</button>
       </form>
      </>
    );
  } else if (currentUser) {
    theRightButtons = (
      <>
       <form onSubmit={handleAttend}>
         <button id="attending-button" type="submit">I'm Going!</button>
       </form>
      </>
    );
  }
    else if(!currentUser) {
      theRightButtons = (
        <>
          <NavLink to="/signin">
            <button id="attending-button">I'm Going</button>
          </NavLink>
        </>
      )
    }
  return (
  <div id="sale-page">
    <div className="blurry-background" style={{backgroundImage: "url(" + currentSale.imageUrl + ")"}}></div>
    <div id="sale-page-image"  style={{backgroundImage: "url(" + currentSale.imageUrl + ")"}}></div>
    <div id="sale-page-info">
      <p><strong>About this sale</strong></p>
      <p> {currentSale.title} is on {week[new Date(currentSale.date).getDay()]} {new Date(currentSale.date).toLocaleString('en-US')}.</p>
      <p>{currentSale.streetAddress}</p>
      {attendees.length > 1 && <p> There are currently {attendees.length} people going to this sale!</p>}
      {attendees.length === 1 && <p> Only {attendees.length} person has said they are going to this sale so far!</p>}
      {attendees.length < 1 && <p>Nobody is going to this sale yet. You should go!</p>}
      {theRightButtons}
    </div>
  </div>
  )
}

export default SalePage
