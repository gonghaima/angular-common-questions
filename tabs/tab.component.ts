import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tab',
  template: `
    <div [hidden]="!active" class="pane">
      <ng-content></ng-content>
    </div>
  `,
   styles: [`
    .pane {
      padding: 1em;
      border: 1px solid #ddd;
      border-top: none;
    }
  `]
})
export class TabComponent {
  @Input() title = '';
  @Input() active = false;
}
