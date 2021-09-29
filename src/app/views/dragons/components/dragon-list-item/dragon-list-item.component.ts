import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { Dragon } from '../../dragons.model';
import { SimpleModalService } from 'ngx-simple-modal';
import { ConfirmationModalComponent } from 'src/app/components/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-dragon-list-item',
  templateUrl: './dragon-list-item.component.html',
  styleUrls: ['./dragon-list-item.component.scss'],
})
export class DragonListItemComponent implements OnInit {
  @Input() dragon!: Dragon;
  @Output() editDragon = new EventEmitter<Dragon>();
  @Output() deleteDragon = new EventEmitter<Dragon>();

  trashIcon = faTrash;
  pencilIcon = faPencilAlt;

  constructor(private simpleModalService: SimpleModalService) {}

  ngOnInit(): void {}

  showConfirm() {
    this.simpleModalService
      .addModal(ConfirmationModalComponent, {
        title: 'Exclusão de item',
        message: `Tem certeza que deseja excluir o dragão: ${this.dragon.name}?`,
      })
      .subscribe((isConfirmed) => {
        if (isConfirmed) this.deleteDragon.emit(this.dragon);
      });
  }
}
