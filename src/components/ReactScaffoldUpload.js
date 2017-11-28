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
        const imageData = this.refs.cropper.getCroppedCanvas().toDataURL();

        this.setState({
            current : 'CROPED',
            imageData : imageData 
        })
        this.props.onCrop(imageData);
    }

    onUpload = () => {        
        //Obtengo el blob desde el canvas con la imagen
        const canvas = document.getElementsByTagName('canvas')[0]
        const blobData = canvas.toDataURL("image/jpeg", 1.0);

        this.setState({
            current : 'CROP',
            imageData : blobData
        })
        
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
                    style={{height: 315, width: '100%'}}
                    dragMode = 'move'
                    aspectRatio={600 / 315}
                    guides={false}
                    modal = {true}
                    background = {false}
                    cropBoxResizable = {false}
                />
                <button onClick={this.crop}>Crop</button>   
            </div>
        )

        const layoutCroped = (
            <div>
                <h2>layoutCroped</h2>
                <img width='100%' src={ this.state.imageData } />
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

    componentDidMount(){
        
        const fileInput = document.getElementById('file-input')
        
        fileInput.onchange = function (e) {
            var loadingImage = loadImage(
                e.target.files[0],
                function (img, meta) {
                    //Tomo la imagen y la previsualizo en el contenedor
                    const imageContainer = document.getElementById('imageContainer');
                    imageContainer.appendChild(img);

                    fileInput.style.display = "none";

                    this.onUpload();

                }.bind(this),
                {
                    /*
                    maxWidth: 600,
                    maxHeight: 315,
                    */
                    meta : true,
                    canvas: true
                }
            );
        }.bind(this);        
    }

}

ReactScaffoldUpload.displayName = 'ReactScaffoldUpload';

ReactScaffoldUpload.propTypes = {
    onUpload : PropTypes.func,
    onCrop : PropTypes.func,
};

ReactScaffoldUpload.defaultProps = {
    onUpload : function(){
        return false
    },
    onCrop : function(){
        return false
    },    
};

export default ReactScaffoldUpload;