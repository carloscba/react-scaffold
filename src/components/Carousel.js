import React, { Component } from 'react';
import style from '../templates/components/Carousel.css';
import data from './Carousel.json';
import PropTypes from 'prop-types';
import OwlCarousel from 'react-owl-carousel';

class Carousel extends Component{

    constructor(){
        super();
        
        this.state = {
            current : 0,
            data : data
        }
        this.players = [];
        this.videoLoaded = 0;
        
        this.onTranslated = this.onTranslated.bind(this);
        this.previewVideo = this.previewVideo.bind(this);
    }

    onTranslated(event){
        let current = event.item.index;
        this.setState({
            current : current
        })
        this.props.onTranslated(current, this.players[current], event.item.count);
    }

    previewVideo(event){
        event.target.play(); 
    }

    render(){

        let itemLayout = [];
        this.state.data.map(function(item, index){
            itemLayout.push(<div className="item" key={ index }>
                                <video onClick={ this.previewVideo } id={ "video_"+index } >
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
                nav
                navText = { ['<','>'] }
                callbacks
                onTranslated = { this.onTranslated }
                startPosition = { this.props.startPosition }
            >{ itemLayout }</OwlCarousel>           
        </div>
    }

    componentDidMount(){
        data.map((item, index)=>{
            this.players.push(document.getElementById(`video_${index}`));
            
            this.players[index].onloadedmetadata = function(event){
                //check video loaded
                this.videoLoaded++;
                if(this.videoLoaded === data.length){
                    (this.props.ready) ? this.props.ready() : null; 
                }
            }.bind(this);
        });
        
        this.props.onTranslated(0, this.players[0]);
    }
}

Carousel.propTypes = {
    startPosition: PropTypes.number,
    onTranslated : PropTypes.func,
    ready : PropTypes.func
};

Carousel.defaultProps = {
    startPosition : 0,
    onTranslated : null,
    ready : null
};

export default Carousel;