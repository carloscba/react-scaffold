import React, { Component } from 'react';
import style from './Carousel.css';
import data from './Carousel.json';
import OwlCarousel from 'react-owl-carousel';

class Carousel extends Component{

    constructor(){
        super();

        this.state = {
            current : 0,
            data : data
        }
        
        this.onDragged = this.onDragged.bind(this);
        this.previewVideo = this.previewVideo.bind(this);
    }

    onDragged(event){
        let current = event.item.index;
        this.setState({
            current : current
        })
        this.props.onDragged(current);
    }

    previewVideo(current){
        current = (typeof(current) === 'number') ? current : this.state.current;
        let video = document.getElementById('video_'+current);
        video.play();        
    }

    render(){

        let itemLayout = [];
        this.state.data.map(function(item, index){
            itemLayout.push(<div className="item" key={ index }>
                                <video onClick={ this.previewVideo } width="320" height="120" id={ "video_"+index } >
                                    <source src={ item.video } type="video/mp4"></source>
                                </video>
                            </div>)
        }.bind(this));

        return <div>
            <OwlCarousel 
                className="owl-theme"
                margin={ 10 } 
                items ={ 1 }
                dots = { false }
                callbacks
                onDragged = { this.onDragged }
                startPosition = { this.props.startPosition }
            >{ itemLayout }</OwlCarousel>           
        </div>
    }

}

export default Carousel;