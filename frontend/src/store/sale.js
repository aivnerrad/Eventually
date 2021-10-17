import { csrfFetch } from './csrf';

const GET_SALES = 'sale/getSales';
const CREATE_SALE = 'sale/createSale';
const REMOVE_SALE = 'sale/removeSale';
const UPDATE_SALE = 'sale/updateSale';
const GET_ATTENDEES = 'sale/getAttendees';
const ATTEND_SALE = 'sale/attend';

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

const getAttendees = (attendees) => {
  console.log("attendees in getAttendees ======>>>>", attendees)
  return {
    type: GET_ATTENDEES,
    attendees
  }
}

const attendSale = (sale) => {
  return {
    type: ATTEND_SALE,
    attendees : {
      sale
    }
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
    const saleId = Number(id)
    const response = await csrfFetch(`/api/sales/${saleId}/attendees`);
    const data = await response.json()
    dispatch(getAttendees(data))
    return data
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

export const goToSale = (sale) => async(dispatch) => {
  const response = await csrfFetch(`/api/sales/${sale.saleId}/attendees`, {
    method: 'POST',
    body: JSON.stringify(sale)
  })
  const attending = await response.json()
  if(typeof(attending) === 'object'){
    console.log("ATTENDING ==========>>>>",attending)
    return (
      dispatch(attendSale(attending[attending.length - 1])),
      console.log("attending =====>>>> after dispatch", attending)
    )
  }
  return response;
}
let initialState = {};

const salesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SALES:
      state = action.sales
      return state
    case GET_ATTENDEES:
      console.log("STATE IN GET_ATTENDEES ====>>>", state)
      //state.allAttendees[state.allAttendees.length -1] = action.attendees[action.attendees.length - 1]
      return state
    case ATTEND_SALE:
      state.allAttendees.push(action.attendees.sale)
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
