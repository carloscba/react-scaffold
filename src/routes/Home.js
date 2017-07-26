import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LoginGoogle from '../components/LoginGoogle';
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
        
        this.handleOnAuthenticate = this.handleOnAuthenticate.bind();
        this.handleOnError = this.handleOnError.bind();
    }
    
    handleOnAuthenticate(result){
        console.log(result);
    }

    handleOnerror(error){
        console.log(error);
    }    

    render(){
        return(
            <div className='row home'>
                <div className='col-xs-12 col-md-12 col-lg-12 col-xl-12'>
                    <h2 className='home__h2'>{ this.copy.HELLO_WORLD }</h2>
                    <LoginGoogle onAuthenticate={ this.handleOnAuthenticate } onError={ this.handleOnerror } />
                </div>
            </div>
        )
    }

}

export default Home;