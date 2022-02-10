import axios from "axios";
import { SECRET_AUTH, AUTHORIZATION, GET, POST,
  URL_OUTH, BASIC, CONTENT_TYPE, TYPE_URLENCODED, BEARER,
    } from '../../../types'
import * as data from '../../utils/services/perfil_uf.json'
import * as paquetes from '../../utils/services/paquetes.json'
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
  return getTokenAndUF(idSubscriber)
}

export const getPerfilUfAPI = async (idSubscriber, secret) => {
  const object = {};


  const result = { statusResponse: true, error: null, userData: [] };
  let axios = require('axios');

  
  if ( idSubscriber == 5688888888 || idSubscriber == 8888888888)
    idSubscriber = 1000223908;

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
        result.userData = response.data.responseSubscriber.information;
        console.log("Services response.data : " + result.userData.idSubscriber)
        //console.log("Services response.data : " + response.data[responseSubscriber])
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

export const getTokenAndUF = async (idSubscriber) => {
  const axios = require('axios');
  const qs = require('qs');
  
  let result;
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
        resolve(getPerfilUfAPI(idSubscriber, secret))
      })
      .catch((error) => {
        console.log(error);
      }).finally(() => console.log("Perfil UF Listo"));
  });

  result = await myPromise
  return result;
};
