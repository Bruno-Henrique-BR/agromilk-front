import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ThemeService } from 'src/app/theme.service';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(
    private storage: StorageService, 
    private router: Router
  ) { }

  ngOnInit(): void {
    this.router.navigate(['home']);
    this.showHamburgerIcon();
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
