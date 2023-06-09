import { MessageService } from 'src/app/services/message.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Credenciais } from 'src/app/models/credenciais';
import { AuthService } from 'src/app/services/auth.service';
import Swiper from 'swiper';

@Component({
  selector: 'app-login',
  templateUrl: './login-component.html',
  styleUrls: ['./login-component.css']
})
export class LoginComponent implements OnInit {

  creds: Credenciais = {
    email: '',
    senha: ''
  }

  email = new FormControl(null, Validators.email);
  senha = new FormControl(null, Validators.minLength(3));

  constructor(
    private service: AuthService,
    private router: Router,
    private message: MessageService,
  ) { }

  ngOnInit(): void {
    document.addEventListener('DOMContentLoaded', () => {
      const swiper = new Swiper('.swiper-container', {
        slidesPerView: 1,
        spaceBetween: 10,
        loop: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      });
    });
  }

  login() {
    this.service.authenticate(this.creds).subscribe(response => {
      this.service.successfulLogin(response.headers.get('Authorization'));
      this.router.navigate(['']);
    }, err => {
      if (err.error.match('inválido'))
        this.message.message('Usuario ou senha inválidos');
      else
        this.message.message('Falha ao realizar login. Tente novamente');
    })
  }

  validaCampos() {
    return this.email.valid && this.senha.valid ? true : false;
  }

}
