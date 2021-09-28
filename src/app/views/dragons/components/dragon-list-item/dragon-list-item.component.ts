import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { Dragon } from '../../dragons.model';

@Component({
  selector: 'app-dragon-list-item',
  templateUrl: './dragon-list-item.component.html',
  styleUrls: ['./dragon-list-item.component.scss'],
})
export class DragonListItemComponent implements OnInit {
  @Input() dragon!: Dragon;
  @Output() editDragon = new EventEmitter<Dragon>()
  @Output() deleteDragon = new EventEmitter<Dragon>()

  trashIcon = faTrash
  pencilIcon = faPencilAlt

  constructor() {}

  ngOnInit(): void {}
}
