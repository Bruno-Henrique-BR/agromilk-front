import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Funcionario } from 'src/app/models/funcionario';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import * as moment from 'moment';
import { MessageService } from 'src/app/services/message.service';

@Component({
    selector: 'app-funcionario-create',
    templateUrl: './funcionario-create.component.html',
    styleUrls: ['./funcionario-create.component.css']
})
export class FuncionarioCreateComponent implements OnInit {

    funcionario: Funcionario = {
        idFuncionario: '',
        nomeFuncionario: '',
        cpf: '',
        dataNascimento: '',
        endereco: '',
        telefone: '',
        email: '',
        senha: '',
        perfil: null,
        perfis: [] 
    }
    checkboxMarcada: boolean = false;

    addPerfil(perfil: number): void {
        this.checkboxMarcada = true;

        if (!this.funcionario.perfis.includes(perfil)) {
          this.funcionario.perfis.push(perfil);
        } else {
          const index = this.funcionario.perfis.indexOf(perfil);
          this.funcionario.perfis.splice(index, 1);
        }

      }
    nomeFuncionario: FormControl = new FormControl(null, Validators.minLength(3));
    cpf: FormControl = new FormControl(null, [Validators.required, Validators.minLength(11), Validators.maxLength(11)]);
    dataNascimento: FormControl = new FormControl(null, Validators.required);
    endereco: FormControl = new FormControl(null, Validators.minLength(3));
    telefone: FormControl = new FormControl(null, Validators.required);
    email =        new FormControl(null, [Validators.email]);
    senha = new FormControl(null, [Validators.minLength(3)]);

    constructor(
        private service: FuncionarioService,
        private toast: ToastrService,
        private messageService: MessageService,
        private router: Router,
    ) { }

    ngOnInit(): void {
        
     }

    create(): void {
      if (!this.checkboxMarcada) {
        // Exibir mensagem de erro
        this.toast.error('Selecione pelo menos uma opção', 'Erro');
        return;
      }
        this.funcionario.dataNascimento = moment(this.funcionario.dataNascimento).format('DD/MM/YYYY');

        this.service.cadastrarFuncionario(this.funcionario).subscribe(() => {
            this.toast.success('Funcionário cadastrado com sucesso', 'Cadastro');
            this.router.navigate(['funcionario'])
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

    /* onSubmit(): void {
        this.service.cadastrarFuncionario(this.funcionario).subscribe(() => {
          this.messageService.message('Funcionário criado com sucesso', 'Cadastro');
          this.router.navigate(['/funcionario']);
        }, error => {
          if (error.status === 403) {
            this.error = 'Você não tem permissão para acessar esta página';
          } else {
            this.error = 'Ocorreu um erro ao criar o funcionário. Tente novamente mais tarde.';
          }
        });
      } */

    validaCampos(): boolean {
        return this.nomeFuncionario.valid && this.cpf.valid && this.dataNascimento.valid && this.endereco.valid && this.telefone.valid;
    }

    
}