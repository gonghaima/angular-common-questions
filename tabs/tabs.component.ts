import { Component, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { TabComponent } from './tab.component';

@Component({
  selector: 'app-tabs',
  template: `
    <ul class="nav nav-tabs">
      <li *ngFor="let tab of tabs" (click)="selectTab(tab)" [class.active]="tab.active">
        <a>{{ tab.title }}</a>
      </li>
    </ul>
    <ng-content></ng-content>
  `,
  styles: [`
    .nav-tabs {
      list-style-type: none;
      margin: 0;
      padding: 0;
      border-bottom: 1px solid #ddd;
      display: flex;
    }
    .nav-tabs li {
      margin-bottom: -1px;
    }
    .nav-tabs li a {
      margin: 0 5px;
      padding: 10px;
      display: block;
      cursor: pointer;
      border: 1px solid transparent;
      border-bottom: none;
    }
    .nav-tabs li.active a {
      border-color: #ddd;
      border-bottom-color: transparent;
      border-radius: 4px 4px 0 0;
      background-color: white;
    }
  `]
})
export class TabsComponent implements AfterContentInit {
  @ContentChildren(TabComponent) tabs!: QueryList<TabComponent>;

  ngAfterContentInit() {
    // get all active tabs
    const activeTabs = this.tabs.filter(tab => tab.active);

    // if there is no active tab set, activate the first
    if (activeTabs.length === 0) {
      this.selectTab(this.tabs.first);
    }
  }

  selectTab(tab: TabComponent) {
    // deactivate all tabs
    this.tabs.toArray().forEach(t => (t.active = false));

    // activate the tab the user has clicked on.
    if(tab) {
      tab.active = true;
    }
  }
}
