import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-tambah',
  templateUrl: './form-tambah.page.html',
  styleUrls: ['./form-tambah.page.scss'],
})
export class FormTambahPage implements OnInit {
  public alertButtons = [
    {
      text: 'Batal',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'Simpan',
      role: 'confirm',
      handler: () => {
        this.router.navigate(['tabs']);
      },
    },
  ];

  setResult(ev: any) {
    console.log(`Dismissed with role: ${ev.detail.role}`);
  }

  constructor(
    private router: Router
  ) {}

  ngOnInit() {}
}
