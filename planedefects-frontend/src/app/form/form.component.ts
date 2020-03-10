import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { NewDefectSnackbarComponent } from '../new-defect-snackbar/new-defect-snackbar.component';
import { DefectTypes } from '../shared/models/defect-types.enum';
import { ErrorMessage } from '../shared/models/error-message.interface';
import { MaintenanceState } from '../shared/models/maintenance-state.interface';
import { User } from '../shared/models/user.interface';
import { AuthenticationService } from '../shared/services/authentication.service';
import { DefectService } from '../shared/services/defect.service';
import { MaintenanceService } from '../shared/services/maintenance.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnDestroy {
  // Get form directive to update error status
  @ViewChild('formDirective') private formDirective: NgForm;

  // Get if the user logged as admin right
  public isAdmin: boolean;
  // Get if the maintenance mode is set
  public isMaintenanceMode: boolean;
  // Display error message
  public error = {} as ErrorMessage;
  // Get all defects enum
  public DefectTypes = DefectTypes;
  // Maintenance state response on update
  public responseMaintenanceState: string;

  // Defect form
  public defectForm = new FormGroup({
    xcoordinate: new FormControl(''),
    ycoordinate: new FormControl(''),
    zcoordinate: new FormControl(''),
    defectType: new FormControl(''),
    comment: new FormControl('')
  });

  private _subcriptions: Subscription[] = [];

  constructor(
    private defectService: DefectService,
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private maintenanceService: MaintenanceService,
    private snackBar: MatSnackBar,
    private router: Router,
    private translate: TranslateService
  ) {
  }

  /**
   * Get user right and if admin, maintenance state
   * If error 403 redirect to maintenance page
   */
  ngOnInit(): void {
    this._subcriptions.push(this.userService.getUser(this.authenticationService.userId).subscribe(
      (user: User) => {
        this.isAdmin = user.is_staff
        if (this.isAdmin) {
          this._subcriptions.push(this.maintenanceService.getMaintenanceState().subscribe(
            (state: MaintenanceState) => this.isMaintenanceMode = state.is_maintenance,
            (error: any) => this.isMaintenanceMode = false
          ));
        }
      },
      (error: any) => {
        error.status === 403 ? this.router.navigateByUrl('/maintenance') : this.isAdmin = false
      }
    ));
  }

  ngOnDestroy(): void {
    this._subcriptions.forEach(s => s.unsubscribe());
  }

  /**
   * Update maintenance mode
   * Open snackbar to indicate result
   */
  updateMaintenanceMode(): void {
    const res = {} as MaintenanceState;
    res.is_maintenance = !this.isMaintenanceMode;
    this._subcriptions.push(this.maintenanceService.setMaintenanceState(res).subscribe(
      (state: MaintenanceState) => {
        const message = state.is_maintenance ? "SUCCESS_IS_MAINTENANCE" : "SUCCESS_IS_NOT_MAINTENANCE"
        this.snackBar.open(this.translate.instant(message), this.translate.instant("CLOSE"), {
          duration: 10000,
        });
      },
      (error: any) => {
        this.snackBar.open(this.translate.instant("ERROR_MAINTENANCE"), this.translate.instant("CLOSE"), {
          duration: 10000,
        });
      }
    ));
  }

  /**
   * Post defect
   * Open snack bar on success with defects details and empty form
   * Redirect to maintenance page if 403 error
   * Details error message in form otherwise
   */
  onSubmit(): void {
    const defect = {
      xcoordinate: this.defectForm.value.xcoordinate,
      ycoordinate: this.defectForm.value.ycoordinate,
      zcoordinate: this.defectForm.value.zcoordinate,
      defecttype: this.defectForm.value.defectType,
      comment: this.defectForm.value.comment
    };
    this._subcriptions.push(this.defectService.postDefect(defect).subscribe((defect) => {
      // reset form
      this.error = {} as ErrorMessage;
      this.defectForm.reset();
      this.formDirective.resetForm();
      // open result snackbar
      this.snackBar.openFromComponent(NewDefectSnackbarComponent, {
        data: defect,
        panelClass: ['snackbar-size'],
        duration: 10000,
      })
    }, (error) => {
      switch (error.status) {
        case 403:
          this.router.navigateByUrl('/maintenance')
        default:
          const errors = error.error;
          if (errors) {
            if ('xcoordinate' in errors) {
              this.error.xcoordinate = errors['xcoordinate'];
              this.defectForm.controls.xcoordinate.setErrors({ 'incorrect': true });
            }
            if ('ycoordinate' in errors) {
              this.error.ycoordinate = errors['ycoordinate'];
              this.defectForm.controls.ycoordinate.setErrors({ 'incorrect': true });
            }
            if ('zcoordinate' in errors) {
              this.error.zcoordinate = errors['zcoordinate'];
              this.defectForm.controls.zcoordinate.setErrors({ 'incorrect': true });
            }
            if ('defecttype' in errors) {
              this.error.defecttype = errors['defecttype'];
              this.defectForm.controls.defectType.setErrors({ 'incorrect': true });
            }
          }
      }
    }));
  }

}
