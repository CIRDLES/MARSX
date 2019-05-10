import React, { Component } from 'react';
import {AgGridColumn, AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import './Upload.css'

class Upload extends Component{
    constructor(props){
        super(props);
        this.state={
            samples: this.props.uploadSamples,
            rowData: {}
        }
     
        this.handleOnUpload = this.handleOnUpload.bind(this)
        this.getSamples = this.getSamples.bind(this)
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.uploadSamples !== this.props.uploadSamples){
            this.setState({samples: nextProps.uploadSamples});
        }
    }
    getSamples(){
        this.setState({samples: this.props.uploadSamples})
    }


    handleOnUpload(e){
        e.preventDefault()
        this.props.onUpload(this.props.mapFile, this.props.uploadSamples, this.props.user)
    }


   render(){

    if (this.props.loading === false){
        console.log(this.props)
        //this.getSamples()
        console.log(this.state)
        return(
            <div className="ag-theme-balham"
            style={{
              height: '600px',
              width: '90%' ,
              margin: 'auto'
            }}>
                <AgGridReact>
                    <AgGridColumn headerName="Sample"></AgGridColumn>

                </AgGridReact>
            
                <button onClick={this.handleOnUpload}>Upload</button>

            </div>
        )
    }else{
        console.log(this.props)
        return(
            <div className="outerDiv">
                <div className="d-flex justify-content-center">
                     <div className="spinner-grow text-primary" style={{width: '6rem', height: '6rem'}} role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            </div>
        )
    }
        
    }
}

export default Upload

/*
   <div>
                
                 <button onClick={this.handleOnUpload}>Upload</button>
            </div>
*/