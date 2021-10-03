import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.scss'],
})
export class EmptyStateComponent implements OnInit {
  @Input() path!: string;
  @Input() size = 300;
  @Input() title!: string;
  @Input() description?: string;
  @Input() visible = false;
  @Input() buttonText?: string;
  @Output() buttonClicked = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}
}
