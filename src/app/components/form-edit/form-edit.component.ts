import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { IonicModule, ModalController } from '@ionic/angular';
import { DisplayService } from 'src/app/services/display/display.service';
import {
  ProdukForm,
  KatProdukModel,
  HttpService,
  ProdukModel,
} from 'src/app/services/http/http.service';
import { environment } from 'src/environments/environment';

@Component({
  standalone: true,
  selector: 'app-form-edit',
  templateUrl: './form-edit.component.html',
  styleUrls: ['./form-edit.component.scss'],
  imports: [CommonModule, IonicModule, FormsModule],
})
export class FormEditComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  gambarProduk: File | null = null;
  thumbnailUrl: SafeUrl | null = null;

  formProduk: ProdukForm = {} as ProdukForm;
  @Input() dataProduk: ProdukModel = {} as ProdukModel;
  kategoriProduk: KatProdukModel[] = [];

  constructor(
    private http: HttpService,
    private display: DisplayService,
    private modalCtrl: ModalController,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.ambilKategoriProduk();

    const {
      berat,
      deskripsi_produk,
      harga_produk,
      foto_produk,
      id_kategori,
      nama_produk,
      stok,
    } = this.dataProduk;

    this.formProduk.berat_produk = berat;
    this.formProduk.deskripsi_produk = deskripsi_produk;
    this.formProduk.harga_produk = harga_produk?.toString();
    this.formProduk.img1 = foto_produk;
    this.formProduk.kategori_produk = id_kategori?.toString();
    this.formProduk.nama_produk = nama_produk;
    this.formProduk.stok_produk = stok?.toString();
    console.log(this.formProduk);
  }

  dismiss(data?: any) {
    if (this.modalCtrl) {
      this.modalCtrl.dismiss(data);
    }
  }

  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file: File = (input.files as FileList)[0];
    if (input.files && input.files.length > 0) {
      this.gambarProduk = input.files[0];
      this.formProduk.img1 = this.gambarProduk.name;
    }

    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.thumbnailUrl = this.sanitizer.bypassSecurityTrustUrl(
          e.target.result as string
        );
      };
      reader.readAsDataURL(file);
    }
  }

  async ambilKategoriProduk() {
    const loading = await this.display.loading({
      message: 'Silahkan tunggu...',
    });

    try {
      const response = await this.http.get(environment.url + '/kategoriApi');

      if (response.status !== 200) {
        throw response;
      }

      this.kategoriProduk = response.body;
    } catch (error) {
      console.error(error);
    } finally {
      await loading.dismiss();
    }
  }

  async alertUbahProduk() {
    const alert = await this.display.alert({
      header: 'Konfirmasi',
      message: 'Simpan produk?',
      buttons: [
        {
          text: 'Batal',
          role: 'cancel',
        },
        {
          text: 'Simpan',
          role: 'confirm',
          handler: () => {
            alert.dismiss();
            this.ubahProduk();
          },
        },
      ],
    });
  }

  async ubahProduk() {
    const loading = await this.display.loading({
      message: 'Silahkan tunggu...',
    });

    try {
      console.log(this.formProduk);

      // const formData = new FormData();

      // for (const key in this.formProduk) {
      //   formData.append(key, this.formProduk[key as keyof ProdukForm]);
      // }
      // if (this.gambarProduk) {
      //   formData.append('img1', this.gambarProduk, this.gambarProduk.name);
      // }

      const response = await this.http.put(
        environment.url + '/updateApi/' + this.dataProduk.id_produk,
        this.formProduk
      );

      if (response.status !== 200) {
        throw response;
      }

      this.display.toast({
        message: 'Produk berhasil di ubah!',
        duration: 3000,
      });

      this.dismiss(response.status);
    } catch (error) {
      console.error(error);
      this.display.toast({
        message: 'Produk gagal di ubah!',
        duration: 3000,
      });
    } finally {
      await loading.dismiss();
    }
  }
}
