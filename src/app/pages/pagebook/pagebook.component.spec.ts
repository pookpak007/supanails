import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagebookComponent } from './pagebook.component';

describe('PagebookComponent', () => {
  let component: PagebookComponent;
  let fixture: ComponentFixture<PagebookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagebookComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PagebookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
