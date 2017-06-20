import React, { Component } from 'react';
import Usermedia from '../components/Usermedia';
import Upload from '../components/Upload';
import Carousel from '../components/Carousel';
import Style from './Step1.css';

class Step1 extends Component{

    constructor(){
        super();
        this.state = {
            overlayVideo : ''
        }
        this.onSelect = this.onSelect.bind(this);
        this.renderVideo = this.renderVideo.bind(this);
        this.renderUpload = this.renderUpload.bind(this);
    }

    onSelect(src){
        const fullPath = src.split('/');
        const videoPath = `./video/${fullPath[fullPath.length-1]}` 
        console.log('videoPath', videoPath);
        let videoOverlay = document.getElementById('videoOverlay');
        videoOverlay.src = videoPath;
        
    }

    renderUpload(){
        return <Upload 
                accept="video" 
                index="0"
                >Upload</Upload>
    }

    renderVideo(){
        
        return <div className="usermedia">
                <Usermedia 
                countdown = "3"
                recordTime = "5"
                overlayVideo = { this.state.overlayVideo }
                autostop
                autoupload
                />
                <div className="overlay">
                    <video id="videoOverlay" width="320" height="120">
                        <source src="./video/video1.mp4" type="video/mp4" />
                        Your browser doesn't support HTML5 video tag.
                    </video>
                </div>
            </div>
    }

    render(){
        return(
            <div>
                <h2>Step1</h2>
                { (window.Modernizr.getusermedia) ? this.renderVideo() : this.renderUpload() } 
                <Carousel 
                onSelect = { this.onSelect }
                />
            </div>
        )
    }

    componentDidMount(){
        
    }
}

export default Step1;