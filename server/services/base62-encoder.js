export function encodeBase62(number){
    let allowed_chars='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let encoded_str='';

    while(number>0){
        encoded_str=allowed_chars[number%62]+encoded_str
        number=Math.floor(number/62);
    }

    return encoded_str || '0';
}