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
            videoPath : null,
            videoSelected : 0,
            isReadyCarousel: false
        }
        
        this.onDragged = this.onDragged.bind(this);
        this.onUpload = this.onUpload.bind(this);
        this.onStartRecord = this.onStartRecord.bind(this);
        this.onStopRecord = this.onStopRecord.bind(this);
        this.onPlayPlayer = this.onPlayPlayer.bind(this);
        this.onPausePlayer = this.onPausePlayer.bind(this);
        this.onStopPlayer = this.onStopPlayer.bind(this);
        this.playComposition = this.playComposition.bind(this);    
        this.sendVideos = this.sendVideos.bind(this);
        this.onReadyCarousel = this.onReadyCarousel.bind(this);    
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

    onStartRecord(){
        let video = document.getElementById('video_'+this.state.videoSelected);
        video.play();
    }

    onStopRecord(){
        const videoSelected = document.getElementById('video_'+this.state.videoSelected);
        console.log('videoSelected', videoSelected);
        videoSelected.pause();
    }    

    onPlayPlayer(){
        const videoSelected = document.getElementById('video_'+this.state.videoSelected);
        videoSelected.play();
    }
    onPausePlayer(){
        const videoSelected = document.getElementById('video_'+this.state.videoSelected);
        videoSelected.pause();
    }    
    onStopPlayer(){
        const videoSelected = document.getElementById('video_'+this.state.videoSelected);
        videoSelected.pause();
    }    

    playComposition(){
        const player = document.getElementById('player');
        player.play();        

        const videoSelected = document.getElementById('video_'+this.state.videoSelected);
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

    onReadyCarousel(){
        this.setState({
            isReadyCarousel : true
        });
    }

    render(){
        //Carousel
        let layout;
        if(window.Modernizr.getusermedia){
            layout = <div><Usermedia 
            recordTime = { 4 }
            autoStop
            onUpload = { this.onUpload }
            onStartRecord = { this.onStartRecord }
            onStopRecord = { this.onStopRecord }
            onPlayPlayer = { this.onPlayPlayer }
            onPausePlayer = { this.onPausePlayer }
            onStopPlayer = { this.onStopPlayer }
            /></div> 
        }else{
            layout = <div><Upload 
            accept="video" 
            index="0"
            onupload = { this.onUpload }
            >Upload_</Upload></div>
        }
        
        let shareButtons = <div className="col-xs-12">
            <div className="btn-group btn-group-justified" role="group">
                <div className="btn-group" role="group">
                    <button type="button" className="btn btn-primary" onClick={ this.playComposition }>Play</button>
                </div>
                <div className="btn-group" role="group">
                    <button type="button" className="btn btn-primary" onClick={ this.sendVideos } >Share</button>
                </div>                                        
            </div>                        
        </div>        
        
        return(
            <div className="row">
                <div className="usermedia-content">
                    {(this.state.videoPath !== null) ? <video id="videoUploaded" className="video-uploaded"><source src={ this.state.videoPath } type="video/mp4" /></video> :  layout }
                    <div className="overlay" id="divOverlay">
                        { (!this.state.isReadyCarousel ) ? <h3>Cargando</h3> : null }    
                        <Carousel 
                        onDragged = { this.onDragged }
                        startPosition = { this.state.videoSelected }
                        ready = { this.onReadyCarousel }
                        /> 
                    </div>
                </div>
                { (this.state.videoPath !== null) ? shareButtons : null }
            </div>
                   
        )         
    }
}

export default Step1;