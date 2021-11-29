import React, { useState } from 'react';
import axios from 'axios';

export default function LoginPage (){

    const [usernameReg, setUsernameReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');

    const [usernameLog, setUsernameLog] = useState('');
    const [passwordLog, setPasswordLog] = useState('');

    const [loginStatus, setLoginStatus] = useState('');
  



    const register = () =>{
        axios.post(`http://localhost:5050/signup/register`, {username:usernameReg, password: passwordReg})
        .then((response)=>{
            console.log(response)
        });
    }

    const login = () =>{
        axios.post(`http://localhost:5050/signup/login`, {username:usernameLog, password: passwordLog})
        .then((response)=>{
            if (response.data.message){
                setLoginStatus(response.data.message)
            } else{
                setLoginStatus(response.data.message[0])

            }
            console.log(response.data)
        });
    }


    return(
        <div className="container">
            <div className="registration">
        <h1>Registration</h1>
        <label>Username</label>
        <input type="text" onChange={((e)=>{
            setUsernameReg(e.target.value)
        })}/>
        <label>Password</label>
        <input type="text"onChange={((e)=>{
            setPasswordReg(e.target.value)
        })}/>
        <button onClick={register}>Register</button>
            </div>

            <div className="login">
            <h1>Login</h1>
        <label>Username</label>
        <input type="text" onChange={((e)=>{
            setUsernameLog(e.target.value) })}/>
        <label>Password</label>
        <input type="text"type="text" onChange={((e)=>{
            setPasswordLog(e.target.value) })}/>
        <button onClick={login}>Login</button>
            </div>

            <h1>{loginStatus}</h1>

        </div>
    )
}