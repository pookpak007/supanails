export class Book {
    id:Number = 0;
    start_datetime:Date =new Date();
    end_datetime:Date =new Date();
    cus_name:string ="";
    amount:Number = 0;
    tel:string="";
    detail:string="";
    status_own:string="";
    constructor(init?: Partial<Book>) {
        Object.assign(this, init);
      }
}
