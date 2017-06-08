import React, { Component } from 'react';

class Fbfriends extends Component{
    
    render(){
        return(
            <div>
                Fb Friends
                <h2>{ this.props.accessToken }</h2>
            </div>
        )
    }

}

export default Fbfriends;