import React, { Component } from 'react';
import style from './Carousel.css';
import data from './Carousel.json';
import OwlCarousel from 'react-owl-carousel';

class Carousel extends Component{

    constructor(){
        super();
        this.data = data;
        this.renderItem = this.renderItem.bind(this);
        this.onSelect = this.onSelect.bind(this);
    }

    onSelect(event){

        let current = event.item.index;
        let video = document.getElementById('video_'+current);
        video.play();

        this.props.onSelect(current);
    }

    renderItem(){
        let itemLayout = [];
        this.data.map(function(item, index){
            itemLayout.push(<div class="item" key={ index }>
                                <video width="320" height="120" id={ "video_"+index } autoplay loop>
                                    <source src={ item.video } type="video/mp4"></source>
                                </video>
                            </div>)
        }.bind(this));
        return itemLayout;    
    }

    render(){

        return <div>
            <OwlCarousel 
                className="owl-theme"
                margin={ 10 } 
                items ={ 1 }
                dots = { false }
                callbacks
                onDragged = { this.onSelect }
                startPosition = { this.props.startPosition }
            >{ this.renderItem() }</OwlCarousel>           
        </div>
    }

}

export default Carousel;