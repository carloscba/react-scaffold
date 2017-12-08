import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import loadImage from '../lib/load-image'
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import styles from '../templates/components/ReactScaffoldUpload.css'


class ReactScaffoldUpload extends Component{

    constructor(){
        super();
        this.lastZoom = 0;
        this.state = {
            current : 'UPLOAD', //UPLOAD | CROP | CROPED
            imageUploaded : '',
            imageCropped : ''
        }
    }
    
    
    scale = (event) => {
        try{
            let ratio =  (event.target.value > 50 && event.target.value > this.lastZoom) ? 0.1 : -0.1;
            this.refs.cropper.zoom(ratio, ratio);
            this.lastZoom = event.target.value
        }catch(error){
            console.log(error)
        }
    }
    

    crop = () => {
        const imageCropped = this.refs.cropper.getCroppedCanvas().toDataURL("image/jpeg", 1.0);
        this.props.working(true);
        this.setState({
            current : 'CROPED',
            imageCropped : imageCropped
        },function(){
            this.props.working(false);
            this.props.onCrop(imageCropped);
        }.bind(this))
    }

    cancel = () => {
        this.setState({
            current : 'UPLOAD',
            imageUploaded : '',
            imageCropped : ''
        }, this.setUploader);
    }

    confirm = () => {
        this.props.onConfirm(this.state.imageCropped);
    }

    onUpload = () => {        
        //Obtengo el blob desde el canvas con la imagen
        const canvas = document.getElementsByTagName('canvas')[0]
        const blobData = canvas.toDataURL("image/jpeg", 1.0);

        if(this.props.crop){
            this.setState({
                current : 'CROP',
                imageUploaded : blobData
            })
        }
        this.props.working(false);
        this.props.onUpload(blobData);
    }
    
    getLayout = () => {
        const layoutUpload = (
            <div>
                <input type='file' id='file-input' style={{ display : 'none'}} />
                <img src={ this.props.btnUpload } id='btnUpload' className={ this.props.btnUploadClass} />
            </div>
            
        )

        const layoutCrop = (
            <div>
                <Cropper
                    ref='cropper'
                    src= { this.state.imageUploaded }
                    style={{width: '100%', height: (window.innerWidth < 768) ? (this.props.imageSize[1] / 2) : this.props.imageSize[1]}}
                    dragMode = 'move'
                    aspectRatio={this.props.imageSize[0] / this.props.imageSize[1]}
                    guides={false}
                    modal = {true}
                    background = {false}
                    cropBoxResizable = {false}
                    viewMode = { 1 }
                    toggleDragModeOnDblclick = { false }
                    zoomOnTouch = { false }
                    zoomOnWheel = { false }
                />
                <input onChange = { this.scale } type="range" min="0" max="100" defaultValue="50" className="slider" id="myRange" />
                
                <div>
                    <button className='htz_button' onClick={this.cancel}>Cancel</button>
                    <button className='htz_button' onClick={this.crop}>Crop</button>   
                </div>
            </div>
        )

        const layoutCroped = (
            <div>
                <img style={{ 
                    width : '100%',
                    maxWidth : `${this.props.imageSize[0]}px`
                }} src={ this.state.imageCropped } />
                <div>
                    <button className='htz_button' onClick={this.cancel}>Cancel</button>
                    <button className='htz_button' onClick={this.confirm}>Confirm</button>
                </div>
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
                try{
                    var loadingImage = window.loadImage(
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
                            maxWidth: this.props.imageSize[0] * 2,
                            minWidth: this.props.imageSize[0],
                            meta : true,
                            canvas: true,
                            orientation : true
                        }
                    );
                }catch(error){
                    alert('error on aplication please refresh');
                }
                
            }.bind(this);  
            
            var btnUpload = document.getElementById("btnUpload");
            btnUpload.addEventListener("click", function (e) {
                e.preventDefault();
                if (fileInput) {
                    fileInput.click();
                    btnUpload.addEventListener("click",function(){}, false);                    
                }
            }, false);                  
        }
    }

    componentDidMount(){
        this.setUploader();
    }
    
    componentDidUpdate(){
        //this.setUploader();
    }

}

ReactScaffoldUpload.displayName = 'ReactScaffoldUpload';

ReactScaffoldUpload.propTypes = {
    onUpload : PropTypes.func,
    onCrop : PropTypes.func,
    onConfirm : PropTypes.func,
    working : PropTypes.func,
    crop : PropTypes.bool,
    imageSize : PropTypes.array,
    btnUpload : PropTypes.string,
    btnUploadClass : PropTypes.string,
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
    imageSize : [600, 315],
    btnUpload : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACABAMAAAAxEHz4AAAAA3NCSVQICAjb4U/gAAAACXBIWXMAAAQWAAAEFgHQNM46AAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAACFQTFRF////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA3XBkVwAAAAp0Uk5TAAsQQoCFmLjg4pqv7q8AAAEPSURBVGje7dW7DQIxFETRRSyQUgMVUALxRJRACWSIDuiABiZylQghxH78efYkK/Qmtq9OYrnr8utPnTZQu9+HoBEQAkWARsA7QBGgEPAJUAS0E/ANUAS0EvALUAS0ETAMUAS0EDAOUATUEzANUATUEjAPUATUERALUATUEBAPUATYCUgFKAKsBKQDFAE2AnIBigALAfkARUCZgFKAIqBEQDlAEZAnwBKgCMgRYAtQBKQJsAYoAlIE2AMUAXECagIUATEC6gIUAXMCagMUAVMC6gMjwvo22j1+5Tk+dUw/6208cDF/7x7wgAc84AEPeMADHvDAnwY2j+jOnc/nW/xWh4btB4FdaNjVAx7wwKICLwWET/8pNdYlAAAAAElFTkSuQmCC',
    btnUploadClass : 'btnUpload'
};

export default ReactScaffoldUpload;