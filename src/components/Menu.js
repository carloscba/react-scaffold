import React, { Component } from 'react';
import { BrowserRouter as Link } from 'react-router-dom';
import logo from '../images/m8.jpg';
import style from '../templates/components/Menu.css'

class Menu extends Component{

    state = {
        open: false
    }
    
    toggle = () => {
        this.setState((prevState, props)=>{
            return {
                open : !prevState.open
            }
        })
    }

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
                        <li><a href="/terms">Terms</a></li>
                        <li><a href="/test">Test</a></li>
                    </ul>  
                </div>
                </nav>
            </div>
        )
    }

}

export default Menu;