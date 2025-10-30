# Angular Interview Questions - Mind Map

```
Angular Common Interview Questions
├── Framework Fundamentals
│   ├── What is Angular vs AngularJS?
│   │   ├── TypeScript-based
│   │   ├── Component-based architecture
│   │   ├── Improved Dependency Injection
│   │   └── Angular CLI tooling
│   ├── Angular Packages
│   │   ├── @angular/core
│   │   ├── @angular/common
│   │   ├── @angular/forms
│   │   └── @angular/router
│   └── Bootstrap Process
│       ├── main.ts entry point
│       ├── AppModule loading
│       └── Component tree initialization
│
├── Components & Templates
│   ├── Component Structure
│   │   ├── @Component decorator
│   │   ├── Template (HTML)
│   │   ├── Styles (CSS/SCSS)
│   │   └── Class (TypeScript)
│   ├── Data Binding
│   │   ├── Interpolation {{ }}
│   │   ├── Property Binding [property]
│   │   ├── Event Binding (event)
│   │   └── Two-way Binding [(ngModel)]
│   ├── Component Communication
│   │   ├── @Input() - Parent to Child
│   │   ├── @Output() & EventEmitter - Child to Parent
│   │   ├── Shared Services
│   │   └── @ViewChild/@ViewChildren
│   └── Directives Types
│       ├── Structural (*ngIf, *ngFor)
│       └── Attribute ([ngClass], [ngStyle])
│
├── Directives & Pipes
│   ├── Custom Directives
│   │   ├── Attribute Directives
│   │   ├── Structural Directives
│   │   └── Host Bindings/Listeners
│   └── Pipes
│       ├── Pure Pipes (default)
│       ├── Impure Pipes
│       └── Custom Pipe Creation
│
├── Services & Dependency Injection
│   ├── DI Concepts
│   │   ├── Inversion of Control
│   │   ├── Hierarchical Injectors
│   │   └── Provider Scopes
│   ├── Provider Types
│   │   ├── providedIn: 'root'
│   │   ├── Module providers
│   │   ├── Component providers
│   │   └── Factory providers
│   └── Provider Configurations
│       ├── useClass
│       ├── useValue
│       ├── useExisting
│       └── useFactory
│
├── Routing & Navigation
│   ├── Router Configuration
│   │   ├── Routes array
│   │   ├── RouterModule.forRoot()
│   │   └── <router-outlet>
│   ├── Lazy Loading
│   │   ├── loadChildren syntax
│   │   ├── Feature modules
│   │   └── Performance benefits
│   ├── Route Data
│   │   ├── Route parameters (:id)
│   │   ├── Query parameters (?param=value)
│   │   ├── Route state
│   │   └── Route resolvers
│   └── Navigation Guards
│       ├── CanActivate
│       ├── CanDeactivate
│       ├── CanLoad
│       └── Resolve
│
├── Forms
│   ├── Template-Driven Forms
│   │   ├── ngModel directive
│   │   ├── Form validation
│   │   └── Use cases (simple forms)
│   ├── Reactive Forms
│   │   ├── FormControl
│   │   ├── FormGroup
│   │   ├── FormBuilder
│   │   └── Use cases (complex forms)
│   └── Validation
│       ├── Built-in validators
│       ├── Custom validators
│       ├── Async validators
│       └── Cross-field validation
│
├── RxJS & Observables
│   ├── Observable vs Promise
│   │   ├── Lazy vs Eager execution
│   │   ├── Cancellable vs Non-cancellable
│   │   ├── Multiple values vs Single value
│   │   └── Rich operator library
│   ├── Common Operators
│   │   ├── Transformation
│   │   │   ├── map
│   │   │   ├── switchMap
│   │   │   ├── mergeMap
│   │   │   └── concatMap
│   │   ├── Filtering
│   │   │   ├── filter
│   │   │   ├── debounceTime
│   │   │   └── distinctUntilChanged
│   │   └── Combination
│   │       ├── combineLatest
│   │       ├── merge
│   │       └── zip
│   ├── Subjects
│   │   ├── Subject (basic)
│   │   ├── BehaviorSubject (current value)
│   │   ├── ReplaySubject (replay values)
│   │   └── AsyncSubject (last value)
│   └── Memory Management
│       ├── takeUntil pattern
│       ├── async pipe
│       ├── unsubscribe()
│       └── Subscription management
│
├── Change Detection
│   ├── How it Works
│   │   ├── Zone.js integration
│   │   ├── Change detection tree
│   │   ├── Dirty checking
│   │   └── Triggering events
│   ├── OnPush Strategy
│   │   ├── When to use
│   │   ├── Immutability benefits
│   │   ├── Performance gains
│   │   └── Input/Observable changes only
│   └── Manual Control
│       ├── ChangeDetectorRef.detectChanges()
│       ├── ChangeDetectorRef.markForCheck()
│       ├── ChangeDetectorRef.detach()
│       └── ApplicationRef.tick()
│
├── Performance & Optimization
│   ├── Change Detection Optimization
│   │   ├── OnPush strategy
│   │   ├── Immutable data structures
│   │   └── trackBy functions
│   ├── Bundle Optimization
│   │   ├── Lazy loading modules
│   │   ├── Tree shaking
│   │   ├── AOT compilation
│   │   └── Bundle budgets
│   ├── Runtime Optimization
│   │   ├── Virtual scrolling
│   │   ├── Image lazy loading
│   │   ├── Preloading strategies
│   │   └── Service workers
│   └── Profiling & Debugging
│       ├── Angular DevTools
│       ├── Chrome DevTools
│       ├── Memory leak detection
│       └── Performance monitoring
│
├── Testing
│   ├── Unit Testing
│   │   ├── TestBed configuration
│   │   ├── Component testing
│   │   ├── Service testing
│   │   ├── Pipe testing
│   │   └── Directive testing
│   ├── Testing Tools
│   │   ├── Jasmine/Karma (default)
│   │   ├── Jest (alternative)
│   │   ├── Testing utilities
│   │   └── Mock creation
│   ├── Async Testing
│   │   ├── fakeAsync/tick
│   │   ├── async/whenStable
│   │   ├── Observable testing
│   │   └── HTTP testing
│   └── E2E Testing
│       ├── Cypress (recommended)
│       ├── Playwright
│       ├── WebDriver
│       └── Protractor (deprecated)
│
├── Security
│   ├── XSS Protection
│   │   ├── Built-in sanitization
│   │   ├── DomSanitizer service
│   │   ├── bypassSecurityTrust methods
│   │   └── Content Security Policy
│   ├── CSRF Protection
│   │   ├── Server-side tokens
│   │   ├── SameSite cookies
│   │   ├── HTTP interceptors
│   │   └── XSRF token handling
│   └── Best Practices
│       ├── Input validation
│       ├── Output encoding
│       ├── Secure HTTP communication
│       └── Authentication/Authorization
│
└── Practical Coding Tasks
    ├── Component Examples
    │   ├── Debounce search component
    │   ├── Paginated list with trackBy
    │   ├── Reusable form components
    │   └── Modal/Dialog components
    ├── Directive Examples
    │   ├── Custom structural directive
    │   ├── Attribute directive for styling
    │   ├── Form validation directive
    │   └── Click outside directive
    ├── Service Examples
    │   ├── HTTP service with error handling
    │   ├── State management service
    │   ├── Caching service
    │   └── Authentication service
    └── Architecture Examples
        ├── Feature module structure
        ├── Lazy loading implementation
        ├── Shared module design
        └── Core module pattern
```

## Interview Preparation Strategy

### 1. **Conceptual Understanding**
- Focus on explaining "why" not just "what"
- Understand trade-offs and best practices
- Be able to compare different approaches

### 2. **Practical Application**
- Practice coding small examples
- Understand common patterns and anti-patterns
- Be ready to debug and explain code snippets

### 3. **Performance Awareness**
- Know optimization techniques
- Understand when and why to apply them
- Be familiar with profiling tools

### 4. **Testing Knowledge**
- Understand different testing strategies
- Know how to test async operations
- Be familiar with mocking and stubbing

### 5. **Security Consciousness**
- Understand common vulnerabilities
- Know Angular's built-in protections
- Be aware of best practices

## Key Interview Tips

1. **Start Simple**: Begin with basic concepts and build complexity
2. **Use Diagrams**: Draw component trees, DI hierarchies, or data flow
3. **Show Code**: Provide concrete, working examples
4. **Explain Trade-offs**: Discuss pros/cons of different approaches
5. **Ask Questions**: Clarify requirements and constraints
6. **Stay Current**: Know recent Angular features and deprecations

## Common Follow-up Questions

- "How would you optimize this for performance?"
- "What would you test in this component?"
- "How would you handle errors in this scenario?"
- "What security considerations are there?"
- "How would this scale with a larger team?"