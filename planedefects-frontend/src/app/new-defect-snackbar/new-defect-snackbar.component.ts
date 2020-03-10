import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { Defect } from '../shared/models/defect.interface';
import { DefectTypes } from '../shared/models/defect-types.enum';

@Component({
  selector: 'app-new-defect-snackbar',
  templateUrl: './new-defect-snackbar.component.html',
  styleUrls: ['./new-defect-snackbar.component.scss']
})
export class NewDefectSnackbarComponent implements OnInit {
  // Get all defects enum
  public DefectTypes = DefectTypes;

  public get data(): Defect {
    return this._data;
  }

  public set data(value: Defect) {
    this._data = value;
  }

  constructor(
    public snackBarRef: MatSnackBarRef<NewDefectSnackbarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) private _data: Defect
  ) { }

  ngOnInit(): void {
  }

}
