import axios from 'axios'

class DjangoRest{
  constructor	(){
    this.basepath = 'http://localhost:8000'
  }

  post(endPoint, data){

    const url =  `${this.basepath}/${endPoint}`;
    const postData = new FormData();

    for(let key in data){
      postData.append(key, data[key]);
    }

    return axios.post(url, postData)

  }

}

export default DjangoRest;
