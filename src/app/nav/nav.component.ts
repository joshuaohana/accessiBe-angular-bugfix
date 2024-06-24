import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ColorSchemeService } from '../services/color-scheme.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  isDarkMode = false;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private colorSchemeService: ColorSchemeService
  ) {}

  setTheme(theme: string) {
    this.colorSchemeService.update(theme);
  }

  ngOnInit(): void {
    this.isDarkMode = this.colorSchemeService.currentActive() !== 'light';
  }

  changeTheme(useDark: boolean): void {
    if (useDark) {
      this.setTheme('dark');
    } else {
      this.setTheme('light');
    }
  }
}
