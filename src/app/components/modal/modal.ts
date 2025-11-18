import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  imports: [CommonModule],
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
})
export class Modal {
  @Input() show = false; // Kontrol untuk menampilkan/menyembunyikan modal
  @Input() title = 'Modal'; // Judul modal
  @Input() user: any = null; // Data user yang akan ditampilkan
  @Output() closeEvent = new EventEmitter<void>(); // Event untuk menutup modal

  close() {
    this.closeEvent.emit(); // Emit event untuk memberitahu parent component
  }
}
