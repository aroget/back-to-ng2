import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { map, Observable } from 'rxjs';

const isPalindrome = (str: string) => {
  const reversed = str.split('').reverse().join('');
  const isPalindrome = str === reversed;
  return isPalindrome
    ? 'Yes, the string is a palindrome'
    : 'No, the string is not a palindrome';
};

@Component({
  selector: 'app-simple',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule],
  templateUrl: './simple.component.html',
  styleUrl: './simple.component.css',
})
export class SimpleComponent {
  $result: Observable<string>;
  control: FormControl = new FormControl('');

  constructor() {
    this.$result = this.control.valueChanges.pipe(map(isPalindrome));
  }
}
