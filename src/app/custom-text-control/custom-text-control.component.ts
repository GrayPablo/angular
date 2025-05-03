import { NgIf, TitleCasePipe } from '@angular/common';
import { Component, Input, OnInit, Optional} from '@angular/core';
import { AbstractControl, ControlValueAccessor, NgControl, ValidationErrors, Validator } from '@angular/forms';
import { MyDirective } from '../directives/my-directive.directive';
import { MatError, MatFormField, MatHint } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-custom-text-control',
  imports: [MatFormField, MatHint, MatInputModule, MatError, NgIf, TitleCasePipe],
  template: `
  <div class="row">
    <div class="col">
        <label class="form-label"> {{label | titlecase }} </label>
    </div>
    <div class="col">
      <mat-form-field>
        <input matInput 
              [value]="value" 
              type="text" 
              class="form-control" 
              name="surname" 
              formControl="control"
              (input)="onInput($event)" (blur)="onTouched()"/>
        @if (hasDirective) {
          <mat-hint>Directive present!</mat-hint>
        }
        <mat-error *ngIf="this.control?.hasError('required')">Required</mat-error>
        <!-- @if (this.control?.touched) { -->
        <!-- @if (this.control?.hasError('required')) {
          <mat-error *ngIf="">Required</mat-error>
        } -->
        @if (this.control?.hasError('minlength')) {
          <mat-error>Too short</mat-error>
        }
        @if (this.control?.hasError('maxlength')) {
          <mat-error>Too long</mat-error>
        }
        <!-- } -->
      </mat-form-field>
    </div>
  </div>
  `,
  styleUrl: './custom-text-control.component.css',
  standalone: true,
  providers: [
  ]
})
export class CustomTextControlComponent implements ControlValueAccessor, Validator {
  
  @Input()
  label: string | undefined;

  value: string | undefined;

  // private directive: MyDirective | undefined;

  // control: AbstractControl | undefined;
  
  constructor(private ngControl: NgControl, @Optional() private directive: MyDirective) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;

    }
  }

  onChange = (value: string) => {};
  onTouched   = () => {};
  onValidatorChange = () => {};
  
  writeValue(obj: string): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  // setDisabledState?(isDisabled: boolean): void {
    //   throw new Error('Method not implemented.');
    // }
  onInput(e: Event) {
    const input = e.target as HTMLInputElement;
    this.value = input.value;
    // console.log('Input value is: ' + this.value)
    this.onChange(this.value);
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return null;
  }

  registerOnValidatorChange(fn: () => void): void {
    this.onValidatorChange = fn;
  }

  get control(): AbstractControl | null {
    return this.ngControl?.control;
  } 

  get hasDirective(): boolean {
    return this.directive ? true : false;
  }

}
