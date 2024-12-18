import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Book } from '../models/book';
import { ToastrService } from 'ngx-toastr';
import { accountbook } from '../models/accountbook';
@Injectable({
  providedIn: 'root'
})
export class CallapiService {
  private baseurl:string=environment.baseurl;
  constructor(
    private http:HttpClient,
    private toast:ToastrService
  ) { }

  //BookController
  createbook(book:Book):Observable<any>{
    const headers ={
      'Content-Type':'application/json'
    }
    return this.http.post<any>(this.baseurl+environment.createbook,book,{headers,observe:'response'}).pipe(
      catchError(error =>{
        console.error('',error);
        this.toast.error('callapi/createbook\n'+error.message,'ข้อผิดพลาดจาก Server');
        throw error
      })
    );
  }

  getbook(book:Book):Observable<any>{
    return this.http.post<any>(this.baseurl+environment.getbook,book,{observe:'response'}).pipe(
      catchError(error =>{
        console.error('',error);
        this.toast.error('callapi/getbook\n'+error.message,'ข้อผิดพลาดจาก Server');
        throw error
      })
    );
  }

  deleteBook(id:Number):Observable<any>{
    const headers ={
      'Content-Type':'application/json'
    }
    return this.http.delete<any>(this.baseurl+environment.deleteBook+'/'+id,{observe:'response'}).pipe(
      catchError(error =>{
        console.error('',error);
        this.toast.error('callapi/deleteBook\n'+error.message,'ข้อผิดพลาดจาก Server',{enableHtml: true});
        throw error
      })
    );
  }

  senLine(book:Book):Observable<any>{
    const headers = {
      'Content-Type':'application/json'
    }
    return this.http.post(this.baseurl+environment.sentLine,book,{headers,observe:'response'}).pipe(
      catchError(error =>{
        console.log(error);
        this.toast.error('callapi/senLine\n'+error.message,'ข้อผิดพลาดจาก Server');
        throw error
      })
    );
  }

  GetbookById(book:Book):Observable<any>{
    const headers={
      'Content-Type':'application/json'
    }
    return this.http.post<any>(this.baseurl+environment.GetbookById,book,{headers,observe:'response'}).pipe(
      catchError(error =>{
        console.log('callapi/GetbookById\n'+book+'\n'+error);
        this.toast.error('callapi/GetbookById\n'+book+'\n'+error);
        throw error;
      })
    );
  }

  EditBook(book:Book):Observable<any>{
    const headers = {
      'Content-Type':'application/json'
    }
    return this.http.post<any>(this.baseurl+environment.EditBook,book,{headers,observe:'response'}).pipe(
      catchError(error =>{
        console.error(error);
        this.toast.error('callapi/EditBook\n'+book+error);
        throw error
      })
    );
  }

  //AccountBookController
  CreateAccountBook(accbook:accountbook):Observable<any>{
    const headers = {
      'Content-Type':'application/json'
    }
    return this.http.post<any>(this.baseurl+environment.CreateAccountBook,accbook,{headers,observe:'response'}).pipe(
      catchError(error =>{
        console.error('callapi/CreateAccountBook\n' + accbook+'\n'+error);
        this.toast.error('callapi/CreateAccountBook\n' + accbook+'\n'+error);
        throw error;
      })
    );
  }

  GetAccountBook(acc:accountbook):Observable<any>{
    const headers ={
      'Content-Type':'application/json'
    }
    return this.http.post<any>(this.baseurl+environment.GetAccountBook,acc,{headers,observe:'response'}).pipe(
      catchError(error =>{
        console.error('callapi/GetAccountBook\n' + acc +'\n' + error);
        this.toast.error('callapi/GetAccountBook\n' + acc +'\n' + error);
        throw error;
      })
    );
  }

  GetAccountBookById(acc:accountbook):Observable<any>{
    const headers ={
      'Content-Type':'application/json'
    }
    return this.http.post<any>(this.baseurl+environment.GetAccountBookById,acc,{headers,observe:'response'}).pipe(
      catchError(error =>{
        console.error('callapi/GetAccountBook\n' + acc +'\n' + error);
        this.toast.error('callapi/GetAccountBook\n' + acc +'\n' + error);
        throw error;
      })
    );
  }

  EditAcconutBookByid(acc:accountbook):Observable<any>{
    const headers = {
      'Content-Type':'application/json'
    }

    return this.http.post<any>(this.baseurl+environment.EditAcconutBookByid,acc,{headers,observe:'response'}).pipe(
      catchError(error =>{
        console.error(error);
        this.toast.error('callapi/EditAcconutBookByid\n'+'detail : '+acc+'\nError message: '+error);
        throw error;
      })
    );
  }

  DeleteAccountBookById(acc:accountbook):Observable<any>{
    const headers ={
      'Content-Type':'application/json'
    }
    return this.http.post<any>(this.baseurl+environment.DeleteAccountBookById,acc,{headers,observe:'response'}).pipe(
      catchError(error =>{
        console.error('calapi/DeleteAccountBookById\n'+' body: '+acc+' Errormessage: '+error);
        this.toast.error('calapi/DeleteAccountBookById\n'+' body: '+acc+' Errormessage: '+error);
        throw error;
      }
      )
    );
  }

  SumAccountBookByDate(acc:accountbook):Observable<any>{
    const headers ={
      'Content-Type':'application/json'
    }
    return this.http.post(this.baseurl+environment.SumAccountBookByDate,acc,{headers,observe:'response'}).pipe(
      catchError(error =>{
        console.error('callapi/SumAccountBookByDate\n'+' body:'+acc+' Errormessage: '+error);
        this.toast.error('callapi/SumAccountBookByDate\n'+' body:'+acc+' Errormessage: '+error);
        throw error;
      })
    );
  }

  
  
}
