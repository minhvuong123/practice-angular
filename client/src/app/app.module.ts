import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { 
  MatMenuModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatGridListModule,
  MatTableModule,
  MatPaginatorModule,
} from '@angular/material';
import { HomeComponent } from './component/home/home.component';
import { SignInComponent } from './component/sign-in/sign-in.component';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { NavigationComponent } from './component/navigation/navigation.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { EditFormComponent } from './component/edit-form/edit-form.component';
import { LoadingComponent } from './component/loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignInComponent,
    SignUpComponent,
    NavigationComponent,
    NotFoundComponent,
    EditFormComponent,
    LoadingComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule
  ],
  entryComponents: [
    EditFormComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
