export function numberWithCommas(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function beautifyReturns(num){
    return num !== null ? 
        (num >= 0 ? '+$' + numberWithCommas(parseFloat(num).toFixed(2)) : 
        '-$' + numberWithCommas(Math.abs(parseFloat(num)).toFixed(2))) : '-';
}

export function beautifyPrice(num){
    return num !== null ? '$' + numberWithCommas((parseFloat(num).toFixed(2))) : '-';
}