import React from 'react';
import useAuth from '../Hook/useAuth';

const Profile = () => {
    const { user } = useAuth()

    return (
        <div>
            <h2>Welcome <span className='text-2xl font-semibold'>{user?.displayName}</span> </h2>
            <h2 className='mb-6'>{user?.email}</h2>
            <figure>
                <img className='w-40' src={user?.photoURL} alt="" />
            </figure>
        </div>
    );
};

export default Profile;