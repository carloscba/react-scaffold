import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
    
    handleOnAuthenticate(result){
        console.log(result);
    }

    handleOnError(error){
        console.log(error);
    }    

    render(){
        return(
            <div className='row home'>
                <div className='col-xs-12 col-md-12 col-lg-12 col-xl-12'>
                    <h2 className='home__h2'>{ this.copy.HELLO_WORLD }</h2>
                </div>
            </div>
        )
    }

}

export default Home;