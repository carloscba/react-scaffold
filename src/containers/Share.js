import React, { Component } from 'react';
import Style from './Share.css';

class Share extends Component{

    getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    render(){
        return(
            <div className="row">
                <div className="col-xs-12">
                    <video className="videoResult" src={ this.getParameterByName('v') } width="320" height="240" controls></video>
                </div>
            </div>
        )
    }

}

export default Share;