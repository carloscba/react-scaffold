import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Fb from '../../components/fb'
import Fbfriends from '../../components/fbfriends'

class Home extends Component{

    constructor(){
        super();
        this.state = {
            accessToken : '456678'
        }
    }

    setToken(newAccessToken){
        this.setState({
            accessToken : newAccessToken
        });
    }

    render(){
        return(
            <div className='row'>
                <div className='col-md-12'>
                    <h2>Home</h2>
                    <Link to={'/step1'}>Iniciar</Link>
                    <Fb setToken = { this.setToken.bind(this) } />
                    <Fbfriends accessToken={ this.state.accessToken } />
                </div>
            </div>
        )
    }

}

export default Home;