import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function cpfValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;

    const digits = value.replace(/\D/g, '');
    if (digits.length !== 11) return { cpf: true };

    if (/^(\d)\1{10}$/.test(digits)) return { cpf: true };

    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(digits.charAt(i)) * (10 - i);
    }
    let remainder = (sum * 10) % 11;
    if (remainder === 10) remainder = 0;
    if (remainder !== parseInt(digits.charAt(9))) return { cpf: true };

    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(digits.charAt(i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10) remainder = 0;
    if (remainder !== parseInt(digits.charAt(10))) return { cpf: true };

    return null;
  };
}

export function cnpjValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;

    const chars = value.replace(/[^A-Z0-9]/gi, '').toUpperCase();
    if (chars.length !== 14) return { cnpj: true };

    if (/^(\d)\1{13}$/.test(chars) && /^\d+$/.test(chars)) return { cnpj: true };

    const toNumeric = (char: string): number => {
      const code = char.charCodeAt(0);
      if (code >= 48 && code <= 57) return code - 48;
      return code - 55;
    };

    const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

    let sum = 0;
    for (let i = 0; i < 12; i++) {
      sum += toNumeric(chars.charAt(i)) * weights1[i];
    }
    let remainder = sum % 11;
    const digit1 = remainder < 2 ? 0 : 11 - remainder;
    if (digit1 !== parseInt(chars.charAt(12))) return { cnpj: true };

    sum = 0;
    for (let i = 0; i < 13; i++) {
      sum += toNumeric(chars.charAt(i)) * weights2[i];
    }
    remainder = sum % 11;
    const digit2 = remainder < 2 ? 0 : 11 - remainder;
    if (digit2 !== parseInt(chars.charAt(13))) return { cnpj: true };

    return null;
  };
}

export function cepValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;

    const digits = value.replace(/\D/g, '');
    if (digits.length !== 8) return { cep: true };

    return null;
  };
}

export function dataValidator(anoMin = 1900, anoMax = 2100): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;

    const match = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    if (!match) return { data: true };

    const dia = parseInt(match[1], 10);
    const mes = parseInt(match[2], 10);
    const ano = parseInt(match[3], 10);

    if (mes < 1 || mes > 12) return { data: true };
    if (dia < 1) return { data: true };
    if (ano < anoMin || ano > anoMax) return { data: true };

    const diasNoMes = new Date(ano, mes, 0).getDate();
    if (dia > diasNoMes) return { data: true };

    return null;
  };
}

export function dataHoraValidator(anoMin = 1900, anoMax = 2100): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;

    const match = value.match(/^(\d{2})\/(\d{2})\/(\d{4})\s(\d{2}):(\d{2})$/);
    if (!match) return { dataHora: true };

    const dia = parseInt(match[1], 10);
    const mes = parseInt(match[2], 10);
    const ano = parseInt(match[3], 10);
    const hora = parseInt(match[4], 10);
    const minuto = parseInt(match[5], 10);

    if (mes < 1 || mes > 12) return { dataHora: true };
    if (dia < 1) return { dataHora: true };
    if (ano < anoMin || ano > anoMax) return { dataHora: true };

    const diasNoMes = new Date(ano, mes, 0).getDate();
    if (dia > diasNoMes) return { dataHora: true };

    if (hora < 0 || hora > 23) return { dataHora: true };
    if (minuto < 0 || minuto > 59) return { dataHora: true };

    return null;
  };
}

export function horaValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;

    const match = value.match(/^(\d{2}):(\d{2})$/);
    if (!match) return { hora: true };

    const hora = parseInt(match[1], 10);
    const minuto = parseInt(match[2], 10);

    if (hora < 0 || hora > 23) return { hora: true };
    if (minuto < 0 || minuto > 59) return { hora: true };

    return null;
  };
}
