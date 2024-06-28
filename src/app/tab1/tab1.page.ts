import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServerService } from '../services/server/server.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  contohDataObject = {
    nama: 'Hamzah Alvana',
    alamat: 'Jalan Juanda',
    hobi: 'Memancing',
  };

  public alertButtons = [
    {
      text: 'Batal',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'Hapus',
      role: 'confirm',
      handler: () => {
        console.log('Terhapus');
      },
    },
  ];

  setResult(ev: any) {
    console.log(`Dismissed with role: ${ev.detail.role}`);
  }

  constructor(private router: Router, private server: ServerService) {}

  ngOnInit(): void {
    this.getDataMahasiswa();
  }

  bukaHalamanDashboard() {
    this.router.navigate(['/dashboard']);
  }

  bukaHalamanBaru(page: string) {
    this.router.navigate([page]);
  }

  bukaHalamanDenganValue(param: any) {
    const contohDataObject = JSON.stringify(param);

    this.router.navigate(['/dashboard'], {
      queryParams: {
        contohDataObject,
      },
    });
  }

  getDataMahasiswa() {
    try {
      this.server
        .getData(`${environment.url}/mahasiswa`)
        .subscribe((response) => {
          console.log(response);
        });
    } catch (error) {
      console.error(error);
    }
  }
}
