import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Dragon } from '../../state/dragons.model';
import { DragonsQuery } from '../../state/dragons.query';
import { DragonsService } from '../../state/dragons.service';

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
  editModal = false;
  currentEditDragon?: Dragon;

  constructor(
    private dragonsService: DragonsService,
    private query: DragonsQuery
  ) {}

  ngOnInit(): void {
    this.loadDragons();
    this.listenDragonsStore();
  }

  listenDragonsStore() {
    this.query
      .getAlphabeticOrder()
      .pipe(takeUntil(this.unSubscribe))
      .subscribe((dragons) => (this.dragons = dragons));
  }

  loadDragons() {
    this.loading = true;
    this.dragonsService
      .getAllDragons()
      .pipe(takeUntil(this.unSubscribe))
      .subscribe(
        () => (this.loading = false),
        () => {
          this.errorMessage = true;
          this.loading = false;
        }
      );
  }

  getEmptyState(): EmptyStateModel | undefined {
    const isEmpty = !this.loading && this.dragons.length === 0;

    if (this.errorMessage) {
      return {
        title: 'Ocorreu um problema!',
        description: 'Não foi possível listar os dragões!',
        buttonText: 'Tentar novamente',
        buttonCallback: () => this.tryAgain(),
      };
    } else if (isEmpty) {
      return {
        title: 'Não há dragões!',
        description: 'Cadastre um novo dragão no botão!',
        buttonText: 'Novo dragão',
        buttonCallback: () => this.showDragonModal(),
      };
    }

    return;
  }

  showDragonModal(dragon?: Dragon) {
    this.editModal = true;
    this.currentEditDragon = dragon;
  }

  handleEditModalClosed() {
    this.editModal = false;
    this.currentEditDragon = undefined;
  }

  tryAgain() {
    this.errorMessage = false;
    this.loadDragons();
  }

  ngOnDestroy() {
    this.unSubscribe.next();
    this.unSubscribe.complete();
  }
}

export interface EmptyStateModel {
  title: string;
  description: string;
  buttonText?: string;
  buttonCallback: () => void;
}
