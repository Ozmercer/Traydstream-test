import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraydStreamDialogComponent } from './trayd-stream-dialog.component';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TraydStreamService } from 'src/app/modules/core/services/trayd-stream.service';
import { By } from '@angular/platform-browser';

describe('TraydStreamDialogComponent', () => {
  let component: TraydStreamDialogComponent;
  let fixture: ComponentFixture<TraydStreamDialogComponent>;
  const mockDialogRef = {
    close: jasmine.createSpy('close')
  };
  const mockTraydStremService = {
    UUIDs: jasmine.createSpy('UUIDs')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule],
      declarations: [TraydStreamDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: TraydStreamService, useValue: mockTraydStremService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraydStreamDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create modal', () => {
    expect(component).toBeTruthy();
  });

  it('should add new UUID when clicking button', () => {
    component.data.UUIDs = [];
    component.addUUID();

    expect(component.data.UUIDs.length).toEqual(1);
    expect(component.data.UUIDs[0].length).toEqual(36);
  });

  it('should present all UUIDs', () => {
    component.data.UUIDs = [];
    expect(fixture.debugElement.queryAll(By.css('.UUID')).length).toEqual(0);

    fixture.nativeElement.querySelector('.add').click();
    fixture.nativeElement.querySelector('.add').click();
    fixture.nativeElement.querySelector('.add').click();
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('.UUID')).length).toEqual(3);
    expect(fixture.nativeElement.querySelector('.UUID').innerText).toEqual(component.data.UUIDs[0]);
  });
});
