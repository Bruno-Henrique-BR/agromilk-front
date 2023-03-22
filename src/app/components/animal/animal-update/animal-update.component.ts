import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Animal } from 'src/app/models/animal';
import { AnimalService } from 'src/app/services/animal.service';


@Component({
  selector: 'app-animal-update',
  templateUrl: './animal-update.component.html',
  styleUrls: ['./animal-update.component.css']
})
export class AnimalUpdateComponent implements OnInit {

  animal: Animal = {
    idAnimal:                '',
    codigo:   '',
    apelido:   '',
    dataNascimento:   '',
    dataCompra: '',
    cor:      '',
    raca: '',
    lote: '',
    nomeRaca:            '',
    nomeLote:            '',
    lactacao:     false,
   
  }

  codigo: FormControl =  new FormControl(null, Validators.minLength(3));
  apelido: FormControl =  new FormControl(null, Validators.minLength(3));

  constructor(
    private service: AnimalService,
    private toast:    ToastrService,
    private router:          Router,
    private route:   ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.animal.idAnimal = this.route.snapshot.paramMap.get('idAnimal');
    this.findById();
   }

  findById(): void {
    this.service.findById(this.animal.idAnimal).subscribe(resposta => {
      this.animal = resposta;
    })
  }

  update(): void {
    this.service.atualizarAnimal(this.animal).subscribe(() => {
      this.toast.success('Animal atualizado com sucesso', 'Update');
      this.router.navigate(['animal'])
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
    return this.codigo.valid && this.apelido.valid
  }
}
