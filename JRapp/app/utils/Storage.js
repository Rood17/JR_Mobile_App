import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { LOG_INFO } from '../res/values/strings/Strings';

export const storeUserData = async (value) => {

    console.log(LOG_INFO('Storage', 'storeUserData.idSubscriber')+value[0].idSubscriber.toString())
    try {
        await AsyncStorage.setItem('userData', JSON.stringify(value))
    } catch (e) {
        // saving error
    }
}

export const storeUserString = async (key, value) => {
    console.log(LOG_INFO('Storage', 'storeUserString.value')+value)
    try {
        await AsyncStorage.setItem(key, value) ?? null
    } catch (e) {
        // saving error
        console.error("[Error] Error in storeUserString : " + key)
    }
}


let userName, lastName, id, email, pwd;
export const getUserData = async () => {
    let result = false
    try {
        let jsonValue = await AsyncStorage.getItem('userData') ?? null
        if (jsonValue !== null && jsonValue != undefined) {
            // value previously stored
            jsonValue = JSON.parse(jsonValue)
            console.log(LOG_INFO('Storage', 'getUserData.idSubscriber')+jsonValue[0].idSubscriber.toString())
            setUserName(jsonValue[0].name)
            setUserLastName(jsonValue[0].lastName)
            setUserEmail(jsonValue[0].email)
            setUserId(jsonValue[0].idSubscriber)
            setSecret(jsonValue[0].pwd)
            result = true;

        } else {
            console.log( "[Info] Storage - AsyncStorgae.getData : NULL")
        }
        
        //return jsonValue[0].name != undefined ? data : null;
    } catch (e) {
        // error reading value
        console.error("[Error] Error in getUserData" )
    }
    return result
}

let stringValue;
export const getUserString = async (key) => {
    
    try {
        let value = await AsyncStorage.getItem(key) ?? 'none'
        if (value !== null) {
            // value previously stored
            console.log(LOG_INFO('Storage', 'getUserString.getKey')+value)
           setStringValue(value)
        }
        return value;
        
        //return jsonValue[0].name != undefined ? data : null;
    } catch (e) {
        // error reading value
    }
}

export const clearStorage = async () => {
    try {

        console.log("[Info] STORAGE >>> Clearing")
        await AsyncStorage.clear()
    } catch (e) {
        // error reading value
        console.error('[Error] Something is wrong with Clear Storage')
    }
}


const setUserName = (userName) => {
    this.userName = userName;
}

export const getUserName = () => {
    return this.userName;
}
const setUserLastName = (userLastName) => {
    this.userLastName = userLastName;
}

export const getUserLastName = () => {
    return this.userLastName;
}
const setUserEmail = (email) => {
    this.email = email;
}

export const getUserEmail = () => {
    return this.email;
}
const setUserId = (id) => {
    this.id = id;
}

export const getUserId = () => {
    return this.id;
}

const setStringValue = (stringValue) => {
    this.stringValue = stringValue;
}

export const getStringValue = () => {
    return this.stringValue;
}

const setSecret = (pwd) => {
    this.pwd = pwd;
}

export const getSecret = () => {
    return this.pwd;
}