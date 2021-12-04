import React, { useEffect, useState } from "react";
import "./SalesList.css"
import { NavLink } from "react-router-dom";
const SalesList = () => {
  const [allSales, setAllSales] = useState([])

  useEffect(() => {
  (async function getAllSales() {
      const response = await fetch('/api/sales');
      const data = await response.json();
      setAllSales(data.currentSales)
      window.scrollTo(0,0)
      return response;
  })()
}, [])

  return (
    <div>
      <h2 id="sales-list-title">Sales near you</h2>
      <div id="sales-list">
        {allSales.map(sale => (
          <NavLink key={sale.id} to={`/sales/${sale.id}`}>
            <div key={sale.id} id="sale">
            <div id="sale-image-div" style={{backgroundImage: "url(" + sale.imageUrl + ")"}}>
              </div>
              <div id="sale-text">
                <h2 id="sale-title">{sale.title}</h2>
                <p id="date-and-time"><strong> {new Date(sale.date).toLocaleString('en-US')}</strong></p>
              </div>
            </div>
          </NavLink>))}
      </div>
    </div>
  )
}

export default SalesList;
