import axios from 'axios'

class User{
    
    constructor	(){
        this.endPoint = 'http://127.0.0.1:8000/api/user/';
    }
    /**
     * 
     * @param {*} data 
     */
    post(data){
        return axios.post(this.endPoint, data);
    }

    get(id){
        if(id){
            return axios.get(`${this.endPoint}${id}`);
        }else{
            return axios.get(this.endPoint);
        }
        
    }    

}

export default User;