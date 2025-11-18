import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list',
  imports: [CommonModule],
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class List {
  users: any[] = [];

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
}
