import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackingDialogComponent } from './tracking-dialog.component';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule} from "@angular/material/dialog";

describe('TrackingDialogComponent', () => {
  let component: TrackingDialogComponent;
  let fixture: ComponentFixture<TrackingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [MatDialogModule],
      declarations: [ TrackingDialogComponent ],
        providers: [
            {provide: MAT_DIALOG_DATA, useValue: {}}
        ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
