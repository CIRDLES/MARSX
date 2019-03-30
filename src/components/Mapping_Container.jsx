import { connect } from 'react-redux'
import Worker from './helpers/sandbox.worker'
import * as actions from '../actions/index'
import Mapping from './Mapping'
 const sourceFormat = '.csv'
function mapStateToProps(state) {
    return { 
        mapFile: state.upload.mapFile, 
        sourceFiles: state.upload.sourceFiles, 
        user: state.auth, 
        uploadSamples: state.mapping.samples
    };
}
function mapDistatchToProps(dispatch){
   

    return {
        onProceed: (sourceMap, sourceFiles) => {
            let worker = Worker();
            worker.postMessage({type: 'map', sourceMap, sourceFormat, sourceFiles});
            worker.onmessage = function(e) {
                console.log("aaaaaaaaaaaaaaaaaaaaa")
                dispatch(actions.initializeSamples(e.data))
            }
        },
        onChangeMapFileAction: (file) => {dispatch(actions.onChangeMapFileAction(file))},
        onChangeSourceFileAction: (files) => {dispatch(actions.onChangeSourceFileAction(files))},

        onUpload: (sourceMap, uploadSamples, user) => {
            let worker = Worker()
            //console.log("Source Map - OnUpload " + sourceMap)
            worker.postMessage({type:'combine', sourceMap, uploadSamples})
            worker.onmessage = (e) => {
                dispatch(actions.upload(user.username, user.password, user.usercode, e.data))
        }
      }
    }
}

const MappingContainer = connect(mapStateToProps, mapDistatchToProps)(Mapping)
export default(MappingContainer)
