import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { GameService, Game } from '../../services/game';

@Component({
  selector: 'app-game-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './game-detail.html',
  styleUrl: './game-detail.css'
})
export class GameDetailComponent implements OnInit {
  game = signal<Game | undefined>(undefined);

  // Inject ActivatedRoute to inspect URL details, and GameService to lookup inventory
  constructor(
    private route: ActivatedRoute,
    private gameService: GameService
  ) {}

  ngOnInit(): void {
    // Read the dynamic 'id' parameter from the route parameter map
    // The snapshot provides a simple one-time read.
    const gameId = Number(this.route.snapshot.paramMap.get('id'));
    
    this.gameService.getGames().subscribe({
      next: (games: Game[]) => {
        // Look up the game matching the parsed ID
        this.game.set(games.find(g => g.id === gameId));
      }
    });
  }
}
