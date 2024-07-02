import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpService, ProdukModel } from '../../services/http/http.service';
import { DisplayService } from '../../services/display/display.service';
import { FormTambahComponent } from 'src/app/components/form-tambah/form-tambah.component';
import { FormEditComponent } from 'src/app/components/form-edit/form-edit.component';
import { DetailsComponent } from 'src/app/components/details/details.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  dataProduk: ProdukModel[] = [];

  constructor(private http: HttpService, private display: DisplayService) {}

  ngOnInit(): void {
    this.ambilProduk();
  }

  async bukaModalDetails(produk: ProdukModel) {
    const modal = await this.display.modal({
      component: DetailsComponent,
      componentProps: { produk },
    });

    return await modal.present();
  }

  async bukaModalTambah() {
    const modal = await this.display.modal({
      component: FormTambahComponent,
    });

    modal.onDidDismiss().then((data) => {
      if (data !== null) {
        this.ambilProduk();
      }
    });

    return await modal.present();
  }

  async bukaModalUbah(dataProduk: ProdukModel) {
    const modal = await this.display.modal({
      component: FormEditComponent,
      componentProps: { dataProduk, idProduk: dataProduk.id_produk },
    });

    modal.onDidDismiss().then((data) => {
      if (data !== null) {
        this.ambilProduk();
      }
    });

    return await modal.present();
  }

  gambar(namaFile: string) {
    return (
      environment.url_gambar + namaFile ??
      environment.url_gambar + 'download.jpg'
    );
  }

  async ambilProduk() {
    const loading = await this.display.loading({
      message: 'Silahkan tunggu...',
    });

    try {
      const response = await this.http.get(environment.url + '/getProduk');

      if (response.status !== 200) {
        throw response;
      }

      this.dataProduk = response.body;
    } catch (error) {
      console.error(error);
    } finally {
      await loading.dismiss();
    }
  }

  async alertHapusProduk(id: number) {
    const alert = await this.display.alert({
      header: 'Konfirmasi',
      message: 'Hapus produk?',
      buttons: [
        {
          text: 'Batal',
          role: 'cancel',
        },
        {
          text: 'Hapus',
          role: 'confirm',
          handler: () => {
            alert.dismiss();
            this.hapusProduk(id);
          },
        },
      ],
    });
  }

  async hapusProduk(id: number) {
    const loading = await this.display.loading({
      message: 'Silahkan tunggu...',
    });

    try {
      const response = await this.http.delete(
        environment.url + '/deleteApi/' + id
      );

      if (response.status !== 200) {
        throw response;
      }

      this.display.toast({
        message: 'Produk berhasil dihapus!',
        duration: 3000,
      });
      await this.ambilProduk();
    } catch (error) {
      console.error(error);
      this.display.toast({ message: 'Produk gagal dihapus!', duration: 3000 });
    } finally {
      await loading.dismiss();
    }
  }
}
