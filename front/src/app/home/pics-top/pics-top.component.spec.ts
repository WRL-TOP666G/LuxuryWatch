import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PicsTopComponent } from './pics-top.component';

describe('PicsTopComponent', () => {
  let component: PicsTopComponent;
  let fixture: ComponentFixture<PicsTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PicsTopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PicsTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
