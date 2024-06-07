import { Component } from '@angular/core';
import { iMovies } from '../../interfaces/movies';
import { MoviesService } from '../../Model/movies.service';

@Component({
  selector: 'app-new-film',
  templateUrl: './new-film.component.html',
  styleUrls: ['./new-film.component.scss']
})
export class NewFilmComponent {
  movies: iMovies[] = [];
  newMovie: iMovies = {
    id: 0,
    title: '',
    description: '',
    image: '',
    duration: '',
    rating: 0,
    ranking: 0,
  };

  constructor(private moviesSvc: MoviesService) { }

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies() {
    this.moviesSvc.getAllMovies();
    this.moviesSvc.movies$.subscribe(movies => {
      this.movies = movies;
    });
  }

  addMovie() {
    this.moviesSvc.addMovie(this.newMovie);
    this.newMovie = {
      id: 0,
      title: '',
      description: '',
      image: '',
      duration: '',
      rating: 0,
      ranking: 0,
    };
  }


}
