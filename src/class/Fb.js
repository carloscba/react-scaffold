import axios from 'axios'

class Fb{
    constructor	(){
        this.basePath = 'https://graph.facebook.com/v2.9/';
        this.accessToken = sessionStorage.getItem('access_token');
        this.userData = JSON.parse(sessionStorage.getItem('userData'));
        this.validateToken(this.accessToken)
    }

    validateToken(){
        let url = this.basePath+'debug_token?access_token='+this.accessToken+'&debug=all&format=json&input_token='+this.accessToken+'';
        
        return axios.get(url).then(function (response) {
            if(response.data.data.is_valid){
                this.isValidToken = true;
            }else{
                this.isValidToken = false;
                this.userData = null;
            }
        }.bind(this)).catch(function (error) {
            this.isValidToken = false;
            this.userData = null;
        }.bind(this));       

    }

    videosPost(videoData){
        const url = 'https://graph-video.facebook.com/'+this.userData.uid+'/videos?access_token='+this.accessToken;
        const data = new FormData();

        data.append('file_url', videoData.file_url);
        data.append('title', videoData.title);
        data.append('description', videoData.description);

        return axios.post(url, data);
    }
}

export default Fb;