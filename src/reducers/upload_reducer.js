import {CHANGE_SOURCE_FILE, CHANGE_MAP_FILE, INITIALIZE_SAMPLES} from '../actions'
import { fromJS } from 'immutable';

export default function(state={}, action){
    switch (action.type){
        case CHANGE_SOURCE_FILE:
            return {...state, sourceFiles: action.sourceFiles}
        case CHANGE_MAP_FILE:
            return {...state, mapFile: action.mapFile}
        case INITIALIZE_SAMPLES:
            return {...state, samples: fromJS(action.sampleArray)}
        default:
            return state;   
    }
}