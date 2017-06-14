import React, { Component } from 'react';
import * as firebase from 'firebase'
import firebaseConfig from '../config/firebaseConfig'
import style from './Upload.css'

class Upload extends Component{

    constructor(){
        super();

        this.state = {
            uploading : false,
            acceptFile : '',
            percentLoaded : 0,
            uploadPath : ''
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
            
            //UPLOAD script
            this.setState({
                uploading : true
            })
            var uploadTask = storageRef.child(`video/${ file.name }`).put(file);

            uploadTask.on('state_changed', function (snapshot) {
                
                let currentPercent = Math.round((100 * snapshot.bytesTransferred)/snapshot.totalBytes);
                console.log('currentPercent', currentPercent);
                this.setState({
                    percentLoaded : currentPercent
                })

            }.bind(this), function (error) {
                
                console.error(error);
                this.setState({
                    uploading : false,
                });           

            }.bind(this), function () {
                var downloadURL = uploadTask.snapshot.downloadURL;
                console.log(downloadURL);

                this.setState({
                    uploading : false,
                    uploadPath : downloadURL
                });
                
            }.bind(this)); 
        }
    }

    renderUploadInput(){

        let divStyle = {
            width: this.state.percentLoaded + '%',
        };

        let uploadLayout;
        if(this.state.uploadPath === ''){

            if(!this.state.uploading){
                uploadLayout = <div><input type="file" accept = { this.state.acceptFile } id="input" className="fileInput" /><button id="btnUpload" className="btn btn-primary btn-block">{ this.props.children }</button></div>
            }else{
                uploadLayout = <div className="progress"><div className="progress-bar" role="progressbar" aria-valuenow={ this.state.percentLoaded } aria-valuemin="0" aria-valuemax="100" style={ divStyle }>{ this.state.percentLoaded }%</div></div>
            }

        }else{
            switch(this.state.acceptFile){
                case 'image/*':
                    uploadLayout = <div><img src = { this.state.uploadPath } className="img-upload" /></div>
                    break;
                default:
                    uploadLayout = <div>{ this.state.uploadPath }</div>
                    break;
            }
            
        }


        return (<div>{ uploadLayout }</div>);
    }

    componentWillMount(){

        let acceptFile;
        switch(this.props.accept){
            case 'audio':
                acceptFile = 'audio/*';
                break;
            case 'video':
                acceptFile = 'video/*';
                break; 
            case 'image':
                acceptFile = 'image/*';
                break;                
            default:
                acceptFile = 'media_type';
                break;                                               
        }
        this.setState({
            acceptFile : acceptFile
        })

    }

    render(){
        return(<div>{ this.renderUploadInput() }</div>);
    }
    
    componentDidMount(){
        var inputElement = document.getElementById("input");
        inputElement.addEventListener("change", this.handleFiles, false);

        var btnUpload = document.getElementById("btnUpload");
        btnUpload.addEventListener("click", function (e) {
            e.preventDefault();
            if (inputElement) {
                inputElement.click();
            }
        }, false);
    }
}

export default Upload;