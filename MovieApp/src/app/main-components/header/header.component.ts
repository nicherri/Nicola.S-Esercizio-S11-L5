import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isUserLoggedIn:boolean = false;

  constructor(private authSvc:AuthService){}

  ngOnInit(){

    this.authSvc.isLogged$.subscribe(data => {

      this.isUserLoggedIn = data;

    })

  }

  logout(){
    this.authSvc.logout()
  }
}
