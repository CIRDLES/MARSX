import { connect } from 'react-redux'
import Worker from './helpers/sandbox.worker'
import * as actions from '../actions/index'
import Upload from './Upload'
 const sourceFormat = '.csv'
function mapStateToProps(state) {
    return { mapFile: state.upload.mapFile, sourceFiles: state.upload.sourceFiles };
}
function mapDistatchToProps(dispatch){
   

    return {
        onProceed: (mapFile, sourceFiles) => {
            let worker = Worker()
            worker.postMessage({type: 'map', mapFile, sourceFormat, sourceFiles})
            worker.onMessage = (e) => {
                dispatch(actions.initializeSamples(e.data))
            }
        },
        onChangeMapFileAction: (file) => {dispatch(actions.onChangeMapFileAction(file))},
        onChangeSourceFileAction: (files) => {dispatch(actions.onChangeSourceFileAction(files))}
    }
}

const UploadContainer = connect(mapStateToProps, mapDistatchToProps)(Upload)
export default(UploadContainer)
