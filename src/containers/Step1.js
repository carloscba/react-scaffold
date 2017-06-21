import React, { Component } from 'react';
import Usermedia from '../components/Usermedia';
import Upload from '../components/Upload';
import Carousel from '../components/Carousel';
import Style from './Step1.css';

class Step1 extends Component{

    constructor(){
        super();
        this.state = {
            overlayVideo : '',
            videoPath : false
        }
        this.onSelect = this.onSelect.bind(this);
        this.renderVideo = this.renderVideo.bind(this);
        this.renderUpload = this.renderUpload.bind(this);
        this.getusermediaUnavailable = this.getusermediaUnavailable.bind(this);
        this.onUpload = this.onUpload.bind(this);
    }

    onSelect(src){
        const fullPath = src.split('/');
        const videoPath = `./video/${fullPath[fullPath.length-1]}` 
        console.log('videoPath', videoPath);
        let videoSelected = document.getElementById('videoSelected');
        videoSelected.src = videoPath;
        
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

    getusermediaUnavailable(){
        let divOverlay = document.getElementById('divOverlay');
        //divOverlay.style.display = 'none';
    }

    renderVideo(){
        let layout = '';

        if(!this.state.videoPath){
            layout = <Usermedia 
                countdown = "3"
                recordTime = "5"
                autostop
                autoupload
                getusermediaUnavailable = { this.getusermediaUnavailable }
                onupload = { this.onUpload }
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
                        <video id="videoSelected" className="videoSelected" width="320" height="120">
                            <source src="./video/video1.mp4" type="video/mp4" />
                            Your browser doesn't support HTML5 video tag.
                        </video>
                    </div>
                </div>
    }

    onUpload(path){
        this.setState({
            videoPath : path
        })
    }

    playVideos(){
        const videoUploaded = document.getElementById('videoUploaded');
        const videoSelected = document.getElementById('videoSelected');

        videoUploaded.play();
        videoSelected.play();
    }

    render(){
        
        let buttonLayout = <div className="row">
                                <div className="col-xs-12">
                                    <div className="btn-group btn-group-justified" role="group">
                                        <div className="btn-group" role="group">
                                            <button type="button" className="btn btn-primary" onClick={ this.playVideos }>Play</button>
                                        </div>
                                        <div className="btn-group" role="group">
                                            <button type="button" className="btn btn-primary">Send</button>
                                        </div>                                        
                                    </div>                        
                                </div>
                            </div>

        let carouselLayout = <div className="row">
                                <div className="col-xs-12">
                                    <Carousel 
                                    onSelect = { this.onSelect }
                                    />                
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
                { (!this.state.videoPath) ? carouselLayout : null }
            </div>
        )
    }

}

export default Step1;