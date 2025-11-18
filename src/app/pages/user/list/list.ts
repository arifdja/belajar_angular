import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Modal } from '../../../components/modal/modal';

@Component({
  selector: 'app-list',
  imports: [CommonModule, Modal],
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class List {
  users: any[] = [];
  showModal = false; // Kontrol untuk menampilkan/menyembunyikan modal
  selectedUser: any = null; // Menyimpan data user yang dipilih

  constructor(private http: HttpClient) {
    this.ambilDataUser();
  }

  ambilDataUser() { // Fungsi untuk mengambil data user dari API
    this.http.get<any[]>('https://jsonplaceholder.typicode.com/users') // Melakukan HTTP GET request ke API
      .subscribe({ // Subscribe untuk menerima response dari API
        next: (data) => { // Callback yang dijalankan ketika request berhasil
          this.users = data; // Menyimpan data users yang diterima ke dalam properti users
          console.log('Data users berhasil diambil:', this.users); // Menampilkan data di console untuk debugging
        },
        error: (error) => { // Callback yang dijalankan ketika terjadi error
          console.error('Error mengambil data:', error); // Menampilkan pesan error di console
        }
      });
  }

  getDetailUser(userId: number) { // Fungsi untuk mengambil detail user berdasarkan ID
    this.http.get<any>(`https://jsonplaceholder.typicode.com/users/${userId}`) // Melakukan HTTP GET request ke API untuk user tertentu
      .subscribe({ // Subscribe untuk menerima response dari API
        next: (data) => { // Callback yang dijalankan ketika request berhasil
          this.selectedUser = data; // Menyimpan detail user yang dipilih
          this.showModal = true; // Menampilkan modal
          console.log('Detail user berhasil diambil:', data); // Menampilkan detail user di console
        },
        error: (error) => { // Callback yang dijalankan ketika terjadi error
          console.error('Error mengambil detail user:', error); // Menampilkan pesan error di console
        }
      });
  }

  closeModal() { // Fungsi untuk menutup modal
    this.showModal = false; // Menyembunyikan modal
    this.selectedUser = null; // Menghapus data user yang dipilih
  }
}
