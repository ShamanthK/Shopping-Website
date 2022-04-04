import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success-order',
  templateUrl: './success-order.component.html',
  styleUrls: ['./success-order.component.css']
})
export class SuccessOrderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  continueShopping() {
    this.router.navigateByUrl('/products')
  }
}
