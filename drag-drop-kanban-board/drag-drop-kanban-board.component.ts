import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Card {
  id: string;
  title: string;
  priority: 'High' | 'Medium' | 'Low';
}

interface Column {
  id: string;
  title: string;
  cards: Card[];
}

@Component({
  selector: 'app-drag-drop-kanban-board',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="kanban-board">
      <form [formGroup]="cardForm" (ngSubmit)="addCard()" class="add-card-form">
        <input formControlName="title" placeholder="Card title" />
        <select formControlName="priority">
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <button type="submit" [disabled]="cardForm.invalid">Add Card</button>
      </form>

      <div class="columns">
        <div *ngFor="let column of columns" class="column">
          <h3>{{ column.title }}</h3>
          <div class="card-list">
            <div
              *ngFor="let card of column.cards"
              class="card"
              [class]="'priority-' + card.priority.toLowerCase()"
            >
              <div class="card-content">
                <h4>{{ card.title }}</h4>
                <span class="priority">{{ card.priority }}</span>
                <button (click)="deleteCard(column.id, card.id)" class="delete-btn">×</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .kanban-board { padding: 20px; }
    .add-card-form { display: flex; gap: 10px; margin-bottom: 20px; }
    .columns { display: flex; gap: 20px; }
    .column { flex: 1; background: #f5f5f5; padding: 15px; border-radius: 8px; }
    .card-list { min-height: 200px; }
    .card { background: white; margin: 10px 0; padding: 15px; border-radius: 4px; }
    .card-content { display: flex; justify-content: space-between; align-items: center; }
    .priority-high { border-left: 4px solid #ff4444; }
    .priority-medium { border-left: 4px solid #ffaa00; }
    .priority-low { border-left: 4px solid #44ff44; }
    .delete-btn { background: #ff4444; color: white; border: none; border-radius: 50%; width: 20px; height: 20px; cursor: pointer; }
  `]
})
export class DragDropKanbanBoardComponent implements OnInit {
  cardForm: FormGroup;
  columns: Column[] = [
    { id: 'todo', title: 'To Do', cards: [] },
    { id: 'inprogress', title: 'In Progress', cards: [] },
    { id: 'done', title: 'Done', cards: [] }
  ];

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) {
    this.cardForm = this.fb.group({
      title: ['', Validators.required],
      priority: ['Medium', Validators.required]
    });
  }

  ngOnInit() {
    this.loadFromStorage();
  }

  addCard() {
    if (this.cardForm.valid) {
      const newCard: Card = {
        id: Date.now().toString(),
        title: this.cardForm.value.title,
        priority: this.cardForm.value.priority
      };
      this.columns[0].cards.push(newCard);
      this.cardForm.reset({ priority: 'Medium' });
      this.saveToStorage();
      this.cdr.markForCheck();
    }
  }

  moveCard(cardId: string, fromColumnId: string, toColumnId: string) {
    const fromColumn = this.columns.find(c => c.id === fromColumnId);
    const toColumn = this.columns.find(c => c.id === toColumnId);
    
    if (fromColumn && toColumn) {
      const cardIndex = fromColumn.cards.findIndex(c => c.id === cardId);
      if (cardIndex > -1) {
        const card = fromColumn.cards.splice(cardIndex, 1)[0];
        toColumn.cards.push(card);
        this.saveToStorage();
        this.cdr.markForCheck();
      }
    }
  }

  deleteCard(columnId: string, cardId: string) {
    const column = this.columns.find(c => c.id === columnId);
    if (column) {
      column.cards = column.cards.filter(card => card.id !== cardId);
      this.saveToStorage();
      this.cdr.markForCheck();
    }
  }

  getConnectedLists(): string[] {
    return this.columns.map(column => column.id);
  }

  private saveToStorage() {
    localStorage.setItem('kanban-board', JSON.stringify(this.columns));
  }

  private loadFromStorage() {
    const saved = localStorage.getItem('kanban-board');
    if (saved) {
      this.columns = JSON.parse(saved);
      this.cdr.markForCheck();
    }
  }
}