import { Component } from '@angular/core';
import { MoviesService } from '../../Model/movies.service';
import { iMovies } from '../../interfaces/movies';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.scss'
})
export class FavouritesComponent {

  favs!: iMovies[]
  constructor(public prdSrv: MoviesService) {}

  ngOnInit(): void {
    this.prdSrv.favList.subscribe((favs:iMovies[]) => {
      this.favs = favs
    })
  }
  removeFromFav(id:number) {
    this.prdSrv.removeFromFav(id)
  }
}
