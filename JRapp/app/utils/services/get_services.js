import axios from "axios";
import { SECRET_AUTH, AUTHORIZATION, GET, POST } from '../../../types'
import * as data from '../../utils/services/perfil_uf.json'
import * as paquetes from '../../utils/services/paquetes.json'
import {
  API_LOCAL_ENPOINT_BASE,
} from "../constants/Constants";

export const getPaquetes = () => {
  return paquetes
}
export const getDataJson = () => {
  return data
}

export const getPerfilUf = async (idSubscriber) => {
  const object = {};


  const result = { statusResponse: true, error: null, userData: [] };
  let axios = require('axios');

  let config = {
    method: GET,
    url: `https://altanredes-prod.apigee.net/cm-sandbox/v1/subscribers/${idSubscriber}/profile`,
    headers: {
      AUTHORIZATION: SECRET_AUTH
    }
  };
  try {
    await axios(config)
      .then(function (response) {
        //console.log(JSON.stringify(response.data));
        result.userData = '[' + JSON.stringify(response.data) + ']';
        //console.log("Services response.data : " + JSON.parse(result.userData))
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
