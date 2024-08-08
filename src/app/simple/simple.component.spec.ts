import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SimpleComponent } from './simple.component';
describe('SimpleComponent', () => {
  let component: SimpleComponent;
  let fixture: ComponentFixture<SimpleComponent>;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [SimpleComponent],
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should validate palindrome strings', () => {
    const palindrome = 'madam';
    const control = component.control;
    control.setValue(palindrome);

    fixture.detectChanges();

    const componentElement: HTMLElement = fixture.nativeElement;
    const p = componentElement.querySelector('p')!;
    expect(p.textContent).toEqual('Yes, the string is a palindrome');
  });

  it('should validate non-palindrome strings', () => {
    const nonPalindrome = 'another';
    const control = component.control;
    control.setValue(nonPalindrome);

    fixture.detectChanges();

    const componentElement: HTMLElement = fixture.nativeElement;
    const p = componentElement.querySelector('p')!;
    expect(p.textContent).toEqual('No, the string is not a palindrome');
  });
});
