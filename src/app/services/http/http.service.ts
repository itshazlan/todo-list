import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, timeout } from 'rxjs';

export type LoginForm = {
  email: string;
  password: string;
};

export type ProdukForm = {
  nama_produk: string;
  kategori_produk: string;
  berat_produk: string;
  stok_produk: string;
  harga_produk: string;
  deskripsi_produk: string;
  img1: string;
};

export type ProdukModel = {
  id_produk: number;
  nama_produk: string;
  id_kategori: number;
  berat: string;
  stok: number;
  harga_produk: number;
  deskripsi_produk: string;
  foto_produk: string;
  created_at: string;
  updated_at: string;
  nama_kategori: string;
};

export type KatProdukModel = {
  id_kategori: number;
  nama_kategori: string;
  deskripsi_kategori: string;
  created_at: string;
  updated_at: string;
};

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private httpClient: HttpClient) {}

  async get(url: string): Promise<any> {
    const request = this.httpClient
      .get(url, { observe: 'response' })
      .pipe(timeout(10000));

    return await lastValueFrom<any>(request);
  }

  async post(url: string, data: any): Promise<any> {
    const request = this.httpClient
      .post(url, data, { observe: 'response' })
      .pipe(timeout(10000));

    return await lastValueFrom<any>(request);
  }

  async put(url: string, data: any): Promise<any> {
    const request = this.httpClient
      .put(url, data, { observe: 'response' })
      .pipe(timeout(10000));

    return await lastValueFrom<any>(request);
  }

  async delete(url: string) {
    const request = this.httpClient
      .delete(url, { observe: 'response' })
      .pipe(timeout(10000));

    return await lastValueFrom<any>(request);
  }
}
