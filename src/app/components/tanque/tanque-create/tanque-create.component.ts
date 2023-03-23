import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tanque } from 'src/app/models/tanque';
import { TanqueService } from 'src/app/services/tanque.service';

@Component({
  selector: 'app-tanque-create',
  templateUrl: './tanque-create.component.html',
  styleUrls: ['./tanque-create.component.css']
})
export class TanqueCreateComponent implements OnInit {

  tanque: Tanque = {
    idTanque: '',
    descricao: '',
    capacidade: '',
    modelo: '',
    dataFabricacao: '',
    ativo: true,
  }

  modelo: FormControl = new FormControl(null, Validators.minLength(3));
  descricao: FormControl = new FormControl(null, Validators.minLength(3));

  dataFabricacao: FormControl = new FormControl(null, [Validators.required]);


  constructor(
    private service: TanqueService,
    private toast: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void { }

  create(): void {
    this.service.cadastrarTanque(this.tanque).subscribe(() => {
      this.toast.success('Tanque cadastrado com sucesso', 'Cadastro');
      this.router.navigate(['tanque'])
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
    return this.modelo.valid && this.dataFabricacao.valid && this.descricao.valid
  }
}
