import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedIconComponent } from './shared-icon.component';

describe('SharedIconComponent', () => {
  let component: SharedIconComponent;
  let fixture: ComponentFixture<SharedIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
