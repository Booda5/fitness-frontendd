import React, { useState } from 'react';

import { registerUser } from '../api';

const RegisterUser = () => {
    const [user, setUser] = useState("");
    const [password, setPassword]= useState("");

    const handleRegisterClick = async (event) => {
        event.preventDefault();
        const registerInfo = {
            user: user,
            password: password
        };

        let firstPassword = document.querySelector('.password').value,
            confirmPassword = document.querySelector('.confirm_password').value;
          
            if (firstPassword === "") {
                alert("Password field cannot be empty");
                return false;
            } 
            
            if (firstPassword !== confirmPassword) {
                alert("Passwords did not match, please try again!");
                return false
            }

            const newUser = await registerUser(registerInfo);
            alert(newUser.message)

            setUser("");
            setPassword("");
            document.querySelector('.confirm_password').value='';
            window.location.reload(false);
    };

    const handleUserChange = (event) => {
        setUser(event.target.value);
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }
 

    return (
      <div id='registerPage'>
            <h1>REGISTER NEW USER</h1>
        <form>
            <label for="username">Username: </label>
            <input type="text" id="username" placeholder="Username" value={user} onChange={handleUserChange}  />
            <br/>
            <label for="password">Password: </label>
            <input type="password" className="password" placeholder="Password" id="password" value={password}
             onChange={handlePasswordChange}/>
            <br/>
            <label for="confirm-password">Confirm Password: </label>
            <input type="password" className="confirm_password" placeholder="Re-Enter Password" id="confirm-password"
            />
             <br/>
             <br/>
             <button onClick={handleRegisterClick}>Register</button>  
        </form>
      </div>    
    );
};

export default RegisterUser;