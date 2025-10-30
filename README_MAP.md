# Angular Common Questions Guide - Complete Map with Answers

This document provides comprehensive answers to common Angular interview questions based on the README.md guide.

## How to Use This Guide
- **Read each topic** and practice explaining answers aloud
- **Implement code samples** to solidify understanding
- **Review RxJS basics** and practice debugging change detection/performance issues
- **Focus on practical examples** rather than memorized definitions

---

## Framework Fundamentals

### Q: What is Angular and how does it differ from AngularJS?

**Short Answer:**
- **Angular** (2+): TypeScript-based, component architecture, improved DI, CLI tooling, mobile-first
- **AngularJS** (1.x): JavaScript-based, MVC pattern, basic DI, manual setup, desktop-focused
- **Key differences**: Complete rewrite, better performance, TypeScript support, mobile support, better tooling

### Q: What are Angular packages and what do they provide?

**Short Answer:**
- **@angular/core**: Core framework functionality (components, services, DI)
- **@angular/common**: Common directives (ngIf, ngFor), pipes, HTTP client
- **@angular/forms**: Template-driven and reactive forms
- **@angular/router**: Routing and navigation
- **@angular/platform-browser**: Browser-specific rendering

### Q: Explain the Angular application bootstrap process

**Short Answer:**
1. **main.ts** loads and bootstraps the AppModule
2. **AppModule** declares root component and imports
3. **Root component** is rendered in index.html
4. **Component tree** is built and change detection starts
5. **Services** are instantiated based on DI configuration

---

## Components & Templates

### Q: What is a component? What are its main parts?

**Short Answer:**
A component controls a view through its template and defines application logic.

**Main parts:**
- **@Component decorator**: Metadata (selector, template, styles)
- **Template**: HTML with Angular markup
- **Styles**: CSS/SCSS for component styling
- **Class**: TypeScript logic, properties, and methods

```typescript
@Component({
  selector: 'app-example',
  template: '<h1>{{title}}</h1>',
  styleUrls: ['./example.component.css']
})
export class ExampleComponent {
  title = 'Hello World';
}
```

### Q: How does data binding work?

**Short Answer:**
- **Interpolation** `{{value}}`: One-way, component to template
- **Property binding** `[property]="value"`: One-way, component to template
- **Event binding** `(event)="handler()"`: One-way, template to component
- **Two-way binding** `[(ngModel)]="value"`: Bidirectional data flow

### Q: How do you communicate between components?

**Short Answer:**
- **@Input()**: Parent to child data passing
- **@Output() + EventEmitter**: Child to parent event communication
- **Shared service**: Cross-component communication via service
- **@ViewChild/@ViewChildren**: Parent accessing child component/element

```typescript
// Parent to Child
@Input() data: string;

// Child to Parent
@Output() notify = new EventEmitter<string>();
this.notify.emit('message');

// Shared Service
constructor(private sharedService: SharedService) {}
```

### Q: Explain structural vs attribute directives

**Short Answer:**
- **Structural directives**: Modify DOM structure (*ngIf, *ngFor, *ngSwitch)
- **Attribute directives**: Modify element appearance/behavior ([ngClass], [ngStyle], [ngModel])
- **Structural** use `*` syntax and `<ng-template>`
- **Attribute** modify existing elements without changing DOM structure

---

## Directives & Pipes

### Q: How to create a custom directive? When to use attribute vs structural?

**Short Answer:**
```typescript
// Attribute Directive
@Directive({ selector: '[appHighlight]' })
export class HighlightDirective {
  @HostListener('mouseenter') onMouseEnter() {
    // Modify element behavior
  }
}

// Structural Directive
@Directive({ selector: '[appUnless]' })
export class UnlessDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}
}
```

**When to use:**
- **Attribute**: Modify existing element (styling, behavior)
- **Structural**: Add/remove elements from DOM

### Q: What are pure and impure pipes? When to use each?

**Short Answer:**
- **Pure pipes** (default): Only execute when input changes, better performance
- **Impure pipes**: Execute on every change detection cycle, use sparingly

```typescript
// Pure pipe (default)
@Pipe({ name: 'multiply' })
export class MultiplyPipe implements PipeTransform {
  transform(value: number, factor: number): number {
    return value * factor;
  }
}

// Impure pipe
@Pipe({ name: 'impureFilter', pure: false })
export class ImpureFilterPipe implements PipeTransform {
  transform(items: any[], filter: string): any[] {
    // Executes every change detection cycle
    return items.filter(item => item.includes(filter));
  }
}
```

### Q: How does Angular handle host bindings/listeners?

**Short Answer:**
- **@HostBinding**: Bind directive properties to host element properties
- **@HostListener**: Listen to host element events

```typescript
@Directive({ selector: '[appExample]' })
export class ExampleDirective {
  @HostBinding('class.active') isActive = true;
  @HostBinding('style.color') color = 'red';
  
  @HostListener('click', ['$event'])
  onClick(event: Event) {
    // Handle click event
  }
}
```

---

## Services & Dependency Injection

### Q: What is dependency injection in Angular and why is it useful?

**Short Answer:**
DI is a design pattern where dependencies are provided to a class rather than created by it.

**Benefits:**
- **Testability**: Easy to mock dependencies
- **Maintainability**: Loose coupling between components
- **Reusability**: Services can be shared across components
- **Flexibility**: Easy to swap implementations

### Q: Explain provider scopes: providedIn root vs module vs component

**Short Answer:**
- **providedIn: 'root'**: Singleton across entire app, tree-shakable
- **Module providers**: Singleton within module scope
- **Component providers**: New instance for each component instance

```typescript
// Root level (recommended)
@Injectable({ providedIn: 'root' })
export class GlobalService {}

// Module level
@NgModule({
  providers: [ModuleScopedService]
})

// Component level
@Component({
  providers: [ComponentScopedService]
})
```

### Q: What is a factory provider or useClass/useValue/useExisting?

**Short Answer:**
Different ways to configure how DI creates instances:

```typescript
providers: [
  // useClass: Provide different implementation
  { provide: ApiService, useClass: MockApiService },
  
  // useValue: Provide static value
  { provide: API_URL, useValue: 'https://api.example.com' },
  
  // useExisting: Alias to existing provider
  { provide: NewService, useExisting: OldService },
  
  // useFactory: Create with factory function
  { 
    provide: ConfigService, 
    useFactory: (http: HttpClient) => new ConfigService(http),
    deps: [HttpClient]
  }
]
```

---

## Routing & Navigation

### Q: How does the Router work?

**Short Answer:**
- **Routes config**: Array defining path-component mappings
- **<router-outlet>**: Placeholder where routed components render
- **ActivatedRoute**: Service providing current route information

```typescript
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'user/:id', component: UserComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

// In component
constructor(private route: ActivatedRoute) {
  this.userId = this.route.snapshot.paramMap.get('id');
}
```

### Q: What is lazy loading and how to implement it?

**Short Answer:**
Lazy loading loads feature modules only when needed, reducing initial bundle size.

```typescript
const routes: Routes = [
  {
    path: 'feature',
    loadChildren: () => import('./feature/feature.module').then(m => m.FeatureModule)
  }
];

// Feature module
@NgModule({
  declarations: [FeatureComponent],
  imports: [RouterModule.forChild(featureRoutes)]
})
export class FeatureModule {}
```

### Q: How to pass data via route params, query params, or state?

**Short Answer:**
```typescript
// Route params: /user/123
this.router.navigate(['/user', userId]);
this.route.paramMap.subscribe(params => {
  const id = params.get('id');
});

// Query params: /search?q=angular
this.router.navigate(['/search'], { queryParams: { q: 'angular' } });
this.route.queryParamMap.subscribe(params => {
  const query = params.get('q');
});

// State: Hidden data not in URL
this.router.navigate(['/page'], { state: { data: complexObject } });
const state = this.router.getCurrentNavigation()?.extras.state;
```

---

## Forms

### Q: Compare template-driven and reactive forms. When to use each?

**Short Answer:**

| Template-Driven | Reactive |
|-----------------|----------|
| ngModel in template | FormControl/FormGroup in component |
| Async validation | Sync validation |
| Simple forms | Complex forms |
| Less code | More control |

```typescript
// Template-driven
<form #form="ngForm">
  <input [(ngModel)]="user.name" name="name" required>
</form>

// Reactive
this.userForm = this.fb.group({
  name: ['', Validators.required]
});
```

**When to use:**
- **Template-driven**: Simple forms, rapid prototyping
- **Reactive**: Complex validation, dynamic forms, testing

### Q: How to add custom validators and async validators?

**Short Answer:**
```typescript
// Custom validator
function emailValidator(control: AbstractControl): ValidationErrors | null {
  const email = control.value;
  if (!email || email.includes('@')) {
    return null;
  }
  return { invalidEmail: true };
}

// Async validator
function uniqueEmailValidator(http: HttpClient): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return http.get(`/api/check-email/${control.value}`).pipe(
      map(exists => exists ? { emailTaken: true } : null)
    );
  };
}

// Usage
this.form = this.fb.group({
  email: ['', [Validators.required, emailValidator], [uniqueEmailValidator(this.http)]]
});
```

### Q: How to handle form-level validation and cross-field validation?

**Short Answer:**
```typescript
// Cross-field validator
function passwordMatchValidator(form: AbstractControl): ValidationErrors | null {
  const password = form.get('password');
  const confirmPassword = form.get('confirmPassword');
  
  if (password?.value !== confirmPassword?.value) {
    return { passwordMismatch: true };
  }
  return null;
}

// Apply to form
this.form = this.fb.group({
  password: ['', Validators.required],
  confirmPassword: ['', Validators.required]
}, { validators: passwordMatchValidator });
```

---

## RxJS & Observables

### Q: Difference between Observable and Promise

**Short Answer:**

| Observable | Promise |
|------------|---------|
| Lazy execution | Eager execution |
| Multiple values | Single value |
| Cancellable | Not cancellable |
| Rich operators | Limited methods |
| Cold by default | Always hot |

```typescript
// Promise
const promise = fetch('/api/data'); // Executes immediately
promise.then(data => console.log(data));

// Observable
const observable = this.http.get('/api/data'); // Lazy
observable.subscribe(data => console.log(data)); // Executes on subscribe
```

### Q: Common operators and their use cases

**Short Answer:**
```typescript
// Transformation
map(x => x * 2)              // Transform each value
switchMap(id => getUser(id)) // Switch to new observable, cancel previous
mergeMap(id => getUser(id))  // Merge multiple observables
concatMap(id => getUser(id)) // Concat observables in order

// Filtering
filter(x => x > 5)           // Filter values
debounceTime(300)            // Delay emission
distinctUntilChanged()       // Emit only when value changes

// Combination
combineLatest([obs1, obs2])  // Combine latest values
merge(obs1, obs2)            // Merge multiple streams
```

### Q: How to unsubscribe or avoid memory leaks?

**Short Answer:**
```typescript
// 1. takeUntil pattern (recommended)
private destroy$ = new Subject<void>();

ngOnInit() {
  this.dataService.getData()
    .pipe(takeUntil(this.destroy$))
    .subscribe(data => this.data = data);
}

ngOnDestroy() {
  this.destroy$.next();
  this.destroy$.complete();
}

// 2. async pipe (automatic unsubscribe)
data$ = this.dataService.getData();
// Template: {{ data$ | async }}

// 3. Manual unsubscribe
private subscription = new Subscription();

ngOnInit() {
  this.subscription.add(
    this.dataService.getData().subscribe(data => this.data = data)
  );
}

ngOnDestroy() {
  this.subscription.unsubscribe();
}
```

### Q: Explain Subjects and their use cases

**Short Answer:**
```typescript
// Subject: Basic multicast observable
const subject = new Subject<string>();
subject.next('Hello'); // Emit to all subscribers

// BehaviorSubject: Stores current value
const behaviorSubject = new BehaviorSubject<string>('initial');
behaviorSubject.value; // Get current value

// ReplaySubject: Replays last N values
const replaySubject = new ReplaySubject<string>(3); // Replay last 3

// AsyncSubject: Emits only last value on complete
const asyncSubject = new AsyncSubject<string>();
```

**Use cases:**
- **Subject**: Event bus, notifications
- **BehaviorSubject**: State management, current user
- **ReplaySubject**: Caching, late subscribers
- **AsyncSubject**: Single async operation result

---

## Change Detection

### Q: How does Angular change detection work?

**Short Answer:**
1. **Zone.js** patches async operations (events, timers, promises)
2. **Change detection cycle** runs after async operations
3. **Component tree** is traversed from root to leaves
4. **Dirty checking** compares current vs previous values
5. **DOM updates** only if changes detected

**Not digest cycle** (that's AngularJS) - Angular uses Zone.js and unidirectional data flow.

### Q: What is OnPush and when to use it? How does immutability help?

**Short Answer:**
OnPush strategy only checks component when:
- Input properties change (reference comparison)
- Event is triggered
- Observable emits (with async pipe)

```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptimizedComponent {
  @Input() data: any; // Must be immutable for OnPush to work
}
```

**Benefits:**
- **Performance**: Skips unnecessary checks
- **Predictability**: Clear when component updates
- **Immutability**: Forces good practices

### Q: How to manually trigger change detection?

**Short Answer:**
```typescript
constructor(private cdr: ChangeDetectorRef) {}

// Trigger change detection for this component and children
this.cdr.detectChanges();

// Mark component for check in next cycle
this.cdr.markForCheck();

// Detach from change detection
this.cdr.detach();

// Reattach to change detection
this.cdr.reattach();

// Trigger global change detection
constructor(private appRef: ApplicationRef) {}
this.appRef.tick();
```

---

## Performance & Optimization

### Q: What are the main performance optimization techniques?

**Short Answer:**
```typescript
// 1. OnPush strategy
@Component({ changeDetection: ChangeDetectionStrategy.OnPush })

// 2. TrackBy for *ngFor
trackByFn(index: number, item: any) {
  return item.id; // Use unique identifier
}
// Template: *ngFor="let item of items; trackBy: trackByFn"

// 3. Lazy loading modules
{ path: 'feature', loadChildren: () => import('./feature.module') }

// 4. Preloading strategies
RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })

// 5. AOT compilation (default in production)
ng build --aot

// 6. Tree shaking (automatic with Angular CLI)
// 7. Bundle budgets in angular.json
"budgets": [{ "type": "initial", "maximumWarning": "2mb" }]
```

### Q: How to profile and find memory leaks or render bottlenecks?

**Short Answer:**
```typescript
// 1. Angular DevTools (Chrome extension)
// - Component tree inspection
// - Change detection profiling

// 2. Chrome DevTools
// - Performance tab for rendering issues
// - Memory tab for leak detection
// - Lighthouse for overall performance

// 3. Memory leak detection
// - Check for unsubscribed observables
// - Event listeners not removed
// - Circular references

// 4. Performance monitoring
import { enableProdMode } from '@angular/core';
if (environment.production) {
  enableProdMode(); // Disables development checks
}
```

---

## Testing

### Q: How to unit test components, services, and pipes?

**Short Answer:**
```typescript
// Component testing
describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserComponent],
      imports: [HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
  });

  it('should display user name', () => {
    component.user = { name: 'John' };
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('John');
  });
});

// Service testing
describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should fetch users', () => {
    const mockUsers = [{ id: 1, name: 'John' }];
    
    service.getUsers().subscribe(users => {
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne('/api/users');
    req.flush(mockUsers);
  });
});

// Pipe testing
describe('CapitalizePipe', () => {
  let pipe: CapitalizePipe;

  beforeEach(() => {
    pipe = new CapitalizePipe();
  });

  it('should capitalize first letter', () => {
    expect(pipe.transform('hello')).toBe('Hello');
  });
});
```

### Q: E2E testing choices and how to test Observables/async flows?

**Short Answer:**
```typescript
// E2E Testing Options
// 1. Cypress (recommended) - Modern, fast, great DX
// 2. Playwright - Cross-browser, Microsoft-backed
// 3. WebDriver - Traditional, more complex
// 4. Protractor (deprecated) - Don't use for new projects

// Testing async flows
describe('Async Component', () => {
  it('should handle async data', fakeAsync(() => {
    component.loadData();
    tick(1000); // Simulate time passage
    expect(component.data).toBeDefined();
  }));

  it('should handle observables', () => {
    const testData = { id: 1 };
    spyOn(service, 'getData').and.returnValue(of(testData));
    
    component.ngOnInit();
    
    expect(component.data).toEqual(testData);
  });

  it('should handle promises', async(() => {
    component.loadDataPromise().then(() => {
      expect(component.loaded).toBe(true);
    });
  }));
});
```

---

## Security

### Q: How does Angular protect against XSS? When to use bypassSecurityTrust?

**Short Answer:**
```typescript
// Built-in XSS protection
// Angular automatically sanitizes values in templates
<div>{{userInput}}</div> // Automatically sanitized

// Bypass security (use carefully!)
constructor(private sanitizer: DomSanitizer) {}

// Only when you trust the content
getTrustedHtml(html: string) {
  return this.sanitizer.bypassSecurityTrustHtml(html);
}

// Content Security Policy
// Set CSP headers on server
// Content-Security-Policy: default-src 'self'; script-src 'self'
```

**When to bypass:**
- Trusted HTML content from CMS
- SVG content you control
- Iframe sources you trust
- **Never** bypass user input without validation

### Q: How to prevent CSRF attacks?

**Short Answer:**
```typescript
// 1. Server-side CSRF tokens
// Angular automatically handles XSRF tokens

// 2. HttpClientXsrfModule (automatic)
@NgModule({
  imports: [
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-XSRF-TOKEN'
    })
  ]
})

// 3. SameSite cookies (server configuration)
// Set-Cookie: sessionId=abc123; SameSite=Strict

// 4. Custom interceptor for additional security
@Injectable()
export class CsrfInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.method === 'POST') {
      const csrfReq = req.clone({
        setHeaders: { 'X-CSRF-Token': this.getCsrfToken() }
      });
      return next.handle(csrfReq);
    }
    return next.handle(req);
  }
}
```

---

## Sample Coding Tasks (Practice)

### 1. Debounce Search Component
```typescript
@Component({
  template: `
    <input [formControl]="searchControl" placeholder="Search...">
    <div *ngFor="let result of results$ | async">{{result.name}}</div>
  `
})
export class DebounceSearchComponent implements OnInit {
  searchControl = new FormControl('');
  results$ = this.searchControl.valueChanges.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    switchMap(query => query ? this.searchService.search(query) : of([]))
  );

  constructor(private searchService: SearchService) {}
}
```

### 2. Paginated List with TrackBy and OnPush
```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div *ngFor="let item of items; trackBy: trackByFn">{{item.name}}</div>
    <button (click)="loadMore()">Load More</button>
  `
})
export class PaginatedListComponent {
  @Input() items: Item[] = [];
  
  trackByFn(index: number, item: Item) {
    return item.id;
  }

  loadMore() {
    // Emit event to parent or call service
  }
}
```

### 3. Custom Structural Directive
```typescript
@Directive({ selector: '[appRepeat]' })
export class RepeatDirective implements OnInit {
  @Input() set appRepeat(count: number) {
    this.viewContainer.clear();
    for (let i = 0; i < count; i++) {
      this.viewContainer.createEmbeddedView(this.templateRef, { index: i });
    }
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}
}

// Usage: <div *appRepeat="3">Repeated content</div>
```

---

## Interview Success Tips

### What Interviewers Look For
- **Clear explanations** of concepts, not memorized definitions
- **Practical trade-offs** understanding (e.g., OnPush benefits vs complexity)
- **Performance awareness** and optimization techniques
- **Testing knowledge** and best practices
- **Security consciousness** and common vulnerabilities
- **Code quality** and ability to read/modify snippets quickly

### Quick Answer Tips
- **Use diagrams** when explaining architecture or DI hierarchies
- **Provide complete examples** rather than pseudo-code
- **Explain trade-offs** for different approaches
- **If unsure**, explain how you'd research or test the behavior
- **Ask clarifying questions** about requirements and constraints

### Key Resources
- **Official docs**: https://angular.io
- **RxJS docs**: https://rxjs.dev
- **Style guide**: https://angular.io/guide/styleguide
- **Testing guides**: Angular docs and community tutorials

---

*This guide covers the most common Angular interview questions with practical, concise answers. Practice explaining these concepts aloud and implementing the code examples to build confidence.*