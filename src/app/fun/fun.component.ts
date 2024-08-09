import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { map, Observable, startWith, combineLatest } from 'rxjs';

const NUMBER_OF_ITEMS = 500;
const ITEMS = Array.from(Array(NUMBER_OF_ITEMS).keys());

const createStockItem = (index: number) => ({
  id: index + 1,
  price: Math.round(Math.random() * 1000),
  name: `Item ${index + 1}`,
  available: Math.random() > 0.5,
  description: `Description ${index + 1}`,
  image: `https://picsum.photos/200/300?random=${index + 1}`,
});

type Item = {
  id: number;
  price: number;
  name: string;
  available: boolean;
  description: string;
  image: string;
};

const sampleItems: Item[] = ITEMS.map(createStockItem);

@Component({
  selector: 'app-fun',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './fun.component.html',
  styleUrl: './fun.component.css',
})
export class FunComponent {
  range = new FormControl();
  min = new FormControl(0);
  max = new FormControl(1000);
  availability = new FormControl('all');

  items$: Observable<Item[]>;

  constructor() {
    this.items$ = combineLatest([
      this.min.valueChanges.pipe(startWith(this.min.value)),
      this.max.valueChanges.pipe(startWith(this.max.value)),
      this.availability.valueChanges.pipe(startWith(this.availability.value)),
    ]).pipe(
      map(([min, max, availability]) => {
        return sampleItems.filter((i) => {
          if (min === null || max === null || !availability === null)
            return true;

          return (
            i.price >= min &&
            i.price <= max &&
            (availability === 'all'
              ? true
              : availability === 'in-stock'
              ? i.available
              : !i.available)
          );
        });
      }),
      startWith(sampleItems)
    );
  }
}
