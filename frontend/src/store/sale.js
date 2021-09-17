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
    payload: sale,
  };
};

const updateSale = (sale) => {
  return {
    type: UPDATE_SALE,
    payload: sale,
  };
};

const removeSale = () => {
  return {
    type: REMOVE_SALE,
  };
};

export const getAllSales = () => async dispatch => {
  const response = await csrfFetch('/api/sales');
  const data = await response.json();
  console.log("getAllSales data ------>", data)
  dispatch(getSales(data));
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
  console.log("data ----->", data)
  dispatch(createSale(data));
  return response;
};

export const deleteSale = (sale) => async (dispatch) => {
  const response = await csrfFetch(`/api/sales/${sale.id}`, {
    method: 'DELETE',
  });
  dispatch(removeSale());
  return response;
};

const initialState = {};

const salesReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_SALES:
      newState = action.payload;
      return newState;
    case CREATE_SALE:
      const newSale = action.payload
      const sales = state.sales
      console.log("sales ------>", sales)
      sales.push(newSale)
      newState = {
        ...state,
        sales

      }
      return newState;
    case REMOVE_SALE:
      newState = Object.assign({}, state);
      newState.sales[action.payload] = null;
      return newState;
    default:
      return state;
  }
};

export default salesReducer;
