import React, { Component } from 'react';
import * as firebase from 'firebase'
import firebaseConfig from '../config/firebaseConfig'

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
            recDisabled : true
        }
    }

    setUserMedia(){
        
        //list of constrains supported by browser
        var supportedConstraints = navigator.mediaDevices.getSupportedConstraints();
        console.log('supportedConstraints', supportedConstraints);

        const constraints = { 
            audio: true, 
            video: { 
                width: 320, 
                height: 250,
            } 
        }

        navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
            this.mediaRecorder = new MediaRecorder(stream);
            this.mediaRecorder.onstop = function(e) {
                console.log('onstop')
            }
            this.mediaRecorder.ondataavailable = function(e) {
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
            /* handle the error */
        });
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
    render(){

        return(
            <div>
                <h1>Media</h1>
                <video id="videoPlayer"></video>
                <button onClick={ this.startRecord.bind(this) } disabled = { this.state.recDisabled }>Rec</button>
                <button onClick={ this.stopRecord.bind(this) } disabled = { this.state.recDisabled }>Stop</button>
            </div>
        )
    }

}

export default UserMedia;