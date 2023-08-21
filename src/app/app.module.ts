import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MobDirective } from './pages/signup/mask';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { NavbarComponent } from './sharePage/navbar/navbar.component';
import { FooterComponent } from './sharePage/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { HistoryComponent } from './pages/history/history.component';
import { RacesignsComponent } from './pages/racesigns/racesigns.component';
import { GamesComponent } from './pages/games/games.component';
import { TriplecrownComponent } from './pages/games/triplecrown/triplecrown.component';
import { GamesignsComponent } from './pages/games/gamesigns/gamesigns.component';
import { BracketgeneratorComponent } from './pages/games/bracketgenerator/bracketgenerator.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { FoodmenuComponent } from './pages/foodmenu/foodmenu.component';
import { FoodformComponent } from './pages/foodmenu/foodform/foodform.component';
import { AuthInterceptor } from 'backend/auth-interceptor';
import { PostComponent } from './pages/race-notes/post.component';
import { PostFormComponent } from './pages/race-notes-form/post-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    HistoryComponent,
    RacesignsComponent,
    GamesComponent,
    TriplecrownComponent,
    GamesignsComponent,
    BracketgeneratorComponent,
    SigninComponent,
    SignupComponent,
    FoodmenuComponent,
    FoodformComponent,
    MobDirective,
    PostComponent,
    PostFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AppRoutingModule

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
