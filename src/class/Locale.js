import es from '../locale/es';
import en from '../locale/en';

class Locale{
    constructor	(){
        
    }

    get(container, locale){
        switch(locale){
            case 'en':
                this.copy = en;
            break;
            case 'es':
                this.copy = es;
            break;
            default:
                this.copy = es;
            break;                        
        }        
        return this.copy[container];
    }

}

export default Locale;