import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import Logo from "../Logo/Logo";
import { csrfFetch } from "../../store/csrf";
import GoogleMapComponent from "../Map";
import "./EditSalePage.css";

function EditSaleForm() {
  const sessionUser = useSelector((state) => state.session.user)
  const [categoryId, setCategoryId] = useState(null)
  const [title, setTitle] = useState("")
  const [date, setDate] = useState(new Date())
  const [image, setImage] = useState("")
  const [errors, setErrors] = useState([])
  const [address, setAddress] = useState("")
  const [streetAddress, setStreetAddress] = useState("")
  const [USState, setUSState] = useState("")
  const [zipcode, setZipcode] = useState("")
  const [position, setPosition] = useState({})
  const [markerCreated, setMarkerCreated] = useState(false)
  const { id } = useParams();
  const numberId = Number(id);
  const history = useHistory();
  const [markers, setMarkers] = useState()
  const allCategories = ["Yard Sale", "Garage Sale", "Estate Sale", "Moving Sale", "Flea Market"]

  useEffect(() => setAddress(streetAddress + ", " + USState + ", " + zipcode), [streetAddress, USState, zipcode])

  useEffect(() => {
    window.scrollTo(0,0)
    async function saleFetch(){
      const response = await csrfFetch(`/api/sales/${numberId}`)
      const data = await response.json();
      console.log("sale fetch response.json()", data)
      setTitle(data.currentSale.title)
      setImage(data.currentSale.imageUrl)
      setStreetAddress(data.currentSale.streetAddress.split(",")[0])
      setUSState(data.currentSale.streetAddress.split(",")[1])
      setZipcode(data.currentSale.streetAddress.split(",")[2])
      setAddress(data.currentSale.streetAddress)
    }
    saleFetch()
  }, [numberId])

  useEffect(() => {

    async function geocodeFetch() {
      if(address.length > 1){ // Don't fetch if there isn't an address
        const response = await csrfFetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyCO6reNBQBx40kM_O0zam9OhwYlWYFcejQ`)
        const data = await response.json()
        if(data.status === 'OK'){ //Don't set position if the results come back empty
          setPosition(data.results[0].geometry.location)
        }
      }
    }
    geocodeFetch()
  }, [address])
  const createMarker = (e) => {
    e.preventDefault()
    const newMarker = { position: position }
    setMarkerCreated(!markerCreated)
    setMarkers([newMarker])
  }

  const handleSubmit = async(e) => {
    if (!sessionUser) history.push("/signin");
    e.preventDefault();
    const response = await csrfFetch(`/api/sales/${numberId}`, {
      method: "PATCH",
      body: JSON.stringify({
        hostId: sessionUser.id,
        categoryId,
        title,
        date,
        image
      })
    })
    if(response.ok){
      history.push("/")
      window.alert("Sale Updated Successfully")
    }else {
      window.alert("Sale Not Updated")
      setErrors(response.errors)
    }

    return history.push(`/sales/${numberId}`)
  };

  const updateFile = (e) => {
    const file = e.target.files[0];
    console.log("FILE -------->", file)
    if (file) setImage(file);
  };

  return (
  <div className="edit-sale-page">
    <form className="edit-event-form" onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <h2>Sale Info</h2>
      <p>Edit the details of your sale.</p>
      <label htmlFor="edit-title">Edit Title</label>
      <input id="edit-title" name="edit-title" className="input" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required/>
      <label htmlFor="street-address">Street Address</label>
      <input id="street-address" name="street-address" className="input" placeholder="Street Address" value={streetAddress} onChange={(e) => setStreetAddress(e.target.value)}/>
      <label htmlFor="state-dropdown">State</label>
      <select id="state-dropdown" name="state-dropdown" className="dropdown" onChange={(e) => setUSState(e.target.value)}>
        <option disabled selected>Select a state</option>
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
      <label htmlFor="zipcode">Zip Code</label>
      <input id="zipcode" name="zipcode" className="input" type="text" pattern="[0-9]*" placeholder="Zip Code" onChange={(e) => setZipcode(e.target.value)}/>
      <button className="button marker-button" onClick={(e) => createMarker(e)} >Move the marker for your sale</button>
      <label htmlFor="edit-sale-type">Edit Category</label>
      <select id="edit-sale-type" name="edit-sale-type" className="dropdown" value={Number(categoryId)} onChange={(e) => setCategoryId(e.target.value)}>
        {allCategories.map(category => <option value={allCategories.indexOf(category) + 1}>{category}</option>)}
      </select>
      <label  htmlFor="edit-sale-date" >Edit Date</label>
      <input id="edit-sale-date" name="edit-sale-date" className="input" type="date" value={date} onChange={(e) => setDate(e.target.value)}/>
      <label  htmlFor="image-upload">Upload an Image</label>
      <input id="image-upload" name="image-upload" type="file" onChange={updateFile}/>
      <button className="button submit-button" type="submit">Edit Sale</button>
    </form>
    <GoogleMapComponent center={position} markers={markers}/>
  </div>
  );
}
export default EditSaleForm;
