import React,{useEffect} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { Field, reduxForm } from 'redux-form'
import{
    InputField,
    Loader
}from '../common/FieldInputs.jsx';
import {makeStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {getRts} from '../actions/rtsAction';
import queryString from 'query-string';
const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '100%',
      },
    },
  }));
  const validate = values => {
    const errors = {}
    const requiredFields = [
      'company',
      'owner',
      'phone',
      'email',
      'address',
      'city',
      'province',
      'postal'
    ]
    requiredFields.forEach(field => {
      if (!values[field]) {
        errors[field] = 'This field is required'
      }
    })
    if (
      values.email &&
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email address'
    }
    return errors
  }
function Form(props){
  return(
    <React.Fragment>
        <Field
          id="standard-basic"
          label="Company Name"
          variant="outlined"
          name="company"
          fullWidth={true}
          component={InputField}
          margin="dense"
        />
        <Field
          id="standard-basic"
          label="Owner Operator Name"
          variant="outlined"
          component={InputField}
          name="owner"
          margin="dense"
        />
        
        <Field
          id="standard-basic"
          label="Daytime Phone Number"
          name="phone"
          component={InputField}
          variant="outlined"
          margin="dense"
        />
        <Field
          id="standard-basic"
          label="Email Address"
          variant="outlined"
          component={InputField}
          name="email"
          fullWidth={true}
          margin="dense"
        />
        <Field
          id="standard-basic"
          label="Street Address"
          variant="outlined"
          component={InputField}
          name="address"
          fullWidth={true}
          margin="dense"
        />
        <Field
          id="standard-basic"
          label="City/Town"
          component={InputField}
          name="city"
          variant="outlined"
          margin="dense"
        />
        <Field
          id="standard-basic"
          label="Province"
          name="province"
          component={InputField}
          variant="outlined"
          margin="dense"
        />
        <Field
          id="standard-basic"
          label="Postal"
          component={InputField}
          name="postal"
          variant="outlined"
          margin="dense"
        />
        <Field
          id="standard-basic"
          label="Alternative Billing Contact"
          variant="outlined"
          component={InputField}
          name="billing"
          margin="dense"
        />
        <Field
          id="standard-basic"
          label="GST/HST/PST"
          component={InputField}
          name="gst"
          variant="outlined"
          margin="dense"
        />
    </React.Fragment>
  )
}
const WrappedForm = reduxForm({
  validate,
  form:'Form',
  enableReinitialize:true
})(Form)
function Account({
  getData,
  company,
  owner,
  phone,
  email,
  address,
  city,
  province,
  postal,
  number,
  billingContact,
  loading,
  }){  
    let url = window.location.search;
    let params = queryString.parse(url);
    useEffect(()=>{
        if(params.id){
          getData(params.id) 
        }
    },[])
    const classes = useStyles();
    if(loading){
      return(<Loader/>)
    }
    const initialValues = {
      'company':company,
      'owner':owner,
      'phone':phone,
      'email':email,
      'address':address,
      'city':city,
      'province':province,
      'postal':postal,
      'billing':billingContact,
      'gst':number
    }
    return(
    <React.Fragment>
    <CssBaseline />
    <div className={classes.root}>
    <Container maxWidth="sm">
       <WrappedForm initialValues={initialValues}/>
    </Container>
    
    </div>
    </React.Fragment>
    )
}
const mapStateToProps=(state)=>{
  const {company,owner,phone,email,address,city,province,postal,billingContact,number,restaurant,loading} = state.rtsReducer;
 return{
   company,
   owner,
   phone,
   email,
   address,
   city,
   province,
   postal,
   billingContact,
   number,
   restaurant,
   loading
 }
 
}


const dispatchPropsToState=dispatch=>{
    return{
        getData:(id)=>dispatch(getRts(id))
    }
}
export default connect(mapStateToProps,dispatchPropsToState)(Account);