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
        this.listOfDevices = [];
        this.currentDevice;
        this.timeStartRecord = 0;

        this.state = {
            status : 'WAITING', //WAITING | STREAMING | RECORDING | PLAYING | UPLOADING | UPLOADED | ERROR
            recDisabled : true,
            timeRecord: '00',
            percentUpload : 0,
        }

        if (navigator.mediaDevices !== undefined) {
            this.listDevices();
        }else{
            navigator.mediaDevices = {};
        }

        this.listDevices = this.listDevices.bind(this);
        this.setUserMedia = this.setUserMedia.bind(this);
        this.switchCamera = this.switchCamera.bind(this);
        this.setStreamPlayer = this.setStreamPlayer.bind(this);
        this.startRecord = this.startRecord.bind(this);
        this.stopRecord = this.stopRecord.bind(this);
        this.onUpload = this.onUpload.bind(this);
    }

    listDevices(){

        var supportedConstraints = navigator.mediaDevices.getSupportedConstraints();
        try{
            
            navigator.mediaDevices.enumerateDevices().then(function(devices) {
                devices.map((device) => {
                    if(device.kind === 'videoinput'){
                        this.listOfDevices.push(device);
                    }
                });
                (this.listOfDevices.length > 0) ? this.setUserMedia(this.listOfDevices[0].deviceId) : alert('Device is don\'t available');
            }.bind(this));  

        }catch(e){
            console.log('Error on navigator.mediaDevices.enumerateDevices', e);
        } 
    }

    switchCamera(){
        let availableDevice = this.listOfDevices.filter((device) => {	
            
            console.log(device.deviceId, this.currentDevice);

            if(device.deviceId !== this.currentDevice){
                return device;
            }
        });
        (availableDevice.length > 0) ? this.setUserMedia(availableDevice[0].deviceId) : alert('Device is don\'t available');
    }

    setUserMedia(deviceId){
        
        (this.videoTrack) ? this.videoTrack.stop() : null;
        
        this.currentDevice = (typeof(deviceId) === 'string') ? deviceId : deviceId.target.value;

        const constraints = { 
            audio: false, 
            video: {
                width: 640,
                height: 480,
                deviceId: this.currentDevice ? {exact: this.currentDevice} : undefined
            }
        }

        try{
            navigator.mediaDevices.getUserMedia(constraints).then(function(MediaStream) {
                
                this.setStreamPlayer(MediaStream);
                
                this.mediaRecorder = new MediaRecorder(MediaStream);

                this.mediaRecorder.onerror = function(event){
                    console.log('error on this.mediaRecorder.onerror', event);
                }

                this.mediaRecorder.onstart = function(event){
                    this.timeStartRecord = Date.now();
                    this.setState({
                        status: 'RECORDING'
                    });
                    (this.props.startRecord) ? this.props.startRecord() : null;//Call function on parent when the record is started                   
                }.bind(this);

                this.mediaRecorder.onstop = function(event) {
                    (this.props.stopRecord) ? this.props.stopRecord() : null; //Call function on parent when the record is stopped
                    this.videoTrack.stop(); //Stop the streaming from device
                }.bind(this);
                
                this.mediaRecorder.ondataavailable = function(e) {
                    
                    const videoData = e.data
                    
                    if(this.props.autoUpload){ //Upload record
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

    setStreamPlayer(MediaStream){

        this.streamPlayer = document.getElementById('streamPlayer'); 
        this.videoTrack = MediaStream.getVideoTracks()[0];        
        
        console.log('this.streamPlayer', this.streamPlayer);
        
        if ("srcObject" in this.streamPlayer) {
            this.streamPlayer.srcObject = MediaStream;
        }else {
            this.streamPlayer.src = window.URL.createObjectURL(MediaStream);
        }

        this.streamPlayer.onplaying = function(event){
            console.log('this.streamPlayer.onplaying');
            this.setState({
                status : 'STREAMING'
            })
        }.bind(this); 

        this.streamPlayer.ontimeupdate = function(event){
            
            if(this.timeStartRecord != 0){
                //Calculate of current time of record
                //(this.props.autoStop)
                console.log('Math.round(Date.now() - this.timeStartRecord) >= this.props.recordTime', Math.round(Date.now() - this.timeStartRecord)/1000);
                (Math.round((Date.now() - this.timeStartRecord) / 1000) >= this.props.recordTime) ? this.stopRecord() : null ;
                
            }
            
        }.bind(this); 

        this.streamPlayer.onwaiting = function(event){
            console.log('this.streamPlayer.onwaiting');
        }.bind(this);         
        
        this.streamPlayer.onloadedmetadata = function(event){
            console.log('this.streamPlayer.onloadedmetadata');
            //Enable rec button after video player loaded
            this.setState({
                recDisabled : false
            })
            this.streamPlayer.play();
        }.bind(this);
        

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

    onUpload(path){
        //Call function on parent when the upload is finished
        this.props.onUpload(path);
    }

    render(){

        if(this.state.status !== 'ERROR'){
            return (
                <div className="usermedia">
                    <video id="streamPlayer" className="usermedia__video-player"></video>
                    <div>
                        <video id="streamPlayer" className="usermedia__video-player"></video>
                        { (this.state.status === 'PLAYING') ? <video id="videoResult" loop></video> : null }
                    </div>
                    { (this.state.status === 'UPLOADING') ? <div className="progressbarContainer"><Progressbar percent = { this.state.percentUpload } /></div> : null }
                    { ( !this.props.autoStop && this.state.status === 'RECORDING') ? <button className="btn btn-danger btn-block" onClick={ this.stopRecord } disabled = { this.state.recDisabled }>Stop</button> : null }
                    { (this.state.status !== 'UPLOADING' && this.state.status !== 'PLAYING') ? <div className="usermedia__timer"><span className="usermedia__timer-current">00:{ this.state.timeRecord }</span><span className="usermedia__timer-spacer">/</span> <span className="usermedia__timer-total">00:{ (this.props.recordTime < 10) ? '0'+this.props.recordTime : this.props.recordTime }</span></div> : null }
                    { (this.state.status === 'STREAMING') ? <a className="usermedia__rec" onClick={ this.startRecord } disabled = { this.state.recDisabled }></a>  : null }
                    { (this.listOfDevices.length > 1) ? <button className="usermedia__switch" onClick={ this.switchCamera }>Switch Camera</button> : null }
                </div>
            )
        }else{
            return (
                <Upload 
                accept="video" 
                onupload = { this.onUpload }
                >Upload</Upload>
            )            
        }//if(this.state.getUserMediaAvailable)
    }
}

UserMedia.propTypes = {
    recordTime: PropTypes.number,
    autoStop : PropTypes.bool,
    autoUpload : PropTypes.bool,
    
    onUpload : PropTypes.func,
    startRecord : PropTypes.func,
    stopRecord : PropTypes.func
};

UserMedia.defaultProps = {
    recordTime : 5,
    autoStop : true,
    autoUpload : false,

    onUpload : null,
    startRecord : null,
    stopRecord : null
};

export default UserMedia;