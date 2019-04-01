import React, { Component } from 'react';
import Panel from '../Panel/panel'
import './css/Upload.css'



class Mapping extends Component {
  constructor(props){
    super(props);

    this.handleOnUpload = this.handleOnUpload.bind(this)
    this.onChangeSourceFiles = this.onChangeSourceFiles.bind(this)
    this.onChangeSourceMap = this.onChangeSourceMap.bind(this)
    this.handleProceed = this.handleProceed.bind(this)
  }

  handleOnUpload(e){
    e.preventDefault()
    this.props.onUpload(this.props.mapFile, this.props.uploadSamples, this.props.user)
  }

  onChangeSourceMap(e){
    this.props.onChangeMapFileAction(e.target.files[0])
  }



  onChangeSourceFiles(e){
    let fileList = e.target.files
    let sourceFiles = []
    for (var i = 0; i < fileList.length; i++){
      sourceFiles[i] = fileList[i]
    }
    this.props.onChangeSourceFileAction(sourceFiles)

  }

  handleProceed(e){
    e.preventDefault()
    this.props.history.push("upload")
    this.props.onProceed(this.props.mapFile, this.props.sourceFiles)
  }
 
  render(){
    const displayProceed = () =>{
      if (this.props.mapFile && this.props.sourceFiles){
        return(
          <div>
            <button onClick={this.handleProceed}>Proceed to Upload</button>
            <button onClick={this.handleOnUpload}>Upload</button>
          </div>

        )
      }
    }

    return (
      <div className='upload'>
        <Panel name='Mapping Setup'>
          <div className='text'>Select your Mapping File</div>
          <input type='file' name='file' accept='.js' onChange={(e)=>this.onChangeSourceMap(e)}/>
          <div className='text'>Select your Sample Files</div>
          <input type='file' name='file' accept='.csv' multiple onChange={(e)=>this.onChangeSourceFiles(e)}/>
          {displayProceed()}
        </Panel>
      </div>
    )
  }
}

export default Mapping

//File chooser -> can upload multiple same csv
//Upload mapping file
//Upload Button --> onClick we upload

//for scripps, combine samples csvs into one object or file or something
//map the user's samples to SESAR's specs according to the uploaded mapping file
//convert the mapped samples to XML in SESAR's specs
//POST request using SESAR's API
//Redirect to a Success Page if successful

//FACILITY_CODE, SHIP_CODE, PLATFORM, CRUISE, SAMPLE, DEVICE --> SCRIPPS DUPLICATES