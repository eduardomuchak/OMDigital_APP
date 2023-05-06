export function validateCPF(cpf: string): boolean {
  cpf = cpf.replace(/[^\d]+/g, ''); // Remove any non-digit character
  if (cpf.length !== 11) return false; // CPF must have 11 digits

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }

  let remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.charAt(9))) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }

  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.charAt(10))) return false;

  return true; // CPF is valid
}

export function regexCPF(cpf: string): string {
  cpf = cpf.replace(/[^\d]+/g, ''); // Remove any non-digit character
  return cpf;
}
