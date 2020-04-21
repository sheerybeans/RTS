import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'; 

const initialState={
    id:"",
    company:"",
    owner:"",
    phone:"",
    email:"",
    address:"",
    city:"",
    province:"",
    postal:"",
    billingContact:"",
    number:"",
    restaurant:[],
    loading: false
}
function rtsReducer(state=initialState,action){
    const info = action.payload;
    switch(action.type) {
        case "GET_USER_DATA":
            return {
                ...state,
                loading: true
            }
        case "GET_USER_DATA_SUCCESS":
        return{
            ...state,
            id:info._id,
            company:info.company,
            owner:info.owner,
            phone:info.phone,
            email:info.email,
            address:info.address,
            city:info.city,
            province:info.province,
            postal:info.postal,
            billingContact:info.billing_contact,
            number:info.number,
            restaurant: info.restaurant,
            loading: false
        }
        case "ADD_RESTAURANT":
        return{
            ...state,
            restaurant:[...state.restaurant,action.payload]
        }
        case "UPDATE_RESTAURANT":
        return{
            ...state,
            restaurant:state.restaurant.map(row=>{
                if(row._id === action.payload._id){ 
                    return{
                    ...row,
                    ...action.payload
                    }
                }
            return row;
        })
        }
        default:return state
      }
}
export const load = data => ({ type: 'GET_USER_DATA_SUCCESS', data })
export default combineReducers({
    rtsReducer,
    form: formReducer
});
 