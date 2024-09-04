"use client"

import React from 'react';

export default function AddressForm ({ state, setState, field }) {

    const handleInputChange = ({ target }) => {
		setState((prevState) => ({
            ...prevState,
            [field]: {
                ...prevState[field],
                [target.name]: target.value,
            }
        }));
	};
    return (
        <>
            <div className='address-user-name'>
                <label>
                    <span>First Name *</span>
                    <input onChange={handleInputChange} type="text" required value={state.firstName} name="firstName" />
                </label>
                <label>
                    <span>Last Name *</span>
                    <input onChange={handleInputChange} type="text" required value={state.lastName} name="lastName" />
                </label>
            </div>
            <label>
                <span>Country *</span>
                <input onChange={handleInputChange} type="text" required value={state.country} name="country" />
            </label>
            <label>
                <span>House Number *</span>
                <input onChange={handleInputChange} type="text" required value={state.houseNumber} name="houseNumber" />
            </label>
            <label>
                <span>Street *</span>
                <input onChange={handleInputChange} type="text" required value={state.street} name="street" />
            </label>
            <label>
                <span>City *</span>
                <input onChange={handleInputChange} type="text" required value={state.city} name="city" />
            </label>
            <label>
                <span>State *</span>
                <input onChange={handleInputChange} type="text" required value={state.state} name="state" />
            </label>
            <label>
                <span>ZIP / Post Code</span>
                <input onChange={handleInputChange} type="text" value={state.postCode} name="postCode" />
            </label>
            <label>
                <span>Phone *</span>
                <input onChange={handleInputChange} type="text" required value={state.phone} name="phone" />
            </label>
            <label>
                <span>Email address *</span>
                <input onChange={handleInputChange} type="email" required value={state.email} name="email" />
            </label>
        </>
    )
}