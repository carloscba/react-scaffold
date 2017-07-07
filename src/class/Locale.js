import es from '../locale/es';
import en from '../locale/en';

class Locale{
    constructor	(parent){
        if(typeof(parent) === 'string'){
            this.parentName = parent;
        }else{
            this.parentName = Object.getPrototypeOf(parent).constructor.name
        }
        
        switch(window.locale){
            case 'en':
                this.copy = en;
            break;
            case 'es':
                this.copy = es;
            break;
            default:
                this.copy = en;
            break;                        
        }
    }

    get(container){
        return (container) ? this.copy[container] : this.copy[this.parentName];
    }

}

export default Locale;