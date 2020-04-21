import axios from 'axios';
export const getRts =(id)=>{
    return dispatch=>{
        dispatch({
            type:"GET_USER_DATA"
        })
        axios.get('http://localhost:4000/store/storeget/'+id)
        .then(function(response){
            const data = response.data;
            dispatch({
                type:"GET_USER_DATA_SUCCESS",
                payload:data
            })
        })
    }
} 
export const addRestaurant = (id, postData)=>dispatch=>new Promise((resolve,reject)=>{
    postData.site_phone = parseInt(postData.site_phone);
    postData.store_number = parseInt(postData.store_number);
    postData.franchise_phone = parseInt(postData.franchise_phone);
    axios.post('http://localhost:4000/store/restaurantadd/'+id, postData)
    .then(response => {
      dispatch({
            type:"ADD_RESTAURANT",
            payload: postData
      })
      resolve(postData)
    })
})
export const updateRestaurant = (id,newData,oldData)=>dispatch=>new Promise((resolve,reject)=>{
    axios.patch('http://localhost:4000/store/restaurantupdate/'+id,newData)
    .then(function (response) {
       dispatch({
           type:"UPDATE_RESTAURANT",
           payload:newData
       })
        resolve(newData);
    })
});