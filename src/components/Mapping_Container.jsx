import { connect } from 'react-redux'
import Worker from './helpers/sandbox.worker'
import * as actions from '../actions/index'
import Mapping from './Mapping'

const sourceFormat = '.csv'

//Properties from application state will be set as props in Mapping.jsx
function mapStateToProps(state) {
    return { 
        mapFile: state.mapping.mapFile, 
        sourceFiles: state.mapping.sourceFiles, 
        user: state.auth
    };
}

//Actions from actions/index.js will be set as props in Mapping.jsx
function mapDistatchToProps(dispatch){
    return {
        onProceed: (sourceMap, sourceFiles) => {
            let worker = Worker();
            worker.postMessage({type: 'map', sourceMap, sourceFormat, sourceFiles});
            worker.onmessage = function(e) {
                dispatch(actions.initializeSamples(e.data))
            }
        },

        onChangeMapFileAction: (file) => {dispatch(actions.onChangeMapFileAction(file))},

        onChangeSourceFileAction: (files) => {dispatch(actions.onChangeSourceFileAction(files))}
    }
}

const MappingContainer = connect(mapStateToProps, mapDistatchToProps)(Mapping)
export default(MappingContainer)
