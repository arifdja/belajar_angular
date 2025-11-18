import { Component } from '@angular/core'; // Mengimpor Component dari Angular core
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'; // Mengimpor tools untuk reactive form

@Component({
  selector: 'app-kalkulator', // Selector komponen
  standalone: true, // Komponen berdiri sendiri
  imports: [ReactiveFormsModule], // Mengimpor modul form reaktif
  templateUrl: './kalkulator.html', // File template HTML
  styleUrl: './kalkulator.scss', // File style SCSS
})
export class Kalkulator {
  form: FormGroup; // Properti untuk form group
  hasil: number | null = null; // Properti variabel hasil dengan tipe number atau null dengan nilai awal null

  constructor(private fb: FormBuilder) { // Konstruktor menerima FormBuilder
    this.form = this.fb.group({ // Membuat form group dengan 3 field
      nilai1: [0], // Field nilai1, default 0
      operator: ['tambah'], // Field operator, default 'tambah'
      nilai2: [0], // Field nilai2, default 0
    });
    this.form.valueChanges.subscribe(() => this.hitung()); // Setiap perubahan form, panggil hitung()
    this.hitung(); // Hitung hasil pertama kali saat inisialisasi
  }

  hitung() { // Fungsi untuk menghitung hasil
    const { nilai1, operator, nilai2 } = this.form.value; // Mengambil nilai dari form
    //Nilai form values {
    //nilai1: 5,
    //operator: 'tambah',
    //nilai2: 3
    //}

    if (operator === 'tambah') { // Jika operator tambah
      this.hasil = Number(nilai1) + Number(nilai2); // Penjumlahan
    } else { // Jika operator kurang
      this.hasil = Number(nilai1) - Number(nilai2); // Pengurangan
    }
  }
}
