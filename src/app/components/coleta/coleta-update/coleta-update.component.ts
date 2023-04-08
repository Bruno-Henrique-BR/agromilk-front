import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Coleta } from 'src/app/models/coleta';
import { Laticinio } from 'src/app/models/laticinio';
import { Tanque } from 'src/app/models/tanque';
import { LaticinioService } from 'src/app/services/laticinio.service';
import { TanqueService } from 'src/app/services/tanque.service';
import { ColetaService } from 'src/app/services/coleta.service';

@Component({
selector: 'app-coleta-update',
templateUrl: './coleta-update.component.html',
styleUrls: ['./coleta-update.component.css']
})
export class ColetaUpdateComponent implements OnInit {

coleta: Coleta = {
    idColeta: '',
    data: '',
    quantidade: 0,
    idLaticinio: 0,
    idTanque: 0,
    tanque: undefined,
    laticinio: undefined,
    razaoSocial: '',
    modeloTanque: ''
}

laticinios: Laticinio[] = []
tanques: Tanque[] = []

data: FormControl = new FormControl(null, [Validators.required]);
quantidade: FormControl = new FormControl(null, [Validators.required, Validators.min(0)]);
idLaticinio: FormControl = new FormControl(null, [Validators.required]);
idTanque: FormControl = new FormControl(null, [Validators.required]);

constructor(
private service: ColetaService,
private laticinioService: LaticinioService,
private tanqueService: TanqueService,
private toast: ToastrService,
private router: Router,
private route: ActivatedRoute,
) { }

ngOnInit(): void {
this.coleta.idColeta = this.route.snapshot.paramMap.get('idColeta');
this.findById();
this.findAllLaticinios();
this.findAllTanques();
}

findById(): void {
this.service.findById(this.coleta.idColeta).subscribe(resposta => {
this.coleta = resposta;
})
}

findAllLaticinios(): void {
this.laticinioService.findAll().subscribe(resposta => {
this.laticinios = resposta;
})
}

findAllTanques(): void {
this.tanqueService.findAll().subscribe(resposta => {
this.tanques = resposta;
})
}

update(): void {
this.service.atualizarColeta(this.coleta).subscribe(() => {
this.toast.success('Coleta atualizada com sucesso', 'Update');
this.router.navigate(['coleta'])
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
return this.data.valid && this.quantidade.valid && this.idLaticinio.valid && this.idTanque.valid;
}
}