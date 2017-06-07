import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Fb from '../../components/fb'

class Home extends Component{

    render(){
        return(
            <div className='row'>
                <div className='col-md-12'>
                    <h2>Home</h2>
                    <Link to={'/step1'}>Iniciar</Link>
                    <Fb />
                </div>
            </div>
        )
    }

}

export default Home;