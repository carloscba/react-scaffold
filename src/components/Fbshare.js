import React, { Component } from 'react';
import style from './Menu.css'

class Fbshare extends Component{

    share(){
        window.FB.ui({
            method: 'share_open_graph',
            action_type: 'og.likes',
            action_properties: JSON.stringify({
                object:'https://developers.facebook.com/docs/',
            })
        }, function(response){
            // Debug response (optional)
            console.log(response);
        });
    }

    render(){
        return(
            <div>
                <button onClick={ this.share }>Share</button>
            </div>
        )
    }

}

export default Fbshare;