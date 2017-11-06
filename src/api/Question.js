import axios from 'axios'
import apiConfig from './config'

class Question{
    
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
        
        return axios.post(this.basePath+'game/questions', formData);
    }

    /*
    {
        "id":4,
        "lang":"es",
        "question":"\u00bfQu\u00e9 \u00e1rea natural protegida en Mendoza tiene cumbres que superan los 5.000m de elevaci\u00f3n?",
        "options":[
        "Reserva Natural y Cultural Manzano Hist\u00f3rico",
        "Parque Provincial Aconcagua",
        "Monumento Natural Puente del Inca"
        ],
        "answer":2,
        "valid":true,
        "status":"ok"
    }     
    */
    validate(data){
        const formData = new FormData();
        for(let field in data){
            formData.append(field, data[field]);    
        }
        
        return axios.post(this.basePath+'game/validate', formData);        
    }

    save(data){
        const formData = new FormData();
        for(let field in data){
            formData.append(field, data[field]);    
        }
        
        return axios.post(this.basePath+'game/result', formData);        
    }   
    
    share(data){
        const formData = new FormData();
        for(let field in data){
            formData.append(field, data[field]);    
        }
        
        return axios.post(this.basePath+'user/share', formData);                
    }

    invite(data){
        const formData = new FormData();
        for(let field in data){
            formData.append(field, data[field]);    
        }
        
        return axios.post(this.basePath+'emails/invite', formData);                
    }    

}

export default Question;