import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { IonicModule, ModalController } from '@ionic/angular';
import { DisplayService } from 'src/app/services/display/display.service';
import {
  HttpService,
  KatProdukModel,
  ProdukForm,
} from 'src/app/services/http/http.service';
import { environment } from 'src/environments/environment';

@Component({
  standalone: true,
  selector: 'app-form-tambah',
  templateUrl: './form-tambah.component.html',
  styleUrls: ['./form-tambah.component.scss'],
  imports: [CommonModule, IonicModule, FormsModule],
})
export class FormTambahComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  gambarProduk: File | null = null;
  thumbnailUrl: SafeUrl | null = null;

  formProduk: ProdukForm = {} as ProdukForm;
  kategoriProduk: KatProdukModel[] = [];

  constructor(
    private http: HttpService,
    private display: DisplayService,
    private modalCtrl: ModalController,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.ambilKategoriProduk();
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

  async alertTambahProduk() {
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
            this.tambahProduk();
          },
        },
      ],
    });
  }

  async tambahProduk() {
    const loading = await this.display.loading({
      message: 'Silahkan tunggu...',
    });

    try {
      const formData = new FormData();

      for (const key in this.formProduk) {
        formData.append(key, this.formProduk[key as keyof ProdukForm]);
      }
      if (this.gambarProduk) {
        formData.append('img1', this.gambarProduk, this.gambarProduk.name);
      }

      const response = await this.http.post(
        environment.url + '/storeApi',
        formData
      );

      if (response.status !== 200) {
        throw response;
      }

      this.display.toast({
        message: 'Produk berhasil di tambah!',
        duration: 3000,
      });

      this.dismiss(response.status);
    } catch (error) {
      console.error(error);
      this.display.toast({
        message: 'Produk gagal di tambah!',
        duration: 3000,
      });
    } finally {
      await loading.dismiss();
    }
  }
}
