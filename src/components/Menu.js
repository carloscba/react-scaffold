import React, { Component } from 'react'
import { BrowserRouter as Link } from 'react-router-dom'
import logo from '../images/m8.jpg'
import style from '../templates/components/Menu.css'
import PropTypes from 'prop-types';

class Menu extends Component{

    render(){
        return(
            <div>
                <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a href="./" className="navbar-brand">
                            <img alt="Brand" src = { logo } width="60" />
                        </a>
                    </div>
                    <ul className="nav navbar-nav navbar-right">
                        <li><button onClick={ 
                            function(){
                                let newLocale = (this.props.state.store.locale === 'es') ? 'en' : 'es';
                                this.props.state.handlerLocale(newLocale);
                            }.bind(this)
                        }>Change locale</button></li>
                        <li><a href="/upload">Upload</a></li>
                        <li><a href="/terms">Terms</a></li>
                        <li><a href="/test">Test</a></li>
                        { (this.props.isAuthenticated) ?  <li><a href="/terms">Url Proteted</a></li> : null }
                    </ul>  
                </div>
                </nav>
                
            </div>
        )
    }

}

Menu.propTypes = {
    state : PropTypes.object
};
Menu.defaultProps = {
    state : {}
};
export default Menu;