
import DoubleClick from './DoubleClick'

class Tw{
    constructor	(){
    }    
    
    /**
     * 
     * @param {text to tweet} text
     * @param {url for tweet} url 
     */
    tweet(text, sourceUrl){
        window.trackFb('ViewContent','share')
        
        var axel = Math.random() + "";
        var a = axel * 10000000000000;
        const dc = new DoubleClick();
        dc.track('https://8053303.fls.doubleclick.net/activityi;src=8053303;type=mdz-mlb;cat=cpa1000;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;ord=' + a + '?')

        let tweet = encodeURI(`${text} ${sourceUrl}`);
        let url = `https://twitter.com/intent/tweet?text=${tweet}`;
        window.open(url);

        return true;
    }    
}

export default Tw;