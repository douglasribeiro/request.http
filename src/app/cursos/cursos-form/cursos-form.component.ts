import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { CursosService } from 'requests-http/src/app/cursos/cursos.service';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { ActivatedRoute } from '@angular/router';
import { cursorTo } from 'readline';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss'],
})
export class CursosFormComponent implements OnInit {
  form: FormGroup;
  submited = false;

  constructor(
    private fb: FormBuilder,
    private service: CursosService,
    private modal: AlertModalService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {

    /*
    this.route.params.subscribe(
      (params: any) => {
        const id = params['id'];
        console.log(id);
        const curso$ = this.service.loadById(id);
        curso$.subscribe(curso => {
          this.updateForm(curso);
        })
      }
    )
*/

this.route.params
.pipe(
  map((params: any) => params['id']),
  switchMap(id => this.service.loadById(id))
)
.subscribe(curso => this.updateForm(curso));

    this.form = this.fb.group({
      id: [null],
      nome: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(250),
        ],
      ],
    });
  }

  updateForm(curso){
    this.form.patchValue({
      id: curso.id,
      nome: curso.nome
    })
  }

  onSubmit() {
    this.submited = true;
    console.log(this.form.value);
    if (this.form.valid) {
      console.log('Submit');
      this.service.create(this.form.value).subscribe(
        (success) => {
          this.modal.showAlertsuccess('Curso criado com sucesso.');
          this.location.back();
        },
        (error) =>
          this.modal.showAlertDanger('Erro ao criar curso, tente novamente'),
        () => console.log('Request Completo')
      );
    }
  }

  onCancel() {
    this.submited = false;
    this.form.reset();
    //console.log('Cancel');
  }

  hasErrors(field: string) {
    return this.form.get(field).errors;
  }
}
