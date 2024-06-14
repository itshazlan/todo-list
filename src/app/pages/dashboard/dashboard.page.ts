import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  value: any = {};

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe((resp: any) => {
      console.log(resp.contohDataObject);

      this.value = JSON.parse(resp.contohDataObject);
      console.log(this.value);
    });
  }

  ngOnInit() {}
}
