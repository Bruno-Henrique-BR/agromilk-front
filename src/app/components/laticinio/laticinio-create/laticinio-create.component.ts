import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Laticinio } from 'src/app/models/laticinio';
import { LaticinioService } from 'src/app/services/laticinio.service';

@Component({
  selector: 'app-laticinio-create',
  templateUrl: './laticinio-create.component.html',
  styleUrls: ['./laticinio-create.component.css']
})
export class LaticinioCreateComponent implements OnInit {

  laticinio: Laticinio = {
    idLaticinio: '',
    razaoSocial: '',
    endereco: '',
    cnpj: '',
    telefone: '',
  }

  razaoSocial: FormControl = new FormControl(null, Validators.minLength(3));
  endereco: FormControl = new FormControl(null, Validators.minLength(3));
  cnpj: FormControl = new FormControl(null, [Validators.required]);
  telefone: FormControl = new FormControl(null, [Validators.required]);

  constructor(
    private service: LaticinioService,
    private toast: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void { }

  create(): void {
    this.service.cadastrarLaticinio(this.laticinio).subscribe(() => {
      this.toast.success('Laticínio cadastrado com sucesso', 'Cadastro');
      this.router.navigate(['laticinio'])
    }, ex => {
      if (ex.error.errors) {
        ex.error.errors.forEach(element => {
          this.toast.error(element.message);
        });
      } else {
        this.toast.error(ex.error.message);
      }
    })
  }

  validaCampos(): boolean {
    return this.razaoSocial.valid && this.endereco.valid && this.cnpj.valid && this.telefone.valid;
  }

}