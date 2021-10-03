import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {
  @Input() isLoading = false;
  @Input() size?: number
  @ViewChild('content', { read: ElementRef, static: true })
  content!: ElementRef;

  hasContent = true;

  constructor() {}

  ngOnInit(): void {
    this.hasContent = !!this.content.nativeElement.innerHTML
  }

}
