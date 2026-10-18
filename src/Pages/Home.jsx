import { useState, useEffect } from "react"
import ItemForm from "../Components/ItemForm"
import ItemList from "../Components/ItemList"
import FilterBar from "../Components/FilterBar"
import { yeniKayitOlustur } from "../Interfaces/itemModel"
import { kayitlariOku, kayitlariYaz } from "../utils/storage"

const ornekVeri = [
  { id: 1, baslik: "Suç ve Ceza", tur: "Kitap", durum: "Bitti", puan: 5, not: "Çok etkileyiciydi." },
  { id: 2, baslik: "Inception", tur: "Film", durum: "Bekliyor", puan: 0, not: "" },
  { id: 3, baslik: "Sefiller", tur: "Kitap", durum: "Devam Ediyor", puan: 4, not: "Yarısına geldim." },
]

function Home() {
  const [kayitlar, setKayitlar] = useState(() => kayitlariOku() ?? ornekVeri)
  const [duzenlenen, setDuzenlenen] = useState(null)

  const [arama, setArama] = useState("")
  const [turFiltre, setTurFiltre] = useState("Hepsi")
  const [durumFiltre, setDurumFiltre] = useState("Hepsi")

  useEffect(() => {
    kayitlariYaz(kayitlar)
  }, [kayitlar])

  function kayitEkle(veri) {
    const yeni = yeniKayitOlustur(veri)
    setKayitlar([yeni, ...kayitlar])
  }

  function kayitSil(id) {
    const eminMi = window.confirm("Bu kaydı silmek istediğine emin misin?")
    if (!eminMi) return
    setKayitlar(kayitlar.filter((k) => k.id !== id))
    if (duzenlenen && duzenlenen.id === id) {
      setDuzenlenen(null)
    }
  }

  function duzenlemeyiBaslat(kayit) {
    setDuzenlenen(kayit)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  function kayitGuncelle(veri) {
    setKayitlar(
      kayitlar.map((k) =>
        k.id === veri.id
          ? {
              ...k,
              baslik: veri.baslik.trim(),
              tur: veri.tur,
              durum: veri.durum,
              puan: Number(veri.puan),
              not: veri.not.trim(),
            }
          : k
      )
    )
    setDuzenlenen(null)
  }

  function filtreleriTemizle() {
    setArama("")
    setTurFiltre("Hepsi")
    setDurumFiltre("Hepsi")
  }

  // Filtrelenmiş liste
  const aranan = arama.trim().toLocaleLowerCase("tr-TR")
  const filtrelenmis = kayitlar.filter((k) => {
    const aramaUyar = k.baslik.toLocaleLowerCase("tr-TR").includes(aranan)
    const turUyar = turFiltre === "Hepsi" || k.tur === turFiltre
    const durumUyar = durumFiltre === "Hepsi" || k.durum === durumFiltre
    return aramaUyar && turUyar && durumUyar
  })

  // Sayaç değerleri
  const istatistikler = [
    { etiket: "Toplam", deger: kayitlar.length, renk: "text-indigo-600" },
    { etiket: "Kitap", deger: kayitlar.filter((k) => k.tur === "Kitap").length, renk: "text-blue-600" },
    { etiket: "Film", deger: kayitlar.filter((k) => k.tur === "Film").length, renk: "text-purple-600" },
    { etiket: "Biten", deger: kayitlar.filter((k) => k.durum === "Bitti").length, renk: "text-green-600" },
  ]

  return (
    <main className="max-w-5xl mx-auto p-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {istatistikler.map((i) => (
          <div key={i.etiket} className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 text-center">
            <p className={`text-2xl font-bold ${i.renk}`}>{i.deger}</p>
            <p className="text-sm text-slate-500">{i.etiket}</p>
          </div>
        ))}
      </div>

      <ItemForm
        key={duzenlenen ? duzenlenen.id : "yeni"}
        onEkle={kayitEkle}
        onGuncelle={kayitGuncelle}
        duzenlenen={duzenlenen}
        onIptal={() => setDuzenlenen(null)}
      />

      <FilterBar
        arama={arama}
        setArama={setArama}
        turFiltre={turFiltre}
        setTurFiltre={setTurFiltre}
        durumFiltre={durumFiltre}
        setDurumFiltre={setDurumFiltre}
      />

      {kayitlar.length > 0 && filtrelenmis.length === 0 ? (
        <div className="text-center border-2 border-dashed border-slate-300 rounded-xl py-12">
          <p className="text-4xl mb-2">🔎</p>
          <p className="text-slate-500 font-medium">Aramana uyan kayıt bulunamadı.</p>
          <button
            onClick={filtreleriTemizle}
            className="mt-3 text-sm bg-indigo-50 text-indigo-600 rounded-lg px-3 py-1.5 hover:bg-indigo-100 transition-colors"
          >
            Filtreleri temizle
          </button>
        </div>
      ) : (
        <ItemList kayitlar={filtrelenmis} onSil={kayitSil} onDuzenle={duzenlemeyiBaslat} />
      )}
    </main>
  )
}

export default Home