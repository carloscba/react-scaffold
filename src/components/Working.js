import React, { Component } from 'react';
import PropTypes from 'prop-types';

import working from '../images/working.svg'
import style from '../templates/components/Working.css'

class Working extends Component{

    constructor(){
        super();
    }
    render(){
        const layoutWorking = (
            <div className='working'>
                <img className='working__image' src={ working } />
            </div>
        )

        return (this.props.isWorking) ? layoutWorking : null;
    }
}

Working.propTypes = {
    isWorking : PropTypes.bool,
};

Working.defaultProps = {
    isWorking : false,
};

export default Working;