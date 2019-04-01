import { connect } from 'react-redux'
import Worker from './helpers/sandbox.worker'
import * as actions from '../actions/index'
import MappingTable from './MappingTable'

function mapStateToProps(state) {
    return { 
        mapFile: state.mapping.mapFile, 
        sourceFiles: state.mapping.sourceFiles, 
        user: state.auth, 
        uploadSamples: state.upload.samples
    };
}

function mapDistatchToProps(dispatch){
    return {
        onUpload: (sourceMap, uploadSamples, user) => {
            let worker = Worker()
            worker.postMessage({type:'combine', sourceMap, uploadSamples})
            worker.onmessage = (e) => {
                dispatch(actions.upload(user.username, user.password, user.usercode, e.data))
        }
      }
    }
}

const MappingTableContainer = connect(mapStateToProps, mapDistatchToProps)(MappingTable)
export default(MappingTableContainer)