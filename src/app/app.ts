import { Component, signal, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule for ngIf
import { AuthService } from './services/auth.service'; // Import AuthService
import { CartService } from './services/cart.service'; // Import CartService

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule], // Add CommonModule
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private authService = inject(AuthService);
  public cartService = inject(CartService); // Inject CartService
  protected readonly title = signal('gamekey-store');
  protected readonly isLoggedIn = signal(false);

  constructor() {
    this.isLoggedIn.set(this.authService.isAuthenticated());
  }

  simulateLogin(): void {
    this.authService.setToken('abc123token');
    this.isLoggedIn.set(true);
  }

  simulateLogout(): void {
    this.authService.logout();
    this.isLoggedIn.set(false);
  }
}
