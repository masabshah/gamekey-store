import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameCardComponent } from './game-card';
import { Game } from '../../services/game';
import { CartService } from '../../services/cart.service';
import { provideRouter } from '@angular/router';

describe('GameCardComponent', () => {
  let component: GameCardComponent;
  let fixture: ComponentFixture<GameCardComponent>;

  const mockGame: Game = {
    id: 1,
    title: 'Test Game',
    price: 9.99,
    available: true
  };

  const mockCartService = {
    addToCart: () => {}
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameCardComponent],
      providers: [
        { provide: CartService, useValue: mockCartService },
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GameCardComponent);
    component = fixture.componentInstance;
    component.game = mockGame; // Set required @Input
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
