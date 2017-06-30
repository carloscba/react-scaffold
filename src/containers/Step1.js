import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';
import Usermedia from '../components/Usermedia';
import Upload from '../components/Upload';
import Carousel from '../components/Carousel';
import Style from './Step1.css';
import axios from 'axios';

class Step1 extends Component{

    constructor(){
        super();
        this.state = {
            overlayVideo : '',
            videoPath : false,
            videoResult : false,
            videoSelected : 0
        }
        
        this.onDragged = this.onDragged.bind(this);
        this.onUpload = this.onUpload.bind(this);
        this.startRecord = this.startRecord.bind(this);
        this.stopRecord = this.stopRecord.bind(this);
        this.playVideos = this.playVideos.bind(this);
        this.sendVideos = this.sendVideos.bind(this);        
    }

    onDragged(current){
        this.setState({
            videoSelected : current
        })
    }

    onUpload(path){
        this.setState({
            videoPath : path
        })
    }    

    startRecord(){
        let video = document.getElementById('video_'+this.state.videoSelected);
        video.play();
    }
    stopRecord(){
        console.log('stopRecord');
    }    

    playVideos(){
        const videoUploaded = document.getElementById('videoUploaded');
        const videoSelected = document.getElementById('video_'+this.state.videoSelected);

        videoUploaded.play();
        videoSelected.play();
    }

    sendVideos(){
        
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

        axios.get('http://35.185.121.141/index.php', {
            params: {
                action: 'stack',
                url: this.state.videoPath,
                videoId : 0
            }
        }).then(function (response) {
            
            //document.location = `share/${ response.data.name }`;
            this.props.history.push(`share/${ response.data.name }`)


        }.bind(this)).catch(function (error) {
            console.log(error);
        }.bind(this));
    }

    render(){
        
       
        if(window.Modernizr.getusermedia){
            let layoutUsermedia = '';
            if(!this.state.videoPath){
                layoutUsermedia = <Usermedia 
                    recordTime = { 8 }
                    autoStop
                    autoUpload
                    onUpload = { this.onUpload }
                /> 
            }            
            return (
                <div className="row">
                    <div className="usermedia-content">
                        { layoutUsermedia }
                       
                    </div>                
                </div>                
            )

        }else{
            let layoutUpload = ''
            if(!this.state.videoPath){
                layoutUpload = <Upload 
                            accept="video" 
                            index="0"
                            onupload = { this.onUpload }
                            >Upload_</Upload>

            }            
            return(
                <div className="row">
                    <div className="usermedia-content">
                        { layoutUpload }
                        
                    </div>
                </div>
            )            
        }//if(window.Modernizr.getusermedia){

        if(this.state.videoPath){
            return (
                <div className="row">
                    <div className="col-xs-12">
                        <div className="btn-group btn-group-justified" role="group">
                            <div className="btn-group" role="group">
                                <button type="button" className="btn btn-primary" onClick={ this.playVideos }>Play</button>
                            </div>
                            <div className="btn-group" role="group">
                                <button type="button" className="btn btn-primary" onClick={ this.sendVideos } >Share</button>
                            </div>                                        
                        </div>                        
                    </div>
                </div>
            )
        }

    }

}

export default Step1;