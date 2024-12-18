export class sum{
    sum_cash:Number=0;
    sum_digital_money:Number=0;
    sum_month:Number=0;
    constructor(init?:Partial<sum>){
        Object.assign(this,init)
    }
}