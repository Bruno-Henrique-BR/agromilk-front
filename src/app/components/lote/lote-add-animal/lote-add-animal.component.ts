import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Lote } from 'src/app/models/lote';
import { Raca } from 'src/app/models/raca';
import { Animal } from 'src/app/models/animal';
import { AnimalService } from 'src/app/services/animal.service';
import { LoteService } from 'src/app/services/lote.service';
import { RacaService } from 'src/app/services/raca.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-lote-add-animal',
    templateUrl: './lote-add-animal.component.html',
    styleUrls: ['./lote-add-animal.component.css']
})
export class LoteAddAnimalComponent implements OnInit {
    loteId: number;

    animalForm: FormGroup;
    idAnimal: number;
    loteSelecionado: string;
    animais: any[] = [];
    idRaca: number;
    idLote: number;
    raca: Raca = {
        nomeRaca: '',
        descricao: ''
    }

    lote: Lote = {
        nomeLote: '',
        descricao: ''
    }
    animal: Animal = {
        codigo: '',
        apelido: '',
        dataNascimento: '',
        dataCompra: '',
        lote: '',
        raca: '',
        lactacao: null,
        loteNome: undefined,
        racaNome: undefined,
        cor: '',
        idRaca: '',
        idLote: '',
        nomeRaca: '',
        nomeLote: '',
        qtsAnimal: 0,
        media: ''
    };
    constructor(
        private fb: FormBuilder,
        private animalService: AnimalService,
        private loteService: LoteService,
        private racaService: RacaService,
        private toast: ToastrService,
        private router: Router,
        private route: ActivatedRoute,

    ) { }

    ngOnInit(): void {
        this.findAllAnimais();
        this.loteId = +this.route.snapshot.paramMap.get('idLote');

    }
    update(): void {
        this.animalService.atualizarAnimal(this.animal).subscribe(() => {
            this.toast.success('Animal atualizado com sucesso', 'Update');
            this.router.navigate(['animal'])
        }, ex => {
            if (ex.error.errors) {
                ex.error.errors.forEach(element => {
                    this.toast.error(element.message);
                });
            } else {
                this.toast.error(ex.error.message);
            }
        })
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

    consultarAnimal(idAnimal: number): void {
        this.animalService.findById(idAnimal).subscribe((animal: Animal) => {
            this.animal = animal;
            this.animalForm.setValue({
                codigo: this.animal.codigo,
                apelido: this.animal.apelido,
                dataCompra: this.animal.dataCompra,
                dataNascimento: this.animal.dataNascimento,
                lactacao: this.animal.lactacao,
                lote: this.animal.idLote,
                raca: this.animal.idRaca

            });
        });
    }


    validaCampos(): boolean {
        return this.animalForm.valid;
    }

}