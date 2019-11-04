import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MoviesService } from '../shared/movies.service';
import { IMovie } from '../shared/imovie';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.css']
})
export class FormDialogComponent implements OnInit {
  form: FormGroup;
  movieInfo: IMovie;
  movieArr: IMovie [];
  description: string;
  constructor(private _formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<FormDialogComponent>,
    private _movieService: MoviesService,
    @Inject(MAT_DIALOG_DATA) public data) {
        this.description = data.description;
    }

    ngOnInit() {
        this.form = this._formBuilder.group({
            imdbID: [this.data.imdbID],
            Poster: [this.data.Poster],
            Title: [ this.data.Title || '', [Validators.required]],
            Year: [this.data.Year || '', [Validators.required, Validators.minLength(4)]],
            Runtime: [ this.data.Runtime || '', [Validators.required]],
            Genre: [ this.data.Genre || '', [Validators.required]],
            Director: [ this.data.Director || '', [Validators.required]],
        });
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onSubmit() {
        if (this.form.value.imdbID == null) {
            this._movieService.addMovie(this.form.value);

            console.log(this.data);
            this.dialogRef.close(this.form.value);
            return this.data;
        } else {
            console.log(this.form.value);

            this._movieService.editMovie(this.form.value);
                this.dialogRef.close(this.form.value);
                return this.data;
        }
    }

}
