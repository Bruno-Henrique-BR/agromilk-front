import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TipoLoteEnum } from 'src/app/models/TipoLoteEnum';
import { Lote } from 'src/app/models/lote';
import { LoteService } from 'src/app/services/lote.service';

@Component({
  selector: 'app-lote-create',
  templateUrl: './lote-create.component.html',
  styleUrls: ['./lote-create.component.css']
})
export class LoteCreateComponent implements OnInit {

  lote: Lote = {
    idLote: null,
    nomeLote: '',
    descricao: '',
    tipoLote: null,
  }

  nomeLote: FormControl =  new FormControl(null, Validators.minLength(3));
  descricao: FormControl =  new FormControl(null, Validators.minLength(3));
  tipoLote: FormControl =  new FormControl(null, Validators.required);

  tiposLote: string[] = Object.values(TipoLoteEnum);
  onTipoLoteChange(event: any): void {
    this.lote.tipoLote = event.value;
  }
  
  constructor(
    private service: LoteService,
    private toast: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void { }

  create(): void {
    this.service.cadastrarLote(this.lote).subscribe(() => {
      this.toast.success('Lote cadastrado com sucesso', 'Cadastro');
      this.router.navigate(['lote'])
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
    return this.nomeLote.valid && this.descricao.valid
  }
}
