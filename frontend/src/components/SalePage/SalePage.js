import "./SalePage.css"
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import * as saleActions from "../../store/sale"
import { useParams } from "react-router";

export default function SalePage() {
  const dispatch = useDispatch();
  useEffect(() => {
     return dispatch(saleActions.getAllSales())
  }, [dispatch])
  const { id } = useParams();
  const salesObject = useSelector((state) => state.sales);
  const allSales = salesObject.sales;
  const currentSale = allSales[id - 1]
  const currentDate = currentSale.date.split("T")[0];
  console.log(currentSale)
  const handleDelete = (e) => {
    e.preventDefault()
    return dispatch(saleActions.deleteSale(currentSale))
  }

  return (
  <div id="sale-info">
    <h3>This is the {currentSale.title} Page!</h3>
    <img src={currentSale.imageUrl} alt=""/>
    <p>{currentDate}</p>
    <form onSubmit={handleDelete}>
    <button type="submit">Delete Sale</button>
    </form>
  </div>
  )
}
