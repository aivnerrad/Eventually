import "./SalesList.css"
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import * as saleActions from "../../store/sale"
import { NavLink } from "react-router-dom";
export default function SalesList(){
  const dispatch = useDispatch();
  useEffect(() => {
     return dispatch(saleActions.getAllSales())
  }, [dispatch])
  const salesObject = useSelector((state) => state.sales);
  const allSales = salesObject.sales;

  return (
    <div id="sales-list">
      {allSales.map(sale => (
        <NavLink to={`/api/sales/${sale.id}`}>
          <div key={sale.id} id="sale">{sale.title}</div>
        </NavLink>))}
    </div>
  )
}
