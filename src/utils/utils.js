export function gettime(obj){
    let date=new Date(obj);
    return date.getFullYear()+'-'+addZero(date.getMonth()+1)+'-'+addZero(date.getDate())+' '+addZero(date.getHours())+':'+addZero(date.getMinutes())+':'+addZero(date.getSeconds())
}

export function addZero(num){
    return num<10?'0'+num:num
}