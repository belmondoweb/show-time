import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { IMovie } from './imovie';
import { Observable, throwError as observableThrowError, BehaviorSubject} from 'rxjs';
import { catchError, tap, delay  } from 'rxjs/operators';

// import 'rxjs/add/operator/catch';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
@Injectable({
  providedIn: 'root'
})
export class MoviesService {
    dialogData: any;
    movieList: IMovie [] = [];
    public dataChange: BehaviorSubject<IMovie[]> = new BehaviorSubject<IMovie[]>([]);
    readonly apiLocal: string;
    constructor(private http: HttpClient) {
    this.apiLocal = 'assets/data.json';
  }

    getDialogData() {
    return this.dialogData;
     }

    getMyMovies(): Observable<IMovie[]> {
        return this.http.get<IMovie[]>(this.apiLocal)
        .pipe(
        delay(1000),
        catchError(this.handleError));
    }
        getAllMovies(): void {
            this.http.get<IMovie[]>(this.apiLocal).subscribe(data => {
                this.dataChange.next(data);
            },
            (error: HttpErrorResponse) => {
            console.log (error.name + ' ' + error.message);
            });
        }


        addMovie(movie: IMovie): Observable<IMovie> {
            return this.http.post<IMovie>(this.apiLocal, movie, httpOptions )
             .pipe((catchError(this.handleError)));
            }
        editMovie(movie: IMovie): Observable<IMovie> {
        return this.http.put<IMovie>(this.apiLocal, movie, httpOptions)
        .pipe((catchError(this.handleError)));
        }
        private handleError(error: HttpErrorResponse) {
        return observableThrowError(error.message || 'Server Error');
        }
        refreshList() {
            this.http.get(this.apiLocal)
            .toPromise().then(res => this.movieList = res as IMovie[]);
        }

        delete(id: number) {
            return this.http.delete(this.apiLocal + id);
        }
        deleteMovie(id: number) {
            const movie = this.movieList.findIndex(i => i.imdbID === id);
            this.movieList.splice(movie, 1);
        }
    // eMovie(formData: IMovie) {
    //     console.log(formData);
    //     return this.http.put(this.apiLocal + formData.imdbID, formData);
    // }
}
