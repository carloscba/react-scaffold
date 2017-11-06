import axios from 'axios'

class DoubleClick{
    
    constructor	(){
        
    }

    track(url){
        return axios.get(url);
    }

}

export default DoubleClick;