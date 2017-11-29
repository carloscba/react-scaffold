import React, { Component } from 'react';
import { Link, BrowserRouter as Redirect } from 'react-router-dom'
//Redux
import { connect } from 'react-redux'
import getDispatchs from '../store/dispatchs'
//Scaffold
import Locale from '../scaffold/Locale';
//Components
import Working from '../components/Working'
import ReactScaffoldUpload from '../components/ReactScaffoldUpload'

class Upload extends Component{

    constructor(){
        super();
        this.state = {
            working : false
        }
    }
    
    handlerOnUpload = (imageData) => {
        console.log('handlerOnUpload');
    }
    handlerOnCrop = (imageData) => {
        console.log('handlerOnCrop');
    }
    handlerOnConfirm = (imageData) => {
        console.log('handlerOnConfirm');
    }
    handlerWorking = (status) => {
        console.log('working', status);
        this.setState({
            working : status
        })
    }    

    render(){
        const copy = new Locale().get('Home', this.props.store.locale);        

        return(
            <div className='row'>
                <h3>->{this.state.working}</h3>
                <Working isWorking = { this.state.working } />
                <div className='col-xs-12 col-md-12 col-lg-12 col-xl-12'>
                    <ReactScaffoldUpload 
                        crop = {true}
                        onUpload = {this.handlerOnUpload}
                        onCrop = {this.handlerOnCrop}
                        onConfirm = {this.handlerOnConfirm}
                        working = {this.handlerWorking}
                    />
                </div>
            </div>
        )
        
    }
}

const mapStateToProps = state => {
    return {
        store : state
    }
}

const mapDispatchToProps = dispatch => {
    return getDispatchs(dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Upload);