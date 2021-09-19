import React, { useState } from "react";
import * as saleActions from "../../store/sale";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams, useHistory } from "react-router-dom";
import Logo from "../Logo/Logo";
import "./EditSaleModal.css";

function EditSaleForm({ setShowModal }) {
  const dispatch = useDispatch();
  const salesObject = useSelector((state) => state.sales);
  const sessionUser = useSelector((state) => state.session.user)
  const allNeighborhoods = salesObject.allNeighborhoods;
  const allCategories = salesObject.allCategories;
  const [hostId, setHostId] = useState(sessionUser.id)
  const [categoryId, setCategoryId] = useState(1)
  const [neighborhoodId, setNeighborhoodId] = useState(1)
  const [title, setTitle] = useState("")
  const [date, setDate] = useState(new Date())
  const [imageUrl, setImageUrl] = useState("")
  const [errors, setErrors] = useState([])
  const { id } = useParams();
  const numberId = Number(id);
  const numberCategoryId = Number(categoryId);
  const numberNeighborhoodId = Number(neighborhoodId);

  const history = useHistory();

  if (!sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([])
    setShowModal(false)


    const sale = {
      id: numberId,
      hostId,
      categoryId: numberCategoryId,
      neighborhoodId: numberNeighborhoodId,
      title,
      date,
      imageUrl
     }
     console.log("EDIT SALE sale ---->", sale)
    dispatch(saleActions.update(sale))
    return history.push("/")

  };

  return (
    <form onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <Logo />
      <label>
        New Title
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>
      <label>
        New Neighborhood
        <select value={Number(neighborhoodId)} onChange={(e) => setNeighborhoodId(e.target.value)}>
          {allNeighborhoods.map(neighborhood => <option key={Number(neighborhood.id)} value={Number(neighborhood.id)}>{neighborhood.name}</option>)}
        </select>
      </label>
      <label>
        New Category
        <select value={Number(categoryId)} onChange={(e) => setCategoryId(e.target.value)}>
          {allCategories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
        </select>
      </label>
      <label>
        New Date
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)}/>
      </label>
      <label>
        New Image
        <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)}/>
      </label>
      <button type="submit">Edit Sale</button>
    </form>
  );
}
export default EditSaleForm;
