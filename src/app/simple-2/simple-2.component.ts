import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { EMPTY, fromEvent, map, Observable } from 'rxjs';

const isPalindrome = (str: string) => {
  const reversed = str.split('').reverse().join('');
  const isPalindrome = str === reversed;
  return isPalindrome
    ? 'Yes, the string is a palindrome'
    : 'No, the string is not a palindrome';
};

@Component({
  selector: 'app-simple-2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './simple-2.component.html',
  styleUrl: './simple-2.component.css',
})
export class Simple2Component {
  @ViewChild('input') inputEl!: ElementRef;

  $result: Observable<string>;

  ngAfterViewInit() {
    this.$result = fromEvent<Event>(this.inputEl.nativeElement, 'input').pipe(
      map((event) => {
        const input = event.target as HTMLInputElement;
        return isPalindrome(input.value);
      })
    );
  }
}
