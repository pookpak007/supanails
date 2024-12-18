export class accountbook {
    id:Number=0;
    date_time:Date=new Date();
    list:string="";
    cash:Number=0.00;
    digital_money:Number=0.0;
    constructor(init?:Partial<accountbook>){
        Object.assign(this,init);
    }
}