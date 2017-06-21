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
            videoPath : false,
            videoSelected : 0
        }
        
        this.onSelect = this.onSelect.bind(this);
        this.onUpload = this.onUpload.bind(this);
        this.renderUpload = this.renderUpload.bind(this);
        this.renderVideo = this.renderVideo.bind(this);
        this.getusermediaUnavailable = this.getusermediaUnavailable.bind(this);
        this.playVideos = this.playVideos.bind(this);
        this.sendVideos = this.sendVideos.bind(this);        
    }

    onSelect(current){
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

    getusermediaUnavailable(){
        let divOverlay = document.getElementById('divOverlay');
        //divOverlay.style.display = 'none';
    }    

    renderOverlay(){
        return <div>
                    {(this.state.videoPath) ? <video width="320" height="240" id="videoUploaded" className="videoUploaded"><source src={ this.state.videoPath } type="video/mp4" /></video> : null }
                    <div className="overlay" id="divOverlay">
                        <Carousel 
                        onSelect = { this.onSelect }
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

        let carouselLayout = <div className="row">
            <div className="col-xs-12">
                <Carousel />                
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