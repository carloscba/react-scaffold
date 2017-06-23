import React, { Component } from 'react';
import Style from './Share.css';
import Fbshare from '../components/Fbshare';
import jquery from 'jquery'

class Share extends Component{

    constructor(){
        super();
    }

    render(){
        return(
            <div className="row">
                <div className="col-xs-12">
                    <video className="videoResult" src={ `http://35.185.121.141/videos_results/${ this.props.match.params.video }.mp4` } width="320" height="240" controls></video>
                    <Fbshare />
                </div>
            </div>
        )
    }

}

export default Share;