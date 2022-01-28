import React, { useState } from 'react';
import { Button, TextInput, Text } from 'react-native';
import auth, {getAuth, RecaptchaVerifier }from '@react-native-firebase/auth';

function RegisterSms2() {
  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);

  const [code, setCode] = useState('');
  

  const appVerifier = window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
    'size': 'invisible',
    'callback': (response) => {
      // reCAPTCHA solved, allow signInWithPhoneNumber.
      onSignInSubmit();
    }
  }, auth);

  // Handle the button press
  async function signInWithPhoneNumber(auth, phoneNumber, appVerifier ) {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber).then(() => {
        console.log('User is log in!');
        // This one yes
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
    });;
    setConfirm(confirmation);
  }

  async function confirmCode() {
    try {
      await confirm.confirm(code);
    } catch (error) {
    alert('Error al crear la cuenta - Compruebe el estado de su conexión.')
      console.log('Invalid code.');
    }
  }

  if (!confirm) {
    return (
      <>
      <Text>Holaaaaa</Text>
      <Button
        title="Phone Number Sign In"
        onPress={() => signInWithPhoneNumber('+1 650-555-3434')}
      />
      </>
    );
  }

  return (
    <>
      <TextInput value={code} onChangeText={text => setCode(text)} />
      <Button title="Confirm Code" onPress={() => confirmCode()} />
    </>
  );
}

export default RegisterSms2