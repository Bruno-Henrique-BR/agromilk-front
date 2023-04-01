import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tanque } from 'src/app/models/tanque';
import { TanqueService } from 'src/app/services/tanque.service';

@Component({
  selector: 'app-tanque-delete',
  templateUrl: './tanque-delete.component.html',
  styleUrls: ['./tanque-delete.component.css']
})
export class TanqueDeleteComponent implements OnInit {

  tanque: Tanque = {
    idTanque: '',
    descricao: '',
    capacidade: '',
    modelo: '',
    ativo: true,
    quantidadeAtual: 0
  }

  constructor(
    private service: TanqueService,
    private toast:    ToastrService,
    private router:          Router,
    private route:   ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.tanque.idTanque = this.route.snapshot.paramMap.get('idTanque');
    this.findById();
   }

  findById(): void {
    this.service.findById(this.tanque.idTanque).subscribe(resposta => {
      this.tanque = resposta;
    })
  }

  delete(): void {
    this.service.excluir(this.tanque.idTanque).subscribe(() => {
      this.toast.success('Tanque deletado com sucesso', 'Delete');
      this.router.navigate(['tanque'])
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
