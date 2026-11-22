import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UwTextareaComponent } from './uw-textarea.component';

describe('UwTextareaComponent', () => {
  let component: UwTextareaComponent;
  let fixture: ComponentFixture<UwTextareaComponent>;

  beforeEach(() => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [UwTextareaComponent],
    });
    fixture = TestBed.createComponent(UwTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
