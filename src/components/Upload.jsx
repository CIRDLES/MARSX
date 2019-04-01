import React, { Component } from 'react';

class Upload extends Component{
    constructor(props){
        super(props);
    
        this.handleOnUpload = this.handleOnUpload.bind(this)
      }

    handleOnUpload(e){
        e.preventDefault()
        this.props.onUpload(this.props.mapFile, this.props.uploadSamples, this.props.user)
    }

    render(){
        return(
            <div>
                 <button onClick={this.handleOnUpload}>Upload</button>
            </div>
        )
    }
}
export default Upload