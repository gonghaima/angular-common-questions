# Angular Coding Question: Real-time Chat Component

## Problem Statement
Create a reusable Angular component called `real-time-chat` that simulates a chat interface with real-time message updates.

### Requirements
- Display a list of messages with sender name, timestamp, and message content
- Provide an input field to send new messages
- Simulate real-time incoming messages using RxJS intervals or timers
- Auto-scroll to the bottom when new messages arrive
- Show typing indicators when someone is "typing"
- Support message status (sent, delivered, read)
- Implement message filtering/search functionality

### Bonus
- Add emoji picker or reactions to messages
- Support file/image sharing simulation
- Implement message threading/replies
- Add user presence indicators (online/offline)

---

**Example Usage:**
```typescript
messages$ = new BehaviorSubject<Message[]>([
  { id: 1, sender: 'Alice', content: 'Hello!', timestamp: new Date(), status: 'read' },
  { id: 2, sender: 'Bob', content: 'Hi there!', timestamp: new Date(), status: 'delivered' }
]);

currentUser = 'You';
```

```html
<app-real-time-chat 
  [messages]="messages$ | async"
  [currentUser]="currentUser"
  (messageSent)="onMessageSent($event)"
  (messageSearch)="onSearch($event)">
</app-real-time-chat>
```

---

**Write unit tests to verify:**
- Messages display correctly with proper formatting
- New message input and submission works
- Auto-scroll behavior on new messages
- Message filtering/search functionality
- Typing indicators appear and disappear
- Message status updates correctly
- Real-time message simulation works

**Key concepts tested:**
- RxJS Observables and BehaviorSubject
- ViewChild and ElementRef for DOM manipulation
- Reactive forms for message input
- Date pipes and custom pipes
- Component lifecycle hooks
- Event handling and data flow
- Async pipe usage
- Performance optimization with OnPush and trackBy