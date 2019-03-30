
import {Map, List, fromJS} from 'immutable'
import {UPLOAD_REQUEST, UPLOAD_SUCCESS, UPLOAD_FAILURE, INITIALIZE_SAMPLES} from '../actions'
const INITIAL_STATE = Map({'samples': List([]), 'loading': false})


export default function reducer(state = {}, action) {
  switch(action.type) {
    case INITIALIZE_SAMPLES:
        console.log(action.sampleArray)
        return {...state, samples: action.sampleArray}
    case UPLOAD_REQUEST:
      return {...state, loading: true}
    case UPLOAD_SUCCESS:
      console.log("Action: ", action)
      let results = action.results
      let samples = state.samples
      console.log(samples)
      for(let i=0; i<results.length; i++) {
        let igsn = {originalKey: '', originalValue: '', key:'igsn', value:results[i].igsn}
        samples[i] = [...samples[i], igsn]
      }
      //enable exporting to CSV after successful upload
      //document.getElementById("toCSV").disabled = false;
      return {...state, samples: samples, loading: false}
    case UPLOAD_FAILURE:
      return {...state, loading: false}
    default:
      return state
  }
}