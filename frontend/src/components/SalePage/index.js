import "./SalePage.css"
import { useSelector } from "react-redux";
import { useParams, useHistory } from "react-router";
import EditSaleModal from "../EditFormModal";
import { useEffect, useState } from "react";
import { csrfFetch } from "../../store/csrf";

const SalePage = () => {
  const currentUser = useSelector((state) => state.session.user);
  const [currentSale, setCurrentSale] = useState({})
  const [attendees, setAttendees] = useState([])
  const [attending, setAttending] = useState(false)
  const { id } = useParams();
  const saleId = Number(id)
  const newDate = new Date();
  const currentDate = newDate.toLocaleDateString("en-US");
  const history = useHistory();

  async function getSale() {
    const salesResponse = await fetch(`/api/sales/${saleId}`);
    const salesData = await salesResponse.json();
    setCurrentSale(salesData.currentSale)
  }
  async function getAllAttendees() {
      const response = await csrfFetch(`/api/sales/${saleId}/attendees`);
      const data = await response.json()
      setAttendees(data)
      return data
  }
  useEffect(() => {
    getSale()
    getAllAttendees()

  }, [attending])
  const handleDelete = (e) => {
    e.preventDefault()
    return history.push("/")
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
      <>
      <EditSaleModal />
      <form onSubmit={handleDelete}>
      <button type="submit">Delete Sale</button>
      </form>
      </>
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
  return (
  <div id="sale-page">
    <div id="blurry-background" style={{backgroundImage: "url(" + currentSale.imageUrl + ")"}}></div>
    <div id="sale-page-image"  style={{backgroundImage: "url(" + currentSale.imageUrl + ")"}}></div>
    <div id="sale-page-info">
      <p><strong>About this sale</strong></p>
      <p> {currentSale.title} is on {currentDate}.</p>
      <p> There are currently {attendees.length} people going to this sale!</p>
      <div id="sale-buttons-div">
      {theRightButtons}
      </div>
    </div>
  </div>
  )
}

export default SalePage
