import React from 'react';

const User = (data) => {
    const { displayName, email, photoURL} = data.data;
    // console.log(data.data);
    return (
        <div className='my-5'>
            <h2>Welcome!! {displayName}</h2>
            <p><b>Your email Address is:  </b>{email}</p>
            <img src={photoURL} alt="" />
        </div>
    );
};

export default User;