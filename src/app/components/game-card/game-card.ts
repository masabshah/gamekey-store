import { Component, Input, Output, EventEmitter, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Game } from '../../services/game';
import { KeyFormatPipe } from '../../pipes/key-format.pipe'; // Import custom pipe
import { CartService } from '../../services/cart.service'; // Import CartService
import { RouterModule } from '@angular/router'; // For routerLink detail navigation

@Component({
  selector: 'app-game-card',
  standalone: true,
  imports: [CommonModule, KeyFormatPipe, RouterModule],
  templateUrl: './game-card.html',
  styleUrl: './game-card.css'
})
export class GameCardComponent {
  private cartService = inject(CartService); // Inject CartService
  
  // 1. @Input decorator allows parent component to pass down Game data
  @Input() game!: Game;
  
  // Mock key code to show pipe demonstration
  mockKey: string = 'a3f9b21c4de79901cc84';
  
  // Signal to handle clipboard copy visualization state
  copied = signal(false);

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

  // Format and copy mockKey to clipboard
  copyToClipboard(event: MouseEvent): void {
    event.stopPropagation(); // Prevent card navigation trigger
    const pipe = new KeyFormatPipe();
    const formattedKey = pipe.transform(this.mockKey);
    navigator.clipboard.writeText(formattedKey).then(() => {
      this.copied.set(true);
      setTimeout(() => {
        this.copied.set(false);
      }, 2000);
    });
  }
}


