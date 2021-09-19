import "./SalePage.css"
import { useSelector, useDispatch } from "react-redux";
import * as saleActions from "../../store/sale"
import { useParams, useHistory } from "react-router";
import EditSaleModal from "../EditFormModal";

export default function SalePage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const salesObject = useSelector((state) => state.sales);
  const allSales = salesObject.sales;
  console.log("allSales ------>", allSales)
  const currentSale = allSales.filter(object => object.id.toString() === id)[0];
  const currentDate = currentSale.date.split("T")[0];
  const history = useHistory();
  const handleDelete = (e) => {
    e.preventDefault()
    dispatch(saleActions.deleteSale(currentSale))
    return history.push("/")
  }


  return (
  <div id="sale-info">
    <h3>This is the {currentSale.title} Page!</h3>
    <img id="sale-page-image" src={currentSale.imageUrl} alt=""/>
    <p>{currentDate}</p>
    <p> There will be a {currentSale.title} on {currentDate}.</p>
    <div id="sale-buttons-div">
      <EditSaleModal />
      <form onSubmit={handleDelete}>
      <button type="submit">Delete Sale</button>
      </form>
    </div>
  </div>
  )
}
