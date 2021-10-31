import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import Logo from "../Logo/Logo";
import { csrfFetch } from "../../store/csrf";
import "./CreateSaleForm.css";

function CreateSaleForm({ setShowModal }) {
  const sessionUser = useSelector((state) => state.session.user)
  console.log(sessionUser)
  const [hostId, setHostId] = useState(sessionUser.id)
  const [categoryId, setCategoryId] = useState(1)
  const [neighborhoodId, setNeighborhoodId] = useState(1)
  const [title, setTitle] = useState("")
  const [date, setDate] = useState(new Date())
  const [imageUrl, setImageUrl] = useState("")
  const [errors, setErrors] = useState([])

  if (!sessionUser) return <Redirect to="/" />;

  const createSale = async(e) => {
    e.preventDefault();
    const response = await csrfFetch("/api/sales", {
      method: "POST",
      body: JSON.stringify({
        hostId,
        categoryId,
        neighborhoodId,
        title,
        date,
        imageUrl
      })
    })
    const data = await response.json();
    console.log("CREATE SALE DATA =======>>", data)
    return response;
  };

  return (
    <form onSubmit={createSale}>
      <ul>
        {errors?.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <Logo />
      <label>
        Title
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>
      <label>
        Neighborhood
        {/* <select value={neighborhoodId} onChange={(e) => setNeighborhoodId(e.target.value)}>
          {allNeighborhoods?.map(neighborhood => <option key={neighborhood.id} value={Number(neighborhood.id)}>{neighborhood.name}</option>)}
        </select> */}
      </label>
      <label>
        Category
        {/* <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
          {allCategories?.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
        </select> */}
      </label>
      <label>
        Select a Date
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)}/>
      </label>
      <label>
        Display Image
        <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)}/>
      </label>
      <button type="submit">Create Sale</button>
    </form>
  );
}
export default CreateSaleForm;
