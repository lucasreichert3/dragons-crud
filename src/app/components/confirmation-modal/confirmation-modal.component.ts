import { Component, Input, OnInit } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';
import { ButtonStatus } from '../button/button.model';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss'],
})
export class ConfirmationModalComponent
  extends SimpleModalComponent<ConfirmModel, boolean>
  implements ConfirmModel
{
  @Input() title!: string;
  @Input() message!: string;
  buttonStatus = ButtonStatus

  constructor() {
    super();
  }

  confirm() {
    this.result = true;
    this.close();
  }
}

export interface ConfirmModel {
  title: string;
  message: string;
}
