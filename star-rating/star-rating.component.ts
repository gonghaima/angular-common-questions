import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="star-rating">
      <ng-container *ngFor="let star of stars; let i = index">
        <span
          class="star"
          [class.filled]="i < currentRating"
          (click)="selectRating(i + 1)"
          (mouseenter)="hoverRating = i + 1"
          (mouseleave)="hoverRating = 0"
        >
          &#9733;
        </span>
      </ng-container>
    </div>
  `,
  styles: [`
    .star-rating {
      font-size: 2rem;
      cursor: pointer;
    }
    .star {
      color: lightgray;
    }
    .star.filled {
      color: gold;
    }
  `]
})
export class StarRatingComponent implements OnInit {
  @Input() initialRating: number = 0;
  @Input() maxRating: number = 5;
  @Output() ratingChange = new EventEmitter<number>();

  currentRating: number = 0;
  hoverRating: number = 0;
  stars: number[] = [];

  ngOnInit(): void {
    this.currentRating = this.initialRating;
    this.stars = Array(this.maxRating).fill(0);
  }

  selectRating(rating: number): void {
    this.currentRating = rating;
    this.ratingChange.emit(this.currentRating);
  }
}
