import React, { Component } from 'react';
import style from './Progressbar.css'

class Progressbar extends Component{

    render(){
        
        let bar = {
            width: this.props.percent + '%',
        };
        let show = {
            display : 'block'
        }
        let hide = {
            display : 'none'
        }        

        return(<div className="progress" style={ (this.props.working) ? show : hide }><div className="progress-bar" role="progressbar" aria-valuenow={ this.props.percent } aria-valuemin="0" aria-valuemax="100" style={ bar }>{ this.props.percent }%</div></div>);
    }

}

export default Progressbar;