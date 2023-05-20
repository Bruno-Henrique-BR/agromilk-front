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
    quantidadeAtual: 0
  }

  modelo: FormControl = new FormControl(null, Validators.minLength(3));
  capacidade: FormControl = new FormControl(null, Validators.required);



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

  limitarCapacidade(event: any) {
    const input = event.target as HTMLInputElement;
    const regex = /^[0-9]{0,5}(\.[0-9]{0,2})?$/;
  
    if (!regex.test(input.value)) {
      input.value = input.value.slice(0, -1);
    }
  }
  



  validaCampos(): boolean {
    return this.modelo.valid  && this.capacidade.valid 
  }
}
