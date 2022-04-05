import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { getLoginStatus } from 'src/app/ngRx/product.selector';
import { AppState } from 'src/app/ngRx/product.state';
import { DataserviceService } from 'src/app/services/dataservice.service';
import { LoginComponent } from '../login/login.component';
@Component({
  selector: 'app-explorepage',
  templateUrl: './explorepage.component.html',
  styleUrls: ['./explorepage.component.css']
})
export class ExplorepageComponent implements OnInit {

  @Input() explore: string
  @Output() openProductPage = new EventEmitter
  isAuthenticated: boolean
  subscription: Subscription
  isAuthenticated$: Observable<boolean>

  constructor(public dialog: MatDialog, private dataService: DataserviceService, private store: Store<AppState>) {
    this.subscription = this.dataService.onAuthentication().subscribe((value) => {
      console.log('value:', value)
      this.isAuthenticated = value
    })
    this.isAuthenticated$ = this.store.select(getLoginStatus)
  }

  ngOnInit(): void {
  }

  exploreAll() {
    this.isAuthenticated$.subscribe((login) => {
      console.log('login: ', login)
      if (login) {
        this.openProductPage.emit()
      } else {
        const dialogRef = this.dialog.open(LoginComponent, {
          width: '275px',
          // data: {name: this.name, animal: this.animal},
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          // this.animal = result;
        });
      }
    })
  }

}

