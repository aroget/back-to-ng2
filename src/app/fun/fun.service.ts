import { Injectable } from '@angular/core';
import { delay, of } from 'rxjs';
import { faker } from '@faker-js/faker';

const NUMBER_OF_ITEMS = 500;
const ITEMS = Array.from(Array(NUMBER_OF_ITEMS).keys());

const createStockItem = (index: number): Item => ({
  id: index + 1,
  price: Math.round(Math.random() * 1000),
  name: faker.commerce.productName(),
  available: Math.random() > 0.5,
  description: `Description ${index + 1}`,
  image: `https://picsum.photos/500/200?random=${index + 1}`,
});

export type Item = {
  id: number;
  price: number;
  name: string;
  available: boolean;
  description: string;
  image: string;
};

type Filters = {
  min: number | null;
  max: number | null;
  name: string | null;
  availability: string | null;
};

@Injectable({
  providedIn: 'root',
})
export class FunService {
  items: Item[] = ITEMS.map(createStockItem);

  constructor() {}

  getItems(filters: Filters) {
    return of(
      this.items.filter((item) => this.applyFilters(item, filters))
    ).pipe(delay(1000));
  }

  private applyFilters(item: Item, filters: Filters): boolean {
    const { min, max, availability, name } = filters;
    if (min === null || max === null || availability === null || name === null)
      return true;

    return (
      item.price >= min &&
      item.price <= max &&
      item.name.toLowerCase().includes(name.toLowerCase()) &&
      (availability === 'all'
        ? true
        : availability === 'in-stock'
        ? item.available
        : !item.available)
    );
  }
}
