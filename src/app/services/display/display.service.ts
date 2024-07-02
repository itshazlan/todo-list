import { Injectable } from '@angular/core';
import {
  LoadingController,
  AlertController,
  ToastController,
  LoadingOptions,
  AlertOptions,
  ToastOptions,
  ModalOptions,
  ModalController,
} from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class DisplayService {
  constructor(
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private modalCtrl: ModalController,
  ) {}

  async loading(options: LoadingOptions) {
    const loading = await this.loadingCtrl.create(options);
    await loading.present();

    return loading;
  }

  async alert(options: AlertOptions) {
    const alert = await this.alertCtrl.create(options);
    await alert.present();

    return alert;
  }

  async toast(options: ToastOptions) {
    const toast = await this.toastCtrl.create(options);
    await toast.present();

    return toast;
  }

  async modal(options: ModalOptions) {
    const modal = await this.modalCtrl.create(options);

    return modal;
  }
}
