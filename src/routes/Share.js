import React, { Component } from 'react';
import Style from '../templates/routes/Share.css';
import Fbpost from '../components/Fbpost';
import jquery from 'jquery'

class Share extends Component{

    constructor(){
        super();
    }

    render(){
        return(
            <div className="row">
                <div className="col-xs-12">
                    <video className="videoResult" src={ `https://kfc.data-m8agency.com/videos_results/${ this.props.match.params.video }.mp4` } width="320" height="240" controls></video>
                    <Fbpost type="videos" url={ `https://kfc.data-m8agency.com/videos_results/${ this.props.match.params.video }.mp4` } title="KFC Chizza" description="Video desde chizza" />
                </div>
            </div>
        )
    }

}

export default Share;