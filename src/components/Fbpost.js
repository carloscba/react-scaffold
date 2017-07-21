import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from '../templates/components/Fbpost.css'
import Fb from '../class/Fb'

class Fbpost extends Component{

    constructor(){
        super();
        this.fb = new Fb();

        this.share = this.post.bind(this);
        this.videosPost = this.videosPost.bind(this);
        this.post = this.post.bind(this);
    }

    share(){
        window.FB.ui({
            method: 'share_open_graph',
            action_type: 'og.likes',
            action_properties: JSON.stringify({
                object:'https://developers.facebook.com/docs/',
            })
        }, function(response){
            // Debug response (optional)
            console.log(response);
        });
    }

    videosPost(){
        
        this.fb.videosPost({
            file_url: this.props.url,
            title: this.props.title,
            description:  this.props.description
        }).then(function(event){
            console.log(event);
        }).catch(function (error) {
            console.log(error);
        });

    }

    post(){
        (this.fb.isValidToken) ? this.fb.videosPost('asdasd') : alert('KO');
    }

    render(){

        const layoutVideo = <button className="btn btn-primary fb-post__post-video" onClick={ this.videosPost }>Post Video</button>
        const layoutImage = <button className="btn btn-primary fb-post__post-video" onClick={ this.videosPost }>Post Image</button>

        return(
            <div>
                { (this.props.type === 'videos') ? layoutVideo : null }
                { (this.props.type === 'images') ? layoutImage : null }
            </div>
        )
    }

}

Fbpost.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  url: PropTypes.string,
};

Fbpost.defaultProps = {
    type: '',
    title: '',
    description: '',
    url: '',
};

export default Fbpost;