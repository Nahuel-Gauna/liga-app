import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2, Edit2, Check, X } from "lucide-react";
import { Input } from "@/components/ui/input";

type Equipo = { pos: number; nombre: string; pts: number; pj: number; dif: string };

export default function TablaPosiciones({ 
  equipos, 
  onEliminar, 
  onEditar 
}: { 
  equipos: Equipo[], 
  onEliminar: (nombre: string) => void,
  onEditar: (equipo: Equipo) => void 
}) {
  const [editando, setEditando] = useState<string | null>(null);
  const [tempData, setTempData] = useState<Equipo | null>(null);

  const iniciarEdicion = (eq: Equipo) => {
    setEditando(eq.nombre);
    setTempData({ ...eq });
  };

  const guardarEdicion = () => {
    if (tempData) onEditar(tempData);
    setEditando(null);
    setTempData(null);
  };

  return (
    <div className="border rounded-md overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px] text-center">#</TableHead>
            <TableHead>Equipo</TableHead>
            <TableHead className="text-center font-bold">PTS</TableHead>
            <TableHead className="text-center hidden sm:table-cell">PJ</TableHead>
            <TableHead className="text-center hidden sm:table-cell">DIF</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {equipos.map((eq, index) => {
            const isEditing = editando === eq.nombre;

            return (
              <TableRow key={eq.nombre}>
                <TableCell className="text-center font-medium">{index + 1}</TableCell>
                <TableCell className="font-semibold">{eq.nombre}</TableCell>
                
                {isEditing && tempData ? (
                  <>
                    <TableCell className="p-1">
                      <Input type="number" className="w-16 mx-auto text-center h-8" value={tempData.pts} onChange={(e) => setTempData({...tempData, pts: Number(e.target.value)})} />
                    </TableCell>
                    <TableCell className="p-1 hidden sm:table-cell">
                      <Input type="number" className="w-16 mx-auto text-center h-8" value={tempData.pj} onChange={(e) => setTempData({...tempData, pj: Number(e.target.value)})} />
                    </TableCell>
                    <TableCell className="p-1 hidden sm:table-cell">
                      <Input type="text" className="w-16 mx-auto text-center h-8" value={tempData.dif} onChange={(e) => setTempData({...tempData, dif: e.target.value})} />
                    </TableCell>
                    <TableCell className="text-right space-x-1 min-w-[100px]">
                      <button onClick={guardarEdicion} className="p-2 text-green-600 hover:bg-green-50 rounded transition-colors">
                        <Check className="h-4 w-4" />
                      </button>
                      <button onClick={() => setEditando(null)} className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors">
                        <X className="h-4 w-4" />
                      </button>
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell className="text-center font-bold text-blue-600">{eq.pts}</TableCell>
                    <TableCell className="text-center hidden sm:table-cell">{eq.pj}</TableCell>
                    <TableCell className="text-center hidden sm:table-cell">{eq.dif}</TableCell>
                    <TableCell className="text-right min-w-[100px]">
                      <button onClick={() => iniciarEdicion(eq)} className="p-2 text-slate-400 hover:text-blue-500 transition-colors mr-1">
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button onClick={() => onEliminar(eq.nombre)} className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </TableCell>
                  </>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}