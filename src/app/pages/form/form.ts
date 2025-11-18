import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form.html',
  styleUrl: './form.scss',
})
export class Form {
  // Custom validator untuk mencegah karakter berbahaya
  private noSpecialChars(control: AbstractControl): ValidationErrors | null {
    const forbidden = /<script|javascript:|onerror|onclick|<iframe|eval\(/gi;
    if (control.value && forbidden.test(control.value)) {
      return { specialChars: true };
    }
    return null;
  }

  // Custom validator untuk whitelist karakter alfanumerik dan spasi
  private alphaNumericWithSpace(control: AbstractControl): ValidationErrors | null {
    const pattern = /^[a-zA-Z0-9\s]*$/;
    if (control.value && !pattern.test(control.value)) {
      return { invalidChars: true };
    }
    return null;
  }

  formData = new FormGroup({
    nama: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
      this.alphaNumericWithSpace.bind(this),
      this.noSpecialChars.bind(this)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.maxLength(100)
    ]),
    pesan: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(500),
      this.noSpecialChars.bind(this)
    ])
  });

  protected onSubmit() {
    if (this.formData.valid) {
      // Sanitasi tambahan sebelum submit
      const sanitizedData = {
        nama: this.sanitizeInput(this.formData.value.nama),
        email: this.sanitizeInput(this.formData.value.email),
        pesan: this.sanitizeInput(this.formData.value.pesan)
      };
      console.log('Form submitted:', sanitizedData);
      alert('Form berhasil dikirim!');
      this.formData.reset();
    }
  }

  // Fungsi sanitasi untuk membersihkan input
  private sanitizeInput(value: any): string {
    if (!value) return '';
    return String(value)
      .trim()
      .replace(/<[^>]*>/g, '') // Hapus HTML tags
      .replace(/[<>"']/g, ''); // Hapus karakter berbahaya
  }
}
