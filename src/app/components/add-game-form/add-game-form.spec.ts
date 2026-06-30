import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddGameFormComponent } from './add-game-form';
import { GameService } from '../../services/game';
import { of } from 'rxjs';
import { provideRouter } from '@angular/router';

describe('AddGameFormComponent', () => {
  let component: AddGameFormComponent;
  let fixture: ComponentFixture<AddGameFormComponent>;

  const mockGameService = {
    addGame: () => of({ id: 1, title: 'Test Game', price: 9.99, available: true })
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddGameFormComponent],
      providers: [
        { provide: GameService, useValue: mockGameService },
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddGameFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

