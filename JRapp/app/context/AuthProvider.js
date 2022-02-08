import React, { useContext, useEffect, useState } from "react";
import Auth, {
    getAuth, createUserWithEmailAndPassword,
    reauthenticateWithCredential, signInWithEmailAndPassword,
    updateEmail,
    EmailAuthProvider,
    updatePassword,
    getAdditionalUserInfo
} from "firebase/auth";
import {getUserEmail, getUserId, getUserLastName, getSecret } from '../utils/Storage'



const auth = getAuth();

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

    const updatePassword = (password) => {
        return currentUser.updatePassword(password);
    };
}

export default AuthProvider;

export const createUser = (email, phoneNumber, name, lastName, pwd, setRegisterSuccess, setError) => {

    const completeName = name + ' ' + lastName;

    getAuth().createUser({
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

    const subscriber = getAuth().onAuthStateChanged(onAuthStateChanged);

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


    signInWithEmailAndPassword(auth, email, 'Prueba123').then(() => {
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
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });

}

export const logout = () => {
    getAuth().signOut().then(() => {
        console.log('User is log out!');
        return true;
    }).catch(error => {
        console.error(error);
    });
}

export const registerUser = (email, pwd, setRegisterResponse) => {

    email = email.toLowerCase();
    console.log('setRegisterResponse : ' +setRegisterResponse)
    try {
        createUserWithEmailAndPassword(auth, email, 'Prueba123').then(() => {
            console.log('User account created & signed in!');
            // Response
            setRegisterResponse('success')

        }).catch(error => {
            setRegisterResponse(error)
            console.error("Register error - " + error);
        });
    } catch {
        alert('Error al crear la cuenta - Compruebe el estado de su conexión.')

    }
}

export function updateUserEmail(navigation, newEmail, currentPassword, newSecret, oldEmail, setRegisterResponse ) {
    console.log("Updating User")

    let result = '';
    newEmail = newEmail.toLowerCase();
    try {
        signInWithEmailAndPassword(auth, getUserEmail(), currentPassword)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                // ...
                updateEmail(user, newEmail).then(() => {
                    console.log("Email updated!");
                    result = 'Success'
                    //navigation.popToTop()
                    navigation.reset({
                        index: 0,
                        routes: [
                        {
                            name: 'Main', 
                        },
                        ],
                    })
                }).catch(error => {
                    console.error("AuthProvider - UpdateEmail : " + error);
                    result = error.code
                    //setRegisterResponse(error.code)
                });
            })
    }  catch {
        alert('Error al actualizar la información - Compruebe el estado de su conexión.')
    }
    
    return result; 
}

export const updateUserPwd = (newSecret) => {
        console.log("Auth - UpdateingSecret")
        console.log("Auth - getUserEmail : " + getUserEmail())
        console.log("Auth - getSecret : " + getSecret())
        try {
            signInWithEmailAndPassword(auth, getUserEmail(), getSecret())
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    // ...
                    updatePassword(user, newSecret).then(() => {
                        console.log("Pwd updated!");
                        //navigation.popToTop()
                    }).catch(error => {
                        console.error("AuthProvider - UpdatePwd: " + error);
                        //setRegisterResponse(error.code)
                    });
                })
        }  catch {
            alert('Error al actualizar la información - Compruebe el estado de su conexión.')
        }


    }

export const reauthenticate = (currentPassword, oldEmail) => {
    var user = getAuth();
    var cred = EmailAuthProvider.credential(
        'carlos@zz.ss', 'Prueba123').catch(error => {
            console.log("Error reauthenticate : " + error)
        });
    return reauthenticateWithCredential(user, cred);
}