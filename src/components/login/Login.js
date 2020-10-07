import React, {useState} from 'react';
import {connect, useDispatch} from "react-redux";
import InputBase from '@material-ui/core/InputBase';
import FormGroup from '@material-ui/core/FormGroup';


import './Login.css';
import { updateForm } from '../../store/actions/loginActions'


function Login({loginData}){
    const dispatch = useDispatch()
    const{form: {email, password}} = loginData

    function loginSubmit(e){
        e.preventDefault()
        dispatch({ type: "fetchedAuth" })
    }

    const onFormChange = ({ nativeEvent: { target }}) => {
        if (target.name === 'saveToken'){
            dispatch(updateForm({ [target.name]: target.checked }))
        }else{
            dispatch(updateForm({ [target.name]: target.value }))
        }

    }

    return(
        <div className='login_container'>
            <form onSubmit={loginSubmit}>
                <InputBase className='login_form_input' value={email} onChange={onFormChange} placeholder='email' name='email'/>
                <InputBase className='login_form_input' value={password} onChange={onFormChange} placeholder='password' name='password'/>
                <br/>
                <input type="checkbox" value='save user?' id='saveToken' onChange={onFormChange} name='saveToken'/>
                <label htmlFor="saveToken">save user?</label>
                <br/>
                <button className='login_form_button' type='submit'>Login</button>
            </form>
        </div>
    )
}

const mapStatePoProps = state => {
    return {
        loginData: state.login
    }
}

export default connect(mapStatePoProps, null)(Login)
