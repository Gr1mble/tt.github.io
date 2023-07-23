import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { HistoryComponent } from './pages/history/history.component';
import { RacesignsComponent } from './pages/racesigns/racesigns.component';
import { GamesComponent } from './pages/games/games.component';
import { FoodmenuComponent } from './pages/foodmenu/foodmenu.component';
import { TriplecrownComponent } from './pages/games/triplecrown/triplecrown.component';
import { GamesignsComponent } from './pages/games/gamesigns/gamesigns.component';
import { BracketgeneratorComponent } from './pages/games/bracketgenerator/bracketgenerator.component';
import { SignupComponent } from './pages/signup/signup.component';
import { SigninComponent } from './pages/signin/signin.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { FoodformComponent } from './pages/foodmenu/foodform/foodform.component';
import { RouteGuard } from 'backend/route-guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'racesigns', component: RacesignsComponent },
  { path: 'games', component: GamesComponent },
  { path: 'foodmenu', component: FoodmenuComponent },
  { path: 'foodform', component: FoodformComponent },
  { path: 'triplecrown', component: TriplecrownComponent },
  { path: 'gamesigns', component: GamesignsComponent },
  { path: 'bracketgenerator', component: BracketgeneratorComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [RouteGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [RouteGuard]
})
export class AppRoutingModule { }
