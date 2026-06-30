import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameListComponent } from './game-list';
import { GameService } from '../../services/game';
import { CartService } from '../../services/cart.service';
import { of } from 'rxjs';
import { provideRouter } from '@angular/router';

describe('GameListComponent', () => {
  let component: GameListComponent;
  let fixture: ComponentFixture<GameListComponent>;

  const mockGameService = {
    getGames: () => of([]),
    addGame: () => of({ id: 1, title: 'Test Game', price: 9.99, available: true }),
    toggleAvailability: () => of({ id: 1, title: 'Test Game', price: 9.99, available: false })
  };

  const mockCartService = {
    addToCart: () => {}
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameListComponent],
      providers: [
        { provide: GameService, useValue: mockGameService },
        { provide: CartService, useValue: mockCartService },
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GameListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

