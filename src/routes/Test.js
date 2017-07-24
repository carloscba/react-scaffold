import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Locale from '../class/Locale';
import style from '../templates/routes/Test.css'

class Test extends Component{

    constructor(){
        super();
        const copy = new Locale(this);
        this.copy = copy.get();
    }

    render(){
        return(
            <div className='row'>
                <div className='col-xs-12 col-md-12 col-lg-12 col-xl-12'>
                    <h2>{ this.copy.title }</h2>
                    <p>Hola Mundo</p>
                </div>
            </div>
        )
    }

}

export default Test;