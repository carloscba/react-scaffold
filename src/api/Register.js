import axios from 'axios'
import apiConfig from './config'

class Register{
    
    constructor	(locale){
        this.basePath = apiConfig.domain+'API/'+locale+'/';
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
        
        return axios.post(this.basePath+'user/register', formData);
    }

}

export default Register;