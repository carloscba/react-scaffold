import React, { Component } from 'react';
import Usermedia from '../components/Usermedia';
import Upload from '../components/Upload';
import Carousel from '../components/Carousel';
import Style from './Step1.css';
import { Link } from 'react-router-dom';

class Step1 extends Component{

    constructor(){
        super();
        this.state = {
            overlayVideo : '',
            videoPath : false,
            videoSelected : 0
        }
        
        this.onDragged = this.onDragged.bind(this);
        this.onUpload = this.onUpload.bind(this);
        this.renderUpload = this.renderUpload.bind(this);
        this.startRecord = this.startRecord.bind(this);
        this.stopRecord = this.stopRecord.bind(this);
        this.renderVideo = this.renderVideo.bind(this);
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

    renderUpload(){
        let layout = ''
        if(!this.state.videoPath){
            layout = <Upload 
                        accept="video" 
                        index="0"
                        onupload = { this.onUpload }
                        >Upload</Upload>

        }
        return <div className="usermedia">
                    { layout }
                    { this.renderOverlay() }
                </div>
    }

    startRecord(){
        let video = document.getElementById('video_'+this.state.videoSelected);
        video.play();
    }
    stopRecord(){
        console.log('stopRecord');
    }    

    renderVideo(){
        let layout = '';

        if(!this.state.videoPath){
            layout = <Usermedia 
                countdown = { 3 }
                recordTime = { 5 }
                autoStop
                autoUpload
                onUpload = { this.onUpload }
                startRecord = { this.startRecord }
            /> 
        }
                    
        return <div className="usermedia">
                    { layout }
                    { this.renderOverlay() }
                </div>
    }

    renderOverlay(){
        return <div>
                    {(this.state.videoPath) ? <video width="320" height="240" id="videoUploaded" className="videoUploaded"><source src={ this.state.videoPath } type="video/mp4" /></video> : null }
                    <div className="overlay" id="divOverlay">
                        <Carousel 
                        onDragged = { this.onDragged }
                        startPosition = { this.state.videoSelected }
                        />    
                    </div>
                </div>
    }

    playVideos(){
        const videoUploaded = document.getElementById('videoUploaded');
        const videoSelected = document.getElementById('video_'+this.state.videoSelected);

        videoUploaded.play();
        videoSelected.play();
    }

    sendVideos(){
        let videoPath = encodeURI('http://35.185.121.141/videos_results/stack_1498161122.mp4');
        document.location = `/share?v=${ videoPath }`;
        console.log(this.state);
    }

    render(){
        
        let buttonLayout = <div className="row">
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

        return(
            <div>
                <div className="row">
                    <div className="col-xs-12 container-videos">
                        { (window.Modernizr.getusermedia) ? this.renderVideo() : this.renderUpload() } 
                    </div>
                </div>
                { (this.state.videoPath) ? buttonLayout : null }
            </div>
        )
    }

}

export default Step1;