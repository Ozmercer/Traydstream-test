import { Component, OnInit } from '@angular/core';
import { Hero } from '../../modules/heroes/shared/hero.model';
import { AppConfig } from '../../configs/app.config';
import { Observable, Subscription } from 'rxjs';
import { defaultIfEmpty, map } from 'rxjs/operators';
import { HeroService } from '../../modules/core/services/hero.service';
import { MatDialog } from '@angular/material/dialog';
import { TraydStreamDialog } from './trayd-stream-dialog/trayd-stream-dialog.component';
import { TraydStreamService } from 'src/app/modules/core/services/trayd-stream.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent implements OnInit {
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
      console.log('UUIDs:', value);
      
      this.UUIDs = value;
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(TraydStreamDialog, {
      width: '50%',
      data: {UUIDs: this.UUIDs}
    });

    dialogRef.afterClosed().subscribe((result: string[]) => {
      console.log(result);
      if (result) {
        this.traydStreamService.UUIDs = result;
      }
    });
  }
}
