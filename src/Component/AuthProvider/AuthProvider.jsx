import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import auth from '../Firebase/Firebase.config.jsx';


export const MyCreatedContext = createContext()

const AuthProvider = ({children}) => {

    const [user, setUser] = useState({})
    const [loading , setLoading] = useState(true)

    const googleProvider = new GoogleAuthProvider()
    const githubProvider = new GithubAuthProvider()

    const googleLogin =() => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    const githubLogin = () => {
        setLoading(true)
        return signInWithPopup(auth, githubProvider)
    }

    // create user
    const createUser =(email, password)=> {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // login
    const login= (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    // logout
    const logOut =() => {
        setLoading(true)
        return signOut(auth)
    }
    // updateProfile
    const profileUpdate =(name,photo) => {
        setLoading(true)
        return updateProfile(auth.currentUser,{
            displayName: name,
            photoURL: photo,
        })
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user)
            setLoading(false)
        })        
        return () => unsubscribe()
    },[])


    const authInfo = {
        createUser,
        login,
        user,
        logOut,
        googleLogin,
        githubLogin,
        profileUpdate,
        loading,
        setLoading        
    }


    return (
        <MyCreatedContext.Provider value={authInfo}>
            {children}
        </MyCreatedContext.Provider>
    );
};
AuthProvider.propTypes = {
    children: PropTypes.node
};

export default AuthProvider;