import React, { Component } from 'react';
import PropTypes from 'prop-types';
import loadImage from '../lib/load-image'
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

class ReactScaffoldUpload extends Component{

    constructor(){
        super();
        this.state = {
            current : 'UPLOAD', //UPLOAD | CROP | CROPED
            imageData : ''
        }
    }
    
    crop = () => {
        this.props.working(true);
        const imageData = this.refs.cropper.getCroppedCanvas().toDataURL();

        this.setState({
            current : 'CROPED',
            imageData : imageData 
        })
        this.props.working(false);
        this.props.onCrop(imageData);
    }

    cancel = () => {
        this.setState({
            current : 'UPLOAD',
            imageData : '' 
        });
    }

    confirm = () => {
        this.props.onConfirm(this.state.imageData);
    }

    onUpload = () => {        
        
        //Obtengo el blob desde el canvas con la imagen
        const canvas = document.getElementsByTagName('canvas')[0]
        const blobData = canvas.toDataURL("image/jpeg", 1.0);

        if(this.props.crop){
            this.setState({
                current : 'CROP',
                imageData : blobData
            })
        }
        this.props.working(false);
        console.log('onUpload');
        this.props.onUpload(blobData);
    }
    
    getLayout = () => {
        const layoutUpload = (
            <input type='file' id='file-input' />
        )

        const layoutCrop = (
            <div>
                <h2>layoutCrop</h2>
                <Cropper
                    ref='cropper'
                    src= { this.state.imageData }
                    style={{height: this.props.imageSize[1], width: '100%'}}
                    dragMode = 'move'
                    aspectRatio={this.props.imageSize[0] / this.props.imageSize[1]}
                    guides={false}
                    modal = {true}
                    background = {false}
                    cropBoxResizable = {false}
                />
                <button onClick={this.cancel}>Cancel</button>
                <button onClick={this.crop}>Crop</button>   
            </div>
        )

        const layoutCroped = (
            <div>
                <h2>layoutCroped</h2>
                <img style={{ 
                    width : '100%',
                    maxWidth : `${this.props.imageSize[0]}px`
                }} src={ this.state.imageData } />
                <button onClick={this.cancel}>Cancel</button>
                <button onClick={this.confirm}>Confirm</button>
            </div>
        )

        switch(this.state.current){
            case 'UPLOAD':
                return layoutUpload;
            break;
            case 'CROP':
                return layoutCrop;
            break;
            case 'CROPED':
                return layoutCroped;
            break;                              
        }
    }

    render(){
        return <div>{ this.getLayout() }<div id='imageContainer' style={ { display: 'none' } }></div></div>;
    }

    setUploader = () => {

        const fileInput = document.getElementById('file-input');
        
        if(fileInput !== null){
            fileInput.onchange = function (e) {
                this.props.working(true);
                var loadingImage = loadImage(
                    e.target.files[0],
                    function (img, meta) {
                        
                        //Tomo la imagen y la previsualizo en el contenedor
                        const imageContainer = document.getElementById('imageContainer');
                        if(imageContainer.childNodes[0]){
                            imageContainer.replaceChild(img, imageContainer.childNodes[0]);
                        }else{
                            imageContainer.appendChild(img);
                        }
                        
                        fileInput.style.display = "none";
    
                        this.onUpload();
    
                    }.bind(this),
                    {
                        minWidth: this.props.imageSize[0],
                        minHeight: this.props.imageSize[1],                        
                        meta : true,
                        canvas: true
                    }
                );
            }.bind(this);        
        }
    }

    componentDidMount(){
        this.setUploader();
    }
    
    componentDidUpdate(){
        this.setUploader();
    }

}

ReactScaffoldUpload.displayName = 'ReactScaffoldUpload';

ReactScaffoldUpload.propTypes = {
    onUpload : PropTypes.func,
    onCrop : PropTypes.func,
    onConfirm : PropTypes.func,
    working : PropTypes.func,
    crop : PropTypes.bool,
    imageSize : PropTypes.array
};

ReactScaffoldUpload.defaultProps = {
    onUpload : function(){
        return false
    },
    onCrop : function(){
        return false
    },   
    onConfirm : function(){
        return false
    },        
    working : function(){
        return false
    },            
    crop : false,
    imageSize : [600, 315]
};

export default ReactScaffoldUpload;