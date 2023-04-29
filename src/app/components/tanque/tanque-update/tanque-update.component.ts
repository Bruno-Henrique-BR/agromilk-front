import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tanque } from 'src/app/models/tanque';
import { TanqueService } from 'src/app/services/tanque.service';


@Component({
  selector: 'app-tanque-update',
  templateUrl: './tanque-update.component.html',
  styleUrls: ['./tanque-update.component.css']
})
export class TanqueUpdateComponent implements OnInit {

  tanque: Tanque = {
    idTanque: '',
    descricao: '',
    capacidade: '',
    modelo: '',
    quantidadeAtual: 0
  }

  nome: FormControl =  new FormControl(null, Validators.minLength(3));
  descricao: FormControl =  new FormControl(null, Validators.minLength(3));


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

  update(): void {
    this.service.atualizarTanque(this.tanque).subscribe(() => {
      this.toast.success('Tanque atualizado com sucesso', 'Update');
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
  limitarCapacidade(event: any) {
    const input = event.target as HTMLInputElement;
    const regex = /^[0-9]{0,5}(\.[0-9]{0,2})?$/;
  
    if (!regex.test(input.value)) {
      input.value = input.value.slice(0, -1);
    }
  }
  
  
  
  validaCampos(): boolean {
    return this.nome.valid && this.descricao.valid
  }

}
