import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { iUsers } from '../../interfaces/users';
import { UsersService } from '../../Model/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  user:iUsers|undefined;
  users:iUsers[]=[]
constructor(private authSvc: AuthService, private userSvc:UsersService){}
  ngOnInit() {
  
    this.authSvc.user$.subscribe(user => {
      this.user = user || undefined;
    })

    this.userSvc.getAllUsers();
    
    this.userSvc.users$.subscribe(user => {
      this.users = user
    })
  }
}
