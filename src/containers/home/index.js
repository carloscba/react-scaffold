import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component{

    render(){
        return(
            <div className='row'>
                <div className='col-md-12'>
                    <h2>Home</h2>
                    <Link to={'/step1'}>Iniciar</Link>
                </div>
            </div>
        )
    }

}

export default Home;