import axios from "axios";
import { SECRET_AUTH, AUTHORIZATION, GET, POST } from '../../../types'
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

export const getPerfilUf = async (idSubscriber) => {
  const object = {};
  const secret = getToken()

  print(" pachihihihi : "+ secret.accessToken)


  const result = { statusResponse: true, error: null, userData: [] };
  let axios = require('axios');

  let config = {
    method: GET,
    url: `https://altanredes-prod.apigee.net/cm-sandbox/v1/subscribers/${idSubscriber}/profile`,
    headers: {
      AUTHORIZATION: getToken().accessToken
    }
  };
  try {
    await axios(config)
      .then(function (response) {
        //console.log(JSON.stringify(response.data));
        result.userData = '[' + JSON.stringify(response.data) + ']';
        console.log("Services response.data : " + result.userData)
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

export const getToken = async (idSubscriber) => {
  const axios = require('axios');
  const qs = require('qs');
  let result;
  let data = qs.stringify({

  });
  let config = {
    method: 'post',
    url: 'https://altanredes-prod.apigee.net/v1/oauth/accesstoken?grant-type=client_credentials',
    headers: {
      'Authorization': 'Basic MVVlYWRvVmFMWm9Fb2dORzZBMHVmN1lkeXpwemM2R0g6Nm9GMUMxd0sxMEdXS3dJUw==',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: data
  };

  axios(config)
    .then((response) => {
      result = response
    })
    .catch((error) => {
      console.log(error);
    });

  return result;
};
