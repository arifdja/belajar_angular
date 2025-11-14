import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Tombol } from './components/tombol/tombol';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Tombol, CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  protected readonly title = "belajar-angular";
  protected readonly data = [{
    nama: 'andi', umur: 30, alamat: 'Jl. Merdeka'
  }, {
    nama: 'budi', umur: 25, alamat: 'Jl. Sudirman'
  }, {
    nama: 'citra', umur: 28, alamat: 'Jl. Thamrin'
  }];

  protected fungsiParent($event: string) {
    console.log('Tombol diklik', $event);
  }

  protected fungsiParent2($event: string) {
    console.log('Jalur klik 2 dari Tombol diterima di App', $event);
  }

}
