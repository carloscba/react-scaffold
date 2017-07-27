import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Locale from '../class/Locale';

class Terms extends Component{

    constructor(){

        super();
        const copy = new Locale(this);
        this.copy = copy.get();

    }

    render(){
        console.log(this)
        
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


export default Terms;