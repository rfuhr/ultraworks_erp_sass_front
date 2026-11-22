import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UwSkeletonComponent } from './uw-skeleton.component';

describe('UwSkeletonComponent', () => {
  let component: UwSkeletonComponent;
  let fixture: ComponentFixture<UwSkeletonComponent>;

  beforeEach(() => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [UwSkeletonComponent],
    });
    fixture = TestBed.createComponent(UwSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render text lines by default', () => {
    const lines = fixture.nativeElement.querySelectorAll('.skeleton-line');
    expect(lines.length).toBe(3);
  });
});
