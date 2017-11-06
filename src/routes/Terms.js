import React, { Component } from 'react';
import { Link, BrowserRouter as Redirect } from 'react-router-dom'
//Redux
import { connect } from 'react-redux'
import getDispatchs from '../store/dispatchs'
//Scaffold
import Locale from '../scaffold/Locale';

class Terms extends Component{

    constructor(){
        super();
        const copy = new Locale(this);
        this.copy = copy.get();
    }

    render(){
        
        if(!this.props.store.isAuthenticated){
            return(<Redirect from="/terms" to="/" />)
        } 

        return(
            <div className='row'>
                <div className='col-xs-12 col-md-12 col-lg-12 col-xl-12'>
                    { this.props.state }
                    <h2>{ this.copy.title }</h2>
                    <p>Hola Mundo</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(Terms);