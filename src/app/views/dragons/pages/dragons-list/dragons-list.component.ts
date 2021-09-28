import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Dragon } from '../../dragons.model';
import { DragonsService } from '../../dragons.service';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dragons-list',
  templateUrl: './dragons-list.component.html',
  styleUrls: ['./dragons-list.component.scss'],
})
export class DragonsListComponent implements OnInit, OnDestroy {
  dragons: Dragon[] = [];
  unSubscribe = new Subject<void>();
  loading = false;
  errorMessage = false;

  trashIcon = faTrash
  pencilIcon = faPencilAlt

  constructor(private dragonsService: DragonsService) {}

  ngOnInit(): void {
    this.loadDraongs();
  }

  loadDraongs() {
    this.loading = true;
    this.dragonsService
      .getAllDragons()
      .pipe(takeUntil(this.unSubscribe))
      .subscribe(
        (dragons) => (this.dragons = dragons),
        () => {
          this.errorMessage = true;
          this.loading = false;
        },
        () => (this.loading = false)
      );
  }

  editDragon(dragon: Dragon) {

  }

  deleteDragon(dragon: Dragon) {

  }

  ngOnDestroy() {
    this.unSubscribe.next();
    this.unSubscribe.complete();
  }
}
