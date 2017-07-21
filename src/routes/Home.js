import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Fblogin from '../components/Fblogin';
import Locale from '../class/Locale';

class Home extends Component{

    constructor(){
        super();
        
        const copy = new Locale(this);
        this.copy = copy.get();

        this.state = {
            accessToken : '',
            providerData : ''
        }
    }

    render(){
        return(
            <div className='row'>
                <div className='col-xs-12 col-md-12 col-lg-12 col-xl-12'>
                    <h2>{ this.copy.HELLO_WORLD }</h2>
                    <Fblogin postLogin='/step1' locale={ this.copy.Fblogin } />
                </div>
            </div>
        )
    }

}

export default Home;