import React, { Component } from 'react';
import * as firebase from 'firebase';
import firebaseConfig from '../config/firebaseConfig';
import Upload from '../components/Upload';
import Progressbar from './Progressbar';
import PropTypes from 'prop-types';
import Style from './Usermedia.css'

const propTypes = {
    countdown : PropTypes.number,
    recordTime: PropTypes.number,
    autostop : PropTypes.bool,
    autoupload : PropTypes.bool
};

const defaultProps = {
    countdown : 3,
    recordTime : 5,
    autostop : true,
    autoupload : false
};

class UserMedia extends Component{
       
    constructor(){
        super();
        this.mediaRecorder;

        console.log('navigator.mediaDevices', navigator.mediaDevices);
        if (navigator.mediaDevices !== undefined) {
            this.setUserMedia()
        }else{
            navigator.mediaDevices = {};
        }

        this.state = {
            status : 'WAITING', //WAITING | STEAMING | RECORDING | PLAYING | UPLOADING | UPLOADED
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
                    stream.stop();
                    const videoData = e.data
                    //Upload record
                    if(this.props.autoupload){

                        let auth =  firebase.auth();
                        let storageRef = firebase.storage().ref();
                        
                        this.setState({
                            status: 'UPLOADING'
                        })
                        //UPLOAD
                        let uploadTask = storageRef.child('video/video.webm').put(videoData);
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
                            console.log(downloadURL);
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
                
                console.log('err', err);
                console.log('stream dont available');
                this.setState({
                    getUserMediaAvailable : false
                });

            }.bind(this));//navigator.mediaDevices.getUserMedia            

        }catch(e){

            console.log(e);
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
        (this.props.autostop) ? this.timerStopRecord() : null;
    }//startRecord()

    stopRecord(){
        if(typeof(this.mediaRecorder) === 'object'){
            this.setState({
                status: 'WAITING'
            });
            this.mediaRecorder.stop();
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
        return (<div>
            <div className="usermedia">
                { (this.state.status === 'STREAMING' || this.state.status === 'RECORDING') ? <video id="videoPlayer" width="320" height="240"></video> : null }
                { (this.state.status === 'PLAYING') ? <video id="videoResult" width="320" height="240"></video> : null }
            </div>
            <h2>{ this.state.status }</h2>
            <p>{ this.state.percentRecord }</p>
            
            { (this.state.status === 'UPLOADING') ? <Progressbar working= { this.state.uploading } percent = { this.state.percentUpload } /> : null }
            
            { ( !this.props.autostop && this.state.status === 'RECORDING') ? <button className="btn btn-danger btn-block" onClick={ this.stopRecord } disabled = { this.state.recDisabled }>Stop</button> : null }
            { (this.state.status === 'STREAMING') ? <button className="btn btn-danger btn-block" onClick={ this.countdown } disabled = { this.state.recDisabled }>Rec { this.state.countdown }</button> : null }
        </div>)
    }//renderVideoSuccess()

    renderVideoError(){
        return (<div className="alert alert-danger" role="alert">Get user media is don't available</div>)
    }     

    render(){
        return(<div>{ (this.state.getUserMediaAvailable)  ? this.renderVideoSuccess() : this.renderVideoError() }</div>);
    }

}

UserMedia.propTypes = propTypes;
UserMedia.defaultProps = defaultProps;

export default UserMedia;