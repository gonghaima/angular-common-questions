import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TabComponent } from './tab.component';
import { TabsComponent } from './tabs.component';

// Mock component to host the tabs
@Component({
  template: `
    <app-tabs>
      <app-tab title="Tab 1">Content 1</app-tab>
      <app-tab title="Tab 2">Content 2</app-tab>
      <app-tab title="Tab 3" [active]="true">Content 3</app-tab>
    </app-tabs>
  `,
})
class TestHostComponent {}

@Component({
  template: `
    <app-tabs>
      <app-tab title="First">First Content</app-tab>
      <app-tab title="Second">Second Content</app-tab>
    </app-tabs>
  `,
})
class DefaultHostComponent {}

describe('TabsComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TabsComponent,
        TabComponent,
        TestHostComponent,
        DefaultHostComponent,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the tab headers', () => {
    const tabHeaders = fixture.debugElement.queryAll(By.css('.nav-tabs li'));
    expect(tabHeaders.length).toBe(3);
    expect(tabHeaders[0].nativeElement.textContent.trim()).toBe('Tab 1');
    expect(tabHeaders[1].nativeElement.textContent.trim()).toBe('Tab 2');
    expect(tabHeaders[2].nativeElement.textContent.trim()).toBe('Tab 3');
  });

  it('should make the first tab active by default if no active tab is specified', () => {
    const testFixture = TestBed.createComponent(DefaultHostComponent);
    testFixture.detectChanges();
    const tabsComponent = testFixture.debugElement.query(
      By.directive(TabsComponent)
    ).componentInstance;
    expect(tabsComponent.tabs.first.active).toBe(true);
    const tabPanes = testFixture.debugElement.queryAll(By.css('.pane'));
    expect(tabPanes[0].properties['hidden']).toBe(false);
    expect(tabPanes[1].properties['hidden']).toBe(true);
  });


  it('should show the content of the active tab', () => {
    const tabPanes = fixture.debugElement.queryAll(By.css('.pane'));
    expect(tabPanes[0].properties['hidden']).toBe(true);
    expect(tabPanes[1].properties['hidden']).toBe(true);
    expect(tabPanes[2].properties['hidden']).toBe(false);
    expect(tabPanes[2].nativeElement.textContent.trim()).toBe('Content 3');
  });

  it('should switch to another tab when its header is clicked', () => {
    const tabHeaders = fixture.debugElement.queryAll(By.css('.nav-tabs li'));
    tabHeaders[0].nativeElement.click();
    fixture.detectChanges();

    const tabPanes = fixture.debugElement.queryAll(By.css('.pane'));
    expect(tabPanes[0].properties['hidden']).toBe(false);
    expect(tabPanes[1].properties['hidden']).toBe(true);
    expect(tabPanes[2].properties['hidden']).toBe(true);

    const tabs = fixture.debugElement.query(By.directive(TabsComponent)).componentInstance.tabs.toArray();
    expect(tabs[0].active).toBe(true);
    expect(tabs[1].active).toBe(false);
    expect(tabs[2].active).toBe(false);
  });
});
