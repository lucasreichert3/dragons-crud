import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Dragon } from '../../state/dragons.model';
import { DragonsService } from '../../state/dragons.service';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dragon-detail',
  templateUrl: './dragon-detail.component.html',
  styleUrls: ['./dragon-detail.component.scss'],
})
export class DragonDetailComponent implements OnInit, OnDestroy {
  dragon!: Dragon;
  loading = false;
  errorMessage = true;
  unSubscribe = new Subject<void>();
  backIcon = faChevronLeft;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dragonsService: DragonsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getDragon();
  }

  getDragon() {
    this.loading = true;
    const { id } = this.activatedRoute.snapshot.params;
    this.dragonsService
      .getDragon(id)
      .pipe(takeUntil(this.unSubscribe))
      .subscribe(
        (dragon) => (this.dragon = dragon),
        () => {
          this.errorMessage = true;
          this.loading = false;
        },
        () => (this.loading = false)
      );
  }

  backToList() {
    this.router.navigate(['/dragons']);
  }

  ngOnDestroy() {
    this.unSubscribe.next();
    this.unSubscribe.complete();
  }
}
