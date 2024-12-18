import { Component } from '@angular/core';
import { accountbook } from '../../models/accountbook';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CallapiService } from '../../services/callapi.service';
import { ToastrService } from 'ngx-toastr';
import { sum } from '../../models/sum';
@Component({
  selector: 'app-accountbook',
  standalone: true,
  imports: [
  ReactiveFormsModule,
    CommonModule
  ],
  providers:[DatePipe],
  templateUrl: './accountbook.component.html',
  styleUrl: './accountbook.component.css'
})
export class AccountbookComponent {
 //ตัวแปร
accbook:accountbook = new accountbook();
fg_createbook!:FormGroup;
btn_deleteAccBook="show";
load_deleteAccBook="un-show spinner-border text-danger";
fg_accountbook!:FormGroup;

//ตัวแปรไว้วนลูปแสดงใน html
item_accbook:accountbook[]=[];
item_sumaccbook:sum[]=[new sum()];
month:Number=0;
  //constuctor
  constructor(
    private datepipe:DatePipe,
    private api:CallapiService,
    private fb_createbook:FormBuilder,
    private toast:ToastrService,
    private fb_accountbook:FormBuilder
  ){}

 //ฟังชั่นเริ่มต้น
 ngOnInit(): void {
  let getdate = new Date(this.datepipe.transform(new Date(),'yyyy-MM-ddTHH:mm','th-TH')+':00');
  let timezone = 0;
  if(getdate.getTimezoneOffset() <0){
    timezone = (getdate.getTimezoneOffset()*-1)/60;
    getdate.setHours(getdate.getHours()+timezone);
  }
  if(getdate.getTimezoneOffset() >0){
    timezone = (getdate.getTimezoneOffset()*-1)/60;
    getdate.setHours(getdate.getHours()+timezone);
  }
  this.fg_createbook = this.fb_createbook.group({
    date_time:[this.datepipe.transform(new Date(),'yyyy-MM-dd','th-TH'),Validators.required],
    list:['',Validators.max(255)],
    cash:[0.00,Validators.required],
    digital_money:[0.00,Validators.required]
  });

  //fb_accountbook ค่าเริ่มต้นวันที่
  this.fg_accountbook = this.fb_accountbook.group({
    date_time:this.datepipe.transform(new Date(),'yyyy-MM-dd','th-TH')
  });

  console.log(this.fg_createbook.value.date_time);
  //ดึงรายการบัญชีวันเริ่มต้น
  this.accbook.date_time = getdate;
  this.month = getdate.getMonth()+1;
  console.log(this.accbook);
  this.api.GetAccountBook(this.accbook).subscribe(
    res =>{
      if(!Array.isArray(res.body)){
        this.item_accbook =[];
      }else{
        console.log(res.body);
        this.item_accbook = res.body;
      }
    }
  );

  //ดึงยอดรวมเริ่มต้น
  let date = this.fg_accountbook.value.date_time;
  this.accbook.date_time = date;
  this.api.SumAccountBookByDate(this.accbook).subscribe(
    res =>{
      console.log(res.body);
      this.item_sumaccbook = res.body;
      console.log(res.boy);
    }
  );

 }

 getAccountcurrent(){
  this.api.GetAccountBook(this.accbook).subscribe(
    res =>{
      if(!Array.isArray(res.body)){
        this.item_accbook =[];
      }else{
        console.log(res.body);
        this.item_accbook = res.body;
      }

    }
  );
 }

 //บันทึกบัญชี
 saveAccbook(){
  if(this.fg_createbook.invalid){
    this.fg_createbook.patchValue({
      cash:[0],
      digital_money:[0]
    });
    this.toast.warning('กรอกค่าไม่ครบ ระบบใส่ค่าเริ่มต้นให้ใหม่ ตรวจสอบใหม่อีกครั้ง');
  }else{
    this.accbook.date_time = this.fg_createbook.value.date_time;
    this.accbook.list = this.fg_createbook.value.list;
    this.accbook.cash = this.fg_createbook.value.cash;
    this.accbook.digital_money = this.fg_createbook.value.digital_money;
    this.api.CreateAccountBook(this.accbook).subscribe(
    res =>{
      console.log(res);
      this.toast.success(res.body.resualt);
      this.getAccountcurrent();
    }
  );
  }
  
 }

 //ยืนยันแก้ไขรายการบัญชี
 editConfirm(id:Number){
let index = this.item_accbook.findIndex(item => item.id===id);
this.item_accbook.forEach(item =>{
  if(item.id == id){
    item.id =id;
    item.date_time=this.fg_createbook.value.date_time;
    item.list = this.fg_createbook.value.list;
    item.cash =this.fg_createbook.value.cash;
    item.digital_money=this.fg_createbook.value.digital_money;
  }
});
console.log(this.item_accbook[index]);
this.api.EditAcconutBookByid(this.item_accbook[index]).subscribe(
  res =>{
    console.log(res.body);
  }
);
  
 }

 //หน้าแก้ไข
 editForm(id:Number){
  let index = this.item_accbook.findIndex(item =>item.id===id);
 this.fg_createbook.patchValue(
  {
    date_time:this.item_accbook[index].date_time,
    list:this.item_accbook[index].list,
    cash:this.item_accbook[index].cash,
    digital_money:this.item_accbook[index].digital_money
  })
 }

 DeleteAccountBookById(id:Number){
  const headers ={
    'Content-Type':'application/json'
  }
  let index = this.item_accbook.findIndex(item => item.id === id);
  return this.api.DeleteAccountBookById(this.item_accbook[index]).subscribe(
    res =>{
      console.log(res.bod);
      this.toast.success(res.body.msg);
      this.item_accbook.splice(index,1);
    }
  );
 }

 accountBookChange(){
  let date = this.fg_accountbook.value.date_time;
  this.accbook.date_time = date;
  this.api.GetAccountBook(this.accbook).subscribe(
    res =>{
      if(!Array.isArray(res.body)){
        this.item_accbook =[];
           //ดึงยอดรวม
           this.month = new Date(this.fg_accountbook.value.date_time).getMonth()+1;
           this.accbook.date_time = date;
           this.api.SumAccountBookByDate(this.accbook).subscribe(
             res =>{
               console.log(res.body);
               this.item_sumaccbook = res.body;
               console.log(res.boy);
             }
           );
      }else{
        console.log(res.body);
        this.item_accbook = res.body;
         //ดึงยอดรวม
          this.month = new Date(this.fg_accountbook.value.date_time).getMonth()+1;
          this.accbook.date_time = date;
          this.api.SumAccountBookByDate(this.accbook).subscribe(
            res =>{
              console.log(res.body);
              this.item_sumaccbook = res.body;
              console.log(res.boy);
            }
          );
      }

    }
  );

 
 }
}
