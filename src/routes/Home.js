import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Locale from '../scaffold/Locale'
import style from '../templates/routes/Home.css'
//API
import User from '../api/User'
//Redux
import { connect } from 'react-redux'
import { actionCredential, actionAuthenticate, actionUser, actionCoupons } from '../store/actions'
//Components
import Upload from '../components/Upload'

class Home extends Component{

    constructor(){
        super();
        this.onUploadHandler = this.onUploadHandler.bind(this);
        this.start = this.start.bind(this);
    }

    onUploadHandler(file){
        alert(file);
    }

    start(){
        const user = new User();
        user.post({
            'displayName' : this.props.user.displayName,
            'email' : this.props.user.email,
            'photoURL' : this.props.user.photoURL,
            'uid' : this.props.user.uid
        }).then( (response) => {
            
            console.log(response.data);

        }).catch( (error) => {
            if (error.response) {
                console.log(error.response.data)
            }
        })
        
    }

    render(){
        const copy = new Locale().get('Home', this.props.locale);

        const layoutStart = (
            <div className='user-data'>
                <img src={ this.props.user.photoURL } className='user-data__photo' />
                <span className='user-data__name'>{ this.props.user.displayName }</span>
                <a className='user-data__button' onClick={ this.start } >Continuar</a>
            </div>
        );

        return(
            <div className='row home'>
                <div className='col-xs-12 col-md-12 col-lg-12 col-xl-12'>
                    <h2 className='home__h2'>{ copy.title }</h2>
                    { ( this.props.isAuthenticated ) ? layoutStart : <Link to='authenticate'>Authenticate</Link> }
                    <hr/>
                    <Upload accept='image' onUpload = { this.onUploadHandler } >Subir</Upload>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return state
}

export default connect(mapStateToProps)(Home);