import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountbookComponent } from './accountbook.component';

describe('AccountbookComponent', () => {
  let component: AccountbookComponent;
  let fixture: ComponentFixture<AccountbookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountbookComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
