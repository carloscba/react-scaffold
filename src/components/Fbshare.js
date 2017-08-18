import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from '../templates/components/Fbshare.css'

class Fbshare extends Component{
    
    constructor(){
        super();
        this.share = this.share.bind(this);
    }

    share(){

        //https://www.facebook.com/v2.10/dialog/share?channel=https%3A%2F%2Fstaticxx.facebook.com%2Fconnect%2Fxd_arbiter%2Fr%2FXBwzv5Yrm_1.js%3Fversion%3D42%23cb%3Df3b5c58d344cd9c%26domain%3D31a41ce7.ngrok.io%26origin%3Dhttps%253A%252F%252F31a41ce7.ngrok.io%252Ff319cbfcfad8f9%26relation%3Dopener&redirect_uri=https%3A%2F%2Fstaticxx.facebook.com%2Fconnect%2Fxd_arbiter%2Fr%2FXBwzv5Yrm_1.js%3Fversion%3D42%23cb%3Df217dab065206e8%26domain%3D31a41ce7.ngrok.io%26origin%3Dhttps%253A%252F%252F31a41ce7.ngrok.io%252Ff319cbfcfad8f9%26relation%3Dopener%26frame%3Df3f23ca7b27a434%26result%3D%2522xxRESULTTOKENxx%2522&href=https%3A%2F%2F31a41ce7.ngrok.io%2Freferer%2Fs10155604010138436&client_id=333445087109934&sdk=joey&_rdr&display=page&redirect_uri=https://31a41ce7.ngrok.io/share
        
        const appId = (window.env === 'dev') ?  '333445087109934' : '328974744217171';
        const url = `https://www.facebook.com/dialog/share?app_id=${appId}&href=${this.props.url}&redirect_uri=${this.props.redirect_uri}&display=page`;

        window.location = url;

    }

    render(){
        return(<button className='share__btnshare' onClick={ this.share } >{ this.props.locale.BTN_LABEL }</button>)
    }

}

Fbshare.propTypes = {
    url : PropTypes.string,
    redirect_uri : PropTypes.string,
    onShare : PropTypes.func,
    onError : PropTypes.func,
    locale : PropTypes.object
};

Fbshare.defaultProps = {
    url : 'http://www.google.com',
    redirect_uri : PropTypes.string,
    onShare : null,
    onerror : null,
    locale : {
        'BTN_LABEL' : 'Share on Facebook'
    }
};

export default Fbshare;