import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Fblogin from '../components/Fblogin';

class Home extends Component{

    constructor(){
        super();
        this.state = {
            accessToken : '',
            providerData : ''
        }
    }

    render(){
        return(
            <div className='row'>
                <div className='col-xs-12 col-md-12 col-lg-12 col-xl-12'>
                    <Fblogin postLogin='step1' />
                </div>
            </div>
        )
    }

}

export default Home;