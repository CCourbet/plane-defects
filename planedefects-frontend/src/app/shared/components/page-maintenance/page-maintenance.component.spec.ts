import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageMaintenanceComponent } from './page-maintenance.component';
import { TranslateModule } from '@ngx-translate/core';

describe('PageMaintenanceComponent', () => {
  let component: PageMaintenanceComponent;
  let fixture: ComponentFixture<PageMaintenanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PageMaintenanceComponent],
      imports: [TranslateModule.forRoot()]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
