import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/Product';
import { DataserviceService } from 'src/app/services/dataservice.service';

@Component({
  selector: 'app-selectedproduct',
  templateUrl: './selectedproduct.component.html',
  styleUrls: ['./selectedproduct.component.css'],
})
export class SelectedproductComponent implements OnInit {
  subscription: Subscription;
  selectedProduct: Product;

  constructor(private dataService: DataserviceService) {
    this.subscription = this.dataService
      .onSelectProduct()
      .subscribe((value) => {
        console.log(value);
        this.selectedProduct = value;
      });
  }

  ngOnInit(): void {}
}
