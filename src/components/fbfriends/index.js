import React, { Component } from 'react';
import axios from 'axios'

class Fbfriends extends Component{
    
    constructor(){
        super();
        this.state = {
            friends : null
        }
    }

    componentWillReceiveProps(nextProps){
        
        const accessToken = nextProps.accessToken
        const providerData = nextProps.providerData;

        const url = `https://graph.facebook.com/v2.9/${providerData.uid}/friendlists?access_token=${accessToken}`;
        const _this = this;
        axios.get(url).then(function (response) {
            _this.setState({
                friends : response.data.data
            })
        }).catch(function (error) {
            console.log(error);
        });
      
    }

    render(){

        if(this.state.friends != null){
             var friendLayout = this.state.friends.map(function(item, index){
                let imgPath = `http://graph.facebook.com/${item.id}/picture?type=square`
                return <li key = { index }><img src= { imgPath } /></li>
            });
        }

        return(
            <div>
                Fb Friends
                <h2>{ this.props.accessToken }</h2>
                <ul>{ friendLayout }</ul>
            </div>
        )
    }

}

export default Fbfriends;