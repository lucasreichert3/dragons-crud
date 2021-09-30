import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Dragon } from '../../dragons.model';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dragon-edit-modal',
  templateUrl: './dragon-edit-modal.component.html',
  styleUrls: ['./dragon-edit-modal.component.scss'],
})
export class DragonEditModalComponent {
  @Input() visible = false
  @Input() dragon?: Dragon;

  closeIcon = faTimes;

  @Output() modalClosed = new EventEmitter<void>();

  constructor() {}

  getModalTitle(): string {
    return !this.dragon
      ? 'Criar novo dragão'
      : `Editando o dragão: ${this.dragon.name}`;
  }

  closeModal() {
    this.visible = false
    this.modalClosed.emit()
  }
}

export interface EditDragonModal {
  dragon: Dragon;
}
