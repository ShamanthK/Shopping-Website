import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-explorepage',
  templateUrl: './explorepage.component.html',
  styleUrls: ['./explorepage.component.css']
})
export class ExplorepageComponent implements OnInit {

  @Input() explore: string
  @Output() openProductPage = new EventEmitter

  constructor() { }

  ngOnInit(): void {
  }

  exploreAll() {
    this.openProductPage.emit()
  }

}
