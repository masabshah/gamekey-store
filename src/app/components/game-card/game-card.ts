import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Game } from '../../services/game';
import { KeyFormatPipe } from '../../pipes/key-format.pipe'; // Import custom pipe
import { CartService } from '../../services/cart.service'; // Import CartService

@Component({
  selector: 'app-game-card',
  standalone: true,
  imports: [CommonModule, KeyFormatPipe],
  templateUrl: './game-card.html',
  styleUrl: './game-card.css'
})
export class GameCardComponent {
  private cartService = inject(CartService); // Inject CartService
  
  // 1. @Input decorator allows parent component to pass down Game data
  @Input() game!: Game;
  
  // Mock key code to show pipe demonstration
  mockKey: string = 'a3f9b21c4de79901cc84';

  // 2. @Output decorator registers a custom event name
  // EventEmitter defines the data payload type (number) emitted
  @Output() remove = new EventEmitter<number>();

  // Emit event up to parent with game ID
  onRemoveClick(): void {
    this.remove.emit(this.game.id);
  }

  onAddToCartClick(): void {
    this.cartService.addToCart(this.game);
  }
}

