import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ordenha } from 'src/app/models/ordenha';
import { OrdenhaService } from 'src/app/services/ordenha.service';
@Component({
  selector: 'app-ordenha-update',
  templateUrl: './ordenha-update.component.html',
  styleUrls: ['./ordenha-update.component.css']
})
export class OrdenhaUpdateComponent implements OnInit {

  ordenha: Ordenha = {};

  constructor(
    private route: ActivatedRoute,
    private ordenhaService: OrdenhaService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.ordenhaService.findById(id).subscribe(
      data => this.ordenha = data
    );
  }

  updateOrdenha() {
    this.ordenhaService.atualizarOrdenha(this.ordenha).subscribe(
      data => console.log(data)
    );
  }

}