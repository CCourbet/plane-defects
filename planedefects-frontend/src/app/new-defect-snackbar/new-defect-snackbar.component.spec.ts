import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDefectSnackbarComponent } from './new-defect-snackbar.component';
import { SharedModule } from '../shared/shared.module';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { TranslateModule } from '@ngx-translate/core';

describe('NewDefectSnackbarComponent', () => {
  let component: NewDefectSnackbarComponent;
  let fixture: ComponentFixture<NewDefectSnackbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewDefectSnackbarComponent],
      providers: [
        { provide: MatSnackBarRef, useValue: {} },
        { provide: MAT_SNACK_BAR_DATA, useValue: [] }
      ],
      imports: [SharedModule, TranslateModule.forRoot()]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDefectSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
