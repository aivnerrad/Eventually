import "./SalePage.css"
import { useSelector, useDispatch } from "react-redux";
import * as saleActions from "../../store/sale"
import { useParams, useHistory } from "react-router";
import EditSaleModal from "../EditFormModal";
import { useEffect, useState } from "react";

export default function SalePage() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const userId = currentUser.id
  const { id } = useParams();
  const saleId = Number(id)
  const allSales = useSelector((state) => state.saleData.currentSales);
  const currentSale = allSales?.filter(object => object.id.toString() === id)[0];
  const allAttendees = useSelector((state) => state.saleData.allAttendees)
  const saleAttendees = allAttendees?.filter(object => object.saleId.toString() === id)
  const newDate = new Date();
  const currentDate = newDate.toLocaleDateString("en-US");
  const history = useHistory();
  const [attending, setAttending] = useState(false)
  const[peopleGoing, setPeopleGoing] = useState(saleAttendees.length)
  useEffect(() => {
    console.log("USE EFFECT RAN", peopleGoing)
    console.log("USE EFFECT RAN SALES", saleAttendees.length)
    const currentlyAttending = saleAttendees.filter(object => object.userId === currentUser.id)
    console.log("currentlyAttending ======>>", currentlyAttending)
  })
  const handleDelete = (e) => {
    e.preventDefault()
    dispatch(saleActions.deleteSale(currentSale))
    return history.push("/")
  }

  const handleAttend = (e) => {
    e.preventDefault()
    if(!attending){
      return (
        setPeopleGoing(peopleGoing + 1),
        setAttending(true),
        dispatch(saleActions.goToSale({saleId, userId})),
        dispatch(saleActions.getAllAttendees(currentSale))
      )
    }
    else {
      return (
        console.log("No bro, you already said you were going.")
      )
    }
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
  } else {
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
    <h3>This is the {currentSale.title} Page!</h3>
    <img id="sale-page-image" src={currentSale.imageUrl} alt=""/>
    <p>{currentDate}</p>
    <p> There will be a {currentSale.title} on {currentDate}.</p>
    <p> There are currently {peopleGoing} people going to this sale!</p>
    <div id="sale-buttons-div">
    {theRightButtons}
    </div>
  </div>
  )
}
