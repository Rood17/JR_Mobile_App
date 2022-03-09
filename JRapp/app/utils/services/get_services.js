import axios from "axios";
import {
  SECRET_AUTH, AUTHORIZATION, GET, POST,
  URL_OUTH, BASIC, CONTENT_TYPE, APLICATION_JSON, TYPE_URLENCODED, BEARER,
  ACTIVATE, GET_UF
} from '../../../types'
import * as data from '../../utils/services/perfil_uf.json'
import * as paquetes from '../../utils/services/paquetes.json'
import { clearStorage, storeUserData, storeUserString } from '../../utils/Storage';

import * as qs from 'qs'
import {
  API_LOCAL_ENPOINT_BASE,
} from "../constants/Constants";

export const getPaquetesApi = () => {
  return paquetes
}
export const getDataJson = () => {
  return data
}

export const getPerfilUf = (idSubscriber) => {
  console.log(' ** Calling UF ** : ' + idSubscriber)
  return getAPI(idSubscriber, GET_UF)
}

export const activateOffering = (idSubscriber, offeringId) => {
  console.log(' ** Activate!! ** : ' + idSubscriber)
  return getAPI(idSubscriber, ACTIVATE, offeringId)
}

export const activate = async (idSubscriber, offeringId, secret) => {

  const result = { statusResponse: true, error: null, userData: [] };
  let axios = require('axios');


  if (idSubscriber == 5688888888 || idSubscriber == 8888888888)
    idSubscriber = 5624898598;

  let data = JSON.stringify({
    "offeringId": offeringId
  });

  let config = {
    method: POST,
    url: `https://altanredes-prod.apigee.net/cm/v1/subscribers/${idSubscriber}/activate`,
    headers: {
      CONTENT_TYPE: APLICATION_JSON,
      AUTHORIZATION: secret
    },
    data: data
  };

  try {
    await axios(config)
      .then(function (response) {
        //console.log(JSON.stringify(response.data));
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
        console.error(error.message);
        result.error = error.message;
      }).finally(function () {
        // always executed
        console.info('Activate Finally called')
        result.statusResponse = true;
      });
  } catch (error) {
    //console.error("getListHcLocal > error >> "+error)
    result.statusResponse = false;
    result.error = error;
  }
  return result;
};

export const getPerfilUfAPI = async (idSubscriber, secret) => {


  const result = { statusResponse: true, error: null, userData: [] };
  let axios = require('axios');


  if (idSubscriber == 5688888888 || idSubscriber == 8888888888)
    idSubscriber = 5624898598;

  let config = {
    method: GET,
    url: `https://altanredes-prod.apigee.net/cm/v1/subscribers/${idSubscriber}/profile`,
    headers: {
      AUTHORIZATION: secret
    }
  };

  try {
    await axios(config)
      .then(function (response) {
        //console.log(JSON.stringify(response.data));
        result.userData = response.data;
        console.log("Services response.data : " + result.userData.responseSubscriber.freeUnits)
        console.log("Services response.data : " + JSON.stringify(result.userData))
      })
      .catch(function (error) {
        console.log(error);
        console.error(error.message);
        result.error = error.message;
      }).finally(function () {
        // always executed
        console.info('getPerfilUf Finally called')
        result.statusResponse = true;
      });
  } catch (error) {
    //console.error("getListHcLocal > error >> "+error)
    result.statusResponse = false;
    result.error = error;
  }
  return result;
};

export const getAPI = async (idSubscriber, action, offeringId) => {
  const axios = require('axios');
  const qs = require('qs');

  let result, resultError;
  let data = qs.stringify({

  });
  let config = {
    method: POST,
    url: URL_OUTH,
    headers: {
      AUTHORIZATION: BASIC,
      CONTENT_TYPE: TYPE_URLENCODED
    },
    data: data
  };
    let myPromise = new Promise(function (resolve) {
      axios(config)
        .then((response) => {
          const secret = BEARER + response.data.accessToken

          // Get UF API
          if (action == GET_UF) {
            resolve(getPerfilUfAPI(idSubscriber, secret))
          }
          if (action == ACTIVATE) {
            // Aqui api para activate
            resolve(activate(idSubscriber, offeringId, secret))
          }

        })
        .catch((error) => {
          console.error("GetApi : ", error.message);
          //throw new Error ('Error - ' + error.message)
          resolve(error.message)

        }).finally(() => {

          console.log("Perfil UF Listo")

        });

    });
  console.log("Flujo getAPI final 1 ")
  result = await myPromise
  return result;
};


export const getUserAuth = async (idSubscriber, pwd) => {


  console.log("**************** getUserAuth !!!   ")
  console.log("****************  ")
  console.log("*** idSubscriber : " + idSubscriber)
  console.log("*** pwd : " + pwd)
  console.log("****************  ")
  console.log("****************  ")

  let result;




  let myPromise = new Promise(function (resolve) {

    var myHeaders = new Headers();
    var formdata = new FormData();
    formdata.append("user_number", idSubscriber);
    formdata.append("password", pwd);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    fetch("https://jrmovil.pythonanywhere.com/jr_api/cm/1.0/login/", requestOptions)
      .then(response => response.text())
      .then(result => {
        result = JSON.parse(result)

        let dataArray = [{ 
          idSubscriber: idSubscriber, 
          name: result.first_name, 
          email: result.email, 
          lastName: result.last_name, 
          pwd: pwd }]

        

        resolve(result)
      })
      .catch(error => console.log('error', error))
    


  });

  result = await myPromise
  return result;
}

export const registerAPIUser = async (dataArray, email) => {

  console.log("**************** SERVICES !!!   ")
  console.log("****************  ")
  console.log("*** pwd : " + dataArray[0].pwd)
  console.log("*** email : " + dataArray[0].email)
  console.log("*** idSubscriber : " + dataArray[0].idSubscriber)
  console.log("*** name : " + dataArray[0].name)
  console.log("*** lastName : " + dataArray[0].lastName)
  console.log("****************  ")
  console.log("****************  ")



  let myPromise = new Promise(function (resolve, reject) {
    const axios = require('axios');
    let data = JSON.stringify({
      "first_name": dataArray[0].name,
      "last_name": dataArray[0].lastName,
      "user_number": dataArray[0].idSubscriber,
      "email": email,
      "password": dataArray[0].pwd
    });
  
    let config = {
      method: 'post',
      url: 'https://jrmovil.pythonanywhere.com/jr_api/cm/1.0/register_user/',
      headers: { 
          'Content-Type': 'application/json'
      },
      data : data
    };
      axios(config)
      .then((response) => {
        console.log("Services - registration : ", JSON.stringify(response.data));
        resolve(response.data)
      })
      .catch((error) => {
        console.log("Services - Error : ", error.message);
        reject(error)
      })

  });

  const result2 = await myPromise
  return result2;
}

export const editAPIUser = async (idSubscriber, editName, editLastName, editEmail, editPwd) => {

  console.log("**************** SERVICES !!!   ")
  console.log("****************  ")
  
  
  console.log("*** idSubscriber : " + idSubscriber)
  console.log("*** editName : " + editName)
  console.log("*** editLastName : " + editLastName)
  console.log("*** editEmail : " + editEmail)
  console.log("*** editPwd : " + editPwd)
  console.log("****************  ")
  console.log("****************  ")


  const axios = require('axios');
  let result;
  let data = JSON.stringify({
    "first_name": editName,
    "last_name": editLastName,
    "user_number": idSubscriber,
    "email": editEmail,
    "password": editPwd
  });

  let config = {
		method: 'post',
		url: 'https://jrmovil.pythonanywhere.com/jr_api/cm/1.0/edit_user/',
		headers: { 
				'Content-Type': 'application/json'
		},
		data : data
  };
  let myPromise = new Promise(function (resolve) {
    console.log("**************** SERVICES !!!   22 ")
    axios(config)
      .then((response) => {
        console.log("Services - registration : ", JSON.stringify(response.data));
        resolve(response.data)
      })
      .catch((error) => {
        console.log("Services - registration : ", error);
      });
  });

  result = await myPromise
  return result;
}

export const userIsRegisterAPI = async (idSubscriber) => {


    console.log("**************** userIsRegisterAPI !!!   ")
    console.log("****************  ")
    console.log("*** idSubscriber : " + idSubscriber)
    console.log("****************  ")
    console.log("****************  ")
  
    let result;
  
  
  
  
    let myPromise = new Promise(function (resolve) {
  
      var myHeaders = new Headers();
      var formdata = new FormData();
      formdata.append("user_number", idSubscriber);
  
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };
  
      fetch("https://jrmovil.pythonanywhere.com/jr_api/cm/1.0/is_register/", requestOptions)
        .then(response => response.text())
        .then(result => {
          console.log('userIsRegisterAPI : ' +  result)
          resolve(result)
        })
        .catch(error => {
          console.log('userIsRegisterAPI error', error)
        })
        .finally(() => console.log('userIsRegisterAPI Final'))
      
  
  
    });
    console.log('userIsRegisterAPI FLUJO 2')
    result = await myPromise
    return result;
  }

export const get_api_preference = async (dataPorduct) => {

    console.log(' ***** idSubscriber ' + dataPorduct.idSubscriber)
    console.log(' ***** name ' + dataPorduct.title)
    console.log(' ***** price ' + dataPorduct.price)

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "title": "JR Básico",
      "unit_price": 99.55,
      "idSubscriber": 9999999999,
      "email": "dsfsdf@ff.ff"
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    let myPromise = new Promise(function (resolve) {
    fetch("https://jrmovil.pythonanywhere.com/jr_api/cm/1.0/get_api_preference/", requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log("[Result] get_api_preference : " + result)
        resolve(JSON.parse(result))
      })
      .catch(error => console.log('error', error));
    });

    const superResult = await myPromise
    return superResult;
  };