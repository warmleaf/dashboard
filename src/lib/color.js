export function percentGYR(percent){
    var one = (230+230) / 100;    
    var r=0;
    var g=65;
    var b=50;
  
    if ( percent < 50 ) {
        r = one * percent;
        g=230;
    }  
    if ( percent >= 50 ) {
        g =  230 - ( (percent - 50 ) * one) ;  
        r = 230;  
    }  
    r = parseInt(r);
    g = parseInt(g);
    b = parseInt(b);
  
    return "rgb("+r+","+g+","+b+")";  
          
}

export function stepGYR(percent){
    if (percent >= 0 && percent < 33.33333333) {
        return '#05b964'
    }
    if (percent >= 33.33333333 && percent < 66.66666666) {
        return '#ffbe00'
    }
    if (percent >= 66.66666666 && percent <= 100) {
        return '#f04132'
    }     
}