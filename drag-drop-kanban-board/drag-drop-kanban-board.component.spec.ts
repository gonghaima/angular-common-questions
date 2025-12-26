import { DragDropKanbanBoardComponent } from './drag-drop-kanban-board.component';
import { FormBuilder } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';

describe('DragDropKanbanBoardComponent', () => {
  let component: DragDropKanbanBoardComponent;
  let mockFormBuilder: FormBuilder;
  let mockChangeDetectorRef: ChangeDetectorRef;

  beforeEach(() => {
    mockFormBuilder = new FormBuilder();
    mockChangeDetectorRef = {
      markForCheck: jest.fn()
    } as any;
    
    component = new DragDropKanbanBoardComponent(mockFormBuilder, mockChangeDetectorRef);
    localStorage.clear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with three columns', () => {
    expect(component.columns).toHaveLength(3);
    expect(component.columns[0].title).toBe('To Do');
    expect(component.columns[1].title).toBe('In Progress');
    expect(component.columns[2].title).toBe('Done');
  });

  it('should add new card to To Do column', () => {
    component.cardForm.patchValue({
      title: 'Test Task',
      priority: 'High'
    });

    component.addCard();

    expect(component.columns[0].cards).toHaveLength(1);
    expect(component.columns[0].cards[0].title).toBe('Test Task');
    expect(component.columns[0].cards[0].priority).toBe('High');
  });

  it('should not add card with invalid form', () => {
    component.cardForm.patchValue({
      title: '',
      priority: 'High'
    });

    component.addCard();

    expect(component.columns[0].cards).toHaveLength(0);
  });

  it('should delete card from column', () => {
    const testCard = {
      id: '1',
      title: 'Test Task',
      priority: 'Medium' as const
    };
    component.columns[0].cards = [testCard];

    component.deleteCard('todo', '1');

    expect(component.columns[0].cards).toHaveLength(0);
  });

  it('should return connected list IDs', () => {
    const connectedLists = component.getConnectedLists();
    expect(connectedLists).toEqual(['todo', 'inprogress', 'done']);
  });

  it('should reset form after adding card', () => {
    component.cardForm.patchValue({
      title: 'Test Task',
      priority: 'High'
    });

    component.addCard();

    expect(component.cardForm.get('title')?.value).toBe(null);
    expect(component.cardForm.get('priority')?.value).toBe('Medium');
  });

  it('should move card between columns', () => {
    const testCard = {
      id: '1',
      title: 'Test Task',
      priority: 'High' as const
    };
    component.columns[0].cards = [testCard];

    component.moveCard('1', 'todo', 'inprogress');

    expect(component.columns[0].cards).toHaveLength(0);
    expect(component.columns[1].cards).toHaveLength(1);
    expect(component.columns[1].cards[0].title).toBe('Test Task');
  });
});