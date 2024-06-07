import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { iUsers } from '../interfaces/users';
import { MoviesService } from '../Model/movies.service';
import { iMovies } from '../interfaces/movies';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  movies:iMovies[]= [];

  constructor(private authSvc:AuthService, private moviesSvc:MoviesService){}

  user:iUsers|undefined;

  ngOnInit(){

    this.authSvc.user$.subscribe(user => {
      this.user = user || undefined;
    })

    this.moviesSvc.getAllMovies();

    this.moviesSvc.movies$.subscribe(
      movies => {
        this.movies = movies;
      });
  }
}
