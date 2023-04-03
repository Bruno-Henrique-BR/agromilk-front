import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Laticinio } from 'src/app/models/laticinio';
import { LaticinioService } from 'src/app/services/laticinio.service';

@Component({
  selector: 'app-laticinio-update',
  templateUrl: './laticinio-update.component.html',
  styleUrls: ['./laticinio-update.component.css']
})
export class LaticinioUpdateComponent implements OnInit {

  laticinio: Laticinio = {
    idLaticinio: '',
    razaoSocial: '',
    cnpj: '',
    endereco: '',
    telefone: ''
  }

  razaoSocial: FormControl = new FormControl(null, Validators.minLength(3));
  cnpj: FormControl = new FormControl(null, Validators.minLength(14));
  endereco: FormControl = new FormControl(null, Validators.minLength(3));
  telefone: FormControl = new FormControl(null, Validators.minLength(11));

  constructor(
    private service: LaticinioService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.laticinio.idLaticinio = this.route.snapshot.paramMap.get('idLaticinio');
    this.findById();
  }

  findById(): void {
    this.service.findById(this.laticinio.idLaticinio).subscribe(resposta => {
      this.laticinio = resposta;
    })
  }

  update(): void {
    this.service.atualizarLaticinio(this.laticinio).subscribe(() => {
      this.toast.success('Laticínio atualizado com sucesso', 'Update');
      this.router.navigate(['laticinio'])
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

  validaCampos(): boolean {
    return this.razaoSocial.valid && this.cnpj.valid && this.endereco.valid && this.telefone.valid;
  }
}