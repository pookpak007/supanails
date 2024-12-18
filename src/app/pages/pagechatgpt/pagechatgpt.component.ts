import { Component } from '@angular/core';
import { ReactiveFormsModule,FormBuilder,FormGroup,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CallapiService } from '../../services/callapi.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagechatgpt',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './pagechatgpt.component.html',
  styleUrl: './pagechatgpt.component.css'
})
export class PagechatgptComponent {
  //ตัวแปร
  fg_chatgpt!:FormGroup;

  //ตะแปรไว้ใช้ loop แสดงใน html
  //contructors
  //ค่าเริ่มต้นทำงาน

  ngOnInit(): void {
    this.fg_chatgpt = this.fb_chatgpt.group({
      input:['',Validators.required],
      message:['']
    });
    
  }
  constructor(
    private toast:ToastrService,
    private api:CallapiService,
    private fb_chatgpt:FormBuilder
  ){}
  
}
