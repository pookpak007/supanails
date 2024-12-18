import { Component } from '@angular/core';
import { CallapiService } from '../../services/callapi.service';
import { HttpClient,HttpClientModule , HttpResponse } from '@angular/common/http';
import { Book } from './../../models/book';
import { FormBuilder,FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { lastValueFrom } from 'rxjs';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { isNumber } from '@ng-bootstrap/ng-bootstrap/util/util';
@Component({
  selector: 'app-pagebook',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    ToastrModule],
  providers:[DatePipe],
  templateUrl: './pagebook.component.html',
  styleUrl: './pagebook.component.css'
})
export class PagebookComponent {
  private startDate!:string;
  private data:Book = new Book();
  private datadelete:Book = new Book();
  private createBook:Book = new Book();
  private GetbookById:Book = new Book();
  private book_editConfirm:Book = new Book();
  resualt :Array<{name:string;tel:string}>=[];
  show:string ="show";
  load_show:string="un-show spinner-border text-warning";
  btnline:String="show"
  load_line:String="un-show spinner-border text-danger";
  btnEdit:string="show";
  load_edit:string = "un-show spinner-border text-danger"
  book:any=[];
  bookEdit_arr:any=[];
  start_Date!: FormGroup;
  end_Date!:FormGroup;
  bookForm!:FormGroup;
  bookEdit!:FormGroup;
  constructor(
    private api:CallapiService,
    private fb:FormBuilder,
    private fb_endDate:FormBuilder,
    private fb_bookFOrm:FormBuilder,
    private datePipe:DatePipe,
    private toast:ToastrService,
    private fb_bookEdit:FormBuilder
  ){}

  ngOnInit(): void {
    let dateString =this.datePipe.transform(new Date(),'yyyy-MM-ddTHH:mm','th-TH')+':00';
    let dateObject = new Date(dateString);
    let TimeZone = new Date().getTimezoneOffset();
    if(TimeZone < 0){
      let zone = (TimeZone *-1) / 60;
      dateObject.setHours(dateObject.getHours()+ zone);
    }
    if(TimeZone >0){
      let zone = (TimeZone *-1) / 60;
      dateObject.setHours(dateObject.getHours()+ zone);
    }
    this.data.start_datetime = dateObject;
    this.data.amount=0;
    this.data.cus_name="";
    this.data.end_datetime =dateObject;
    this.data.status_own="";
    this.data.tel="";
    this.start_Date = this.fb.group({
      selectDate:[this.datePipe.transform(new Date(),'yyyy-MM-ddTHH:mm','th-TH')]
    });
    this.end_Date = this.fb_endDate.group({
      end_Date : [this.datePipe.transform(new Date(),'yyyy-MM-ddTHH:mm','th-TH')]
    });

    //กำหนดค่าเริ่มต้นให้ ฟอร์มการจอง
    this.bookForm = this.fb_bookFOrm.group({
      start_datetime:[this.datePipe.transform(new Date(),'yyyy-MM-ddTHH:mm')],
      end_datetime:[this.datePipe.transform(new Date(),'yyyy-MM-ddTHH:mm')],
      cus_name:[''],
      amount:[1],
      tel:[''],
      detail:[''],
      status_own:['โอนจอง']
    });

    //กำหนดค่าเริ่มต้นให้ฟอร์มแก้ไขการจอง
    this.bookEdit = this.fb_bookEdit.group({
      start_datetime:[this.datePipe.transform(new Date(),'yyyy-MM-ddTHH:mm')],
      end_datetime:[this.datePipe.transform(new Date(),'yyyy-MM-ddTHH:mm')],
      cus_name:[''],
      amount:[1],
      tel:[''],
      detail:[''],
      status_own:['โอนจอง']
    });
    this.api.getbook(this.data).subscribe(
      (res:HttpResponse<any>)=>{
        if(res.body.resualt=='ยังไม่มีคิวจอง'){
          this.book=[];
        }else{
          this.book = res.body;
        }

      },
      (error) =>{
        if(error.status >=500){
          console.log('Error : ' + error);
        }
      }
    );
  }

  bookSubmit(){

  }

  async deletebook(id:Number){
    this.datadelete.id = id
    this.show="un-show";
    this.load_show="show spinner-border text-warning";
    const res =await this.api.deleteBook(id).toPromise();
    if(res.status !=200){
      this.toast.error('path: pages/pagebook | method: deletebook'+res.body);
      console.log('path: pages/pagebook | method: deletebook'+res.error );
    }else{
      this.show="show";
      this.load_show="un-show spinner-border text-warning";
      this.api.getbook(this.data).subscribe(
      (res:HttpResponse<any>)=>{
        if(res.body.resualt=='ยังไม่มีคิวจอง'){
          this.book=[];
        }else{
          this.book = res.body;            
        }
        },
        (error) =>{
          if(error.status >=500){
            console.log('Error : ' + error);
            this.toast.error('test' + error);
          }
        }
      );
    }
    
  }

  async bookconfrim(){
    this.createBook.start_datetime = this.bookForm.value.start_datetime;
    this.createBook.end_datetime = this.bookForm.value.end_datetime;
    this.createBook.cus_name = this.bookForm.value.cus_name;
    this.createBook.amount = this.bookForm.value.amount;
    this.createBook.tel = this.bookForm.value.tel;
    this.createBook.detail = this.bookForm.value.detail;
    this.createBook.status_own = this.bookForm.value.status_own;
    this.show="un-show";
    this.load_show="show spinner-border text-warning";
    const res =await lastValueFrom(this.api.createbook(this.createBook)); 
    this.show="show";
    this.load_show="un-show spinner-border text-warning";
    
    this.api.getbook(this.data).subscribe(
      (res:HttpResponse<any>)=>{
        if(res.body.resualt=='ยังไม่มีคิวจอง'){
          this.book=[];
        }else{
          this.book = res.body;
          this.toast.success('บันทึกเรียบร้อย');
          this.bookForm = this.fb_bookFOrm.group({
            start_datetime:[this.datePipe.transform(new Date(),'yyyy-MM-ddTHH:mm')],
            end_datetime:[this.datePipe.transform(new Date(),'yyyy-MM-ddTHH:mm')],
            cus_name:[''],
            amount:[1],
            tel:[''],
            detail:[''],
            status_own:['โอนจอง']
          });
        }

      },
      (error) =>{
        if(error.status >=500){
          console.log('Error : ' + error);
        }
      }
    );
  }

  start_date_onchange(){
    this.data.start_datetime = this.start_Date.value.selectDate;
    
    this.api.getbook(this.data).subscribe(
      (res:HttpResponse<any>)=>{
        if(res.body.resualt=='ยังไม่มีคิวจอง'){
          this.book=[];
        }else{
          this.book = res.body;
        }

      },
      (error) =>{
        if(error.status >=500){
          console.log('Error : ' + error);
        }
      }
    );
  }

  bookstartdateChange(){

    let end_datetime = new Date(this.bookForm.value.start_datetime)
    end_datetime.setHours(end_datetime.getHours() + 1);
    end_datetime.setMinutes(end_datetime.getMinutes() +30);
    this.bookForm.patchValue({
      end_datetime:this.datePipe.transform(end_datetime,'yyyy-MM-ddTHH:mm')
    });
  }

  bookstartdateEditChange(){
    let end_datetime = new Date(this.bookEdit.value.start_datetime)
    end_datetime.setHours(end_datetime.getHours() + 1);
    end_datetime.setMinutes(end_datetime.getMinutes() +30);
    this.bookEdit.patchValue({
      end_datetime:this.datePipe.transform(end_datetime,'yyyy-MM-ddTHH:mm')
    });
  }

  senLinenoltify(){
    this.load_line="show spinner-border text-danger";
    this.btnline="un-show";
    this.api.senLine(this.data).subscribe(
      res =>{
        if(res.status ==200){
          this.toast.success('ส่งเข้าไลน์สำเร็จ');
          this.load_line="un-show spinner-border text-danger";
          this.btnline="show";
        }
      },
      error =>{
        this.toast.error('ส่งไม่สำเร็จ');
        this.load_line="un-show spinner-border text-danger";
        this.btnline="show";
      }
    );
  }

  editBook(id:Number){
    this.GetbookById.id = id;
    this.api.GetbookById( this.GetbookById).subscribe(
      res =>{
       this.bookEdit_arr = res.body;
        this.bookEdit = this.fb_bookEdit.group({
          start_datetime:[this.datePipe.transform(this.bookEdit_arr[0].start_datetime,'yyyy-MM-ddTHH:mm')],
          end_datetime:[this.datePipe.transform(this.bookEdit_arr[0].end_datetime,'yyyy-MM-ddTHH:mm')],
          cus_name:[this.bookEdit_arr[0].cus_name],
          amount:[this.bookEdit_arr[0].amount],
          tel:[this.bookEdit_arr[0].tel],
          detail:[this.bookEdit_arr[0].detail],
          status_own:[this.bookEdit_arr[0].status_own]
        });
        console.log(res.body);
        console.log(this.bookEdit_arr[0].cus_name);
      },
      error =>{
        console.log(error);
      }
    );
  }

  editConfirm(){
    this.book_editConfirm.id = this.GetbookById.id;
    this.book_editConfirm.start_datetime =this.bookEdit.value.start_datetime;
    this.book_editConfirm.end_datetime = this.bookEdit.value.end_datetime;
    this.book_editConfirm.cus_name = this.bookEdit.value.cus_name;
    this.book_editConfirm.amount = this.bookEdit.value.amount;
    this.book_editConfirm.tel = this.bookEdit.value.tel;
    this.book_editConfirm.detail = this.bookEdit.value.detail;
    this.book_editConfirm.status_own = this.bookEdit.value.status_own;
    this.btnEdit="un-show";
    this.load_edit="show spinner-border text-danger";
    this.api.EditBook(this.book_editConfirm).subscribe(
      res =>{
        console.log(res.body.resualt);
        this.toast.success(res.body.resualt);
        this.btnEdit="show";
        this.load_edit="un-show spinner-border text-danger";
        this.api.getbook(this.data).subscribe(
          (res:HttpResponse<any>)=>{
            if(res.body.resualt=='ยังไม่มีคิวจอง'){
              this.book=[];
            }else{
              this.book = res.body;
              console.log( res.body);
            }
    
          },
          (error) =>{
            if(error.status >=500){
              console.log('Error : ' + error);
            }
          }
        );
      }
    );

    let dateString =this.datePipe.transform(new Date(),'yyyy-MM-ddTHH:mm','th-TH')+':00';
    let dateObject = new Date(dateString);
    let TimeZone = new Date().getTimezoneOffset();
    if(TimeZone < 0){
      let zone = (TimeZone *-1) / 60;
      dateObject.setHours(dateObject.getHours()+ zone);
    }
    if(TimeZone >0){
      let zone = (TimeZone *-1) / 60;
      dateObject.setHours(dateObject.getHours()+ zone);
    }
    this.data.start_datetime = dateObject;
    this.start_Date = this.fb.group({
      selectDate:[this.datePipe.transform(new Date(),'yyyy-MM-ddTHH:mm','th-TH')]
    });
    this.end_Date = this.fb_endDate.group({
      end_Date : [this.datePipe.transform(new Date(),'yyyy-MM-ddTHH:mm','th-TH')]
    });
    
  }

  onPasteEvent(evt:ClipboardEvent){
    console.log('copy');
    evt.preventDefault();
    const clipboardData = evt.clipboardData || (window as any)['clipboardData'];
    let pastedText:String = clipboardData.getData('text');
    this.resualt =[];
    const lines = pastedText.split('\n')
    let name="";
    let tel="";
    for(const cha of pastedText){
      if(!isNaN(Number(cha))){
        if(cha !='-' && cha!=' '){
        tel +=cha;
        }
      }else{
        if(cha !='-' && cha!=' '){
          name +=cha;
        }

      }
    }
    name = name.replace('ค่ะ','');
    name = name.replace('ค่ะ','');
    name = name.replace('ค่ะ','');
    name = name.replace('ค่ะ','');
    name = name.replace('ค่ะ','');
    name = name.replace('คะ','');
    name = name.replace('คะ','');
    name = name.replace('คะ','');
    name = name.replace('คะ','');
    name = name.replace('คะ','');
    name = name.replace('ค่า','');
    name = name.replace('ค่า','');
    name = name.replace('ค่า','');
    name = name.replace('ค่า','');
    name = name.replace('ค่า','');
    name = name.replace('ค่าา','');
    name = name.replace('ค่าา','');
    name = name.replace('ค่าา','');
    name = name.replace('ค่าา','');
    name = name.replace('ค่าา','');
    name = name.replace('ครับ','');
    name = name.replace('ครับ','');
    name = name.replace('ครับ','');
    name = name.replace('ครับ','');
    name = name.replace('ครับ','');
    this.bookForm.patchValue({
      cus_name:name.replace(' ',''),
      tel:tel.replace(' ','')
    })
  }

  onPasteEventTel(evt:ClipboardEvent){
    console.log('copy');
    evt.preventDefault();
    const clipboardData = evt.clipboardData || (window as any)['clipboardData'];
    let pastedText:String = clipboardData.getData('text');
    this.resualt =[];
    const lines = pastedText.split('\n')
    let name="";
    let tel="";
    for(const cha of pastedText){
      if(!isNaN(Number(cha))){
        if(cha !='-' && cha!=' '){
          tel +=cha;
          }
      }else{
        if(cha !='-' && cha!=' '){
          name +=cha;
        }

      }
    }
    name = name.replace('ค่ะ','');
    name = name.replace('ค่ะ','');
    name = name.replace('ค่ะ','');
    name = name.replace('ค่ะ','');
    name = name.replace('ค่ะ','');
    name = name.replace('คะ','');
    name = name.replace('คะ','');
    name = name.replace('คะ','');
    name = name.replace('คะ','');
    name = name.replace('คะ','');
    name = name.replace('ค่า','');
    name = name.replace('ค่า','');
    name = name.replace('ค่า','');
    name = name.replace('ค่า','');
    name = name.replace('ค่า','');
    name = name.replace('ค่าา','');
    name = name.replace('ค่าา','');
    name = name.replace('ค่าา','');
    name = name.replace('ค่าา','');
    name = name.replace('ค่าา','');
    name = name.replace('ครับ','');
    name = name.replace('ครับ','');
    name = name.replace('ครับ','');
    name = name.replace('ครับ','');
    name = name.replace('ครับ','');
    this.bookForm.patchValue({
      cus_name:name.replace(' ',''),
      tel:tel.replace(' ','')
    })
  }

  onSubmit(){

  }
}
