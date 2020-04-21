import React from 'react';
import {connect} from 'react-redux';
import Table from '../common/Table.jsx';
import Container from '@material-ui/core/Container';
import {addRestaurant,updateRestaurant} from '../actions/rtsAction';
function Restaurant({restaurant,addRestaurant,id,loading,updateRes}){
    const columnData=[
        {
            "title": "Enroll Location",
            "field": "enroll_location",
            initialEditValue:false,
            render: rowData => (
            <h4>{rowData.enroll_location?"enrolled":"not enrolled"}</h4>
            ),
            editComponent: rowData => (
                <input 
                    type="checkbox" 
                    value={rowData.value}
                    defaultChecked={rowData.rowData.enroll_location}
                    onChange={e => rowData.onChange(!rowData.value)}
                />
            ) 
        },
        {"title":"Store Number","field":"store_number"},
        {"title":"Street Address","field":"address"},
        {"title":"City","field":"city"},
        {"title":"Province","field":"province"},
        {"title":"Postal","field":"postal"},
        {
            "title": "Hours",
            "field": "hours",
            "lookup": { 24: "24Hours", 12: "12Hours" },
        },
        {
            "title": "Select Hours",
            "field": "select_hours",
            "lookup": { 1: "test1", 2: "test2" },
        },
        {"title":"Site Email","field":"site_email"},
        {"title":"Site Phone","field":"site_phone"},
        {"title":"Franchisee Phone","field":"franchise_phone"},
        {"title":"Franchise Email","field":"franchise_email"}

    ]
  
    return(
        <Container maxWidth="xl">
            <Table
                title="Restaurant List"
                isLoading={loading}
                data={restaurant}
                columns={columnData}
                editable={{
                    onRowAdd: newData => addRestaurant(id,newData),
                    onRowUpdate: (newData, oldData) => updateRes(id,newData, oldData)
                }}
                
            />  
        </Container>
    )
}
const dispatchPropsToState=(dispatch)=>{
    return{
        addRestaurant:(id,row)=>dispatch(addRestaurant(id,row)),
        updateRes:(id,newData,oldData)=>dispatch(updateRestaurant(id,newData,oldData))
    }
}
const mapStateToProps=(state)=>{
    const { id,restaurant,loading } = state.rtsReducer;
    return{
        id,
        restaurant,
        loading
    }
}
export default connect(mapStateToProps,dispatchPropsToState)(Restaurant);
