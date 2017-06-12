import React, { Component } from 'react';

class UserMedia extends Component{
    
    constructor(){
        super();

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

    render(){
        return(
            <div>
                <h1>Media</h1>
                <video id="videoPlayer"></video>
                <button disabled = { this.state.recDisabled }>Rec</button>
            </div>
        )
    }

}

export default UserMedia;