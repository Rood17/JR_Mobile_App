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

