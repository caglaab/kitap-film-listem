const DURUM_RENKLERI = {
  "Bekliyor": "bg-slate-100 text-slate-600",
  "Devam Ediyor": "bg-yellow-100 text-yellow-700",
  "Bitti": "bg-green-100 text-green-700",
}

const TUR_RENKLERI = {
  Kitap: "bg-blue-100 text-blue-700",
  Film: "bg-purple-100 text-purple-700",
}

const TUR_SIMGELERI = {
  Kitap: "📖",
  Film: "🎬",
}

function ItemCard({ kayit, onSil, onDuzenle }) {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-5 border border-slate-200 flex flex-col">
      <div className="flex justify-between items-start gap-2">
        <h3 className="text-lg font-semibold leading-snug">{kayit.baslik}</h3>
        <span className={`text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap ${TUR_RENKLERI[kayit.tur]}`}>
          {TUR_SIMGELERI[kayit.tur]} {kayit.tur}
        </span>
      </div>

      <div className="mt-3">
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${DURUM_RENKLERI[kayit.durum]}`}>
          {kayit.durum}
        </span>
      </div>

      <p className="mt-3 text-lg tracking-wide">
        {kayit.puan > 0 ? (
          <>
            <span className="text-yellow-400">{"★".repeat(kayit.puan)}</span>
            <span className="text-slate-300">{"★".repeat(5 - kayit.puan)}</span>
          </>
        ) : (
          <span className="text-sm text-slate-400">Henüz puan verilmedi</span>
        )}
      </p>

      {kayit.not && <p className="text-sm text-slate-500 mt-2 flex-1">{kayit.not}</p>}

      <div className="mt-4 pt-3 border-t border-slate-100 flex gap-2">
        <button
          onClick={() => onDuzenle(kayit)}
          className="text-sm bg-indigo-50 text-indigo-600 rounded-lg px-3 py-1.5 hover:bg-indigo-100 transition-colors"
        >
          ✏️ Düzenle
        </button>
        <button
          onClick={() => onSil(kayit.id)}
          className="text-sm bg-red-50 text-red-600 rounded-lg px-3 py-1.5 hover:bg-red-100 transition-colors"
        >
          🗑️ Sil
        </button>
      </div>
    </div>
  )
}

export default ItemCard