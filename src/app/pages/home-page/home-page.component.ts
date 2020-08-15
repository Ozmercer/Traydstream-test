import { Component, OnInit, OnDestroy } from '@angular/core';
import { Hero } from '../../modules/heroes/shared/hero.model';
import { AppConfig } from '../../configs/app.config';
import { Observable, Subscription } from 'rxjs';
import { defaultIfEmpty, map } from 'rxjs/operators';
import { HeroService } from '../../modules/core/services/hero.service';
import { MatDialog } from '@angular/material/dialog';
import { TraydStreamDialogComponent } from './trayd-stream-dialog/trayd-stream-dialog.component';
import { TraydStreamService } from 'src/app/modules/core/services/trayd-stream.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent implements OnInit, OnDestroy {
  heroes$: Observable<Hero[]>;
  UUIDs$: Subscription;
  UUIDs: string[];

  constructor(
    private heroService: HeroService,
    public dialog: MatDialog,
    private traydStreamService: TraydStreamService
  ) { }

  ngOnInit() {
    this.heroes$ = this.heroService.getHeroes().pipe(
      map((heroes) => heroes.slice(0, AppConfig.topHeroesLimit)),
      defaultIfEmpty([])
    );
    this.UUIDs$ = this.traydStreamService.UUIDs$.subscribe(value => {
      this.UUIDs = value;
    });
  }

  openDialog(): void {
    this.dialog.open(TraydStreamDialogComponent, {
      width: '50%',
      minHeight: '300px',
      data: { UUIDs: this.UUIDs }
    });
  }

  ngOnDestroy() {
    this.UUIDs$.unsubscribe();
  }
}
