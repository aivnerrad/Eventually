import React, { useState } from "react";
import * as saleActions from "../../store/sale";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import Logo from "../Logo/Logo";

function CreateSaleForm() {
  const dispatch = useDispatch();
  const salesObject = useSelector((state) => state.sales);
  const sessionUser = useSelector((state) => state.session.user)
  const allSales = salesObject.sales;
  const allNeighborhoods = salesObject.allNeighborhoods
  console.log("sessionUser ------>", sessionUser)
  console.log("salesArray ----->", salesObject)
  console.log("allSales ----->", allSales)
  console.log("allNeighborhoods ----->", allNeighborhoods)
  const [hostId, setHostId] = useState("")
  const [categoryId, setCategoryId] = useState("")
  const [neighborhoodId, setNeighborhoodId] = useState("")
  const [title, setTitle] = useState("")
  const [date, setDate] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [errors, setErrors] = useState("")

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setHostId(sessionUser.id)
    const newSale = dispatch(saleActions.create({
      hostId,
      categoryId,
      neighborhoodId,
      title,
      date,
      imageUrl }))
      console.log("newSale ------> ", newSale)
      allSales.push(newSale);
  };

  return (
    <form onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
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
        <select value={neighborhoodId} onChange={(e) => setNeighborhoodId(e.target.value)}>
          {allNeighborhoods.map(neighborhood => <option value={neighborhood.id}>{neighborhood.name}</option>)}
        </select>
      </label>
      <label>
        Category
        <select value={neighborhoodId} onChange={(e) => setNeighborhoodId(e.target.value)}>
          <option value={neighborhoodId}>Friendly Neighborhood</option>
        </select>
      </label>
      <label>
        Select a Date
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)}/>
      </label>
      <button type="submit">Sign Up</button>
    </form>
  );
}
export default CreateSaleForm;
