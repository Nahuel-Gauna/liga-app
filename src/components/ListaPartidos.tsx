import { Trash2 } from "lucide-react";

type Partido = { local: string; visitante: string; hora: string; cancha: string };

export default function ListaPartidos({ partidos, onEliminar }: { partidos: Partido[], onEliminar: (index: number) => void }) {
  return (
    <div className="border rounded-md p-4 space-y-4">
      <h2 className="font-semibold text-lg text-center mb-4">Próxima Fecha</h2>
      {partidos.length === 0 && <p className="text-center text-slate-500">No hay partidos programados.</p>}
      {partidos.map((partido, index) => (
        <div key={index} className="flex justify-between items-center bg-slate-50 p-3 rounded border">
          <span className="font-medium w-1/3 text-right">{partido.local}</span>
          <div className="flex flex-col items-center w-1/3 px-2">
            <span className="text-sm font-bold bg-slate-200 px-2 py-1 rounded">{partido.hora}</span>
            <span className="text-xs text-slate-500 mt-1 text-center">{partido.cancha}</span>
          </div>
          <div className="flex items-center justify-between w-1/3">
            <span className="font-medium text-left">{partido.visitante}</span>
            <button onClick={() => onEliminar(index)} className="p-2 text-slate-400 hover:text-red-500 transition-colors">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}