import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { csrfFetch } from "../../store/csrf";
import "./CreateSalePage.css";
import GoogleMapComponent from "../Map"

function CreateSalePage() {
  const sessionUser = useSelector((state) => state.session.user)
  const history = useHistory();
  const [categoryId, setCategoryId] = useState(1)
  const [title, setTitle] = useState("")
  const [date, setDate] = useState(new Date())
  const [image, setImage] = useState(null)
  const [errors, setErrors] = useState([])
  const [address, setAddress] = useState("")
  const [streetAddress, setStreetAddress] = useState("")
  const [USState, setUSState] = useState("")
  const [zipcode, setZipcode] = useState("")
  const [position, setPosition] = useState({})
  const [markerCreated, setMarkerCreated] = useState(false)
  const [markers, setMarkers] = useState()
  const allCategories = ["Yard Sale", "Garage Sale", "Estate Sale", "Moving Sale", "Flea Market"]

  useEffect(()=> window.scrollTo(0,0), []) // Scroll to the top of the page on load

  // Set the address for the geocodeFetch function
  useEffect(() => setAddress(streetAddress + ", " + USState + ", " + zipcode), [streetAddress, USState, zipcode])

  useEffect(() => {
    (async function geocodeFetch() {
      const geocodeResponse = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyCO6reNBQBx40kM_O0zam9OhwYlWYFcejQ`)
      const data = await geocodeResponse.json()
      data.status === 'OK' ? setPosition(data.results[0].geometry.location) : setPosition({ lat: 39.4562, lng: -77.9639 } )
    })()
  }, [address, markerCreated])

  const createMarker = (e) => {
    e.preventDefault()
    const newMarker = { 'position': position }
    setMarkerCreated(!markerCreated)
    setMarkers([newMarker])
  }

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  const createSale = async(e) => {
    if (!sessionUser) history.push("/signin");
    e.preventDefault();
    const formData = new FormData();
    formData.append("hostId", sessionUser.id)
    formData.append("streetAddress", address)
    formData.append("categoryId", categoryId)
    formData.append("title", title)
    formData.append("date", date)
    if(image) formData.append("image", image)

    const response = await csrfFetch(`/api/sales`, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    });
    if(response.ok){
      history.push("/")
      window.alert("Sale Created Successfully")
    }else {
      window.alert("Sale Not Created")
      setErrors(response.errors)
    }
  };
  return (
    <div className="main-content">
      <form className="form" onSubmit={createSale}>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <div className="create-event-form-header">
          <h2>Sale Info</h2>
          <p>Give us some information about your sale. Put an interesting title, provide an address for the sale, and tell us what kind of sale it is (yard sale, garage sale, etc.).</p>
        </div>
        <label className="input-label" htmlFor="title">Sale Title </label>
        <input id="title" name="title" className="input" type="text" value={title} placeholder="Sale Title" onChange={(e) => setTitle(e.target.value)} required/>
        <label className="input-label" htmlFor="street-address">Street Address</label>
        <input id="street-address" name="street-address" className="input" placeholder="Street Address" onChange={(e) => setStreetAddress(e.target.value)}/>
        <label className="input-label" htmlFor="state">State </label>
        <select id="state" name="state" className="dropdown" defaultValue="Select a state" onChange={(e) => setUSState(e.target.value)}>
          <option disabled>Select a state</option>
          <option value="Alabama">Alabama</option>
          <option value="Alaska">Alaska</option>
          <option value="Arizona">Arizona</option>
          <option value="Arkansas">Arkansas</option>
          <option value="California">California</option>
          <option value="Colorado">Colorado</option>
          <option value="Connecticut">Connecticut</option>
          <option value="Delaware">Delaware</option>
          <option value="Washington D.C.">District Of Columbia</option>
          <option value="Florida">Florida</option>
          <option value="Georgia">Georgia</option>
          <option value="Hawaii">Hawaii</option>
          <option value="Idaho">Idaho</option>
          <option value="Illinois">Illinois</option>
          <option value="Indiana">Indiana</option>
          <option value="Iowa">Iowa</option>
          <option value="Kansas">Kansas</option>
          <option value="Kentucky">Kentucky</option>
          <option value="Louisiana">Louisiana</option>
          <option value="Maine">Maine</option>
          <option value="Maryland">Maryland</option>
          <option value="Massachusetts">Massachusetts</option>
          <option value="Michigan">Michigan</option>
          <option value="Minnesota">Minnesota</option>
          <option value="Mississippi">Mississippi</option>
          <option value="Missouri">Missouri</option>
          <option value="Montana">Montana</option>
          <option value="Nebraska">Nebraska</option>
          <option value="Nevada">Nevada</option>
          <option value="New Hampshire">New Hampshire</option>
          <option value="New Jersey">New Jersey</option>
          <option value="New Mexico">New Mexico</option>
          <option value="New York">New York</option>
          <option value="North Carolina">North Carolina</option>
          <option value="North Dakota">North Dakota</option>
          <option value="Ohio">Ohio</option>
          <option value="Oklahoma">Oklahoma</option>
          <option value="Oregon">Oregon</option>
          <option value="Pennsylvania">Pennsylvania</option>
          <option value="Rhode Island">Rhode Island</option>
          <option value="South Carolina">South Carolina</option>
          <option value="South Dakota">South Dakota</option>
          <option value="Tennessee">Tennessee</option>
          <option value="Texas">Texas</option>
          <option value="Utah">Utah</option>
          <option value="Vermont">Vermont</option>
          <option value="Virginia">Virginia</option>
          <option value="Washington">Washington</option>
          <option value="West Virginia">West Virginia</option>
          <option value="Wisconsin">Wisconsin</option>
          <option value="Wyoming">Wyoming</option>
        </select>
        <label className="input-label" htmlFor="zipcode">Zip Code</label>
        <input id="zipcode" name="zipcode" className="input" type="text" pattern="[0-9]*" placeholder="Zip Code" onChange={(e) => setZipcode(e.target.value)}/>
        <button className="button marker-button" onClick={(e) => createMarker(e)} >Place a marker on the map</button>
        <label className="input-label" htmlFor="type-of-sale">Type of Sale</label>
        <select id="type-of-sale" name="type-of-sale" className="dropdown" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
          {allCategories?.map(category => <option value={allCategories.indexOf(category) + 1}>{category}</option>)}
        </select>
        <label className="input-label" htmlFor="date">Pick a Date </label>
        <input id="date" name="date" className="input" type="date" value={date} onChange={(e) => setDate(e.target.value)}/>
        <label className="input-label" htmlFor="image-upload">Upload an Image</label>
        <input id="image-upload" name="image-upload" type="file" onChange={updateFile} />
        <button className="button submit-button" type="submit">Create Sale</button>
      </form>
      <GoogleMapComponent center={position} markers={markers}/>
    </div>
  );
}
export default CreateSalePage;
