import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { csrfFetch } from "../../store/csrf";
import "./CreateSalePage.css";
import { NavLink } from "react-router-dom";
import GMap from "../Map";

function CreateSalePage() {
  const sessionUser = useSelector((state) => state.session.user)
  const history = useHistory();
  const [categoryId, setCategoryId] = useState(1)
  const [allCategories, setAllCategories] = useState([]);
  const [title, setTitle] = useState("")
  const [date, setDate] = useState(new Date())
  const [imageUrl, setImageUrl] = useState("")
  const [errors, setErrors] = useState([])
  const [markers, setMarkers] = useState([])
  const [address, setAddress] = useState("")
  const [position, setPosition] = useState({})
  const [markerCreated, setMarkerCreated] = useState(false)
  const apiKey = "AIzaSyAUuttUcvB5zK4NoPHdCEq_WNqDitykc5Y"
  useEffect(() => {
    (async function categoriesFetch() {
      const response = await csrfFetch("/api/sales")
      const data = await response.json();
      setAllCategories(data.allCategories)
      return data
    })()
  }, [errors])

  useEffect(()=> window.scrollTo(0,0), [])

  useEffect(() => {
    (async function geocodeFetch() {
      const response = await csrfFetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`)
      const data = await response.json()
      setPosition(data.results[0].geometry.location)
    })()
  },[address])


  const createMarker = (e) => {
    e.preventDefault()
    const newMarker = { position: position }
    setMarkerCreated(!markerCreated)
    return markers.push(newMarker)
  }

  const createSale = async(e) => {
    if (!sessionUser) history.push("/signin");
    e.preventDefault();
    const response = await csrfFetch("/api/sales", {
      method: "POST",
      body: JSON.stringify({
        hostId: sessionUser.id,
        categoryId,
        title,
        date,
        imageUrl
      })
    })
    if(response.ok){
      history.push("/")
      window.alert("Sale Created Successfully")
    }else {
      window.alert("Sale Not Created")
      setErrors(response.errors)
    }
  };


  console.log("Map Markers", markers)
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
        <p>Give us some information about your sale. Input an interesting title, provide an address for that the sale, and tell us what kind of sale it is (yard sale, garage sale, etc.).</p>
      </div>
        <input
          id="login-input"
          type="text"
          value={title}
          placeholder="Sale Title"
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <div id="address-finder">
          <input id="street-address" placeholder="Street Address" onChange={(e) => setAddress(e.target.value)}/>
          <button id="change-address" onClick={(e) => createMarker(e)} >Find me on the map!</button>
          </div>
        <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
          {allCategories?.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
        </select>
        <input id="login-input" type="date" value={date} onChange={(e) => setDate(e.target.value)}/>
        <input id="login-input" placeholder="Image URL" type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)}/>
      <button type="submit">Create Sale</button>
    </form>
    <GMap
    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAUuttUcvB5zK4NoPHdCEq_WNqDitykc5Y"
    markers={markers}
    loadingElement={<div style={{ height: `100%` }} />}
    containerElement={<div style={{ height: `400px` }} />}
    mapElement={<div style={{ height: `100%` }} />} />
  </div>
  );
}
export default CreateSalePage;
