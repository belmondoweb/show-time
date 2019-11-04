import { BrowserModule } from '@angular/platform-browser';
import { NgModule, PipeTransform } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { HeaderNavBarComponent } from './header-nav-bar/header-nav-bar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FormDialogComponent } from './form-dialog/form-dialog.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


// import { FlexLayoutModule } from '@angular/flex-layout';


//// matiral ///
import {MatButtonModule,
        MatCheckboxModule,
        MatIconModule,
        MatToolbarModule,
        MatDialogModule,
        MatCardModule} from '@angular/material';
import { MoviesService } from './shared/movies.service';
import { CommonModule } from '@angular/common';
import { from } from 'rxjs';
import { ServerComponent } from './server/server.component';
import { TitleTransfPipe } from './pipe/title-transf.pipe';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    MovieListComponent,
    HeaderNavBarComponent,
    PageNotFoundComponent,
    FormDialogComponent,
    ServerComponent,
    TitleTransfPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule,
    ///// cdk  ///


   // FlexLayoutModule,
    /// mat ///
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatDialogModule,
    MatToolbarModule,
    MatIconModule,
    ToastrModule.forRoot()
  ],
  providers: [MoviesService],
  entryComponents: [FormDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
