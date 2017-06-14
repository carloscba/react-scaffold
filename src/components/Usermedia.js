import React, { Component } from 'react';
import * as firebase from 'firebase';
import firebaseConfig from '../config/firebaseConfig';
import Upload from '../components/Upload';

class UserMedia extends Component{
       
    constructor(){
        super();
        this.mediaRecorder;

        let auth = firebase.auth();
        console.log('auth', auth);

        console.log('navigator.mediaDevices', navigator.mediaDevices);
        if (navigator.mediaDevices !== undefined) {
            this.setUserMedia()
        }else{
            navigator.mediaDevices = {};
        }

        this.state = {
            getUserMediaAvailable : false, 
            recDisabled : true
        }

        this.setUserMedia = this.setUserMedia.bind(this);
        this.setUpload = this.setUpload.bind(this);
        this.startRecord = this.startRecord.bind(this);
        this.stopRecord = this.stopRecord.bind(this);
        this.renderVideoOptions = this.renderVideoOptions.bind(this);
        this.renderUploadOptions = this.renderUploadOptions.bind(this);
    }

    setUserMedia(){
        //list of constrains supported by browser
        var supportedConstraints = navigator.mediaDevices.getSupportedConstraints();
        console.log('supportedConstraints', supportedConstraints);

        const constraints = { 
            audio: false, 
            video: { 
                width: 320, 
                height: 250,
            } 
        }

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
                var auth =  firebase.auth();
                var storageRef = firebase.storage().ref();
                var uploadTask = storageRef.child('video/video.webm').put(e.data);
                uploadTask.on('state_changed', function (snapshot) {
                    console.info(snapshot);
                }, function (error) {
                    console.error(error);
                }, function () {
                    var downloadURL = uploadTask.snapshot.downloadURL;
                    console.log(downloadURL);
                });                

            }

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
            /* handle the error */
        }.bind(this));
    }

    setUpload(){

    }

    startRecord(){
        console.log('this.mediaRecorder', this.mediaRecorder);
        if(typeof(this.mediaRecorder) === 'object'){
            this.mediaRecorder.start();
        }
        
        console.log('startRecord');
    }
    stopRecord(){
        if(typeof(this.mediaRecorder) === 'object'){
            this.mediaRecorder.stop();
        }
        
        console.log('stopRecord');
    }   

    renderVideoOptions(){
        return (<div>
            <h1>Media</h1>
            <video id="videoPlayer"></video>
            <button onClick={ this.startRecord } disabled = { this.state.recDisabled }>Rec</button>
            <button onClick={ this.stopRecord } disabled = { this.state.recDisabled }>Stop</button>        
        </div>)
    } 
    renderUploadOptions(){
        //return (<div><Upload accept="video" /></div>)
        return (<div className="alert alert-danger" role="alert">Get user media is don't available</div>)
    }     

    render(){
        return(<div>{ (this.state.getUserMediaAvailable)  ? this.renderVideoOptions() : this.renderUploadOptions() }</div>);
    }

}

export default UserMedia;