import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form.html',
  styleUrl: './form.scss',
})
export class Form {
  formData = new FormGroup({
    nama: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    pesan: new FormControl('', [Validators.required])
  });

  protected onSubmit() {
    if (this.formData.valid) {
      console.log('Form submitted:', this.formData.value);
      alert('Form berhasil dikirim!');
      this.formData.reset();
    }
  }
}
