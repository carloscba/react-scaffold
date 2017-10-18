import React, { Component } from 'react';
import { BrowserRouter as Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Locale from '../scaffold/Locale';
import { connect } from 'react-redux'

class Terms extends Component{

    constructor(){
        super();
        const copy = new Locale(this);
        this.copy = copy.get();
    }

    render(){
        
        if(!this.props.isAuthenticated){
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
    return state
}

export default connect(mapStateToProps)(Terms);