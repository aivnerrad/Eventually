import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import Logo from "../Logo/Logo";
import { csrfFetch } from "../../store/csrf";
import "./EditSalePage.css";

function EditSaleForm() {
  const sessionUser = useSelector((state) => state.session.user)
  const [allCategories, setAllCategories] = useState([])
  const [categoryId, setCategoryId] = useState(1)
  const [title, setTitle] = useState("")
  const [date, setDate] = useState(new Date())
  const [imageUrl, setImageUrl] = useState("")
  const [errors, setErrors] = useState([])
  const { id } = useParams();
  const numberId = Number(id);
  const history = useHistory();

  useEffect(() => {
    async function categoriesFetch() {
      const response = await csrfFetch("/api/sales")
      const data = await response.json();
      setAllCategories(data.allCategories)
      return data
    }
    async function saleFetch(){
      const response = await csrfFetch(`/api/sales/${numberId}`)
      const data = await response.json();
      setTitle(data.title)
      setImageUrl(data.imageUrl)
    }
    categoriesFetch()
    saleFetch()
  }, [numberId])

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
        imageUrl
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

  return (
    <form onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <Logo />
      <label>
        Edit Title
        <input
          className="input"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>
      <label>
        Edit Category
        <select value={Number(categoryId)} onChange={(e) => setCategoryId(e.target.value)}>
          {allCategories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
        </select>
      </label>
      <label>
        Edit Date
        <input className="input" type="date" value={date} onChange={(e) => setDate(e.target.value)}/>
      </label>
      <label>
        Edit Image
        <input className="input" type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)}/>
      </label>
      <button type="submit">Edit Sale</button>
    </form>
  );
}
export default EditSaleForm;
