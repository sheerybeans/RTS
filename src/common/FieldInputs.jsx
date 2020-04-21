import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > * + *': {
        marginLeft: theme.spacing(2),
      },
    },
  }));
export const Loader=()=> {
    const classes = useStyles();
    return (
        <div className="loader-container">
            <div className={classes.root}>
                <CircularProgress />
            </div>
        </div>
    );
}
export const InputField = ({
    label,
    input,
    meta: { touched, invalid, error },
    ...custom
  })=>{
    return(
        <React.Fragment>
            <TextField 
               label={label}
               placeholder={label}
               error={touched && invalid}
               helperText={touched && error}
               {...input}
               {...custom}
            />
        </React.Fragment>
    )
}
