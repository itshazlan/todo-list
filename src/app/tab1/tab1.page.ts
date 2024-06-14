import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  contohDataObject = {
    nama: 'Hamzah Alvana',
    alamat: 'Jalan Juanda',
    hobi: 'Memancing',
  };

  constructor(private router: Router) {}

  bukaHalamanDashboard() {
    this.router.navigate(['/dashboard']);
  }

  bukaHalamanDenganValue(param: any) {
    const contohDataObject = JSON.stringify(param);

    this.router.navigate(['/dashboard'], {
      queryParams: {
        contohDataObject,
      },
    });
  }
}
