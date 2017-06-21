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
        this.props.onSelect(event.target.currentSrc)
    }

    renderItem(){
        let itemLayout = [];
        this.data.map(function(item, index){
            itemLayout.push(<div class="item" key={ index }>
                <a onClick={ this.onSelect } >
                    <video width="320" height="120" controls>
                        <source src={ item.video } type="video/mp4"></source>
                    </video>
                </a>
            </div>)
        }.bind(this));
        return itemLayout;    
    }

    render(){

        return <div>
            <OwlCarousel 
                className="owl-theme"
                loop 
                margin={10} 
                items ={1}
            >{ this.renderItem() }</OwlCarousel>           
        </div>
    }

}

export default Carousel;