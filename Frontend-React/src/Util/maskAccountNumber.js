export function maskAccountNumber(accountNumber) {
    if (accountNumber.length > 4) {
      const lastFourDigits = accountNumber.slice(-4);
      const maskedDigits = "*".repeat(accountNumber.length - 4);
      return maskedDigits + lastFourDigits;
    } else {
      return accountNumber;
    }
  }