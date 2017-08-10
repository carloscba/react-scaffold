import React, { Component } from 'react';
import * as firebase from 'firebase';
import PropTypes from 'prop-types';
import firebaseConfig from '../config/firebaseConfig';
import Upload from '../components/Upload';
import Progressbar from './Progressbar';

import fontello from '../fonts/fontello/css/fontello.css'
import Style from '../templates/components/Usermedia.css'

class UserMedia extends Component{
       
    constructor(){
        super();
        this.mediaRecorder;
        this.videoTrack;
        this.listOfDevices = [];
        this.currentDevice;
        this.timeStartRecord = 0;
        this.videoData;

        this.state = {
            status : 'WAITING', //WAITING | STREAMING | RECORDING | PLAYING | UPLOADING | UPLOADED | ERROR
            recDisabled : true,
            currentTimeRecord: '00',
            percentTimeRecord : 0,
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
        this.setplayer = this.setplayer.bind(this);
        this.startRecord = this.startRecord.bind(this);
        this.stopRecord = this.stopRecord.bind(this);
        this.upload = this.upload.bind(this);
        this.onUpload = this.onUpload.bind(this);
        this.playPlayer = this.playPlayer.bind(this);
        this.pausePlayer = this.pausePlayer.bind(this);
        this.takePhoto = this.takePhoto.bind(this);
        this.cancelPhoto = this.cancelPhoto.bind(this);
        this.confirmPhoto = this.confirmPhoto.bind(this);
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
                (this.listOfDevices.length > 0) ? this.setUserMedia(this.listOfDevices[0].deviceId) : this.setState({'status' : 'ERROR'});
            }.bind(this));  

        }catch(e){
            //console.log('Error on navigator.mediaDevices.enumerateDevices', e);
        } 
    }

    switchCamera(){
        let availableDevice = this.listOfDevices.filter((device) => {	
            
            //console.log(device.deviceId, this.currentDevice);

            if(device.deviceId !== this.currentDevice){
                return device;
            }
        });
        (availableDevice.length > 0) ? this.setUserMedia(availableDevice[0].deviceId) : this.setState({'status' : 'ERROR'});
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
                
                this.setplayer(MediaStream);

                this.MediaStream = MediaStream;
                this.mediaRecorder = new MediaRecorder(this.MediaStream);
                
                this.mediaRecorder.onerror = function(event){
                    //console.log('error on this.mediaRecorder.onerror', event);
                }

                this.mediaRecorder.onstart = function(event){
                    this.timeStartRecord = Date.now();
                    this.setState({
                        status: 'RECORDING'
                    });
                    (this.props.onStartRecord) ? this.props.onStartRecord() : null;//Call function on parent when the record is started                   
                }.bind(this);

                this.mediaRecorder.onstop = function(event) {
                    (this.props.onStopRecord) ? this.props.onStopRecord() : null; //Call function on parent when the record is stopped
                    this.videoTrack.stop(); //Stop the streaming from device
                }.bind(this);
                
                this.mediaRecorder.ondataavailable = function(e) {
                    this.videoData = e.data;

                    if(this.props.autoUpload){ //Upload record
                        this.upload()
                    }else{
                        this.player.srcObject = null;
                        this.player.src = window.URL.createObjectURL(this.videoData);

                        this.player.onpause = function(event){
                            (this.props.onPausePlayer) ? this.props.onPausePlayer() : null; 
                        }.bind(this)

                        this.player.ontimeupdate = function(event){
                            let currentTimeRecord = Math.round(event.target.currentTime); 
                            this.setState({
                                currentTimeRecord : (currentTimeRecord < 10 ) ? '0'+currentTimeRecord : currentTimeRecord,
                                percentTimeRecord :  Math.round((currentTimeRecord * 100) / event.target.duration)
                            })
                        }.bind(this);

                        this.player.onloadedmetadata = function(event) {
                            this.setState({
                                status: 'PLAYING'
                            });                            
                            event.target.controls = false;
                            event.target.play();
                        }.bind(this); 

                        
                        
                    }
                }.bind(this);//this.mediaRecorder.ondataavailable

            }.bind(this)).catch(function(err) {
                //console.log('error on navigator.mediaDevices.getUserMedia', err)
                this.setState({
                    status : 'ERROR'
                });

            }.bind(this));//navigator.mediaDevices.getUserMedia            

        }catch(err){
            //console.log('error on try navigator.mediaDevices.getUserMedia', err)
            this.setState({
                status : 'ERROR'
            });
        }
    }

    upload(){
        
        let storageRef = firebase.storage().ref();
        this.setState({
            status: 'UPLOADING'
        })
        //UPLOAD
        const uploadTask = storageRef.child(`video/${ Date.now() }.webm`).put(this.videoData);

        uploadTask.on('state_changed', function (snapshot) {
            this.setState({
                percentUpload : Math.round((100 * snapshot.bytesTransferred)/snapshot.totalBytes)
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
            
            (this.props.onUpload) ? this.onUpload(downloadURL) : null;
            
        }.bind(this));// uploadTask.on        
    }

    setplayer(MediaStream){

        this.player = document.getElementById('player'); 
        this.videoTrack = MediaStream.getVideoTracks()[0];        
        
        this.player.srcObject = MediaStream;

        this.player.onplaying = function(event){
            if(event.target.srcObject === null){
                (this.props.onPlayPlayer) ? this.props.onPlayPlayer() : null;
            }else{
                (this.props.onUsermediaReady) ? this.props.onUsermediaReady(event) : null;
            }
        }.bind(this);

        this.player.ontimeupdate = function(event){
            if(this.timeStartRecord != 0){
                //Calculate of current time of record
                //(this.props.autoStop)
                let currentTimeRecord = Math.floor((Date.now() - this.timeStartRecord) / 1000); 
                this.setState({
                    currentTimeRecord : (currentTimeRecord < 10 ) ? '0'+currentTimeRecord : currentTimeRecord,
                    percentTimeRecord :  Math.round((currentTimeRecord * 100) / this.props.recordTime)
                })
                //console.log(currentTimeRecord +'>='+ this.props.recordTime)
                if(currentTimeRecord >= this.props.recordTime){
                    this.player.ontimeupdate = null;
                    this.stopRecord()
                };
            }
            
        }.bind(this); 

        this.player.onloadedmetadata = function(event){
            this.setState({
                status : 'STREAMING'
            })
            this.player.play();
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

    playPlayer(){
        this.player.play();
    }

    pausePlayer(){
        this.player.pause();
    }

    takePhoto(){
        this.setState({
            status : 'TAKED'
        })
        this.player.pause();
    }
    cancelPhoto(){
        this.setState({
            status : 'STREAMING'
        })        
        this.player.play();
    }    

    confirmPhoto(){
        const canvas = document.getElementById('canvas');
        const context = canvas.getContext('2d');
        
        canvas.width = this.player.offsetWidth;
        canvas.height = this.player.offsetHeight;
        
        context.drawImage(this.player, 0, 0, this.player.offsetWidth, this.player.offsetHeight);

        var data = canvas.toBlob(function(response){
            
            this.player.srcObject = null;

            let storageRef = firebase.storage().ref();
            this.setState({
                status: 'UPLOADING'
            })
            //UPLOAD
            const uploadTask = storageRef.child(`photo/${ Date.now() }.png`).put(response);

            uploadTask.on('state_changed', function (snapshot) {
                this.setState({
                    percentUpload : Math.round((100 * snapshot.bytesTransferred)/snapshot.totalBytes)
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
                (this.props.onUpload) ? this.onUpload(downloadURL) : null;
                
            }.bind(this));// uploadTask.on 
        }.bind(this));
    }

    render(){

        let progressRecord = {
            width : `${this.state.percentTimeRecord}%`,
            transition : 'all 100ms'
        }

        let progressUpload = {
            width : `${this.state.percentUpload}%`,
            transition : 'all 100ms'
        }

        let photoControl = (
            <div>
                <img className='usermedia__chicknshare' alt='ChicknShare' src={ require('../images/chicknshare_short.png') } />
                { (this.state.status === 'STREAMING') ? <img className='usermedia__selfie' alt='SACAR SELFIE' onClick={ this.takePhoto } src={ require('../images/usermedia__selfie.png') } />  : null }
                { (this.state.status === 'TAKED') ?<button className='usermedia__cancelar' onClick={ this.cancelPhoto }>cancelar</button>  : null }
                { (this.state.status === 'TAKED') ?<button className='usermedia__compartir' onClick={ this.confirmPhoto }>COMPARTIR</button>  : null }
            </div>
        )
        let videoControl = (
            <div>
                { (this.state.status === 'RECORDING' && this.state.status === 'PLAYING') ? <div className="usermedia__timer"><span className="usermedia__timer-current">00:{ this.state.currentTimeRecord }</span><span className="usermedia__timer-spacer">/</span> <span className="usermedia__timer-total">00:{ (this.props.recordTime < 10) ? '0'+this.props.recordTime : this.props.recordTime }</span></div> : null }
                { (this.state.status === 'STREAMING') ? <a className="usermedia__rec" onClick={ this.startRecord } disabled = { this.state.recDisabled }><i className="demo-icon icon-record"></i></a>  : null }
                { (this.state.status === 'PLAYING') ? <div className="usermedia__controls"><a className="usermedia__rec" onClick={ this.playPlayer }><i className="demo-icon icon-play-circled"></i></a> <a className="usermedia__rec" onClick={ this.pausePlayer }><i className="demo-icon icon-pause-circle"></i></a> <a className="usermedia__rec" onClick={ this.upload }><i className="demo-icon icon-upload"></i></a></div>  : null }
                { (this.listOfDevices.length > 1) ? <button className="usermedia__switch" onClick={ this.switchCamera }>Switch Camera</button> : null }
            </div>            
        )

        if(this.state.status !== 'ERROR'){
            return (
                <div className="row usermedia">
                    <canvas id="canvas" style= { {display:'none'} }></canvas>
                    <div className="usermedia__player">
                        <video id="player"></video>
                    </div>
                    <div className="usermedia__options">
                        <div className="usermedia__progress">
                            { (this.state.status === 'RECORDING' || this.state.status === 'PLAYING') ? <div className="usermedia__timebar" style={ progressRecord }></div> : null }
                            { (this.state.status === 'UPLOADING') ? <div className="usermedia__uploadbar" style={ progressUpload }></div> : null }
                        </div>
                        { (!this.props.photoMode ) ? videoControl : photoControl }
                        
                    </div>
                </div>
            )
        }else{
            return (
                <Upload 
                accept="image" 
                onupload = { this.onUpload }
                >Upload</Upload>
            )            
        }//if(this.state.getUserMediaAvailable)
    }
}

UserMedia.propTypes = {
    photoMode : PropTypes.bool,
    recordTime: PropTypes.number,
    autoStop : PropTypes.bool,
    autoUpload : PropTypes.bool,
    
    onUsermediaReady : PropTypes.func,
    onUpload : PropTypes.func,
    onStartRecord : PropTypes.func,
    onStopRecord : PropTypes.func,
    onPlayPlayer : PropTypes.func,
    onPausePlayer : PropTypes.func
};

UserMedia.defaultProps = {
    photoMode : false,
    recordTime : 5,
    autoStop : true,
    autoUpload : false,

    onUsermediaReady : null,
    onUpload : null,
    onStartRecord : null,
    onStopRecord : null,
    onPlayPlayer : null,
    onPausePlayer : null
};

export default UserMedia;