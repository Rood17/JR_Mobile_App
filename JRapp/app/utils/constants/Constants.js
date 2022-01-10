/**
 * Phone Contants - JRMovil
 */

export const MAX_NUMBER_LENGTH = 10;

// Date
export const DATE_NOW = new Date().toJSON().slice(0,10).replace(/-/g,'/');
export const DATE_NOW_CODE = new Date().toJSON().slice(0,10).replace(/-/g,'');

//export const API_LOCAL_ENPOINT_BASE = 'https://localhost:44334/api/v1.0/'
export const API_LOCAL_ENPOINT_BASE = 'https://prod.footballstats.tako.science/api/v1.0/' 