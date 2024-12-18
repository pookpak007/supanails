import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagechatgptComponent } from './pagechatgpt.component';

describe('PagechatgptComponent', () => {
  let component: PagechatgptComponent;
  let fixture: ComponentFixture<PagechatgptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagechatgptComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PagechatgptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
