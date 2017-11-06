import axios from 'axios'
import DoubleClick from './DoubleClick'

class Fb{
    
    /**
     * 
     * @param {app of facebook app} appId 
     * @param {access token provided for firebase available in store} accessToken 
     * @param {user id of current user} uid 
     */
    constructor	(accessToken, uid){
        this.basePath = 'https://graph.facebook.com/v2.9/';
        this.appId = window.appId;
        this.accessToken = accessToken;
        this.uid = uid;
    }
    /**
     * 
     * @param {url to share} href 
     * @param {url where will be redirect after share} redirect_uri 
     */
    share(href, redirect_uri){
        
        window.trackFb('ViewContent','share')

        var axel = Math.random() + "";
        var a = axel * 10000000000000;
        const dc = new DoubleClick();
        dc.track('https://8053303.fls.doubleclick.net/activityi;src=8053303;type=mdz-mlb;cat=cpa1000;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;ord=' + a + '?')        

        if(window.innerWidth < 990){
            const url = `https://www.facebook.com/dialog/share?app_id=${this.appId}&href=${href}&redirect_uri=${redirect_uri}&display=page`;
            window.location = url;                
        }else{
            window.FB.ui({
                method: 'share',
                href: href,
            }, function(response){});
        }
    }

    getShareUrl(href, redirect_uri){
        const url = `https://www.facebook.com/dialog/share?app_id=${this.appId}&href=${href}&redirect_uri=${redirect_uri}&display=page`;
        return url;
    }

    /**
     * 
     * @param {*} videoData 
     */
    postVideo(videoData){
        const url = 'https://graph-video.facebook.com/'+this.uid+'/videos?access_token='+this.accessToken;
        
        const data = new FormData();
        data.append('file_url', videoData.file_url);
        data.append('title', videoData.title);
        data.append('description', videoData.description);

        return axios.post(url, data);
    }

    postImage(imageData){
        const url = 'https://graph.facebook.com/v2.4/me/photos';
        
        const data = new FormData();
        data.append('url', imageData.url);
        data.append('caption', imageData.caption);
        data.append('access_token', this.accessToken);

        return axios.post(url, data);

    }    
}

export default Fb;