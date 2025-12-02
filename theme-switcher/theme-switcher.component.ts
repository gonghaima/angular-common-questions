import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-theme-switcher',
  template: `
    <button (click)="toggleTheme()">
      Switch to {{ theme === 'light' ? 'Dark' : 'Light' }} Theme
    </button>
  `,
  styles: [`
    button { margin: 1rem; padding: 0.5rem 1rem; }
    :host ::ng-deep html, :host ::ng-deep body, :host ::ng-deep :root {
      transition: background-color 0.4s, color 0.4s;
    }
    :host ::ng-deep .light {
      background-color: #fff;
      color: #222;
    }
    :host ::ng-deep .dark {
      background-color: #222;
      color: #fff;
    }
  `]
})
export class ThemeSwitcherComponent implements OnInit {
  theme: 'light' | 'dark' = 'light';

  ngOnInit() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || savedTheme === 'light') {
      this.theme = savedTheme;
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.theme = 'dark';
    }
    this.applyTheme();
  }

  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', this.theme);
    this.applyTheme();
  }

  applyTheme() {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(this.theme);
  }
}
