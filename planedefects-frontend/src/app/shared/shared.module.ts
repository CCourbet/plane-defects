import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { PageNotFoundComponent } from './components/';
import { WebviewDirective } from './directives/';
import { PageMaintenanceComponent } from './components/page-maintenance/page-maintenance.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [PageNotFoundComponent, WebviewDirective, PageMaintenanceComponent],
  imports: [
    CommonModule,
    TranslateModule,
    MatToolbarModule,
    MatTooltipModule,
    MatMenuModule,
    MatButtonModule,
  ],
  exports: [
    TranslateModule,
    WebviewDirective,
    MatFormFieldModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatMenuModule,
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule,
    MatTooltipModule,
    BrowserAnimationsModule,
    MatSelectModule,
  ]
})
export class SharedModule { }
