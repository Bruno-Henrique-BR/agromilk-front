import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Funcionario } from 'src/app/models/funcionario';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import * as moment from 'moment';

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
    }

    nomeFuncionario: FormControl = new FormControl(null, Validators.minLength(3));
    cpf: FormControl = new FormControl(null, [Validators.required, Validators.minLength(11), Validators.maxLength(11)]);
    dataNascimento: FormControl = new FormControl(null, Validators.required);
    endereco: FormControl = new FormControl(null, Validators.minLength(3));
    telefone: FormControl = new FormControl(null, Validators.required);

    constructor(
        private service: FuncionarioService,
        private toast: ToastrService,
        private router: Router,
    ) { }

    ngOnInit(): void { }

    create(): void {
        // formatar as datas
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

    validaCampos(): boolean {
        return this.nomeFuncionario.valid && this.cpf.valid && this.dataNascimento.valid && this.endereco.valid && this.telefone.valid;
    }
}