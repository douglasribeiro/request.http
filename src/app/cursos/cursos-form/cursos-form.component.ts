import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss']
})
export class CursosFormComponent implements OnInit {

  form: FormGroup;
  submited = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]]
    });
  }

  onSubmit(){
    this.submited = true;
    console.log(this.form.value);
    if (this.form.valid){
      console.log('Submit');
    }
  }

  onCancel(){
    this.submited = false;
    this.form.reset();
    //console.log('Cancel');
  }

  hasErrors(field: string){
    return this.form.get(field).errors;
  }

}
