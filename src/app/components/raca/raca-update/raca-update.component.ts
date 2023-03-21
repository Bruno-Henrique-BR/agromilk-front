import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Raca } from 'src/app/models/raca';
import { RacaService } from 'src/app/services/raca.service';


@Component({
  selector: 'app-raca-update',
  templateUrl: './raca-update.component.html',
  styleUrls: ['./raca-update.component.css']
})
export class RacaUpdateComponent implements OnInit {

  raca: Raca = {
    idRaca:         '',
    nome:       '',
    descricao:        '',
   
  }

  nome: FormControl =  new FormControl(null, Validators.minLength(3));
  descricao: FormControl =  new FormControl(null, Validators.minLength(3));


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

  update(): void {
    this.service.atualizarRaca(this.raca).subscribe(() => {
      this.toast.success('Cliente atualizado com sucesso', 'Update');
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
    return this.nome.valid && this.descricao.valid
  }
}
