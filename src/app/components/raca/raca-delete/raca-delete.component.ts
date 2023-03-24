import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Raca } from 'src/app/models/raca';
import { RacaService } from 'src/app/services/raca.service';

@Component({
  selector: 'app-raca-delete',
  templateUrl: './raca-delete.component.html',
  styleUrls: ['./raca-delete.component.css']
})
export class RacaDeleteComponent implements OnInit {

  raca: Raca = {
    idRaca:         '',
    nomeRaca:       '',
    descricao:        '',
   
  }

  constructor(
    private service: RacaService,
    private toast:    ToastrService,
    private router:          Router,
    private route:   ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.raca.idRaca = this.route.snapshot.paramMap.get('idRaca');
    this.findById();
   }

  findById(): void {
    this.service.findById(this.raca.idRaca).subscribe(resposta => {
      this.raca = resposta;
    })
  }

  delete(): void {
    this.service.excluir(this.raca.idRaca).subscribe(() => {
      this.toast.success('Cliente deletado com sucesso', 'Delete');
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

}
