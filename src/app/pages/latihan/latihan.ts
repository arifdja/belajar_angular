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
  private _namaUser: string = '';
  private _kotaUser: string = '';

  // Getter dan setter dengan sanitasi untuk namaUser
  public get namaUser(): string {
    return this._namaUser;
  }

  public set namaUser(value: string) {
    // Sanitasi input: hanya izinkan alfanumerik dan spasi, max 50 karakter
    this._namaUser = value
      .replace(/[^a-zA-Z0-9\s]/g, '')
      .substring(0, 50);
  }

  // Getter dan setter dengan sanitasi untuk kotaUser
  public get kotaUser(): string {
    return this._kotaUser;
  }

  public set kotaUser(value: string) {
    // Sanitasi input: hanya izinkan nilai yang valid
    const validCities = ['', 'Jakarta', 'Bandung', 'Surabaya'];
    this._kotaUser = validCities.includes(value) ? value : '';
  }

  protected fungsiParent($event: string) {
    console.log('Tombol diklik', $event);
  }

  protected fungsiParent2($event: string) {
    console.log('Jalur klik 2 dari Tombol diterima di Latihan', $event);
  }
}
