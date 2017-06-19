import React, { Component } from 'react';
import style from './Carousel.css';
import data from './Carousel.json';
import OwlCarousel from 'react-owl-carousel';

class Carousel extends Component{

    constructor(){
        super();
        this.data = data;
        this.renderItem = this.renderItem.bind(this);
    }

    renderItem(){
        let itemLayout = [];
        this.data.map(function(item, index){
            itemLayout.push(<div class="item" key={ index }><h4>{ item.title }</h4></div>)
        });
        return itemLayout;    
    
    }

    render(){

        return <div>
            <OwlCarousel 
                className="owl-theme"
                loop 
                margin={10} 
                nav
            >{ this.renderItem() }</OwlCarousel>           
        </div>
    }

}

export default Carousel;