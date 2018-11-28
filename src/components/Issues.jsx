import React, { Component } from 'react';
import './css/Upload.css'
import {connect} from "react-redux";
import token from "./token.jsx";
import "./css/Issues.css"



class Issues extends Component {
    constructor(props) {
        super(props);
        this.state = {

            title:"",
            body:"",

        }
        this.openIssuePage = this.openIssuePage.bind(this)
    }

    openIssuePage(event){
        window.open( `https://github.com/cirdles/marsx/issues/new?title=${this.state.title}&body=${this.state.body}`)
    }


    render(){
        console.log("props",this.props)
        console.log("token",{token})
        return(
            <div className="upload">
                <div>
                    <div className="upload-form">
                        <div  >
                 <span>
                     <h1 style={{color:"white"}} >Is there an issue you've found with MARSx? Tell us about it!</h1>
              <input className="form-group title"
                     className="form-group title "
                     placeholder="Enter a title for your issue"
                     value={this.state.title}
                     onChange={event => this.setState({title:event.target.value})}>
              </input>
                 </span>
                        </div>
                        <div className="form-group ">
              <textarea className="body"
                        placeholder="Enter a description of your issue"
                        value={this.state.body}
                        onChange={event => this.setState({body:event.target.value})}>
              </textarea>
                        </div>
                        <span >
                    <button onClick={this.openIssuePage} className="btn" >Add</button>
                </span>


                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated,
    };
}
export default connect(mapStateToProps)(Issues);
