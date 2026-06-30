import { Routes } from '@angular/router';
import { GameListComponent } from './components/game-list/game-list';
import { GameDetailComponent } from './components/game-detail/game-detail';
import { AddGameFormComponent } from './components/add-game-form/add-game-form'; // Import new form
import { authGuard } from './guards/auth.guard'; // Import route guard

export const routes: Routes = [
  // Default route: redirects empty path to the catalog list page
  { path: '', redirectTo: 'games', pathMatch: 'full' },
  
  // Standard catalog listing route
  { path: 'games', component: GameListComponent },
  
  // Register before parameterized route!
  // Attach canActivate guard: routes to 'games/add' will check authGuard first!
  { path: 'games/add', component: AddGameFormComponent, canActivate: [authGuard] },
  
  // Dynamic parameter route: matches paths like /games/1 or /games/abc
  { path: 'games/:id', component: GameDetailComponent },
  
  // Wildcard fallback route: matches any invalid URL and handles 404s
  { path: '**', redirectTo: 'games' }
];
