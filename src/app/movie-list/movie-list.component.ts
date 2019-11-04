import { Component, OnInit, OnDestroy, EventEmitter, Input} from '@angular/core';
import { MoviesService } from '../shared/movies.service';
import { IMovie } from '../shared/imovie';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef } from '@angular/material';
import { FormDialogComponent } from '../form-dialog/form-dialog.component';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit, OnDestroy {
// @Input()= addMovie;

    isPopupOpened = false;
    formDialogRef: MatDialogRef<FormDialogComponent>;
    movies = '';
    id: 0;
    movie: IMovie;
    exampleDatabase: MoviesService | null;
  public movieArr: IMovie [];

  movies$: Observable<IMovie[]>;
  movieIner: IMovie[];
  private subscription: Subscription;
  constructor(private _service?: MoviesService, private dialog?: MatDialog,  private toastr?: ToastrService) { }

ngOnInit() {
    this.movies$ = this._service.getMyMovies();
// this._service.getMyMovies()
// .subscribe(data => this.movieArr = data);
}



addMovie(movie: IMovie) {
    this.isPopupOpened = true;

    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {movie}
    });

    console.log(movie);


    dialogRef.afterClosed()
       .subscribe(result => {
        this.isPopupOpened = false;
        this._service.movieList = this.movieArr;

         console.log(result);
         this.movieArr.push( this.movie = {
            id: result.id,
            Poster: result.Poster,
            Title: result.Title,
            Director: result.Director,
            Year: result.Year,
            Runtime: result.Runtime,
            Genre: result.Genre
          });

       });
    }

       addMovies() {
        this.isPopupOpened = true;
        const dialogRef1 = this.dialog.open(FormDialogComponent, {
          data: {}
        });
          dialogRef1.afterClosed().subscribe(result => {
          this.isPopupOpened = false;
        });
      }

    public onEdit(film?: IMovie) {
        const dialogRef = this.dialog.open(FormDialogComponent, {
                data: {film} = Object.assign(film)
            });
        dialogRef.afterClosed().subscribe(result => {
              this.isPopupOpened = false;
            });
      }
      onDelete(id: number) {
        if (confirm('Are you sure you want to delete this movie?')) {
           this._service.delete(id);
           this._service.refreshList();
           this.toastr.warning('Deleted successfully');
          }
        }
      editMovie(movie: IMovie[]) {
        this._service.movieList = Object.assign({}, movie);
    }
      ngOnDestroy() {
        this.subscription.unsubscribe();
      }
  }

