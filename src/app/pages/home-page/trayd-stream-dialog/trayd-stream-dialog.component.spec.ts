import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraydStreamDialog } from './trayd-stream-dialog.component';

describe('TraydStreamDialogComponent', () => {
  let component: TraydStreamDialog;
  let fixture: ComponentFixture<TraydStreamDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraydStreamDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraydStreamDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
