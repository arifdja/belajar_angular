import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-tombol',
  standalone: true,
  imports: [],
  templateUrl: './tombol.html',
  styleUrls: ['./tombol.scss'],
})
export class Tombol {

  @Input() aksi!: string;
  @Output() klik = new EventEmitter<string>();

  protected onKlik() {
    this.klik.emit(this.aksi);
  }

  

}
