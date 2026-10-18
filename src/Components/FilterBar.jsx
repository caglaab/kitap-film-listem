import { TURLER, DURUMLAR } from "../Interfaces/itemModel"

const ALAN_STILI =
  "w-full border border-slate-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"

function FilterBar({ arama, setArama, turFiltre, setTurFiltre, durumFiltre, setDurumFiltre }) {
  return (
    <div className="grid gap-3 md:grid-cols-3 mb-6">
      <input
        type="search"
        value={arama}
        onChange={(e) => setArama(e.target.value)}
        placeholder="🔍 Başlığa göre ara..."
        className={ALAN_STILI}
      />

      <select value={turFiltre} onChange={(e) => setTurFiltre(e.target.value)} className={ALAN_STILI}>
        <option value="Hepsi">Tüm türler</option>
        {TURLER.map((t) => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>

      <select value={durumFiltre} onChange={(e) => setDurumFiltre(e.target.value)} className={ALAN_STILI}>
        <option value="Hepsi">Tüm durumlar</option>
        {DURUMLAR.map((d) => (
          <option key={d} value={d}>{d}</option>
        ))}
      </select>
    </div>
  )
}

export default FilterBar