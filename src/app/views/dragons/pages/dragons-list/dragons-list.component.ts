import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Dragon } from '../../dragons.model';
import { DragonsService } from '../../dragons.service';

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

  constructor(
    private dragonsService: DragonsService,
    private toastr: ToastrService
  ) {}

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
    console.log(dragon);
  }

  deleteDragon({ id }: Dragon) {
    this.loading = true;

    this.dragonsService
      .deleteDragon(id)
      .pipe(takeUntil(this.unSubscribe))
      .subscribe(
        () => this.removeDragonFromList(id),
        () => {
          this.loading = false;
          this.showErrorMessage(
            'Ocorreu um problema e não foi possível excluir o dragão!',
            'Não foi possível excluir!'
          );
        },
        () => (this.loading = false)
      );
  }

  showErrorMessage(message: string, title?: string) {
    this.toastr.error(message, title);
  }

  removeDragonFromList(id: string) {
    const index = this.dragons.findIndex(({ id: index }) => index === id);

    this.dragons.splice(index, 1);
  }

  ngOnDestroy() {
    this.unSubscribe.next();
    this.unSubscribe.complete();
  }
}
