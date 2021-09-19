import { useParams } from 'react-router';
import { csrfFetch } from './csrf';

const GET_SALES = 'sale/getSales';
const GET_ONE_SALE = 'sale/getOneSale'
const CREATE_SALE = 'sale/createSale';
const REMOVE_SALE = 'sale/removeSale';
const UPDATE_SALE = 'sale/updateSale'

const getSales = (sales) => {
  return {
    type: GET_SALES,
    payload: sales,
  };
};

const getOneSale = (sale) => {
  return {
    type: GET_ONE_SALE,
    payload: sale,
  };
};

const createSale = (sale) => {
  return {
    type: CREATE_SALE,
    sale
  };
};

const updateSale = (sale) => {
  return {
    type: UPDATE_SALE,
    sale
  };
};

const removeSale = (sale) => {
  return {
    type: REMOVE_SALE,
    sale
  };
};

export const getAllSales = () => async dispatch => {
  const response = await csrfFetch('/api/sales');
  const data = await response.json();
  console.log("getAllSales data ------>", data)
  dispatch(getSales(data));
  return response;
};


export const getCurrentSale = (sale) => async dispatch => {
  console.log("getCurrentSale sale.id ----->", sale.id)
  const response = await csrfFetch(`/api/sales/${sale.id}`);
  const data = await response.json();
  console.log("getCurrentSale data ------>", data)
  dispatch(getOneSale(data));
  return response;
};

export const create = (sale) => async (dispatch) => {
  const {  hostId,
    categoryId,
    neighborhoodId,
    title,
    date,
    imageUrl  } = sale;

  const response = await csrfFetch("/api/sales", {
    method: "POST",
    body: JSON.stringify({
      hostId,
      categoryId,
      neighborhoodId,
      title,
      date,
      imageUrl
    }),
  });
  const data = await response.json();
  dispatch(createSale(data.sale));
  return response;
};

export const update = (sale) => async dispatch => {
  const { id } = sale;


  const response = await csrfFetch(`/api/sales/${id}`,{
    method: "PATCH",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(sale),
    });
    dispatch(updateSale(sale));
  return response;
};


export const deleteSale = (sale) => async (dispatch) => {
  const response = await csrfFetch(`/api/sales/${sale.id}`, {
    method: 'DELETE',
  });
  dispatch(removeSale(sale));
  return response;
};

const initialState = {};

const salesReducer = (state = initialState, action) => {
  let newState;
  let sales;
  switch (action.type) {
    case GET_SALES:
      newState = action.payload;
      return newState;
    case GET_ONE_SALE:
      newState = action.payload;
      return newState;
    case CREATE_SALE:
        const newSale = action.sale
        sales = state.sales
        console.log("sales CREATE_SALE", sales)
      sales.push(newSale)
      newState = {
        ...state,
        sales

      }
      return newState;
      case UPDATE_SALE:
        const updatedSale = action.sale
        console.log("updatedSale ------>", updatedSale)
        sales = state.sales
      const currentSale = sales.filter(object => object.id === updatedSale.id)[0]
      //sales.push(updatedSale)

      // console.log("before UPDATE_SALE currentSale ------>", currentSale)
      Object.assign(currentSale, updatedSale)
      // console.log("after UPDATE_SALE currentSale ------>", currentSale)
      newState = {
        ...state,
        sales

      }
      console.log("UPDATE_SALE newState ---->", newState)
      return newState;
      case REMOVE_SALE:
      newState = Object.assign({}, state);
      console.log("newState BEFORE REMOVE_SALE", newState);
      console.log("action.sale", action.sale)
      const deleteIndex = newState.sales.indexOf(action.sale)
      newState.sales.splice(deleteIndex)
      console.log("newState BEFORE REMOVE_SALE", newState);
      return newState;
    default:
      return state;
  }
};

export default salesReducer;
