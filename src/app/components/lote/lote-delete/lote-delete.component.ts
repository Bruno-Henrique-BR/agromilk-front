import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Lote } from 'src/app/models/lote';
import { LoteService } from 'src/app/services/lote.service';

@Component({
  selector: 'app-lote-delete',
  templateUrl: './lote-delete.component.html',
  styleUrls: ['./lote-delete.component.css']
})
export class LoteDeleteComponent implements OnInit {

  lote: Lote = {
    idLote:         '',
    nomeLote:       '',
    descricao:        '',
   
  }

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

  delete(): void {
    this.service.excluir(this.lote.idLote).subscribe(() => {
      this.toast.success('Lote deletado com sucesso', 'Delete');
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

}
