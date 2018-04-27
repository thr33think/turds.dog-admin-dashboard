import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatSelectChange } from '@angular/material';

export enum ShowCards {
  ALL = 'ALL',
  VISIBLE = 'VISIBLE',
  HIDDEN = 'HIDDEN'
}

@Component({
  selector: 'app-options-bar',
  templateUrl: './options-bar.component.html',
  styleUrls: ['./options-bar.component.scss']
})
export class OptionsBarComponent implements OnInit {

  @Output() toggleNonvisibleCards: EventEmitter<ShowCards> = new EventEmitter<ShowCards>();
  selected: ShowCards = ShowCards.ALL;

  constructor() { }

  ngOnInit() {
  }

  intentToggleNonvisibleCards(value: ShowCards) {
    this.toggleNonvisibleCards.emit(value);
  }
}
