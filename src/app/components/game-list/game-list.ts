import { Component, OnInit, signal } from '@angular/core'; // Import OnInit lifecycle hook and signal
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; // Add this import
import { GameService, Game } from '../../services/game'; // Import service class
import { CartService } from '../../services/cart.service'; // Import cart service
import { GameCardComponent } from '../game-card/game-card'; // Import game card component

@Component({
  selector: 'app-game-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, GameCardComponent], // Add GameCardComponent
  templateUrl: './game-list.html',
  styleUrl: './game-list.css'
})
export class GameListComponent implements OnInit {
  newGameTitle: string = '';
  newGamePrice: number = 0;
  
  // Define a signal that will hold our fetched games
  games = signal<Game[]>([]);

  // Injecting services in the class constructor
  constructor(
    private gameService: GameService,
    private cartService: CartService // Inject cart service
  ) {}

  // ngOnInit runs automatically once the component is initialized in the DOM
  ngOnInit(): void {
    this.fetchGames();
  }

  // Call service getGames Observable and subscribe to the output stream
  fetchGames(): void {
    this.gameService.getGames().subscribe({
      next: (data: Game[]) => {
        this.games.set(data);
      },
      error: (err) => {
        console.error('Error fetching games: ', err);
      }
    });
  }

  addGame(): void {
    if (this.newGameTitle.trim() === '') return;

    this.gameService.addGame(this.newGameTitle, this.newGamePrice).subscribe({
      next: (newGame: Game) => {
        // Re-fetch list to update UI state
        this.fetchGames();
        this.newGameTitle = '';
        this.newGamePrice = 0;
      }
    });
  }

  toggleAvailability(game: Game): void {
    const updatedStatus = !game.available;
    this.gameService.toggleAvailability(game.id, updatedStatus).subscribe({
      next: () => {
        this.fetchGames();
      },
      error: (err) => {
        console.error('Error toggling availability:', err);
      }
    });
  }

  addToCart(game: Game): void {
    this.cartService.addToCart(game);
  }

  // Remove game from inventory local list state
  onRemoveGame(gameId: number): void {
    this.games.update(items => items.filter(g => g.id !== gameId));
    console.log(`[Parent Component] Removed game ID: ${gameId}`);
  }
}
