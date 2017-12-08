import es from '../locale/es';
import en from '../locale/en';
import pt from '../locale/pt';

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
            case 'pt':
                this.copy = pt;
            break;
            default:
                this.copy = es;
            break;                        
        }        
        return this.copy[container];
    }

}

export default Locale;