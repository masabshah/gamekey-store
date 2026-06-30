import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameDetailComponent } from './game-detail';
import { GameService } from '../../services/game';
import { of } from 'rxjs';
import { provideRouter } from '@angular/router';

describe('GameDetailComponent', () => {
  let component: GameDetailComponent;
  let fixture: ComponentFixture<GameDetailComponent>;

  const mockGameService = {
    getGames: () => of([
      { id: 1, title: 'Test Game', price: 9.99, available: true }
    ])
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameDetailComponent],
      providers: [
        { provide: GameService, useValue: mockGameService },
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GameDetailComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

