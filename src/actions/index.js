import axios from 'axios';
import convert from 'xml-js'
//import Worker from '../components/helpers/sandbox.worker'
//Constants
const sourceFormat = '.csv'
export const AUTHENTICATED = 'authenticated_user';
export const UNAUTHENTICATED = 'unauthenticated_user';
export const AUTHENTICATION_ERROR = 'authentication_error';
export const CHANGE_SOURCE_FILE = 'change_source_file';
export const CHANGE_MAP_FILE = 'change_map_file';
export const INITIALIZE_SAMPLES = 'initialize_samples';

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
      let resJSON = await convert.xml2js(res.data, options )
      console.log(resJSON)
      let usercode = resJSON.elements[0].elements[1].elements[0].elements[0].text

      dispatch({ 
        type: AUTHENTICATED,
        usercode: usercode,
        password: password});
      localStorage.setItem('usercode', usercode);
      history.push('/upload');
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

/*export function onProceed(mapFile, sourceFiles){
  const worker = Worker();
  worker.postMessage({type: 'map', mapFile, sourceFormat , sourceFiles})
  worker.onmessage = e => {

  }
}*/
