import axios from 'axios';
import * as jsCON from 'xml-js'
import toXML from './toXML'
import FormData from 'form-data'
import convert from 'xml-to-json-promise'

//Constants
export const AUTHENTICATED = 'authenticated_user';
export const UNAUTHENTICATED = 'unauthenticated_user';
export const AUTHENTICATION_ERROR = 'authentication_error';
export const CHANGE_SOURCE_FILE = 'change_source_file';
export const CHANGE_MAP_FILE = 'change_map_file';
export const INITIALIZE_SAMPLES = 'initialize_samples';
export const UPLOAD_REQUEST = 'upload_request';
export const UPLOAD_SUCCESS = 'upload_success';
export const UPLOAD_FAILURE = 'upload_failure';

const URL = 'https://sesardev.geosamples.org/webservices/credentials_service_v2.php';

export function signInAction({ username, password }, history) {
  return async (dispatch) => {
    try {
      const formData = new FormData()
      formData.append('username', username)
      formData.append('password', password)
      const res = await axios.post(`${URL}`, formData);

      //Formating api response in order to get usercode
      let options = {ignoreComment: true, alwaysChildren: true};
      let resJSON = await jsCON.xml2js(res.data, options )
      let usercode = resJSON.elements[0].elements[1].elements[0].elements[0].text

      dispatch({ 
        type: AUTHENTICATED,
        username: username,
        usercode: usercode,
        password: password
      });

      history.push('/mapping');
    } catch(error) {
      console.log(error)
      dispatch({
        type: AUTHENTICATION_ERROR,
        payload: 'Invalid email or password'
      });
    }
  };
};

export function signOutAction(){
  localStorage.clear();
  return {
    type: UNAUTHENTICATED
  }
}

export function onChangeSourceFileAction(sourceFiles){
  return {
    type: CHANGE_SOURCE_FILE,
    sourceFiles: sourceFiles
  }
}

export function onChangeMapFileAction(mapFile){
  return {
    type: CHANGE_MAP_FILE,
    mapFile: mapFile
  }
}

export function initializeSamples(sampleArray){
  return {
    type: INITIALIZE_SAMPLES,
    sampleArray: sampleArray
  }
}

export function uploadRequest() {
  return {
    type: UPLOAD_REQUEST
  }
}

// All samples uploaded correctly
export function uploadSuccess(results) {
  return {
    type: UPLOAD_SUCCESS,
    results
  }
}

// Not all samples uploaded correctly
export function uploadFailure(error) {
  return {
    type: UPLOAD_FAILURE,
    error
  }
}

export function upload(username, password, usercode, samples) {
  return async dispatch => {
    try {

      //Start upload request
      dispatch(uploadRequest())

      //convert samples to xml scheme
      let xmlSample = toXML(samples, usercode)

      //TODO: Validate each sample
      //create form data to use in the POST request
      let formData = new FormData()
      formData.append('username', username)
      formData.append('password', password)
      formData.append('content', new XMLSerializer().serializeToString(xmlSample))

      //POST request
      const res = await axios.post('https://sesardev.geosamples.org/webservices/upload.php', formData)

      //convert the response data from xml to JSON
      convert.xmlDataToJSON(res.data, {explicitArray: false}).then(json => {
        dispatch(uploadSuccess(json.results.sample))
      });
  } catch(error){
    console.log(error)
    dispatch({type: UPLOAD_FAILURE,error});
    }
  }
}
