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
  const [title, setTitle] = useState("")
  const [date, setDate] = useState(new Date())
  const [imageUrl, setImageUrl] = useState("")
  const [errors, setErrors] = useState([])
  const [markers, setMarkers] = useState([])
  const [address, setAddress] = useState("")
  const [streetAddress, setStreetAddress] = useState("")
  const [USState, setUSState] = useState("")
  const [zipcode, setZipcode] = useState("")
  const [position, setPosition] = useState({})
  const [markerCreated, setMarkerCreated] = useState(false)
  const apiKey = "AIzaSyAUuttUcvB5zK4NoPHdCEq_WNqDitykc5Y"
  const allCategories = ["Yard Sale", "Garage Sale", "Estate Sale", "Moving Sale", "Flea Market"]

  useEffect(()=> window.scrollTo(0,0), []) // Scroll to the top of the page on load

  // Set the address for the geocodeFetch function
  useEffect(() => setAddress(streetAddress + USState + zipcode), [streetAddress, USState, zipcode])

  //geocodeFetch function finds Lat Lng of input address and sets the positiion state to the results
  useEffect(() => {
    (async function geocodeFetch() {
      if(address.length > 1){ // Don't fetch if there isn't an address
        const response = await csrfFetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`)
        const data = await response.json()
        console.log("data", data)
        if(data.results.length > 0){ //Don't set position if the results come back empty
          setPosition(data.results[0].geometry.location)
        }
      }
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
        streetAddress: address,
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
    <div id="main-content">
      <form id="create-event-form" onSubmit={createSale}>
        <ul>
          {errors?.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <div id="create-event-form-header">
          <h2>Sale Info</h2>
          <p>Give us some information about your sale. Put an interesting title, provide an address for the sale, and tell us what kind of sale it is (yard sale, garage sale, etc.).</p>
        </div>
        <label for="title">Sale Title</label>
          <input
            className="input"
            type="text"
            value={title}
            placeholder="Sale Title"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <label for="street-address">Street Address</label>
          <input className="input" id="street-address" placeholder="Street Address" onChange={(e) => setStreetAddress(e.target.value)}/>
          <label for="state">State</label>
          <select id="state" placeholder="State" onChange={(e) => setUSState(e.target.value)}>
            <option disabled selected>Select a state</option>
            <option value="AL">Alabama</option>
            <option value="AK">Alaska</option>
            <option value="AZ">Arizona</option>
            <option value="AR">Arkansas</option>
            <option value="CA">California</option>
            <option value="CO">Colorado</option>
            <option value="CT">Connecticut</option>
            <option value="DE">Delaware</option>
            <option value="DC">District Of Columbia</option>
            <option value="FL">Florida</option>
            <option value="GA">Georgia</option>
            <option value="HI">Hawaii</option>
            <option value="ID">Idaho</option>
            <option value="IL">Illinois</option>
            <option value="IN">Indiana</option>
            <option value="IA">Iowa</option>
            <option value="KS">Kansas</option>
            <option value="KY">Kentucky</option>
            <option value="LA">Louisiana</option>
            <option value="ME">Maine</option>
            <option value="MD">Maryland</option>
            <option value="MA">Massachusetts</option>
            <option value="MI">Michigan</option>
            <option value="MN">Minnesota</option>
            <option value="MS">Mississippi</option>
            <option value="MO">Missouri</option>
            <option value="MT">Montana</option>
            <option value="NE">Nebraska</option>
            <option value="NV">Nevada</option>
            <option value="NH">New Hampshire</option>
            <option value="NJ">New Jersey</option>
            <option value="NM">New Mexico</option>
            <option value="NY">New York</option>
            <option value="NC">North Carolina</option>
            <option value="ND">North Dakota</option>
            <option value="OH">Ohio</option>
            <option value="OK">Oklahoma</option>
            <option value="OR">Oregon</option>
            <option value="PA">Pennsylvania</option>
            <option value="RI">Rhode Island</option>
            <option value="SC">South Carolina</option>
            <option value="SD">South Dakota</option>
            <option value="TN">Tennessee</option>
            <option value="TX">Texas</option>
            <option value="UT">Utah</option>
            <option value="VT">Vermont</option>
            <option value="VA">Virginia</option>
            <option value="WA">Washington</option>
            <option value="WV">West Virginia</option>
            <option value="WI">Wisconsin</option>
            <option value="WY">Wyoming</option>
          </select>
          <label for="zipcode">Zip Code</label>
          <input className="input" type="text" pattern="[0-9]*" placeholder="Zip Code" onChange={(e) => setZipcode(e.target.value)}/>
          <button id="change-address" onClick={(e) => createMarker(e)} >Find me on the map!</button>
          <label for="type-of-sale">Type of Sale</label>
          <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
            {allCategories?.map(category => <option key={category} value={allCategories.indexOf(category) + 1}>{category}</option>)}
          </select>
          <label for="date">Pick a Date</label>
          <input className="input" type="date" value={date} onChange={(e) => setDate(e.target.value)}/>
          <label for="image-upload">Upload an Image</label>
          <input className="input" placeholder="Image URL" type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)}/>
        <button type="submit">Create Sale</button>
      </form>
      <GMap
      googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAUuttUcvB5zK4NoPHdCEq_WNqDitykc5Y"
      markers={markers}
      position={position}
      zoom={13}
      loadingElement={<div style={{ height: `100%`, width: '50%' }} />}
      containerElement={<div style={{ height: `400px`, width: '50%'}} />}
      mapElement={<div id="map" style={{ height: `60vh`}} />} />
    </div>
  </div>
  );
}
export default CreateSalePage;
