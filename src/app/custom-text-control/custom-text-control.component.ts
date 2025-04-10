import { Component } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-custom-text-control',
  imports: [],
  template: `
  <div class="row">
    <div class="col">
        <label class="form-label" for="surname"> Surname </label>
    </div>
    <div class="col">
        <input matInput [value]="value" type="text" class="form-control" name="surname" (input)="onInput($event)"/>
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
    }
  ]
})
export class CustomTextControlComponent implements ControlValueAccessor {
  
  value: string | undefined;
  
  onChange = (value: string) => {};
  onTouched   = () => {};
  
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
      console.log('Input value is: ' + this.value)
      this.onChange(this.value);
    }

}
