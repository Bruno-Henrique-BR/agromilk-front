import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Raca } from 'src/app/models/raca';
import { RacaService } from 'src/app/services/raca.service';

@Component({
  selector: 'app-raca-create',
  templateUrl: './raca-create.component.html',
  styleUrls: ['./raca-create.component.css']
})
export class RacaCreateComponent implements OnInit {

  raca: Raca = {
    idRaca:         '',
    nomeRaca:       '',
    descricao:        '',
  }

  nomeRaca: FormControl =  new FormControl(null, Validators.minLength(3));
  descricao: FormControl =  new FormControl(null, Validators.minLength(3));


  constructor(
    private service: RacaService,
    private toast:    ToastrService,
    private router:          Router,
    ) { }

  ngOnInit(): void { }

  create(): void {
    this.service.cadastrarRaca(this.raca).subscribe(() => {
      this.toast.success('Cliente cadastrado com sucesso', 'Cadastro');
      this.router.navigate(['raca'])
    }, ex => {
      if(ex.error.errors) {
        ex.error.errors.forEach(element => {
          this.toast.error(element.message);
        });
      } else {
        this.toast.error(ex.error.message);
      }
    })
  }

  

  
  
  validaCampos(): boolean {
    return this.nomeRaca.valid && this.descricao.valid
  }
}
