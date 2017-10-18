import React, { Component } from 'react';
import * as firebase from 'firebase';
import PropTypes from 'prop-types';
import style from '../templates/components/Upload.css';

/**
 * 
 */
class Upload extends Component{

    constructor(){
        super();

        this.state = {
            current : 'WAITING', //UPLOADING|UPLOADED|WAITING
            uploading : false,
            acceptFile : '',
            firebasePath : '' //URL of file on firebase
        }
        
        this.handleFiles = this.handleFiles.bind(this);
        this.renderUploadInput = this.renderUploadInput.bind(this);
        this.onUpload = this.onUpload.bind(this);
    }

    handleFiles(newFile){
        let file ;
        try{
            file = newFile.target.files[0];
        }catch(e){
            //console.log('error on select file');
        }

        if(typeof(file) !== 'undefined'){
            
            var storageRef = firebase.storage().ref();
            (this.props.onStartUpload) ? this.props.onStartUpload() : null;
            //UPLOAD script
            this.setState({
                uploading : true
            })
            //WORKING
            

            var uploadTask = storageRef.child(`video/${ Date.now() }.webm`).put(file);

            uploadTask.on('state_changed', function (snapshot) {
                
                let currentPercent = Math.round((100 * snapshot.bytesTransferred)/snapshot.totalBytes);
                
                (this.props.getPercent) ? this.props.getPercent(currentPercent) : null;


            }.bind(this), function (error) {
                
                this.setState({
                    uploading : false,
                });           

            }.bind(this), function () {
                var downloadURL = uploadTask.snapshot.downloadURL;
                this.onUpload(downloadURL)

                this.setState({
                    uploading : false,
                    firebasePath : downloadURL
                });
                
            }.bind(this)); 
        }
    }

    renderUploadInput(){

        let uploadLayout;
        if(this.state.firebasePath === ''){
            if(this.state.current === 'WAITING'){
                uploadLayout = (
                    <div>
                        <input type="file" accept = { this.state.acceptFile } id="input" className="fileInput" />
                        <button className='upload__button' id='btnUpload'>{ this.props.children }</button>
                    </div>
                );
            }else{
                uploadLayout = ''
            }

        }else{
            if(this.props.preview){
                switch(this.state.acceptFile){
                    case 'image/*':
                        uploadLayout = <div><img src = { this.state.firebasePath } className="img-upload" /></div>
                        break;
                    default:
                        uploadLayout = <div>{ this.state.firebasePath }</div>
                        break;
                }
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

    onUpload(path){
        (this.props.onUpload) ? this.props.onUpload(path) : null;
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

Upload.propTypes = {
    onStartUpload : PropTypes.func,
    getPercent : PropTypes.func,
    onUpload : PropTypes.func,
    preview : PropTypes.bool,
};

Upload.defaultProps = {
    onStartUpload : null,
    getPercent : null,
    onUpload : null,
    preview : true
};

export default Upload;