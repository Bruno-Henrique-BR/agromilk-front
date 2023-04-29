import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Animal } from 'src/app/models/animal';
import { Ordenha } from 'src/app/models/ordenha';
import { Tanque } from 'src/app/models/tanque';
import { AnimalService } from 'src/app/services/animal.service';
import { OrdenhaService } from 'src/app/services/ordenha.service';
import { TanqueService } from 'src/app/services/tanque.service';

@Component({
  selector: 'app-ordenha-create',
  templateUrl: './ordenha-create.component.html',
  styleUrls: ['./ordenha-create.component.css']
})
export class OrdenhaCreateComponent implements OnInit {
  animais: Animal[] = [];
  tanques: Tanque[] = [];
  ordenhas: Ordenha[] = [];
  ordenha: Ordenha = {
    idOrdenha: '',
    data: null,
    quantidade: null,
    idAnimal: null,
    idTanque: null,
    animal: null,
    tanque: null,
    apelidoAnimal: '',
    modeloTanque: undefined
  };

  constructor(
    private animalService: AnimalService,
    private tanqueService: TanqueService,
    private ordenhaService: OrdenhaService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.carregarAnimais();
    this.carregarTanques();
  }

  carregarAnimais(): void {
    this.animalService.findAll().subscribe(
      (response) => {
        this.animais = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  carregarTanques(): void {
    this.tanqueService.findAll().subscribe(
      (response) => {
        this.tanques = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  cadastrarOrdenha(): void {
    this.animais.forEach((animal) => {
      const ordenha: Ordenha = {
        idOrdenha: '',
        data: null,
        quantidade: animal.quantidade,
        idAnimal: animal.idAnimal,
        idTanque: animal.idTanque,
        animal: null,
        tanque: null,
        apelidoAnimal: '',
        modeloTanque: undefined
      };
  
      this.ordenhaService.cadastrarOrdenha(ordenha).subscribe(
        (response) => {
          this.toast.success('Ordenhas cadastradas com sucesso', 'Cadastro');
          this.router.navigate(['ordenha']);
          console.log('Ordenha cadastrada com sucesso:', response);
          // Faça algo com a resposta, se necessário
        },
        (error) => {
          console.log('Erro ao cadastrar ordenha:', error);
        }
      );
    });
  }
  limitarQuantidade(event: any) {
    const input = event.target as HTMLInputElement;
    const regex = /^[0-9]{0,2}(\.[0-9]{0,2})?$/;
  
    if (!regex.test(input.value)) {
      input.value = input.value.slice(0, -1);
    }
  }
  

  cancel(): void {
    this.router.navigate(['/ordenha']);
  }
}
