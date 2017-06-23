import React, { Component } from 'react';
import * as firebase from 'firebase';
import firebaseConfig from '../config/firebaseConfig';
import Upload from '../components/Upload';
import Progressbar from './Progressbar';
import PropTypes from 'prop-types';
import Style from './Usermedia.css'

class UserMedia extends Component{
       
    constructor(){
        super();
        this.mediaRecorder;
        if (navigator.mediaDevices !== undefined) {
            this.setUserMedia()
        }else{
            navigator.mediaDevices = {};
        }

        this.state = {
            status : 'WAITING', //WAITING | STREAMING | RECORDING | PLAYING | UPLOADING | UPLOADED
            getUserMediaAvailable : false, 
            recDisabled : true,
            percentRecord: 0,
            percentUpload : 0,
            countdown: ''
        }

        this.setUserMedia = this.setUserMedia.bind(this);
        this.startRecord = this.startRecord.bind(this);
        this.stopRecord = this.stopRecord.bind(this);
        this.renderVideoSuccess = this.renderVideoSuccess.bind(this);
        this.renderVideoError = this.renderVideoError.bind(this);
        this.countdown = this.countdown.bind(this);
        this.timerStopRecord = this.timerStopRecord.bind(this);
        this.onUpload = this.onUpload.bind(this);
        
    }

    setUserMedia(){
        //list of constrains supported by browser
        var supportedConstraints = navigator.mediaDevices.getSupportedConstraints();

        const constraints = { 
            audio: false, 
            video: { 
                width: 320, 
                height: 240
            } 
        }

        try{
            navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
                
                this.setState({
                    getUserMediaAvailable : true,
                    status : 'STREAMING'
                })
                
                const videoPlayer = document.getElementById('videoPlayer');
                if ("srcObject" in videoPlayer) {
                    videoPlayer.srcObject = stream;
                }else {
                    videoPlayer.src = window.URL.createObjectURL(stream);
                }            

                videoPlayer.onloadedmetadata = function(e) {
                    //Enable rec button after video player loaded
                    this.setState({
                        recDisabled : false
                    })
                    videoPlayer.play();
                }.bind(this);                                  
               

                this.mediaRecorder = new MediaRecorder(stream);
                
                this.mediaRecorder.onstop = function(e) {
                    console.log('onstop')
                }
                
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
                        this.setState({
                            status: 'PLAYING'
                        })                        
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
                
                (this.props.getUserMediaUnavailable) ? this.props.getUserMediaUnavailable() : null;

                this.setState({
                    getUserMediaAvailable : false
                });
            }.bind(this));//navigator.mediaDevices.getUserMedia            

        }catch(e){
            this.setState({
                getUserMediaAvailable : false
            });
        }
    }

    startRecord(){
        if(typeof(this.mediaRecorder) === 'object'){
            this.setState({
                status: 'RECORDING'
            });
            this.mediaRecorder.start();
        }
        //Starting counter for stop the record
        (this.props.autoStop) ? this.timerStopRecord() : null;
        //call when started record 
        (this.props.startRecord) ? this.props.startRecord() : null;
    }//startRecord()

    stopRecord(){
        if(typeof(this.mediaRecorder) === 'object'){
            this.setState({
                status: 'WAITING'
            });
            this.mediaRecorder.stop();
            (this.props.stopRecord) ? this.props.stopRecord() : null;
        }        
    }//stopRecord()    

    timerStopRecord(){
        console.log('timerStopRecord()')
        const timeRecord = parseInt(this.props.recordTime);
        let timer = 0;
        let currentPercent
        let intervalStop = window.setInterval(function(){
            
            if(timer === (timeRecord - 1)){
                this.stopRecord();
                this.setState({
                    percentRecord : timeRecord 
                })                
                clearInterval(intervalStop);
            }else{
                
                this.setState({
                    percentRecord : timer 
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


    renderVideoSuccess(){    
        return (
            <div>
                <div className="usermedia">
                    { (this.state.status === 'STREAMING' || this.state.status === 'RECORDING') ? <video id="videoPlayer" className="videoPlayer" width="320" height="240"></video> : null }
                    { (this.state.status === 'PLAYING') ? <video id="videoResult" width="320" height="240" loop></video> : null }
                </div>

                { (this.state.status === 'UPLOADING') ? <Progressbar percent = { this.state.percentUpload } /> : null }
                { ( !this.props.autoStop && this.state.status === 'RECORDING') ? <button className="btn btn-danger btn-block" onClick={ this.stopRecord } disabled = { this.state.recDisabled }>Stop</button> : null }
                { (this.state.status === 'STREAMING') ? <button className="btn btn-danger btn-block" onClick={ this.countdown } disabled = { this.state.recDisabled }>Rec { this.state.countdown }</button> : null }
                <p>{ this.state.percentRecord }</p>
            </div>
        )
    }//renderVideoSuccess()

    renderVideoError(){
        return (
            <div className="alert alert-danger" role="alert">Get user media is don't available 
                <Upload 
                accept="video" 
                onupload = { this.onUpload }
                >Upload</Upload>
            </div>
        )
    }//renderVideoError()

    onUpload(path){
        this.props.onUpload(path);
    }

    render(){
        return <div>{ (this.state.getUserMediaAvailable)  ? this.renderVideoSuccess() : this.renderVideoError() }</div>;
    }

}

UserMedia.propTypes = {
    countdown : PropTypes.number,
    recordTime: PropTypes.number,
    autoStop : PropTypes.bool,
    autoUpload : PropTypes.bool,
    
    getUserMediaUnavailable : PropTypes.func,
    onUpload : PropTypes.func,
    startRecord : PropTypes.func,
    stopRecord : PropTypes.func
};

UserMedia.defaultProps = {
    countdown : 3,
    recordTime : 5,
    autoStop : true,
    autoUpload : false,

    getUserMediaUnavailable : null,
    onUpload : null,
    startRecord : null,
    stopRecord : null
};

export default UserMedia;