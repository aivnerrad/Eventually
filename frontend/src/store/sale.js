import { csrfFetch } from './csrf';

const GET_SALES = 'sale/getSales';
const CREATE_SALE = 'sale/createSale';
const REMOVE_SALE = 'sale/removeSale';
const UPDATE_SALE = 'sale/updateSale';
const GET_ATTENDEES = 'sale/getAttendees';

const getSales = (sales) => {
  return {
    type: GET_SALES,
    sales
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

const getAttendees = (sale) => {
  return {
    type: GET_ATTENDEES,
    attendees: sale.attendees
  }
}
export function getAllSales() {
  return async dispatch => {
    const response = await csrfFetch('/api/sales');
    const data = await response.json();
    dispatch(getSales(data));
    return response;
  }
}
export function getAllAttendees(sale){
  return async dispatch => {
    const { id } = sale
    const response = await csrfFetch(`/api/sales/${id}`);
    const data = await response.json();
    dispatch(getAttendees(data))
  }
}

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

let initialState = {};

const salesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SALES:
      state = action.sales
      return state
    case GET_ATTENDEES:
      state = action.attendees
      return state
    // case GET_ONE_SALE:
    //   newState = action.payload;
    //   return newState;
    // case CREATE_SALE:
    //   const newSale = action.sale
    //   sales = state.sales
    //   sales.push(newSale)
    //   newState = {
    //     ...state,
    //     sales
    //   }
    //   return newState;
    // case UPDATE_SALE:
    //   const updatedSale = action.sale
    //   sales = state.sales
    //   const currentSale = sales.filter(object => object.id === updatedSale.id)[0]
    //   Object.assign(currentSale, updatedSale)
    //   newState = {
    //   ...state,
    //   sales
    //   }
    //   return newState;
    // case REMOVE_SALE:
    //   newState = Object.assign({}, state);
    //   const deleteIndex = newState.sales.indexOf(action.sale)
    //   newState.sales.splice(deleteIndex)
    //   return newState;
    default:
      return state;
}
};

export default salesReducer;
