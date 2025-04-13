import { TitleCasePipe } from '@angular/common';
import { Component, Input, Pipe } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';

@Component({
  selector: 'app-custom-text-control',
  imports: [TitleCasePipe],
  template: `
  <div class="row">
    <div class="col">
        <label class="form-label" for="surname"> {{label | titlecase }} </label>
    </div>
    <div class="col">
        <input matInput [value]="value" type="text" class="form-control" name="surname" (input)="onInput($event)" (blur)="onTouched()"/>
        @if (this.control?.touched) {
          @if (this.control?.hasError('required')) {
            <div>Required</div>
          }
          @if (this.control?.hasError('minlength')) {
            <div>Too short</div>
          }
          @if (this.control?.hasError('maxlength')) {
            <div>Too long</div>
          }
        }
        
      </div>
  </div>
  `,
  styleUrl: './custom-text-control.component.css',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: CustomTextControlComponent
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: CustomTextControlComponent
    }
  ]
})
export class CustomTextControlComponent implements ControlValueAccessor, Validator {
  
  @Input()
  label: string | undefined;

  value: string | undefined;

  control: AbstractControl | undefined;
  
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
    this.control = control;
    return null;
  }

  registerOnValidatorChange(fn: () => void): void {
    this.onValidatorChange = fn;
  }

}
