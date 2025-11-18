import { Component } from '@angular/core';
import { Tombol } from '../../components/tombol/tombol';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-latihan',
  standalone: true,
  imports: [Tombol, CommonModule, FormsModule],
  templateUrl: './latihan.html',
  styleUrl: './latihan.scss',
})
export class Latihan {
  protected readonly title = "belajar-angular";
  protected readonly data = [
    { nama: 'andi', umur: 30, alamat: 'Jl. Merdeka' },
    { nama: 'budi', umur: 25, alamat: 'Jl. Sudirman' },
    { nama: 'citra', umur: 28, alamat: 'Jl. Thamrin' }
  ];

  // Contoh two-way data binding
  public namaUser: string = '';
  public kotaUser: string = '';

  protected fungsiParent($event: string) {
    console.log('Tombol diklik', $event);
  }

  protected fungsiParent2($event: string) {
    console.log('Jalur klik 2 dari Tombol diterima di Latihan', $event);
  }
}
