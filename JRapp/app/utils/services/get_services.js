import axios from "axios";
import {
    API_LOCAL_ENPOINT_BASE,
  } from "../constants/Constants";

  export const getPerfilUf = async () => {
    const result = { statusResponse: true, error: null, dataPerfilUf: null };
    try {
      await axios
        .get("../../components/Details/perfil_uf.json")
        .then(function (response) {
          // handle success
          console.info("getPerfilUf > response >> "+JSON.stringify(response))
          //console.info("getPerfilUf > response >> data >>> "+JSON.stringify(response.data))
          result.dataPerfilUf = response.data;
        })
        .catch(function (error) {
          // handle error
          console.error(error.message);
          result.statusResponse = false;
          result.error = error.message;
        })
        .finally(function () {
          // always executed
          console.info('Finally called')
        });
    } catch (error) {
      console.error("getPerfilUf > error >> " + error);
      result.statusResponse = false;
      result.error = error;
    }
    return result;
  };
  