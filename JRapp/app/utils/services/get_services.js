import axios from "axios";
import {
  SECRET_AUTH, AUTHORIZATION, GET, POST,
  CONTENT_TYPE, APLICATION_JSON, TYPE_URLENCODED, BEARER,
  ACTIVATE, GET_UF
} from '../../../types'
import * as data from '../../utils/services/perfil_uf.json'
import * as paquetes from '../../utils/services/paquetes.json'
import { clearStorage, storeUserData, storeUserString } from '../../utils/Storage';
import { LOG_INFO } from "../../res/values/strings/Strings";
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

export const getPerfilUfAPI2 = async (idSubscriber, secret) => {

  const result = { statusResponse: true, error: null, userData: [] };
  let axios = require('axios');


  if (idSubscriber == 5688888888 || idSubscriber == 8888888888)
    idSubscriber = 5624898598;

  let config = {
    method: GET,
    url: `***`,
    headers: {
      AUTHORIZATION: secret
    }
  };

  try {
    await axios(config)
      .then(function (response) {
        result.userData = response.data;
        //console.log("Services response.data : " + result.userData.responseSubscriber.freeUnits)
        //console.log("Services response.data : " + JSON.stringify(result.userData))
      })
      .catch(function (error) {
        console.error('[Error] getServices - getPerfileUFApi : '+error.message);
        result.error = error.message;
      }).finally(function () {
        // always executed
        console.info('[Info]  getServices - getPerfilUf Fin*')
        result.statusResponse = true;
      });
  } catch (error) {
    //console.error("getListHcLocal > error >> "+error)
    result.statusResponse = false;
    result.error = error;
  }
  return result;
};

export const getPerfilUfAPI = async (idSubscriber) => {

  const resultX = { statusResponse: true, error: null, userData: null };


  var formdata = new FormData();
  if (idSubscriber == 8888888888)
    idSubscriber= 5624898598

  formdata.append("user_number", idSubscriber);

  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
  };
  try {
    await fetch("https://jrmovil.pythonanywhere.com/jr_api/cm/1.0/get_profile_uf/", requestOptions)
    .then(response => response.text())
    .then(function (result) {
      resultX.userData = JSON.parse(result);
      console.log("[Info]  getServices - getPerfilUf : " + result)
    })
    .catch(function (error) {
      console.error('[Error] getServices - getPerfileUFApi : '+error.message);
      resultX.error = error.message;
    }).finally(function () {
      // always executed
      console.info('[Info]  getServices - getPerfilUf Fin*')
      resultX.statusResponse = true;
    });
  } catch (error) {
    //console.error("getListHcLocal > error >> "+error)
    resultX.statusResponse = false;
    resultX.error = error;
  }
  return resultX;
};

// Quitar función en la próxima versión 000
export const getPerfilUf2 = async (idSubscriber) => {
  const axios = require('axios');
  const qs = require('qs');

  let result, resultError;
  let data = qs.stringify({

  });
  let config = {
    method: POST,
    url: 'URL_OUTH',
    headers: {
      AUTHORIZATION: 'BASIC',
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

        })
        .catch((error) => {
          console.error('[Error] get_services - GetApi'+error.message);

          //throw new Error ('Error - ' + error.message)
          resolve(error.message)

        }).finally(() => {

          console.info('[Info]  getServices - getAPI Fin*')


        });

    });
  result = await myPromise
  return result;
};


export const getUserAuth = async (idSubscriber, pwd) => {


  console.log("[Info] get_services - getUserAuth **")
  console.log(LOG_INFO('get_services', 'getUserAuth.idSubscriber')+idSubscriber)

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
      .catch(error => console.error('[Error] get_services - getUserAuth : '+error.message))
    


  });

  result = await myPromise
  return result;
}

export const registerAPIUser = async (dataArray, email) => {

  console.log("[Info] get_services - registerAPIUser **")
  console.log(LOG_INFO('get_services', 'registerAPIUser.idSubscriber')+dataArray[0].idSubscriber)


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
        //console.log(LOG_INFO('get_services', 'registerAPIUser.response')+JSON.stringify(response.data))
        resolve(response.data)
      })
      .catch((error) => {
        console.error("[Error] get_services - registerAPIUser : ", error.message);
        reject(error)
      })

  });

  const result2 = await myPromise
  return result2;
}

export const editAPIUser = async (idSubscriber, editName, editLastName, editEmail, editPwd) => {
  console.log("[Info] get_services - editAPIUser **")
  console.log(LOG_INFO('get_services', 'editAPIUser.idSubscriber editPwd : ')+editPwd)

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
    axios(config)
      .then((response) => {
        console.log(LOG_INFO('get_services', 'editAPIUser.response')+JSON.stringify(response.data))
        resolve(response.data)
      })
      .catch((error) => {
        console.error("[Error] get_services - editAPIUser : ", error);
      });
  });

  result = await myPromise
  return result;
}

export const userIsRegisterAPI = async (idSubscriber) => {

  console.log("[Info] get_services - userIsRegisterAPI **")
  
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
          console.log(LOG_INFO('get_services', 'userIsRegisterAPI.result')+JSON.stringify(result))
          resolve(result)
        })
        .catch(error => {
          console.error("[Error] get_services - userIsRegisterAPI : ", error);
        })
        .finally(() => console.log('[Info] getServices - userIsRegisterAPI Final'))
      
  
  
    });
    result = await myPromise
    return result;
  }

export const get_api_preference = async (dataPorduct) => {

    
    let email;
    console.log("[Info] get_services - get_api_preference **")

    dataPorduct.email == undefined 
    ? email = 'undefined@gmail.com'
    : email = dataPorduct.email

    console.log(LOG_INFO('get_services', 'get_api_preference.idSubscriber')+dataPorduct.idSubscriber)

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "title": dataPorduct.title,
      "unit_price": dataPorduct.price,
      "idSubscriber": dataPorduct.idSubscriber,
      "email": email
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
        console.log(LOG_INFO('get_services', 'get_api_preference.result')+result)
        resolve(JSON.parse(result))
      })
      .catch(error => console.error('[Error] get_services - get_api_preference : '+error.message));
    });

    const superResult = await myPromise
    return superResult;
  };

export const get_api_isJr = async (idSubscriber) => {


  console.log("[Info] get_services - get_api_isJr **")

  console.log(LOG_INFO('get_services', 'get_api_isJr.idSubscriber')+idSubscriber)
  if (idSubscriber == 5688888888 || idSubscriber == 8888888888)
    idSubscriber = 5624898598;

  let result;
  const axios = require('axios');
  const url = 'https://jrmovil.pythonanywhere.com/jr_api/cm/1.0/get_isjr/' + idSubscriber

  let config = {
      method: 'get',
      url:  url,
      headers: { }
  };
  let myPromise = new Promise(function (resolve) {

    
    axios(config)
    .then((response) => {
        console.log(LOG_INFO('get_services', 'get_api_isJr.response')+JSON.stringify(response.data))

        result = response.data
        resolve(result)
    })
    .catch((error) => {
      console.error('[Error] get_services - get_api_isJr : '+error.message)
        result = error
    });
  });

  const superResult = await myPromise
  return superResult;
};

export const get_user_email = async (idSubscriber) => {


  console.log("[Info] get_services - get_user_email **")
  console.log(LOG_INFO('get_services', 'get_user_email.idSubscriber')+idSubscriber)

  let result;
  const axios = require('axios');


let config = {
		method: 'get',
		url: 'https://jrmovil.pythonanywhere.com//jr_api/cm/1.0/get_user_email/'+idSubscriber,
		headers: { }
};


  let myPromise = new Promise(function (resolve) {

    
    resolve(axios(config)
    .then((response) => {
      console.log(LOG_INFO('get_services', 'get_user_email.response')+JSON.stringify(response.data))
        result = response.data
    })
    .catch((error) => {
      console.error('[Error] get_services - error : '+error.message)
        result = error
    }).finally(() => {
      console.log(LOG_INFO('get_services', 'get_user_email.FINAL')+result)
  }))
  });

  const superResult = await myPromise
  return result;
};

export const send_recovery_email = async (idSubscriber, rcvry_email) => {

  console.log("[Info] get_services - send_recovery_email **")
  console.log(LOG_INFO('get_services', 'get_user_email.idSubscriber')+idSubscriber)
  let resultApi;
 
  
  var formdata = new FormData();
  formdata.append("user_number", idSubscriber);
  formdata.append("email_test", rcvry_email);

  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
  };

  let myPromise = new Promise(function (resolve) {
    resolve(
      fetch("https://jrmovil.pythonanywhere.com/jr_api/cm/1.0/pwd_recovery_email/", requestOptions)
      .then(response => response.text())
      .then(
        (result) =>
        {
          console.log(LOG_INFO('get_services', 'get_user_email.result')+result)
          resultApi = result
        }
        )
      .catch(error => console.error('[Error] get_services - get_api_preference : '+error.message))
      .finally(() => console.log('[Info] getServices - send_recovery_email Final'))

        )
      });

  const superResult = await myPromise
  return resultApi;
};

export const cancel_payment = (id_pago) => {
  const axios = require('axios');
  let result;

  let config = {
      method: 'get',
      url: 'https://jrmovil.pythonanywhere.com/jr_api/cm/1.0/payment_cancel/' + id_pago,
      headers: { }
  };

  axios(config)
  .then((response) => {
      console.log(JSON.stringify(response.data));
      result= response
      console.log(LOG_INFO('CancelPayment', 'get_user_email.result')+result)
  })
  .catch((error) => {
      console.log(error);
  })
  .finally(() => console.log('[Info] getServices - CancelPayment Final'));

  return result;

}

/**
 * get_notification_status
 * Method : GET
 * Params : idSubscriber - String
 */
 export const get_notification_status = async (idSubscriber) => {
  const axios = require('axios');
  let result;

  let config = {
      method: 'get',
      url: 'https://jrmovil.pythonanywhere.com/jr_api/cm/1.0/get_notification_status/8136992795',
      headers: { }
  };

  await axios(config)
  .then((response) => {
    console.log(LOG_INFO('get_notification_status', 'result')+response.data)
    response.data ? result = true : result = false

  })
  .catch((error) => {
      console.log(error);
  });
  console.log(LOG_INFO('get_notification_status', 'final')+result)

  return result;

}

/**
 * set_notification_status
 * Method : POST
 * idSubscriber : String, 
 * notification_status : Boolean
 */
export const set_notification_status = async (idSubscriber, notification_status) => {

  console.log("[Info] get_services - set_notification_status **")
  console.log(LOG_INFO('get_services', 'set_notification_status.idSubscriber')+notification_status)
  let resultApi;
   
  var formdata = new FormData();
  formdata.append("user_number", '8136992795');
  formdata.append("status", notification_status);

  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
  };

    await fetch("https://jrmovil.pythonanywhere.com/jr_api/cm/1.0/set_notification_status/", requestOptions)
    .then(response => response.text())
    .then(
      (result) =>
      {
        console.log(LOG_INFO('get_services', 'set_notification_status.result')+result)
        resultApi = result
      }
      )
    .catch(error => console.error('[Error] get_services - set_notification_status : '+error.message))
    .finally(() => console.log('[Info] getServices - set_notification_status Final'))

  return resultApi;
};