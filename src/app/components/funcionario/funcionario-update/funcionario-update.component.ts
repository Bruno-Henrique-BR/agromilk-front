import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Funcionario } from 'src/app/models/funcionario';
import { FuncionarioService } from 'src/app/services/funcionario.service';


@Component({
  selector: 'app-funcionario-update',
  templateUrl: './funcionario-update.component.html',
  styleUrls: ['./funcionario-update.component.css']
})
export class FuncionarioUpdateComponent implements OnInit {

    funcionario: Funcionario = {
    idFuncionario:         '',
    nomeFuncionario:       '',
    cpf:                   '',
    dataNascimento: '',
    endereco:              '',
    telefone:              '',
   
  }
 
  nomeFuncionario: FormControl =  new FormControl(null, Validators.minLength(3));
  descricao: FormControl =  new FormControl(null, Validators.minLength(3));


  constructor(
    private service: FuncionarioService,
    private toast:    ToastrService,
    private router:          Router,
    private route:   ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.funcionario.idFuncionario = this.route.snapshot.paramMap.get('idFuncionario');
    this.findById();
   }
   

  findById(): void {
    this.service.findById(this.funcionario.idFuncionario).subscribe(resposta => {
      this.funcionario = resposta;
    })
  }

  update(): void {
    this.funcionario.dataNascimento = moment(this.funcionario.dataNascimento).format('DD/MM/YYYY');
    this.service.atualizarFuncionario(this.funcionario).subscribe(() => {
      this.toast.success('Funcionario atualizado com sucesso', 'Update');
      this.router.navigate(['funcionario'])
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
    return this.nomeFuncionario.valid && this.descricao.valid
  }
}
