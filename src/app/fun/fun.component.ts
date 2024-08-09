import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  map,
  Observable,
  startWith,
  combineLatest,
  switchMap,
  debounceTime,
  distinctUntilChanged,
} from 'rxjs';
import { FunService, Item } from './fun.service';

type InputValue<T> = T | null;

@Component({
  selector: 'app-fun',
  standalone: true,
  providers: [FunService],
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './fun.component.html',
  styleUrl: './fun.component.css',
})
export class FunComponent {
  min = new FormControl(0);
  name = new FormControl('');
  max = new FormControl(1000);
  availability = new FormControl('all');

  items$: Observable<Item[]>;
  loading$: Observable<boolean>;
  filters$: Observable<
    [
      InputValue<number>,
      InputValue<number>,
      InputValue<string>,
      InputValue<string>
    ]
  >;
  ui$: Observable<{
    loading: boolean;
    items: Item[];
    filters: Array<InputValue<number> | InputValue<string>>;
  }>;

  constructor(private readonly service: FunService) {
    this.filters$ = combineLatest([
      this.min.valueChanges.pipe(startWith(this.min.value)),
      this.max.valueChanges.pipe(startWith(this.max.value)),
      this.availability.valueChanges.pipe(startWith(this.availability.value)),
      this.name.valueChanges.pipe(
        debounceTime(300),
        startWith(this.name.value),
        distinctUntilChanged()
      ),
    ]);

    this.items$ = this.filters$.pipe(
      switchMap(([min, max, availability, name]) =>
        this.service.getItems({ min, max, availability, name })
      )
    );

    this.loading$ = this.filters$.pipe(
      switchMap(() =>
        this.items$.pipe(
          map(() => false),
          startWith(true)
        )
      )
    );

    this.ui$ = combineLatest([this.loading$, this.items$, this.filters$]).pipe(
      map(([loading, items, filters]) => ({
        loading,
        items,
        filters,
      })),
      startWith({
        loading: true,
        items: [],
        filters: [0, 1000, 'all', ''],
      })
    );
  }
}
