import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ButtonStatus } from './button.model';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() text!: string;
  @Input() disabled = false;
  @Input() status: ButtonStatus = ButtonStatus.primary
  @Output() clicked = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}

