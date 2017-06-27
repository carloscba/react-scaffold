import React, { Component } from 'react';
import * as firebase from 'firebase';
import PropTypes from 'prop-types';
import firebaseConfig from '../config/firebaseConfig';
import Upload from '../components/Upload';
import Progressbar from './Progressbar';

import Style from './Usermedia.css'

class UserMedia extends Component{
       
    constructor(){
        super();
        this.mediaRecorder;
        this.videoTrack;

        this.state = {
            status : 'WAITING', //WAITING | STREAMING | RECORDING | PLAYING | UPLOADING | UPLOADED | ERROR
            recDisabled : true,
            timeRecord: '00',
            percentUpload : 0,
            countdown: '',
            listOfDevices : []
        }

        if (navigator.mediaDevices !== undefined) {
            this.listDevices();
        }else{
            navigator.mediaDevices = {};
        }

        this.listDevices = this.listDevices.bind(this);
        this.setUserMedia = this.setUserMedia.bind(this);
        this.startRecord = this.startRecord.bind(this);
        this.stopRecord = this.stopRecord.bind(this);
        this.countdown = this.countdown.bind(this);
        this.timerStopRecord = this.timerStopRecord.bind(this);
        this.onUpload = this.onUpload.bind(this);
        
    }

    listDevices(){

        var supportedConstraints = navigator.mediaDevices.getSupportedConstraints();
        console.log('supportedConstraints', supportedConstraints);
        try{
            navigator.mediaDevices.enumerateDevices().then(function(devices) {
                let listOfDevices = [];
                devices.map(function(device){
                    if(device.kind === 'videoinput'){
                        listOfDevices.push(device);
                    }
                })

                console.log(listOfDevices)
                this.setState({
                    listOfDevices : listOfDevices
                })
                
                this.setUserMedia(listOfDevices[0].deviceId);
            }.bind(this));  
        }catch(e){
            console.log('Error on listDevices()', e);
        } 
    }

    setUserMedia(deviceId){
        
        if(this.videoTrack){
            this.videoTrack.stop()
        }
        
        deviceId = (typeof(deviceId) === 'string') ? deviceId : deviceId.target.value;
        console.log('deviceId', deviceId);

        const constraints = { 
            audio: false, 
            video: {
                deviceId: deviceId ? {exact: deviceId} : undefined
            }
        }

        console.log('constraints', constraints);

        try{
            navigator.mediaDevices.getUserMedia(constraints).then(function(MediaStream) {
                
                this.videoTrack = MediaStream.getVideoTracks()[0];
                console.log('this.videoTrack', this.videoTrack);
                this.mediaRecorder = new MediaRecorder(MediaStream);
                
                this.setState({
                    status : (this.videoTrack.readyState === 'live') ? 'STREAMING' : 'ERROR'
                })
                
                const videoPlayer = document.getElementById('videoPlayer');
                if ("srcObject" in videoPlayer) {
                    videoPlayer.srcObject = MediaStream;
                }else {
                    videoPlayer.src = window.URL.createObjectURL(MediaStream);
                }            

                videoPlayer.onloadedmetadata = function(e) {
                    //Enable rec button after video player loaded
                    this.setState({
                        recDisabled : false
                    })
                    videoPlayer.play();
                }.bind(this);                                  

                this.mediaRecorder.onstart = function(event){
                    this.setState({
                        status: 'RECORDING'
                    });
                    //Starting counter for stop the record
                    (this.props.autoStop) ? this.timerStopRecord() : null;

                    //Call function on parent when the record is started 
                    (this.props.startRecord) ? this.props.startRecord() : null;                    
                }.bind(this);

                this.mediaRecorder.onstop = function(event) {
                    //Call function on parent when the record is stopped
                    (this.props.stopRecord) ? this.props.stopRecord() : null;
                    //Stop the streaming from device
                    this.videoTrack.stop();
                }.bind(this);
                
                this.mediaRecorder.ondataavailable = function(e) {
                    
                    const videoData = e.data
                    //Upload record
                    if(this.props.autoUpload){

                        let auth =  firebase.auth();
                        let storageRef = firebase.storage().ref();
                        
                        this.setState({
                            status: 'UPLOADING'
                        })
                        //UPLOAD
                        const uploadTask = storageRef.child(`video/${ Date.now() }.webm`).put(videoData);

                        uploadTask.on('state_changed', function (snapshot) {
                            let currentPercent = Math.round((100 * snapshot.bytesTransferred)/snapshot.totalBytes);
                            this.setState({
                                percentUpload : currentPercent
                            });
                        }.bind(this), function (error) {
                            this.setState({
                                status: 'WAITING'
                            });
                        }.bind(this), function () {
                            this.setState({
                                status: 'UPLOADED'
                            });
                            let downloadURL = uploadTask.snapshot.downloadURL;
                            console.log('downloadURL', downloadURL);
                            
                            (this.props.onUpload) ? this.onUpload(downloadURL) : null;
                            
                        }.bind(this));// uploadTask.on

                    }else{
                        this.setState({status: 'PLAYING'});

                        const videoResult = document.getElementById('videoResult');

                        videoResult.src = window.URL.createObjectURL(videoData);
                        videoResult.controls = true;
                        videoResult.play();
                        console.log('videoResult', videoResult);

                        videoResult.onload = function(e) {
                            //Enable rec button after video player loaded
                            console.log('e', e);
                            e.target.play();
                        }.bind(this); 
                    }
                }.bind(this);//this.mediaRecorder.ondataavailable

            }.bind(this)).catch(function(err) {
                console.log('error on navigator.mediaDevices.getUserMedia', err)
                this.setState({
                    status : 'ERROR'
                });

            }.bind(this));//navigator.mediaDevices.getUserMedia            

        }catch(err){
            console.log('error on try navigator.mediaDevices.getUserMedia', err)
            this.setState({
                status : 'ERROR'
            });
        }
    }

    startRecord(){
        if(typeof(this.mediaRecorder) === 'object'){
            this.mediaRecorder.start();
        }    
    }//startRecord()

    stopRecord(){
        if(typeof(this.mediaRecorder) === 'object'){
            this.mediaRecorder.stop();
        }        
    }//stopRecord()    

    timerStopRecord(){
        let timer = 0;

        let intervalStop = window.setInterval(function(){
            
            if(timer === this.props.recordTime){
                this.stopRecord();
                this.setState({
                    timeRecord : this.props.recordTime 
                })                
                clearInterval(intervalStop);
            }else{
                this.setState({
                    timeRecord : (timer < 10) ? '0'+timer : timer 
                })
                timer++;
            }
            
        }.bind(this), 1000);        
    }//timerStopRecord()

    countdown(){
        let timer = this.props.countdown;
        let intervalID = window.setInterval(function(){
            if((timer) === 0){
                this.startRecord();
                clearInterval(intervalID);
            }else{
                this.setState({
                    countdown: timer
                })
                timer--;
            }
        }.bind(this), 1000);
    }//countdown()

    onUpload(path){
        //Call function on parent when the upload is finished
        this.props.onUpload(path);
    }

    render(){

        let options = [];
        this.state.listOfDevices.map(function(item, index){
            options.push(<option value={ item.deviceId }> { item.deviceId }</option>);    
        })

        if(this.state.status !== 'ERROR'){
            return (
                <div className="usermedia">
                    <div>
                        { (this.state.status === 'STREAMING' || this.state.status === 'RECORDING') ? <video id="videoPlayer" className="usermedia__video-player"></video> : null }
                        { (this.state.status === 'PLAYING') ? <video id="videoResult" loop></video> : null }
                    </div>
                    { (this.state.status === 'UPLOADING') ? <div className="progressbarContainer"><Progressbar percent = { this.state.percentUpload } /></div> : null }
                    { ( !this.props.autoStop && this.state.status === 'RECORDING') ? <button className="btn btn-danger btn-block" onClick={ this.stopRecord } disabled = { this.state.recDisabled }>Stop</button> : null }
                    { (this.state.status !== 'UPLOADING' && this.state.status !== 'PLAYING') ? <div className="usermedia__timer"><span className="usermedia__timer-current">00:{ this.state.timeRecord }</span><span className="usermedia__timer-spacer">/</span> <span className="usermedia__timer-total">00:{ (this.props.recordTime < 10) ? '0'+this.props.recordTime : this.props.recordTime }</span></div> : null }
                    { (this.state.status === 'STREAMING') ? <a className="usermedia__rec" onClick={ this.countdown } disabled = { this.state.recDisabled }></a>  : null }
                    { (options.length > 1) ? <select onChange={ this.setUserMedia } >{ options }</select> : null }
                </div>
            )
        }else{
            return (
                <Upload 
                accept="video" 
                onupload = { this.onUpload }
                >Upload__</Upload>
            )            
        }//if(this.state.getUserMediaAvailable)

    }

}

UserMedia.propTypes = {
    countdown : PropTypes.number,
    recordTime: PropTypes.number,
    autoStop : PropTypes.bool,
    autoUpload : PropTypes.bool,
    
    onUpload : PropTypes.func,
    startRecord : PropTypes.func,
    stopRecord : PropTypes.func
};

UserMedia.defaultProps = {
    countdown : 3,
    recordTime : 5,
    autoStop : true,
    autoUpload : false,

    onUpload : null,
    startRecord : null,
    stopRecord : null
};

export default UserMedia;