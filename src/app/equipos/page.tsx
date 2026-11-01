"use client";

import { useState, useEffect } from "react";
import { equipos as equiposIniciales } from "@/lib/data";

export default function EquiposPage() {
  const [listaEquipos, setListaEquipos] = useState(equiposIniciales);

  useEffect(() => {
    const guardados = localStorage.getItem("liga-equipos");
    if (guardados) setListaEquipos(JSON.parse(guardados));
  }, []);

  return (
    <main className="flex flex-col items-center p-8">
      <div className="w-full max-w-3xl bg-white p-6 rounded-xl shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900 mb-6 text-center">Directorio de Equipos</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {listaEquipos.map((eq, index) => (
            <div key={index} className="border p-4 rounded-md flex items-center gap-4 bg-slate-50 hover:border-blue-200 transition-colors">
              <div className="h-10 w-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-lg">
                {eq.nombre.charAt(0).toUpperCase()}
              </div>
              <span className="font-semibold text-lg">{eq.nombre}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}