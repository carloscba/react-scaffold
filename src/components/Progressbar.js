import React, { Component } from 'react';
import style from './Progressbar.css'

class Progressbar extends Component{

    render(){
        
        let divStyle = {
            width: this.props.percentLoaded + '%',
        };

        return(<div className="progress"><div className="progress-bar" role="progressbar" aria-valuenow={ this.props.percentLoaded } aria-valuemin="0" aria-valuemax="100" style={ divStyle }>{ this.props.percentLoaded }%</div></div>);
    }

}

export default Progressbar;