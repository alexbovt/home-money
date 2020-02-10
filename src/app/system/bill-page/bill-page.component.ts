import {Component, OnDestroy, OnInit} from '@angular/core';
import {combineLatest, Subscription} from 'rxjs';

import {BillService} from '../shared/services/bill.service';
import {Bill} from '../shared/models/bill.model';

@Component({
  selector: 'app-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss']
})
export class BillPageComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];

  public currency: any;
  public bill: Bill;
  public isLoaded = false;

  constructor(private billService: BillService) {
  }

  ngOnInit(): void {
    const subscription = combineLatest(
      this.billService.getBill(),
      this.billService.getCurrency()
    ).subscribe(([bill, currency]: [Bill, any]) => {
      this.bill = bill;
      this.currency = currency;
      this.isLoaded = true;
    });

    this.subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public onRefresh(): void {
    this.isLoaded = false;
    const subscription = this.billService.getCurrency()
      .subscribe(currency => {
        this.currency = currency;
        this.isLoaded = true;
      });

    this.subscriptions.push(subscription);
  }
}
