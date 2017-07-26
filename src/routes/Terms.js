import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Locale from '../class/Locale';
import Authentication from '../class/Authentication';

class Terms extends Component{

    constructor(){

        super();
        const copy = new Locale(this);
        this.copy = copy.get();

        this.state = {
            isAuthenticated : false
        }

        this.auth = new Authentication();
        this.auth.check().then(
            function(response){
                this.setState({
                    isAuthenticated : this.auth.isAuthenticated(response.data) 
                })
            }.bind(this)
        ).catch(
            function(e){
                console.log(e);
            }.bind(this)
        );
    }

    render(){
        if(this.state.isAuthenticated){
            return(
                <div className='row'>
                    <div className='col-xs-12 col-md-12 col-lg-12 col-xl-12'>
                        <h2>{ this.copy.title }</h2>
                        <p>Hola Mundo</p>
                    </div>
                </div>
            )
        }else{
            return(
                <div></div>
            )
        }
    }

}

export default Terms;