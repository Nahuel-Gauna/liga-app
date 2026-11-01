type Partido = { local: string; visitante: string; hora: string; cancha: string };

export default function ListaPartidos({ partidos }: { partidos: Partido[] }) {
  return (
    <div className="border rounded-md p-4 space-y-4">
      <h2 className="font-semibold text-lg text-center mb-4">Próxima Fecha</h2>
      {partidos.map((partido, index) => (
        <div key={index} className="flex justify-between items-center bg-slate-50 p-3 rounded border">
          <span className="font-medium w-1/3 text-right">{partido.local}</span>
          <div className="flex flex-col items-center w-1/3">
            <span className="text-sm font-bold bg-slate-200 px-2 py-1 rounded">{partido.hora}</span>
            <span className="text-xs text-slate-500 mt-1">{partido.cancha}</span>
          </div>
          <span className="font-medium w-1/3 text-left">{partido.visitante}</span>
        </div>
      ))}
    </div>
  );
}