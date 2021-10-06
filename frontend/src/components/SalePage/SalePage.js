import "./SalePage.css"
import { useSelector, useDispatch } from "react-redux";
import * as saleActions from "../../store/sale"
import { useParams, useHistory } from "react-router";
import EditSaleModal from "../EditFormModal";

export default function SalePage() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  console.log(currentUser)
  const { id } = useParams();
  const allSales = useSelector((state) => state.saleData.currentSales);
  const currentSale = allSales.filter(object => object.id.toString() === id)[0];
  const currentDate = currentSale.date.split("T")[0];
  const history = useHistory();
  const handleDelete = (e) => {
    e.preventDefault()
    dispatch(saleActions.deleteSale(currentSale))
    return history.push("/")
  }


  let sessionLinks;
  if (currentUser.id === current) {
    sessionLinks = (
      <>
      <EditSaleModal />
      <form onSubmit={handleDelete}>
      <button type="submit">Delete Sale</button>
      </form>
      </>
    );
  } else {
    sessionLinks = (
      <>
       <form>
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
    <div id="sale-buttons-div">
    {sessionLinks}
    </div>
  </div>
  )
}
