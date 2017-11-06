/**
 * Retorna la url para compartir a los referidos
 * @param {string} locale valor tomado desde la url, puede ser undefined 
  */
  export default function(){ 
    let data = {
        locale : 'es',
        currentPage : 'con-amor-mendoza'
    };
    
    if(window.location.href.indexOf('/con-amor-mendoza') > -1 || window.location.href.indexOf('/con-amor-mendoza/') > -1){
        data = {
            locale : 'es',
            currentPage : 'con-amor-mendoza'
        };
    }
    if(window.location.href.indexOf('/with-love-mendoza') > -1 || window.location.href.indexOf('/with-love-mendoza/') > -1){
        data = {
            locale : 'en',
            currentPage : 'with-love-mendoza'
        };
    }    
    
    
    return data
}