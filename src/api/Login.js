import axios from 'axios'
import apiConfig from './config'

class Login{
    
    constructor	(){
        this.basePath = apiConfig.domain+'API/en/';        
    }
    /**
     * 
     * @param {*} data 
     */
    post(data){
        const formData = new FormData();
        for(let field in data){
            formData.append(field, data[field]);    
        }
        
        return axios.post(this.basePath+'user/login', formData);
    }

    get(id){
        return axios.get(this.basePath+'user/info/'+id);
    }


}

export default Login;