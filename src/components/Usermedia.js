import React, { Component } from 'react';
import * as firebase from 'firebase';
import firebaseConfig from '../config/firebaseConfig';
import Upload from '../components/Upload';
import Progressbar from './Progressbar';
import Style from './Usermedia.css'

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
            getUserMediaAvailable : false, 
            recDisabled : true,
            recording : false,
            percentRecord: 0,
            uploading:false,
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
        console.log('supportedConstraints', supportedConstraints);

        const constraints = { 
            audio: false, 
            video: { 
                width: 320, 
                height: 240
            } 
        }

        try{
            navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {

                console.log('stream available');
                this.setState({
                    getUserMediaAvailable : true
                })

                this.mediaRecorder = new MediaRecorder(stream);
                this.mediaRecorder.onstop = function(e) {
                    console.log('onstop')
                }
                this.mediaRecorder.ondataavailable = function(e) {
                    //Upload record
                    console.log('Uploading');
                    var auth =  firebase.auth();
                    var storageRef = firebase.storage().ref();
                    var uploadTask = storageRef.child('video/video.webm').put(e.data);

                    this.setState({
                        uploading: true
                    })

                    //UPLOAD
                    uploadTask.on('state_changed', function (snapshot) {
                        
                        let currentPercent = Math.round((100 * snapshot.bytesTransferred)/snapshot.totalBytes);

                        this.setState({
                            percentUpload : currentPercent
                        });

                    }.bind(this), function (error) {
                        this.setState({
                            uploading: false
                        });
                    }.bind(this), function () {
                        this.setState({
                            uploading: false
                        });
                        var downloadURL = uploadTask.snapshot.downloadURL;
                        console.log(downloadURL);
                    }.bind(this));// uploadTask.on
                }.bind(this);//this.mediaRecorder.ondataavailable

                console.log('this.mediaRecorder', typeof(this.mediaRecorder));

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

            }.bind(this)).catch(function(err) {
                console.log('stream dont available');
                this.setState({
                    getUserMediaAvailable : false
                })            
            }.bind(this));//navigator.mediaDevices.getUserMedia            

        }catch(e){
            console.log(e);
            this.setState({
                getUserMediaAvailable : false
            })            
        }
        
    }

     startRecord(){
        
        console.log('this.mediaRecorder', this.mediaRecorder);
        if(typeof(this.mediaRecorder) === 'object'){
            this.setState({
                recording: true
            });
            this.mediaRecorder.start();
        }
        this.timerStopRecord();
        
        console.log('startRecord');
    }

    timerStopRecord(){
        console.log('timerStopRecord');
        const timeRecord = 8;
        let timer = 0;
        let currentPercent
        let intervalStop = window.setInterval(function(){
            
            if(timer === timeRecord){
                this.stopRecord();
                this.setState({
                    percentRecord : 100 
                })                
                clearInterval(intervalStop);
            }else{
                console.log(timer);
                let currentPercent = Math.round((100 * timer)/timeRecord);
                this.setState({
                    percentRecord : currentPercent 
                })
                timer++;
            }
            
        }.bind(this), 1000);        
    }

    stopRecord(){
        if(typeof(this.mediaRecorder) === 'object'){
            this.setState({
                recording: false
            });
            this.mediaRecorder.stop();
        }        
        console.log('stopRecord');
    }   

    countdown(){
        let timer = 5;
        let intervalID = window.setInterval(function(){
            
            if((timer) === 0){
                this.startRecord();
                clearInterval(intervalID);
            }else{
                console.log(timer);
                this.setState({
                    countdown: timer
                })
                timer--;
            }
            
        }.bind(this), 1000);
    }

    renderVideoSuccess(){
        //<button className="btn btn-danger btn-block" onClick={ this.stopRecord } disabled = { this.state.recDisabled }>Stop</button>        
        return (<div>
            <div className="usermedia">
                <video id="videoPlayer" width="320" height="240"></video>
                <div className="overlay"></div>
            </div>
            <Progressbar working= { this.state.recording } percent = { this.state.percentRecord } />
            <Progressbar working= { this.state.uploading } percent = { this.state.percentUpload } />
            { (!this.state.percentRecord && !this.state.percentUpload) ? <button className="btn btn-danger btn-block" onClick={ this.countdown } disabled = { this.state.recDisabled }>Rec { this.state.countdown }</button> : null }
        </div>)
    } 
    renderVideoError(){
        return (<div className="alert alert-danger" role="alert">Get user media is don't available</div>)
    }     

    render(){
        return(<div>{ (this.state.getUserMediaAvailable)  ? this.renderVideoSuccess() : this.renderVideoError() }</div>);
    }

}

export default UserMedia;