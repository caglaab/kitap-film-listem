import ItemCard from "./ItemCard"

function ItemList({ kayitlar, onSil, onDuzenle }) {
  if (kayitlar.length === 0) {
    return (
      <div className="text-center border-2 border-dashed border-slate-300 rounded-xl py-16">
        <p className="text-4xl mb-2">📭</p>
        <p className="text-slate-500 font-medium">Henüz kayıt yok.</p>
        <p className="text-slate-400 text-sm">Yukarıdaki formdan ilk kitabını ya da filmini ekle.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {kayitlar.map((kayit) => (
        <ItemCard key={kayit.id} kayit={kayit} onSil={onSil} onDuzenle={onDuzenle} />
      ))}
    </div>
  )
}

export default ItemList