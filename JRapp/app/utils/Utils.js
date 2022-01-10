/**
 * Utils -JR Movil --
 *
 */

 import {
    Keyboard
  } from 'react-native';

// AAUTH SECTION
// Know if it´s Uppercase
export const CheckUppercase = (input) => {
    for (var i = 0; i < input.length; i++) {
        
        var letter = input.charAt(i);
        if (letter === letter.toUpperCase() && isNaN(parseInt(letter))) {
            //console.log("La letra " + letter + " es mayúscula");
            return true;
        }
    }

    return false;
}

// Check if input has a number
export const checkIfHasNum = (input) => {
    
    for (var i = 0; i < input.length; i++) {
        var letter = input.charAt(i);
        if (!isNaN(parseInt(letter)) ) {
            //console.log( letter + " es número");
            return true;
        }
    }

    return false;
}

export const quitKeyboard = () => {
    Keyboard.dismiss()
}

export const formatApiDate = ( codedDate) => {
    let year = codedDate.slice(0,4)
    let month = codedDate.slice(4,6)
    let days = codedDate.slice(6,8)
    let result = year + '/' + month + '/' + days

    return result;
}

// Convert codeProduct
// Compute recharge type
export const setProductType = (payloadCode) => {
    let payloadType

    payloadType = 'Plan JR10 - $99';
    // Feed the caharge resume
    if (typeof payloadCode == 'string') {
        switch (payloadCode) {
            case 'A':
                payloadType = 'Plan JR5 - $49';
                break;
            case 'B':
                payloadType = 'Plan JR10 - $99';
                break;
            case 'C':
                payloadType = 'Plan JR20 - $199';
                break;
            case 'D':
                payloadType = 'Plan JR50 - $449';
                break;
            default:
                payloadType = 'Plan JR10 - $99';
        }
    }
    if (typeof payloadCode == 'number') {
        switch (payloadCode) {
            case 20:
                payloadType = 'Carga - $20';
                break;
            case 30:
                payloadType = 'Carga - $30';
                break;
            case 50:
                payloadType = 'Carga - $50';
                break;
            case 100:
                payloadType = 'Carga - $100';
                break;
            case 150:
                payloadType = 'Carga - $150';
                break;
            case 200:
                payloadType = 'Carga - $200';
                break;
            case 300:
                payloadType = 'Carga - $300';
                break;
            case 400:
                payloadType = 'Carga - $400';
                break;
            case 500:
                payloadType = 'Carga - $500';
                break;
            default:
                payloadType = 'Plan JR10 - $99';
        }
    }

    return payloadType;
}
