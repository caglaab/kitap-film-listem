import { useState } from "react"
import { TURLER, DURUMLAR, bosKayit } from "../Interfaces/itemModel"

const ALAN_STILI =
  "w-full border border-slate-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"

function ItemForm({ onEkle, onGuncelle, duzenlenen, onIptal }) {
  const [form, setForm] = useState(duzenlenen ? duzenlenen : bosKayit)
  const [hata, setHata] = useState("")

  function degistir(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function gonder(e) {
    e.preventDefault()

    if (form.baslik.trim() === "") {
      setHata("Başlık boş olamaz.")
      return
    }

    setHata("")

    if (duzenlenen) {
      onGuncelle(form)
    } else {
      onEkle(form)
      setForm(bosKayit)
    }
  }

  return (
    <form
      onSubmit={gonder}
      className={`rounded-xl shadow-sm p-5 border mb-8 grid gap-4 md:grid-cols-2 ${
        duzenlenen ? "bg-indigo-50 border-indigo-300" : "bg-white border-slate-200"
      }`}
    >
      <h2 className="md:col-span-2 text-lg font-semibold text-indigo-700">
        {duzenlenen ? "✏️ Kaydı Düzenle" : "➕ Yeni Kayıt Ekle"}
      </h2>

      <div className="md:col-span-2">
        <label className="block text-sm font-medium mb-1">Başlık</label>
        <input
          name="baslik"
          value={form.baslik}
          onChange={degistir}
          placeholder="Kitap veya film adı"
          className={ALAN_STILI}
        />
        {hata && <p className="text-red-500 text-sm mt-1">{hata}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Tür</label>
        <select name="tur" value={form.tur} onChange={degistir} className={ALAN_STILI}>
          {TURLER.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Durum</label>
        <select name="durum" value={form.durum} onChange={degistir} className={ALAN_STILI}>
          {DURUMLAR.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Puan</label>
        <select name="puan" value={form.puan} onChange={degistir} className={ALAN_STILI}>
          <option value={0}>Puan yok</option>
          {[1, 2, 3, 4, 5].map((p) => (
            <option key={p} value={p}>{p} yıldız</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Not</label>
        <input
          name="not"
          value={form.not}
          onChange={degistir}
          placeholder="Kısa not (isteğe bağlı)"
          className={ALAN_STILI}
        />
      </div>

      <div className="md:col-span-2 flex gap-2">
        <button
          type="submit"
          className="flex-1 bg-indigo-600 text-white font-medium rounded-lg px-4 py-2 hover:bg-indigo-700 transition-colors"
        >
          {duzenlenen ? "Güncelle" : "Ekle"}
        </button>
        {duzenlenen && (
          <button
            type="button"
            onClick={onIptal}
            className="bg-white border border-slate-300 text-slate-700 rounded-lg px-4 py-2 hover:bg-slate-100 transition-colors"
          >
            Vazgeç
          </button>
        )}
      </div>
    </form>
  )
}

export default ItemForm