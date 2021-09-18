import "./SalePage.css"
import { useSelector, useDispatch } from "react-redux";
//import { useEffect } from "react";
import * as saleActions from "../../store/sale"
import { useParams } from "react-router";

export default function SalePage() {
  const dispatch = useDispatch();
  // useEffect(() => {
  //    return dispatch(saleActions.getCurrentSale())
  // }, [dispatch])
  const { id } = useParams();
  console.log("SalePage ID ----->", id)
  const salesObject = useSelector((state) => state.sales);
  const allSales = salesObject.sales;
  console.log("allSales ----->", allSales)
  const currentSale = allSales.filter(object => object.id.toString() === id)[0];
  const currentDate = currentSale.date.split("T")[0];
  console.log(typeof id)
  console.log("currentSale -------->", currentSale)
  const handleDelete = (e) => {
    e.preventDefault()
    return dispatch(saleActions.deleteSale(currentSale))
  }

  return (
  <div id="sale-info">
    <h3>This is the {currentSale.title} Page!</h3>
    <img id="sale-page-image" src={currentSale.imageUrl} alt=""/>
    <p>{currentDate}</p>
    <p> There will be a {currentSale.title} on {currentDate}.</p>
    <form onSubmit={handleDelete}>
    <button type="submit">Delete Sale</button>
    </form>
  </div>
  )
}
