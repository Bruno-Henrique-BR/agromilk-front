import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Lote } from 'src/app/models/lote';
import { LoteService } from 'src/app/services/lote.service';


@Component({
  selector: 'app-lote-update',
  templateUrl: './lote-update.component.html',
  styleUrls: ['./lote-update.component.css']
})
export class LoteUpdateComponent implements OnInit {

  lote: Lote = {
    idLote:         '',
    nome:       '',
    descricao:        '',
   
  }

  nome: FormControl =  new FormControl(null, Validators.minLength(3));
  descricao: FormControl =  new FormControl(null, Validators.minLength(3));


  constructor(
    private service: LoteService,
    private toast:    ToastrService,
    private router:          Router,
    private route:   ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.lote.idLote = this.route.snapshot.paramMap.get('idLote');
    this.findById();
   }

  findById(): void {
    this.service.findById(this.lote.idLote).subscribe(resposta => {
      this.lote = resposta;
    })
  }

  update(): void {
    this.service.atualizarLote(this.lote).subscribe(() => {
      this.toast.success('Lote atualizado com sucesso', 'Update');
      this.router.navigate(['lote'])
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
    return this.nome.valid && this.descricao.valid
  }
}
