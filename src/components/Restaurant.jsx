import React,{useState} from 'react';
import {connect} from 'react-redux';
import Table from '../common/Table.jsx';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
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
            // editComponent: rowData => (
            //     <input 
            //         type="checkbox" 
            //         defaultValue={rowData.value}
            //         defaultChecked={rowData.rowData.enroll_location}
            //         onChange={e => rowData.onChange(!rowData.value)}
            //     />
            // ) 
        },
        {"title":"Store Number","field":"store_number","required":true},
        {"title":"Street Address","field":"address",
        "required":true,
            // editComponent:rowData=>(
            //     <TextField
            //         required={true}
            //         defaultValue={rowData.value}
            //         onChange={e=>(rowData.onChange(e.target.value))}
            //         error={rowData.value?false:true}
            //     />
            // ),
        },
        {"title":"City","field":"city","required":true},
        {"title":"Province","field":"province","required":true},
        {"title":"Postal","field":"postal","required":true},
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
            // updateRes(id,newData, oldData)
                title="Restaurant List"
                isLoading={loading}
                options={{
                    exportButton: true
                }}
                data={restaurant}
                columns={columnData}
                editable={{
                    onRowAdd: newData => new Promise((resolve,reject)=>{
                        const {store_number,address,city,province,postal} = newData;
                        if(!store_number && !address && !city && !province && !postal){
                            reject(newData);
                        }else{
                            addRestaurant(id,newData);
                            resolve(newData);
                        }  
                        
                    }),
                    onRowUpdate: (newData,oldData) => new Promise((resolve,reject)=>{
                        const {store_number,address,city,province,postal} = newData;
                        if(store_number!==null && address!==null && city!==null && province!==null && postal!==null){
                            reject(newData);
                        }else{
                            updateRes(id,newData, oldData)
                            resolve(newData);
                        }  
                    })
                }}   
            
                components={{
                    EditField: (props) => {
                        if(props.columnDef.required && props.value === ""){
                            return <TextField error defaultValue={{...props}} onChange={(e)=>props.onChange(e.target.value)}/>
                        }else{
                            if(props.columnDef.required && typeof props.value === "undefined"){
                                return <TextField error defaultValue="" onChange={(e)=>props.onChange(e.target.value)}/>  
                            }
                        }
                        console.log(props)
                        return <TextField defaultValue={props.value} onChange={(e)=>props.onChange(e.target.value)}/>
                    }
                }}
            //     components={{
            //     //     Action: props => (
            //     //         <Button
            //     //           onClick={(event) => props.action.onClick(console.log(props))}
            //     //           color="primary"
            //     //           variant="contained"
            //     //           style={{textTransform: 'none'}}
            //     //           size="small"
            //     //         >
            //     //           My Button
            //     //         </Button>
            //     //       ),
            //         Row:(rowData)=>(
            //             <tr className="MuiTableRow-root">
            //                 <td className="MuiTableCell-root MuiTableCell-body MuiTableCell-alignLeft"><input type="checkbox"/></td>
            //                 <td className="MuiTableCell-root MuiTableCell-body MuiTableCell-alignLeft"><TextField className="MuiInputBase-input MuiInput-input"
            //                     onChange={e=>console.log(rowData)}
            //                     defaultValue ={rowData.data.store_number}
            //                     // initialValue={rowData.value}
            //                     error={rowData.data.store_number?false:true}
            //                 /></td>
            //             </tr>
            //         )
            //    }}
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
