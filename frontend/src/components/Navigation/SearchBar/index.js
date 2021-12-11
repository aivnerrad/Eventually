import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './SearchBar.css'

function SearchBar() {
  //add a search function
  const [allSales, setAllSales] = useState([])
  const [searchInput, setSearchInput] = useState("")
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    (async function getAllSales() {
        const response = await fetch('/api/sales');
        const data = await response.json();
        setAllSales(data.currentSales)
        return data;
    })()
  }, [])

  useEffect(() => {
    async function searchSales(searchInput) {
      setSearchResults(allSales.filter(sale => sale.title.toLowerCase().includes(searchInput.toLowerCase())))
    }
    searchSales(searchInput)
  }, [searchInput])

  const goToSale = () => {
    setSearchInput("")
    window.scrollTo(0,0)
  }
  return (
    <div>
      <div id="search-bar-div">
        <input id="search-bar" type="search" placeholder="Search sales" onChange={(e) => setSearchInput(e.target.value)}></input>
      </div>
      <div id="search-results">
        {searchInput && searchResults.map(result => (
          <NavLink id="result-sale" onClick={() => goToSale()} to={`/sales/${result.id}`}>{result.title}</NavLink>
        ))}
      </div>
    </div>
  )
}

export default SearchBar
