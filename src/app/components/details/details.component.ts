import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { ProdukModel } from 'src/app/services/http/http.service';

@Component({
  standalone: true,
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  imports: [CommonModule, IonicModule],
})
export class DetailsComponent implements OnInit {
  @Input() produk!: ProdukModel;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  dismiss(data?: any) {
    if (this.modalCtrl) {
      this.modalCtrl.dismiss(data);
    }
  }
}
