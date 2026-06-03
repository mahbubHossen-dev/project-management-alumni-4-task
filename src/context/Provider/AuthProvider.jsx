import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { AuthContext } from "../AuthContext/AuthContext";
import { auth } from "../../firebase/firebase.init";
import { useEffect, useState } from "react";


const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const registerUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const loginUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logoutUser = () => {
        return signOut(auth)
    }
    const updateUserProfile = (name) => {
        setLoading(true)
        return updateProfile(auth.currentUser, {
            displayName: name,
        })
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currUser) => {
            if(currUser){
                setUser(currUser)
                setLoading(false)
            }else{
                setUser(null)
                setLoading(true)
            }
        })

        return () => {
            unsubscribe()
        }

    }, [])

    const authInfo = {
        user,
        setUser,
        loading,
        registerUser,
        loginUser,
        logoutUser,
        updateUserProfile
    }

    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;