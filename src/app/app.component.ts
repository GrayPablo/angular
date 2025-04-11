import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CustomTextControlComponent } from './custom-text-control/custom-text-control.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

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
    name: new FormControl(''),
    surname: new FormControl(''),
  });
  
  ngOnInit(): void {
  }
  
  submit() {
    console.log(this.form.controls.name.value + ',' + this.form.controls.surname.value);

  }

}
