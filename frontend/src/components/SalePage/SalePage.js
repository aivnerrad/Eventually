import "./SalePage.css"
import { useSelector, useDispatch } from "react-redux";
import * as saleActions from "../../store/sale"
import { useParams, useHistory } from "react-router";
import EditSaleModal from "../EditFormModal";

export default function SalePage() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const { id } = useParams();
  const allSales = useSelector((state) => state.saleData.currentSales);
  const currentSale = allSales.filter(object => object.id.toString() === id)[0];
  const allAttendees = useSelector((state) => state.saleData.allAttendees)
  const saleAttendees = allAttendees.filter(object => object.saleId.toString() === id)
  const currentDate = currentSale.date.split("T")[0];
  const history = useHistory();

  const handleDelete = (e) => {
    e.preventDefault()
    dispatch(saleActions.deleteSale(currentSale))
    return history.push("/")
  }

  const handleAttend = (e) => {
    e.preventDefault()
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
    <p> There are currently {saleAttendees.length} people going to this sale!</p>
    <div id="sale-buttons-div">
    {theRightButtons}
    </div>
  </div>
  )
}
