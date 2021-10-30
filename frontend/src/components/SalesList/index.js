import "./SalesList.css"
import { useSelector} from "react-redux";
import { NavLink } from "react-router-dom";
function SalesList(){
  const allSales = useSelector((state) => state.saleData.currentSales);

  return (
    <div>
        <h2 id="sales-list-title">Sales near you</h2>
      <div id="sales-list">
        {allSales.map(sale => (
          <NavLink key={sale.id} to={`/api/sales/${sale.id}`}>
            <div key={sale.id} id="sale">
              <div id="sale-image-div" style={{backgroundImage: "url(" + sale.imageUrl + ")"}}>
              </div>
              <h3>{sale.title}</h3>
              <p> {sale.date}</p>
            </div>
          </NavLink>))}
      </div>
    </div>
  )
}

export default SalesList;
