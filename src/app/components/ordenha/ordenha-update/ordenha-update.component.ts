import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Animal } from 'src/app/models/animal';
import { Tanque } from 'src/app/models/tanque';
import { Ordenha } from 'src/app/models/ordenha';
import { AnimalService } from 'src/app/services/animal.service';
import { TanqueService } from 'src/app/services/tanque.service';
import { OrdenhaService } from 'src/app/services/ordenha.service';
import * as moment from 'moment';

@Component({
  selector: 'app-ordenha-update',
  templateUrl: './ordenha-update.component.html',
  styleUrls: ['./ordenha-update.component.css']
})
export class OrdenhaUpdateComponent implements OnInit {

  ordenha: Ordenha = {
    idOrdenha: '',
    primeiraOrdenha: 0,
    segundaOrdenha: 0,
    animal: undefined,
    tanque: undefined,

    idAnimal: 0,
    idTanque: 0,
    apelidoAnimal: '',
    modeloTanque: undefined,
    data: ''
  }

  animais: Animal[] = []
  tanques: Tanque[] = []

  data: FormControl = new FormControl(null, [Validators.required]);
  primeiraOrdenha: FormControl = new FormControl(null, [Validators.required, Validators.min(0)]);
  segundaOrdenha: FormControl = new FormControl(null, [Validators.required, Validators.min(0)]);
  idAnimal: FormControl = new FormControl(null, [Validators.required]);
  idTanque: FormControl = new FormControl(null, [Validators.required]);

  constructor(
    private service: OrdenhaService,
    private animalService: AnimalService,
    private tanqueService: TanqueService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.ordenha.idOrdenha = this.route.snapshot.paramMap.get('idOrdenha');
    this.findById();
    this.findAllAnimais();
    this.findAllTanques();
  }

  findById(): void {
    this.service.findById(this.ordenha.idOrdenha).subscribe(resposta => {
      this.ordenha = resposta;
      this.data.setValue(moment(this.ordenha.data, 'DD/MM/YYYY').toDate());
      this.primeiraOrdenha.setValue(resposta.primeiraOrdenha);
      this.segundaOrdenha.setValue(resposta.segundaOrdenha);
      this.idAnimal.setValue(resposta.animal);
      this.idTanque.setValue(resposta.tanque);
    });
  }
  

  findAllAnimais(): void {
    this.animalService.findAllLactantes().subscribe(resposta => {
      this.animais = resposta;
    })
  }

  findAllTanques(): void {
    this.tanqueService.findAll().subscribe(resposta => {
      this.tanques = resposta;
    })
  }

update(): void {
  this.ordenha.idAnimal = this.idAnimal.value;
  this.ordenha.idTanque = this.idTanque.value;
  
  const dataOrdenha = moment(this.data.value, 'DD/MM/YYYY').toDate(); // Convertendo para o tipo Date
  this.ordenha.data = dataOrdenha.toISOString(); // Convertendo para o formato esperado pelo backend
  
  this.service.atualizarOrdenha(this.ordenha).subscribe(() => {
    this.toast.success('Ordenha atualizada com sucesso', 'Update');
    this.router.navigate(['ordenha'])
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
    return this.data.valid && this.primeiraOrdenha.valid && this.idAnimal.valid && this.idTanque.valid;
  }

  limitarQuantidade(event: any) {
    const input = event.target as HTMLInputElement;
    const regex = /^[0-9]{0,2}(\.[0-9]{0,2})?$/;
  
    if (!regex.test(input.value)) {
      input.value = input.value.slice(0, -1);
    }
  }
  
}
