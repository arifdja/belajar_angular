// Import decorator dan lifecycle hooks dari Angular
import { Component, OnInit, OnDestroy } from '@angular/core';
// Import modul umum Angular
import { CommonModule } from '@angular/common';
// Import HttpClient untuk HTTP request
import { HttpClient } from '@angular/common/http';
// Import RxJS Observable dan Subject
import { Observable, Subject, BehaviorSubject, interval } from 'rxjs';
// Import operator-operator RxJS yang digunakan
import { map, filter, debounceTime, distinctUntilChanged, switchMap, catchError, tap, takeUntil, shareReplay } from 'rxjs/operators';
// Import FormsModule untuk binding form
import { FormsModule } from '@angular/forms';

// Interface untuk tipe data User
interface User {
  id: number; // ID user
  name: string; // Nama user
  email: string; // Email user
  phone?: string; // Opsional: nomor telepon
  website?: string; // Opsional: website
}

// Dekorator komponen Angular
@Component({
  selector: 'app-list-rxjs', // Nama selector komponen
  imports: [CommonModule, FormsModule], // Modul yang digunakan
  templateUrl: './list-rxjs.html', // Path template HTML
  styleUrl: './list-rxjs.scss', // Path file style
})
export class ListRxjs implements OnInit, OnDestroy {
  // users$ adalah stream (Observable) yang akan berisi array data user hasil pencarian.
  // Tanda $ adalah konvensi penamaan untuk Observable di Angular/RxJS.
  // Tipe Observable<User[]> artinya stream ini akan mengeluarkan data berupa array User.
  // Tanda !: (non-null assertion) memberitahu TypeScript bahwa properti ini pasti akan diinisialisasi sebelum digunakan.
  users$!: Observable<User[]>;
  
  // BehaviorSubject untuk menyimpan dan mengirimkan nilai search term terbaru
  searchTerm$ = new BehaviorSubject<string>('');
  
  // Subject untuk menandai kapan komponen di-destroy (untuk unsubscribe otomatis)
  private destroy$ = new Subject<void>();
  
  // Properti untuk kebutuhan UI
  loading = false; // Menandakan loading data
  error = ''; // Menyimpan pesan error
  searchValue = ''; // Nilai input pencarian

  // Dependency injection HttpClient untuk melakukan HTTP request
  constructor(private http: HttpClient) {}

  // Lifecycle hook yang dijalankan saat komponen diinisialisasi
  ngOnInit() {
    // Membuat pipeline RxJS untuk pencarian user
    this.users$ = this.searchTerm$.pipe(
      // Menunggu 500ms setelah user berhenti mengetik sebelum melakukan pencarian
      debounceTime(500),
      // Hanya lanjut jika nilai search berubah
      distinctUntilChanged(),
      // Logging search term ke console (debugging)
      tap(term => console.log('Search term:', term)),
      // Melakukan HTTP request pencarian user, membatalkan request sebelumnya jika ada input baru
      switchMap(term => this.searchUsers(term)),
      // Menangani error, jika error set pesan error dan kembalikan array kosong
      catchError(error => {
        console.error('Error:', error);
        this.error = 'Gagal mengambil data';
        return [];
      }),
      // Membagikan hasil observable ke banyak subscriber tanpa request ulang
      shareReplay(1),
      // Unsubscribe otomatis saat komponen di-destroy
      takeUntil(this.destroy$)
    );
  }

  /**
   * Melakukan pencarian user ke API dan filter berdasarkan search term
   * @param term string pencarian
   * @returns Observable<User[]>
   */
  private searchUsers(term: string): Observable<User[]> {
    this.loading = true; // Set loading true saat mulai request
    this.error = '';
    
    // Melakukan HTTP GET ke endpoint users
    return this.http.get<User[]>('https://jsonplaceholder.typicode.com/users').pipe(
      // Memproses dan memfilter data user berdasarkan search term
      map(users => {
        // Jika ada search term, filter user berdasarkan nama atau email
        if (term) {
          return users.filter(user => 
            user.name.toLowerCase().includes(term.toLowerCase()) ||
            user.email.toLowerCase().includes(term.toLowerCase())
          );
        }
        // Jika tidak ada search term, kembalikan semua user
        return users;
      }),
      // (Opsional) Tambahkan delay untuk simulasi loading
      // delay(1000),
      // Setelah data didapat, set loading menjadi false
      tap(() => this.loading = false),
      // Jika terjadi error, set loading false dan lempar error ke catchError di atas
      catchError(error => {
        this.loading = false;
        throw error;
      })
    );
  }

  /**
   * Dipanggil saat user mengetik di input pencarian
   * @param term string pencarian
   */
  onSearch(term: string) {
    this.searchValue = term; // Update nilai input
    this.searchTerm$.next(term); // Emit nilai baru ke pipeline RxJS
  }

  /**
   * Menghapus input pencarian dan reset hasil
   */
  clearSearch() {
    this.searchValue = '';
    this.searchTerm$.next('');
  }

  // Lifecycle hook yang dijalankan saat komponen di-destroy
  // Digunakan untuk unsubscribe semua subscription agar tidak memory leak
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Digunakan di *ngFor untuk optimasi rendering list user
   * @param index index array
   * @param user data user
   * @returns id user
   */
  trackByUserId(index: number, user: User): number {
    return user.id;
  }
}
