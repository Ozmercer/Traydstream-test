import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePageComponent } from './home-page.component';
import { of } from 'rxjs';
import { Hero } from '../../modules/heroes/shared/hero.model';
import { configureTestSuite } from 'ng-bullet';
import { HeroLoadingComponent } from '../../shared/components/hero-loading/hero-loading.component';
import { HeroCardComponent } from '../../shared/components/hero-card/hero-card.component';
import { LoadingPlaceholderComponent } from '../../shared/components/loading-placeholder/loading-placeholder.component';
import { MockComponent } from 'ng-mocks';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { HeroService } from '../../modules/core/services/hero.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

fdescribe('HomePage', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  const heroServiceSpy = jasmine.createSpyObj('HeroService', ['getHeroes']);
  const dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MatDialogModule
      ],
      declarations: [
        MockComponent(HeroCardComponent),
        MockComponent(HeroLoadingComponent),
        MockComponent(LoadingPlaceholderComponent),
        HomePageComponent
      ],
      providers: [
        { provide: HeroService, useValue: heroServiceSpy },
        { provide: MatDialog, useValue: dialogSpy }
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.debugElement.componentInstance;
    heroServiceSpy.getHeroes.and.returnValue(of([new Hero({ name: 'hero test' })]));
    fixture.detectChanges();
  });

  it('should create component', (() => {
    expect(component).toBeTruthy();
  }));

  it('should initialice heroes', async(() => {
    fixture.whenStable().then(() => {
      expect(fixture.debugElement.queryAll(By.css('app-hero-card')).length).toBe(1);
    });
  }));

  it('should open a modal when clicking on button', () => {
    expect(dialogSpy.open).not.toHaveBeenCalled();

    fixture.nativeElement.querySelector('.modal-toggle').click();
    fixture.detectChanges();

    expect(dialogSpy.open).toHaveBeenCalledTimes(1);
  });
});
