import React, { useEffect, useState } from "react";
import "./SalesList.css"
import { NavLink } from "react-router-dom";
const SalesList = () => {
  const [allSales, setAllSales] = useState([])
  const [allNeighborhoods, setAllNeighborhoods] = useState([])
  const [creatingSale, setCreatingSale] = useState(false)

  const today = new Date(Date.UTC(2021, 10, 6))
  const daysOfTheWeek = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
  console.log("TODAY ==========>>>>", today)
  const format = today.toLocaleString('en-US')
  console.log("FORMAT =========>>>>", format)
  console.log("DAY OF THE WEEK ====>>" , daysOfTheWeek[today.getDay()])
useEffect(() => {
  (async function getAllSales() {
      const response = await fetch('/api/sales');
      const data = await response.json();
      console.log("DATA =======>>>", data)
      setAllSales(data.currentSales)
      setAllNeighborhoods(data.allNeighborhoods)
      return response;
  })()
}, [creatingSale])


  console.log("ALL SALES IN DATABASE =====>>>", allSales[0]?.createdAt)
  console.log("ALL NEIGHBORHOODS IN DATABASE =====>>>", allNeighborhoods)

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
                <p id="date-and-time"><strong> {format}</strong></p>
                {allNeighborhoods.map(neighborhood => neighborhood.id === sale.neighborhoodId && <p>Neighborhood - {neighborhood.name}</p>)}
              </div>
            </div>
          </NavLink>))}
      </div>
    </div>
  )
}

export default SalesList;