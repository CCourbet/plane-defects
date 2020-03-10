import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { remote } from 'electron';
import { Languages } from '../../models/languages.enum';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  // Check if the user is logged in to display logout icon
  public isLoggedIn: boolean;
  // Get the active language to display label
  public activeLanguage: Languages;
  // Get all languages enum
  public Languages = Languages;

  constructor(
    private authenticationService: AuthenticationService,
    private translate: TranslateService
  ) {
    this.isLoggedIn = this.authenticationService.isLoggedIn();
    this.translate.onLangChange.subscribe(() => this.setActiveLanguage());
  }

  ngOnInit(): void {
    this.authenticationService.isLoggedEmitter.subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);
  }

  /**
   * Set label of active language
   */
  public setActiveLanguage(): void {
    this.activeLanguage = Languages[this.translate.currentLang] ? Languages[this.translate.currentLang] : Languages.en;
  }

  /**
   * Update language used in the app
   */
  public setLanguage(lang: string) {
    this.translate.use(lang);
  }

  /**
   * Logout
   */
  public logout(): void {
    this.authenticationService.logout();
  }

  /**
   * Exit application
   */
  public exitApp(): void {
    remote.getCurrentWindow().close();
  }

}
