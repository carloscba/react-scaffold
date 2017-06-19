import React, { Component } from 'react';
import Usermedia from '../components/Usermedia'
import Upload from '../components/Upload'
import Carousel from '../components/Carousel'

class Step1 extends Component{

    render(){
        return(
            <div>
                <h2>Step1</h2>
                <Upload 
                    accept="video" 
                    index="0"
                >Upload</Upload>
                
                <br/>
                
                <Usermedia 
                    countdown = "3"
                    recordTime = "5"
                    autostop
                />
                <hr />
                <Carousel />
            </div>
        )
    }

}

export default Step1;