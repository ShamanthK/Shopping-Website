import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

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

  ngOnInit(): void {
    console.log('environment: ', environment.apiURL);
  }

  routeToAllProducts() {
    console.log('clicked', this.isAuthenticated);
    this.router.navigate(['/products']);
  }
}
