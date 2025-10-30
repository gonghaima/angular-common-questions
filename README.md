# Angular Common Questions Guide

This document collects common Angular interview questions and concise guidance for answering them. Use it to review core concepts, practice explanations and whiteboard/coding tasks, and prepare for behavioral or architecture questions.

## How to use
- Read each topic and try to answer the example questions aloud.
- Implement small code samples to solidify knowledge (components, services, routing, forms).
- Review RxJS basics and practice debugging change detection/performance issues.

## Core concepts to master
- Components, templates, and data binding
- Modules and NgModule boundaries
- Dependency injection (providers, hierarchical injectors)
- RxJS and Observables
- Change detection and OnPush strategy
- Angular Router and lazy loading
- Forms (template-driven vs reactive)
- Lifecycle hooks
- Angular CLI, tooling and testing (Jasmine/Karma or Jest)

## Common interview questions (by topic)

### Framework fundamentals
- What is Angular and how does it differ from AngularJS? (TS, Component-based, improved DI, CLI)
- What are Angular packages (core, common, forms, router) and what do they provide?
- Explain the Angular application bootstrap process.

### Components & Templates
- What is a component? What are its main parts (decorator, template, styles, class)?
- How does data binding work? (Interpolation, property binding, event binding, two-way binding with ngModel)
- How do you communicate between components? (Input/Output, EventEmitter, shared service, ViewChild)
- Explain structural vs attribute directives (e.g., *ngIf vs [ngClass]).

Short answer pointers: emphasize separation of concerns, unidirectional vs two-way flows, and practical examples.

### Directives & Pipes
- How to create a custom directive? When to use attribute vs structural directives?
- What are pure and impure pipes? When to use each?
- How does Angular handle host bindings/listeners?

### Services & Dependency Injection
- What is dependency injection in Angular and why is it useful?
- Explain provider scopes: providedIn root vs provided in a module or component.
- What is a factory provider or useClass/useValue/useExisting?

### Routing & Navigation
- How does the Router work (Routes config, router-outlet, activated route)?
- What is lazy loading and how to implement it with loadChildren?
- How to pass data via route params, query params, or state?

### Forms
- Compare template-driven and reactive forms. When to use each?
- How to add custom validators and async validators?
- How to handle form-level validation and cross-field validation?

### RxJS & Observables
- Difference between Observable and Promise.
- Common operators: map, switchMap, mergeMap, concatMap, debounceTime, distinctUntilChanged, combineLatest.
- How to unsubscribe or avoid memory leaks (takeUntil, async pipe)?
- Explain Subjects (Subject, BehaviorSubject, ReplaySubject) and use cases.

### Change Detection
- How does Angular change detection work? (zones, digest is for AngularJS — Angular uses Zone.js and change detection tree)
- What is OnPush and when to use it? How does immutability help?
- How to manually trigger change detection (ChangeDetectorRef.detectChanges/markForCheck)?

### Performance & Optimization
- Techniques: OnPush, trackBy for *ngFor, lazy loading modules and images, preloading strategies, AOT, bundle budgeting, tree-shaking.
- How to profile and find memory leaks or render bottlenecks.

### Testing
- Unit testing components, services, and pipes with TestBed, mocking dependencies.
- E2E testing choices (Cypress, Playwright, Protractor deprecation).
- How to test Observables and async flows.

### Security
- XSS protection: use built-in sanitization, avoid bypassSecurityTrust unless necessary.
- Prevent CSRF: server-side tokens, same-site cookies.

## Sample coding tasks (practice)
- Create a reusable debounce-search component using Reactive Forms and switchMap.
- Implement a paginated list component with trackBy and OnPush that fetches data from a mock service.
- Build a small feature module and lazy-load it via the router.
- Write a custom structural directive that repeats an element N times.

## What look for
- Clear explanation of concepts, not just memorized definitions.
- Practical trade-offs (e.g., OnPush benefits vs complexity).
- Awareness of performance, testing and security best practices.
- Ability to read and modify small code snippets quickly.

## Quick tips for answers
- Use simple diagrams or sketches when explaining architecture or DI.
- When asked for code, prefer small, complete examples over long pseudo-code.
- If you don't know an answer, explain how you'd find or test the behavior.

## Resources
- Official docs: https://angular.io
- RxJS docs and interactive marble testing: https://rxjs.dev
- Angular style guide: https://angular.io/guide/styleguide
- Testing guides: Angular docs / community tutorials
