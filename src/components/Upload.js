import React, { Component } from 'react';
import * as firebase from 'firebase'
import firebaseConfig from '../config/firebaseConfig'

class Upload extends Component{

    constructor(){
        super();
        this.state = {

        }
        this.handleFiles = this.handleFiles.bind(this);
        this.renderUploadInput = this.renderUploadInput.bind(this);
    }

    handleFiles(newFile){
        
        let file ;

        try{
            file = newFile.target.files[0];
        }catch(e){
            console.log('error on select file');
        }
        

        if(typeof(file) !== 'undefined'){
            var storageRef = firebase.storage().ref();
            var uploadTask = storageRef.child(`video/${ file.name }`).put(file);

            uploadTask.on('state_changed', function (snapshot) {
                console.info(snapshot);
            }, function (error) {
                console.error(error);
            }, function () {
                var downloadURL = uploadTask.snapshot.downloadURL;
                console.log(downloadURL);
            }); 
        }


        
    }
    renderUploadInput(){
        return (<div>
            <input type="file" id="input" />
        </div>);

    }

    render(){
        return(<div>{ this.renderUploadInput() }</div>);
    }
    
    componentDidMount(){
        var inputElement = document.getElementById("input");
        inputElement.addEventListener("change", this.handleFiles, false);
    }

}

export default Upload;