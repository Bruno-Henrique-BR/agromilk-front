import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ThemeService } from 'src/app/theme.service';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/services/storage.service';
import PerfectScrollbar from 'perfect-scrollbar';
import { AuthService } from 'src/app/services/auth.service';
import { FuncionarioService } from 'src/app/services/funcionario.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  usuarioLogado: string;

  constructor(
    private storage: StorageService, 
    private router: Router,
    private funcionarioService: FuncionarioService) {

    }

  ngOnInit(): void {
    this.router.navigate(['home']);
    this.showHamburgerIcon();
    
    setTimeout(() => {
      const sidenav = document.querySelector('.scrollable-sidenav');
      const ps = new PerfectScrollbar(sidenav);
    }, 0);
    this.funcionarioService.getUsuarioLogado().subscribe(
      usuario => {
        this.usuarioLogado = usuario;
      },
      error => {
        console.log('Erro ao obter o usuário logado:', error);
      }
    );
  }
  

  logout() {
    this.storage.setLocalUser(null);
    this.router.navigate(['login']);
  }

  showHamburgerIcon() {
    setTimeout(() => {
      const hamburger = document.querySelector('.hamburger-icon');
      hamburger.classList.remove('hidden');
    }, 0);
  }
  
}
