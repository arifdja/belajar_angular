import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
   title = 'Aplikasi Kalkulator Sederhana';
   tanggal = '2024-06-15';
  isAktif = false // Ubah ke true agar tombol aktif
   subtitle = 'dari komponen home';

   kirim(data: Number) {
     if (data) {
       this.title = 'Tombol sudah diklik: ' + data;
     } else {
       this.title = 'Tombol sudah diklik tanpa data';
     }
   }

}
