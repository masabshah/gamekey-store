import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameCardComponent } from './game-card';
import { Game } from '../../services/game';

describe('GameCardComponent', () => {
  let component: GameCardComponent;
  let fixture: ComponentFixture<GameCardComponent>;

  const mockGame: Game = {
    id: 1,
    title: 'Test Game',
    price: 9.99,
    available: true
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameCardComponent]
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
