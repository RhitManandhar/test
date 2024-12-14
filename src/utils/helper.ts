export const getRndNumber= (min:number, max:number) =>{
    return Math.floor(Math.random() * (max - min) ) + min;
}