import React, { useState } from 'react';
import { Button, TextInput, Text } from 'react-native';

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
        // This one yes
        //setSuccess(true)
        // Finalizar

    }).catch(error => {
        if (error.code === 'auth/user-not-found') {
            setError(500)
            alert('El usuario no existe');

        }

        if (error.code === 'auth/invalid-email') {
            setError(<WarningAdvice type={2} warningText='El mail no es válido.' />)
        }

        console.error('[Error] RegisterSMS2 : '+error);
    });;
    setConfirm(confirmation);
  }

  async function confirmCode() {
    try {
      await confirm.confirm(code);
    } catch (error) {
    alert('Error al crear la cuenta - Compruebe el estado de su conexión.')
    }
  }

  if (!confirm) {
    return (
      <>
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