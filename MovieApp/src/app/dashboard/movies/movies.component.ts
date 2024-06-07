import { Component } from '@angular/core';
import { MoviesService } from '../../Model/movies.service';
import { AuthService } from '../../auth/auth.service';
import { iMovies } from '../../interfaces/movies';
import { iUsers } from '../../interfaces/users';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss'
})
export class MoviesComponent {
  movies:iMovies[]= [];
$movie: any;

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
  addToFavs(prd:iMovies) {
    this.moviesSvc.addToFav(prd)
  }
  isFav(id:number) {
    return this.moviesSvc.isFav(id)
  }

  deleteMovie(id: number) {
    this.moviesSvc.deleteMovie(id);
  }
}
