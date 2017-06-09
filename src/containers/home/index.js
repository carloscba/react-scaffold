import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Fb from '../../components/fb'
import Fbfriends from '../../components/fbfriends'

class Home extends Component{

    constructor(){
        super();
        this.state = {
            accessToken : '',
            providerData : ''
        }
    }

    setToken(newAccessToken, newProviderData){
        this.setState({
            accessToken : newAccessToken,
            providerData : newProviderData
        });
    }

    render(){
        return(
            <div className='row'>
                <div className='col-md-12'>
                    <h2>Home</h2>
                    <Link to={'/step1'}>Iniciar</Link>
                    <Fb setToken = { this.setToken.bind(this) } />
                    <Fbfriends accessToken={ this.state.accessToken } providerData={ this.state.providerData }  />
                </div>
            </div>
        )
    }

}

export default Home;