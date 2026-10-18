// Bir kaydın (kitap veya film) alanları:
// {
//   id: number,        -> benzersiz numara
//   baslik: string,    -> kitap/film adı
//   tur: string,       -> "Kitap" veya "Film"
//   durum: string,     -> okuma/izleme durumu
//   puan: number,      -> 1 ile 5 arası (0 = puan verilmedi)
//   not: string        -> kısa not
// }

export const TURLER = ["Kitap", "Film"]

export const DURUMLAR = ["Bekliyor", "Devam Ediyor", "Bitti"]

export const bosKayit = {
  baslik: "",
  tur: "Kitap",
  durum: "Bekliyor",
  puan: 0,
  not: "",
}

export function yeniKayitOlustur(veri) {
  return {
    id: Date.now(),
    baslik: veri.baslik.trim(),
    tur: veri.tur,
    durum: veri.durum,
    puan: Number(veri.puan),
    not: veri.not.trim(),
  }
}