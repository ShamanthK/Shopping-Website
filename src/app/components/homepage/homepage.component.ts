import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  exploreAll: string = 'Explore All Products';
  isAuthenticated: boolean;
  subscription: Subscription;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  routeToAllProducts() {
    console.log('clicked', this.isAuthenticated);
    this.router.navigate(['/products']);
  }
}
