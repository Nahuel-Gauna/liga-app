"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function AdminPanel() {
  const [equipos, setEquipos] = useState([]);
  const [nuevoEquipo, setNuevoEquipo] = useState("");

  // Cargar equipos guardados al abrir la página
  useEffect(() => {
    const guardados = localStorage.getItem("liga-equipos");
    if (guardados) {
      setEquipos(JSON.parse(guardados));
    }
  }, []);

  // Función para guardar en localStorage y actualizar la pantalla
  const guardarEquipos = (nuevosEquipos: any) => {
    setEquipos(nuevosEquipos);
    localStorage.setItem("liga-equipos", JSON.stringify(nuevosEquipos));
  };

  // Función para agregar un equipo nuevo con todas las estadísticas en 0
  const agregarEquipo = () => {
    if (!nuevoEquipo.trim()) return;
    
    const nuevo = {
      id: Date.now().toString(), // ID único
      nombre: nuevoEquipo,
      pj: 0,  // Partidos Jugados
      pts: 0, // Puntos
      gf: 0,  // Goles a Favor
      gc: 0   // Goles en Contra
    };
    
    guardarEquipos([...equipos, nuevo]);
    setNuevoEquipo(""); // Limpiar el input
  };

  const eliminarEquipo = (id: string) => {
    guardarEquipos(equipos.filter((eq: any) => eq.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md overflow-hidden border border-slate-200">
        
        {/* Cabecera del Administrador */}
        <div className="bg-slate-900 text-white p-6 flex flex-col sm:flex-row justify-between items-center gap-4 border-b-4 border-primary">
          <div className="flex items-center gap-4">
            <div className="bg-white p-1 rounded-full">
              <Image src="/Logo.jpeg" alt="Logo Argen10" width={50} height={50} className="rounded-full object-cover" />
            </div>
            <h1 className="text-2xl font-bold uppercase tracking-wide">Panel de Control</h1>
          </div>
          <Link href="/" className="bg-primary text-primary-foreground font-semibold px-4 py-2 rounded-md hover:opacity-90 transition">
            Ver Vista Pública
          </Link>
        </div>

        {/* Sección: Gestión de Equipos */}
        <div className="p-6 md:p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Gestión de Equipos</h2>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <input 
              type="text" 
              value={nuevoEquipo}
              onChange={(e) => setNuevoEquipo(e.target.value)}
              placeholder="Escribí el nombre del equipo..." 
              className="flex-1 border border-slate-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              onKeyDown={(e) => e.key === 'Enter' && agregarEquipo()}
            />
            <button 
              onClick={agregarEquipo}
              className="bg-primary text-white px-8 py-3 rounded-md font-bold uppercase hover:bg-secondary transition-colors"
            >
              Agregar
            </button>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
            {equipos.length === 0 ? (
              <p className="p-6 text-slate-500 text-center italic">No hay equipos cargados todavía. Agregá el primero arriba.</p>
            ) : (
              <ul className="divide-y divide-slate-200">
                {equipos.map((eq: any) => (
                  <li key={eq.id} className="p-4 flex justify-between items-center hover:bg-slate-100 transition-colors">
                    <span className="font-semibold text-lg text-slate-700">{eq.nombre}</span>
                    <button 
                      onClick={() => eliminarEquipo(eq.id)}
                      className="bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200 font-semibold text-sm transition"
                    >
                      Eliminar
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        
      </div>
    </div>
  );
}