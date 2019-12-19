import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { ProductsService } from "../../../services/common/products.service";
import { LoginService } from '../../../services/common/login.service';

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"]
})
export class ProductComponent implements OnInit {
  @Input()
  item: any;
  @Output()
  itemEmit = new EventEmitter();

  constructor() { }

  ngOnInit() {

  }

  emitItem(event, item) {
    this.itemEmit.emit(item);
  }
}
