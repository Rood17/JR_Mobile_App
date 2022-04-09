import {getPaquetesApi} from '../../app/utils/services/get_services'
import {DATE_NOW_CODE} from '../../app/utils/constants/Constants'

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
            return true;
        }
    }

    return false;
}

export const quitKeyboard = () => {
    Keyboard.dismiss()
}

/**
 * 
 * @param {String} expireDate 
 * @returns String yyyy/mm/dd
 */
export const formatApiDate = (expireDate) => {
    let result
    if ( expireDate != undefined ) {
        let year = expireDate.slice(0,4)
        let month = expireDate.slice(4,6)
        let days = expireDate.slice(6,8)
        result = year + '/' + month + '/' + days
    } else {
        result = '-'
    }

    return result;
}

// Convert codeProduct
// Compute recharge type
export const setProductType = (payloadCode) => {
    const paquetes = getPaquetesApi();
    let payloadDays, expireDate, payloadType, payloadPrice; 
    let result = {'title' : '', 'expireDate' : '', 'startDate':'', 'price' : ''}   
    let toMatch
    
    //offeringId
    if (!payloadCode ) payloadCode = '1809901178';

    Object.values(paquetes).map((item) => {
        if (payloadCode == item.offerId){
            payloadType = item.name
            
            payloadDays = item.days
            payloadPrice = item.precio
            expireDate = expireDateHandler(DATE_NOW_CODE,item.days)
        }
        
    })

    result.title = payloadType;
    result.expireDate = expireDate;
    result.startDate = DATE_NOW_CODE;
    result.price = payloadPrice;
    return result;
}

/**
 * @param {String} payloadCode 
 * @returns String Offerid Name
 */
export const setProductName = (payloadCode) => {
    const paquetes = getPaquetesApi();
    let payloadType; 
    
    //offeringId
    if (!payloadCode ) payloadCode = '1809901178';

    Object.values(paquetes).map((item) => {
        if (payloadCode == item.offerId){
            payloadType = item.name
        }
    })
    return payloadType;
}

const expireDateHandler = (actualDate, offerDays) => {
    let proxMonthDay, expireDate, daysInProxMonth
    let year = actualDate.slice(0, 4 - actualDate.length);
    let day = actualDate.slice(6,  8);
    let month = actualDate.slice(4, 6);
    const actualMonth = month
    const actualYear = year
    let daysInActualMonth = getDaysInMonth(actualYear, actualMonth);

    day = parseInt(day)
    month = parseInt(month)
    year = parseInt(year)
    actualDate =  parseInt(actualDate)
    offerDays = parseInt(offerDays)
    
    if ((day + offerDays) > daysInActualMonth ){

        // cuántos días corren del siguiente mes
        proxMonthDay = (day + offerDays) - daysInActualMonth
        daysInProxMonth = getDaysInMonth(year, month+1)
        
        // Se agrega hasta en dos meses
        if (proxMonthDay >  daysInProxMonth){
            month = month + 2

            /**
             * Si el mes actual esta cerca del fin de año
             * y la recarga pasa al sigueinte.
             */
            if ( month > 12 ){
                year = year + 1
                month = month - 12
            }
        }
        else{
            month = month + 1
        }

        // SETTING EXPIRE DATE
        if ( month < 10) month = '0' +  month
        if ( proxMonthDay < 10) 
            proxMonthDay = '0' +  proxMonthDay
        expireDate = year + month  + proxMonthDay
           
    } else {

        // SETTING EXPIRE DATE
        day = day + offerDays
        if ( month < 10) month = '0' +  month
        if ( day < 10) day = '0' +  day
        expireDate = year + month  + day
    }

    // Setting date
    return expireDate;

}

const getDaysInMonth = (year, month) => {
    year = year.toString()
    month = month.toString()
    return new Date(year, month, 0).getDate();
}