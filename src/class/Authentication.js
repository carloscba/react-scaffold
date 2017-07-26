import axios from 'axios'

class Authentication{
    
    constructor	(){    
        this.provider = sessionStorage.getItem('provider');
        this.access_token = sessionStorage.getItem('access_token');
    }    

    check(){
        switch(this.provider){
            case 'google':
                const url = `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${this.access_token}`
                return axios.get(url);
            break;
        }        
    }

    isAuthenticated(data){
        switch(this.provider){
            case 'google':
                if(data.user_id){
                    return true;
                }else{
                    return false;
                }
            break;
        }
    }




}

export default Authentication;