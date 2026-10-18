const ANAHTAR = "kitap-film-kayitlari"

// LocalStorage'dan kayıtları okur. Hiç kayıt yoksa null döner.
export function kayitlariOku() {
  try {
    const ham = localStorage.getItem(ANAHTAR)
    return ham ? JSON.parse(ham) : null
  } catch {
    return null
  }
}

// Kayıtları LocalStorage'a yazar.
export function kayitlariYaz(kayitlar) {
  try {
    localStorage.setItem(ANAHTAR, JSON.stringify(kayitlar))
  } catch {
    // Depolama doluysa ya da kapalıysa sessizce geç
  }
}