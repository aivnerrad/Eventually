import "./SalesList.css"
import { useSelector} from "react-redux";
import { NavLink } from "react-router-dom";
export default function SalesList(){
  const allSales = useSelector((state) => state.saleData.currentSales);
  console.log("SALES OBJECT", allSales)
  //const allSales = salesObject.sales;

  return (
    <div id="sales-list">
      {allSales.map(sale => (
        <NavLink key={sale.id} to={`/api/sales/${sale.id}`}>
          <div key={sale.id} id="sale">
            <p>{sale.title}</p>
            <p> {sale.date.split("T")[0]}</p>
            <img id="sales-list-sale-image" src={sale.imageUrl} alt=""/>
          </div>
        </NavLink>))}
    </div>
  )
}
