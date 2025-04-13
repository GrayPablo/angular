import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CustomTextControlComponent } from './custom-text-control/custom-text-control.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CustomTextControlComponent, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true
})
export class AppComponent implements OnInit {
  
  title = 'custom-control-example';
  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(8)]),
    surname: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(10)]),
  });
  
  ngOnInit(): void {
  }
  
  submit() {
    this.form.markAllAsTouched();
    console.log(this.form.controls.name.value + ',' + this.form.controls.surname.value);

  }

  get name() {    
    return this.form.get('name');  
  }

}
