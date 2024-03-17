import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import BackendApi from '../../api';


function SignUpForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        firstName: "",
        lastName: "",
        state: "pending",
    });

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            // Use the createUser method from your API class
            const res = await BackendApi.createUser(formData);
            console.log("User registered successfully", res);

            // Clear form data after successful registration
            setFormData({
                email: "",
                firstName: "",
                lastName: "",
                state: "pending"
            });
        } catch (error) {
            console.error('Error registering user', error.response.data);
        }
    }

    async function handleChange(e) {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));

    }

    return (
        <div className='signup-container'>
            <h2>Sign Up</h2>
            <div className='signup-form'>
                <form onSubmit={handleSubmit}>
                    <div className='signup-text'>
                        <label htmlFor="">Email</label>
                        <input
                            type="text"
                            name="email"
                            value={formData.email}
                            placeholder='email'
                            onChange={handleChange} />
                    </div>

                    <div className='signup-text'>
                        <label htmlFor="">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            placeholder='First Name'
                            value={formData.firstName}
                            onChange={handleChange} />
                    </div>

                    <div className='signup-text'>
                        <label htmlFor="">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            placeholder='Last Name'
                            value={formData.lastName}
                            onChange={handleChange} />
                    </div>
                    <button type="submit">Sign Up!</button>
                </form>
            </div>
        </div>
    )
}

export default SignUpForm