import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import { csrfFetch } from "../../store/csrf";
import "./CreateSalePage.css";
import { NavLink } from "react-router-dom";

function CreateSalePage() {
  const sessionUser = useSelector((state) => state.session.user)
  const [categoryId, setCategoryId] = useState()
  const [neighborhoodId, setNeighborhoodId] = useState()
  const [allNeighborhoods, setAllNeighborhoods] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [title, setTitle] = useState("")
  const [date, setDate] = useState(new Date())
  const [imageUrl, setImageUrl] = useState("")
  const [errors, setErrors] = useState([])

  useEffect(() => {
    (async function neighborhoodFetch() {
      const response = await csrfFetch("/api/sales")
      const data = await response.json();
      setAllNeighborhoods(data.allNeighborhoods)
      setAllCategories(data.allCategories)
      return data
    })()
  }, [])


  const createSale = async(e) => {
    if (!sessionUser) return <Redirect to="/" />;
    e.preventDefault();
    const response = await csrfFetch("/api/sales", {
      method: "POST",
      body: JSON.stringify({
        hostId: sessionUser.id,
        categoryId,
        neighborhoodId,
        title,
        date,
        imageUrl
      })
    })
    if(response.ok){
      const data = await response.json();
      return data;
    } else {
      setErrors(response.error)
      return response.error
    }

  };

  return (
  <div id="create-event-page">
    <div id="create-event-navbar">
      <NavLink id="create-event-navbar-logo" to="/">
        <h3 id="create-event-navbar-logo-text">eventually...</h3>
      </NavLink>
      <div id="create-event-profile-circle">
        <p id="create-event-profile-circle-text">{sessionUser?.email[0].toUpperCase() + sessionUser?.email[1].toUpperCase()}</p>
      </div>
    </div>
    <form onSubmit={createSale}>
      <ul>
        {errors?.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <div id="create-event-form-header">
        <h2>Basic Info</h2>
        <p>Give us some information about your sale. Input an interesting title, select the neighborhood that the sale will be held in, and what kind of sale it is (yard sale, garage sale, etc.).</p>
      </div>
        <input
          type="text"
          value={title}
          placeholder="Sale Title"
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <select value={neighborhoodId} onChange={(e) => setNeighborhoodId(e.target.value)}>
          {allNeighborhoods?.map(neighborhood => <option key={neighborhood.id} value={Number(neighborhood.id)}>{neighborhood.name}</option>)}
        </select>
        <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
          {allCategories?.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
        </select>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)}/>
        <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)}/>
      <button type="submit">Create Sale</button>
    </form>
  </div>
  );
}
export default CreateSalePage;
