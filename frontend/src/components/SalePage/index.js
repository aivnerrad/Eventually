import "./SalePage.css"
import { useSelector } from "react-redux";
import { useParams, useHistory } from "react-router";
import EditSaleModal from "../EditFormModal";
import { useEffect, useState } from "react";
import { csrfFetch } from "../../store/csrf";
import { getAllAttendees } from "../../store/sale";

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
    console.log("SINGLE SALE DATA =======>>>", salesData.currentSale)
    setCurrentSale(salesData.currentSale)
  }
  async function getAllAttendees() {
      const response = await csrfFetch(`/api/sales/${saleId}/attendees`);
      const data = await response.json()
      console.log("SALE ATTENDEES DATA =====>>>", data)
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
    console.log("ATTENDING ==========>>>>", attendeesList)
    return response;
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
  }
  console.log("hello", typeof currentUser.id)
  console.log("ATTENDEES.MAP ====>>>", attendees.map(attendee => attendee.userId === currentUser.id)[0])
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
  } else if (currentUser  && attendees.map(attendee => attendee.userId === currentUser.id)[0]) {
    theRightButtons = (
      <>
       <form onSubmit={deleteAttend}>
         <button type="submit">Nevermind</button>
       </form>
      </>
    );
  } else if (currentUser) {
    theRightButtons = (
      <>
       <form onSubmit={handleAttend}>
         <button type="submit">I'm Going!</button>
       </form>
      </>
    );
   }
  return (
  <div id="sale-info">
    <h3>This is the Single Sale Page!</h3>
    <img id="sale-page-image" src={currentSale.imageUrl} alt=""/>
    <p>{currentDate}</p>
    <p> There will be a {currentSale.title} on {currentDate}.</p>
    <p> There are currently {attendees.length} people going to this sale!</p>
    <div id="sale-buttons-div">
    {theRightButtons}
    </div>
  </div>
  )
}

export default SalePage
