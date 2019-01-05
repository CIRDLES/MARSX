import React, { Component } from 'react';
import * as Papa from 'papaparse';
import _ from 'lodash';

class Upload extends Component {
  constructor(props){
    super(props);
    this.state = {
      jsonList: [],
      mergedCSV: []
    }

    this.updateJsonList=this.updateJsonList.bind(this)
    this.handleFile=this.handleFile.bind(this)
    this.handleUpload=this.handleUpload.bind(this)
    this.updateMergedCSV = this.updateMergedCSV.bind(this)
  }

  updateJsonList(results){
    this.setState({jsonList: [...this.state.jsonList, results.data]})
  }

  updateMergedCSV(){
    console.log(this.state)
  }

  handleFile(e){
    let fileList = e.target.files
    console.log('filelist: ', fileList)
    for( var i = 0; i < fileList.length; i++){
      Papa.parse(fileList[i], {
        header: true,
        complete: this.updateJsonList
        
      })
    }
  }

  handleUpload(e){
    console.log('state: ',this.state.jsonList)
    console.log('file 1: ', this.state.jsonList[0][0])
    console.log('file 2: ', this.state.jsonList[1][0])
    console.log('lodash merge: ', _.merge(this.state.jsonList[0][0],this.state.jsonList[1][0]))
    let minLengthIndex = this.state.jsonList[0].length
    let merge = []
    for (var i = 0; i < this.state.jsonList.length; i++){
      if (this.state.jsonList[i].length < minLengthIndex){
        minLengthIndex = this.state.jsonList[i].length
      }
    }
    console.log(minLengthIndex)
    for (var i = 0; i < minLengthIndex; i++){
      merge[i] = _.merge(this.state.jsonList[0][i],this.state.jsonList[1][i])
    }
    console.log('merge', merge)

  }


  render(){
    return(
      <div>
        <h1>Upload</h1>

        <form>
          <div>
            <label>Select File</label>
            <input type="file" name="file" multiple onChange={(e)=>this.handleFile(e)}/>
          </div>
          <button type="button" onClick={(e)=>this.handleUpload(e)}>Upload</button>

        </form>
      </div>
    )
    
  }

}
export default Upload

//File chooser -> can upload multiple same csv
//Upload mapping file
//Upload Button --> onClick we upload

//for scripps, combine samples csvs into one object or file or something
//map the user's samples to SESAR's specs according to the uploaded mapping file
//convert the mapped samples to XML in SESAR's specs
//POST request using SESAR's API
//Redirect to a Success Page if successful

//FACILITY_CODE, SHIP_CODE, PLATFORM, CRUISE, SAMPLE, DEVICE --> SCRIPPS DUPLICATES