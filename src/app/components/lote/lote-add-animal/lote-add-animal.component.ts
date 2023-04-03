import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Animal } from 'src/app/models/animal';
import { Lote } from 'src/app/models/lote';
import { AnimalService } from 'src/app/services/animal.service';
import { LoteService } from 'src/app/services/lote.service';

@Component({
    selector: 'lote-add-animal',
    templateUrl: './lote-add-animal.component.html',
    styleUrls: ['./lote-add-animal.component.css']
})
export class LoteAddAnimalComponent implements OnInit {
    animalForm: FormGroup;
    lotes: any[];
    animais: any[] = [];
    animal: Animal;
    idLote: number;
    constructor(
        private fb: FormBuilder,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private animalService: AnimalService,
        private loteService: LoteService
    ) { }

    ngOnInit(): void {
        this.findAllAnimais();
        this.idLote = +this.activatedRoute.snapshot.paramMap.get('id'); // Obter o valor do parâmetro da rota
        this.loteService.listarLotes().subscribe(res => {
            this.lotes = res;
            // Definir o valor do select de lotes com o idLote obtido da rota
            this.animalForm.get('idLote').setValue(this.idLote);
        });


        this.animalForm = this.fb.group({
            idAnimal: [null, Validators.required], // adicione essa linha
            idLote: [null, Validators.required]
        });
    }
    findAllAnimais(): void {
        this.animalService.findAll().subscribe(
            response => {
                this.animais = response;
            },
            error => {
                console.error(error);
            }
        );
    }
    adicionar(): void {
        const idAnimal = this.animalForm.get('idAnimal').value;
        if (!idAnimal) {
            console.error('Animal inválido');
            return;
        }
        const animalSelecionado = this.animais.find(animal => animal.idAnimal === idAnimal);
        if (!animalSelecionado) {
            console.error('Animal inválido');
            return;
        }
        const idLote = this.animalForm.get('idLote').value;
        this.loteService.adicionarAnimal(animalSelecionado, idLote).subscribe(() => {
            this.router.navigate(['lotes']);
        });
    }
    
}
