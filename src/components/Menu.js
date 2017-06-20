import React, { Component } from 'react';
import m8logo from '../themes/default/logo.png';
import style from '../themes/default/Menu.css'

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
                        <a className="navbar-brand" href="./">
                            <img alt="Brand" src = { m8logo } width="60" />
                        </a>
                    </div>
                </div>
                </nav>
            </div>
        )
    }

}

export default Menu;