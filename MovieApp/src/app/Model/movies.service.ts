import { Injectable } from '@angular/core';
import { iMovies } from '../interfaces/movies';
import { BehaviorSubject, Observable, Observer, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private readonly STORAGE_KEY = 'preferiti';

  fav: iMovies[] = [];

  constructor(private http: HttpClient) {
    // Carica i preferiti memorizzati in localStorage all'avvio
    const storedFav = localStorage.getItem(this.STORAGE_KEY);
    if (storedFav) {
      this.fav = JSON.parse(storedFav);
    }
  }

  private mov = new Subject<iMovies[]>();
  movies$ = this.mov.asObservable();

  getAllMovies() {
    return this.http.get<iMovies[]>(environment.moviesUrl)
      .subscribe(movies => this.mov.next(movies));
  }

  addMovie(movie: iMovies) {
    return this.http.post<iMovies>(environment.moviesUrl, movie)
      .subscribe(newMovie => {
        this.getAllMovies();
      });
  }

  deleteMovie(id: number) {
    return this.http.delete(`${environment.moviesUrl}/${id}`)
      .subscribe(() => {
        this.getAllMovies();
      });
  }

  addToFav(prod: iMovies) {
    const movie = this.fav.find(mov => mov.id === prod.id);
    if (!movie) {
      this.fav.push(prod);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.fav));
    }
  }

  removeFromFav(id: number) {
    const index = this.fav.findIndex(el => el.id === id);
    if (index !== -1) {
      this.fav.splice(index, 1);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.fav));
    }
  }

  get favList() {
    return new Observable((obs: Observer<iMovies[]>) => {
      obs.next(this.fav);
    });
  }

  isFav(id: number) {
    return this.fav.find(prd => prd.id === id);
  }

}
