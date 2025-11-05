import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="upload-drop" [class.drag-over]="dragOver"
      (dragover)="onDragOver($event)" (dragleave)="onDragLeave($event)" (drop)="onDrop($event)">
      <input type="file" [attr.accept]="accept" [attr.multiple]="multiple ? '' : null" (change)="onFileInput($event)" />
      <span>Drag & drop files or click to select</span>
    </div>
    <ul>
      <li *ngFor="let file of files; let i = index">
        {{ file.name }} ({{ file.size | number }} bytes)
        <button type="button" (click)="removeFile(i)">Remove</button>
      </li>
    </ul>
    <div *ngIf="error" class="error">{{ error }}</div>
  `,
  styles: [`
    .upload-drop { border: 2px dashed #888; padding: 24px; text-align: center; cursor: pointer; }
    .upload-drop.drag-over { background: #e0f7fa; }
    .error { color: #d32f2f; margin-top: 8px; }
    ul { list-style: none; padding: 0; }
    li { margin: 4px 0; }
  `]
})
export class FileUploadComponent {
  @Input() accept: string = '';
  @Input() maxSize: number = Infinity;
  @Input() multiple: boolean = true;
  @Output() filesChange = new EventEmitter<File[]>();

  files: File[] = [];
  error: string = '';
  dragOver = false;

  onFileInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.handleFiles(Array.from(input.files));
      input.value = '';
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.dragOver = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.dragOver = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.dragOver = false;
    if (event.dataTransfer?.files) {
      this.handleFiles(Array.from(event.dataTransfer.files));
    }
  }

  handleFiles(files: File[]) {
    this.error = '';
    const valid: File[] = [];
    for (const file of files) {
      if (this.accept && !file.type.match(this.accept.replace('*', '.*'))) {
        this.error = `Invalid file type: ${file.name}`;
        continue;
      }
      if (file.size > this.maxSize) {
        this.error = `File too large: ${file.name}`;
        continue;
      }
      valid.push(file);
    }
    if (valid.length) {
      this.files = this.multiple ? [...this.files, ...valid] : [valid[0]];
      this.filesChange.emit(this.files);
    }
  }

  removeFile(index: number) {
    this.files.splice(index, 1);
    this.filesChange.emit(this.files);
  }
}
