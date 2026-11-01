"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function PosicionesPage() {
  const [equipos, setEquipos] = useState([]);

  useEffect(() => {
    const guardados = localStorage.getItem("liga-equipos");
    if (guardados) {
      const data = JSON.parse(guardados);
      
      // Ordenar automáticamente: 1° Puntos, 2° Diferencia de gol, 3° Goles a favor
      const tablaOrdenada = data.sort((a: any, b: any) => {
        if (b.pts !== a.pts) return b.pts - a.pts;
        const difA = (a.gf || 0) - (a.gc || 0);
        const difB = (b.gf || 0) - (b.gc || 0);
        if (difB !== difA) return difB - difA;
        return (b.gf || 0) - (a.gf || 0);
      });
      
      setEquipos(tablaOrdenada);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center p-4 md:p-8">
      {/* Botón Volver y Logo */}
      <div className="w-full max-w-4xl flex justify-between items-center mb-6">
        <Link href="/" className="text-primary hover:text-secondary font-bold transition flex items-center gap-2 bg-white px-4 py-2 rounded-md shadow-sm border border-slate-200">
          ← Volver al Menú
        </Link>
        <Image src="/Logo.jpeg" alt="Logo Argen10" width={60} height={60} className="rounded-full shadow-sm object-cover border-2 border-primary" />
      </div>

      <div className="w-full max-w-4xl bg-white p-6 md:p-8 rounded-xl shadow-md border border-slate-200">
        <h1 className="text-3xl font-extrabold text-slate-800 mb-6 text-center uppercase tracking-wide">
          Tabla de Posiciones
        </h1>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-primary text-primary-foreground">
                <th className="p-4 rounded-tl-lg font-semibold w-12 text-center">#</th>
                <th className="p-4 font-semibold">Equipo</th>
                <th className="p-4 font-bold text-center">PTS</th>
                <th className="p-4 font-semibold text-center">PJ</th>
                <th className="p-4 font-semibold text-center">GF</th>
                <th className="p-4 font-semibold text-center">GC</th>
                <th className="p-4 font-semibold text-center rounded-tr-lg">DIF</th>
              </tr>
            </thead>
            <tbody>
              {equipos.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-500 italic text-lg">
                    Todavía no hay equipos registrados.
                  </td>
                </tr>
              ) : (
                equipos.map((eq: any, index: number) => {
                  const dif = (eq.gf || 0) - (eq.gc || 0);
                  return (
                    <tr key={eq.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-bold text-slate-400 text-center">{index + 1}</td>
                      <td className="p-4 font-bold text-slate-800 text-lg">{eq.nombre}</td>
                      <td className="p-4 font-extrabold text-center text-xl text-primary">{eq.pts || 0}</td>
                      <td className="p-4 text-center text-slate-600 font-medium">{eq.pj || 0}</td>
                      <td className="p-4 text-center text-slate-600 font-medium">{eq.gf || 0}</td>
                      <td className="p-4 text-center text-slate-600 font-medium">{eq.gc || 0}</td>
                      <td className={`p-4 text-center font-bold text-lg ${dif > 0 ? 'text-green-600' : dif < 0 ? 'text-red-600' : 'text-slate-500'}`}>
                        {dif > 0 ? `+${dif}` : dif}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}