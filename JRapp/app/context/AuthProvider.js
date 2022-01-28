import React, { useContext, useEffect, useState } from "react";
import auth, {getAuth, RecaptchaVerifier  } from '@react-native-firebase/auth';


export const updateEmail = (email) => {
    return auth().updateEmail(email);
};

function AuthProvider() {
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState();

    const signup = (email, password) => {
        return auth.createUserWithEmailAndPassword(email, password);
    };

    const login = (email, password) => {
        return auth.signInWithEmailAndPassword(email, password);
    };

    const logout = () => {
        return auth.signOut();
    };

    const resetPassword = (email) => {
        return auth.sendPasswordResetEmail(email);
    };

    const updateEmail = (email) => {
        return auth.updateEmail(email);
    };

    const updatePassword = (password) => {
        return currentUser.updatePassword(password);
    };
}

export default AuthProvider;

export const createUser = (email, phoneNumber, name, lastName, pwd, setRegisterSuccess, setError) => {

    const completeName = name + ' ' + lastName;

    auth().createUser({
            email: email,
            emailVerified: false,
            phoneNumber: phoneNumber,
            password: pwd,
            displayName: completeName,
            photoURL: 'http://www.example.com/12345678/photo.png',
            disabled: false,
        }).then((userRecord) => {
            // See the UserRecord reference doc for the contents of userRecord.
            console.log('Successfully created new user:', userRecord.uid);
            setRegisterSuccess(true)
        }).catch((error) => {
            console.log('Error creating new user:', error);
            setError(error)
        });
}

export const isUserLog = () => {
    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    // Handle user state changes
    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

    //const auth = auth();
    //const userc = auth.currentUser;

    // Hcer pruebas al usuario -- lograr guardar más datos en el auth

    //console.log("user : " + user.id)
    //console.log("user : " + user.name)

    if (user)
        return true;
    else
        return false; // unsubscribe on unmount

}

export const login = (email, pwd, setError, setLoginSuccess) => {
    // no one enters
    //setError(true)
    try {
        auth().signInWithEmailAndPassword(email, 'Prueba123').then(() => {
            console.log('User is log in!');
            // This one yes
            setLoginSuccess(true)
            //setSuccess(true)
            // Finalizar

        }).catch(error => {
            if (error.code === 'auth/user-not-found') {
                setError(500)
                alert('El usuario no existe');

            }

            if (error.code === 'auth/invalid-email') {
                console.log('That email address is invalid!');
                setError(<WarningAdvice type={2} warningText='El mail no es válido.' />)
            }

            console.error(error);
        });
    } catch {
        alert('Error al crear la cuenta - Compruebe el estado de su conexión.')

    }

}

export const logout = () => {
    auth().signOut().then(() => {
        console.log('User is log out!');
        return true;
    }).catch(error => {
        console.error(error);
    });
}