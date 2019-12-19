import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: "app-carousel",
  templateUrl: "./carousel.component.html",
  styleUrls: ["./carousel.component.scss"]
})
export class CarouselComponent implements OnInit {
  @Input()
  _items: any;

  _number: number;

  itemsArray = [];
  constructor() {}

  @Output()
  itemSelectedEmit = new EventEmitter();

  ngOnInit() {}
  @Input()
  set number(number: number) {
    this._number = number;
    this.calculate();
  }
  @Input()
  set items(items: any) {
    this._items = items;
    this.calculate();
  }
  calculate() {
    let array = this._items;
    let arrayPage = [];
    this.itemsArray = [];
    if (array) {
      for (let index = 0; index < array.length; index++) {
        const element = array[index];
        if (index !== 0 && index % this._number === 0) {
          this.itemsArray.push(arrayPage);
          arrayPage = [];
        }
        arrayPage.push(element);
      }

      if (arrayPage && arrayPage.length > 0) {
        this.itemsArray.push(arrayPage);
      }
    }
    //console.log(this.itemsArray);
  }
  itemEmit(event) {
    this.itemSelectedEmit.emit(event);
  }
}
