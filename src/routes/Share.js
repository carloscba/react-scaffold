import React, { Component } from 'react';
import { BrowserRouter as Redirect } from 'react-router-dom'
import Style from '../templates/routes/Share.css';
import Locale from '../scaffold/Locale'

class Share extends Component{

    constructor(){
        super();
    }

    render(){
        const copy = new Locale().get('Home', this.props.locale);

        if(!this.props.isAuthenticated){
            return(<Redirect from="/terms" to="/" />)
        } 

        return(
            <div className="row">
                <div className="col-xs-12">
                    Share
                </div>
            </div>
        )
    }

}

export default Share;