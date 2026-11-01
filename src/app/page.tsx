"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { equipos as equiposIniciales, partidos as partidosIniciales } from "@/lib/data";
import TablaPosiciones from "@/components/TablaPosiciones";
import ListaPartidos from "@/components/ListaPartidos";

export default function Home() {
  const [equipos, setEquipos] = useState(equiposIniciales);
  const [partidos, setPartidos] = useState(partidosIniciales);
  const [datosCargados, setDatosCargados] = useState(false);

  const [nuevoEquipo, setNuevoEquipo] = useState("");
  const [nuevoPartido, setNuevoPartido] = useState({ local: "", visitante: "", hora: "", cancha: "" });

  useEffect(() => {
    const equiposGuardados = localStorage.getItem("liga-equipos");
    const partidosGuardados = localStorage.getItem("liga-partidos");

    if (equiposGuardados) setEquipos(JSON.parse(equiposGuardados));
    if (partidosGuardados) setPartidos(JSON.parse(partidosGuardados));
    
    setDatosCargados(true);
  }, []);

  useEffect(() => {
    if (datosCargados) localStorage.setItem("liga-equipos", JSON.stringify(equipos));
  }, [equipos, datosCargados]);

  useEffect(() => {
    if (datosCargados) localStorage.setItem("liga-partidos", JSON.stringify(partidos));
  }, [partidos, datosCargados]);

  const agregarEquipo = () => {
    if (nuevoEquipo.trim() === "") return;
    const nuevo = { pos: 0, nombre: nuevoEquipo, pts: 0, pj: 0, dif: "0" };
    setEquipos([...equipos, nuevo]);
    toast.success(`Equipo "${nuevoEquipo}" guardado`);
    setNuevoEquipo("");
  };

  const eliminarEquipo = (nombre: string) => {
    setEquipos(equipos.filter(eq => eq.nombre !== nombre));
    toast.info(`Equipo "${nombre}" eliminado`);
  };

  const editarEquipo = (equipoModificado: { pos: number; nombre: string; pts: number; pj: number; dif: string }) => {
    const equiposActualizados = equipos.map(eq => 
      eq.nombre === equipoModificado.nombre ? equipoModificado : eq
    );
    // Ordenar de mayor a menor según los puntos
    equiposActualizados.sort((a, b) => b.pts - a.pts);
    setEquipos(equiposActualizados);
    toast.success(`Datos de "${equipoModificado.nombre}" actualizados`);
  };

  const agregarPartido = () => {
    if (!nuevoPartido.local || !nuevoPartido.visitante) return;
    setPartidos([...partidos, nuevoPartido]);
    toast.success(`Partido guardado: ${nuevoPartido.local} vs ${nuevoPartido.visitante}`);
    setNuevoPartido({ local: "", visitante: "", hora: "", cancha: "" });
  };

  const eliminarPartido = (index: number) => {
    const nuevosPartidos = [...partidos];
    nuevosPartidos.splice(index, 1);
    setPartidos(nuevosPartidos);
    toast.info("Partido eliminado");
  };

  return (
    <main className="flex flex-col items-center p-8">
      <div className="w-full max-w-3xl bg-white p-6 rounded-xl shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900 mb-6 text-center">Torneo Apertura</h1>

        <Tabs defaultValue="posiciones" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="posiciones">Posiciones</TabsTrigger>
            <TabsTrigger value="fixture">Fixture</TabsTrigger>
            <TabsTrigger value="admin">Administrar</TabsTrigger>
          </TabsList>

          <TabsContent value="posiciones">
            <TablaPosiciones equipos={equipos} onEliminar={eliminarEquipo} onEditar={editarEquipo} />
          </TabsContent>

          <TabsContent value="fixture">
            <ListaPartidos partidos={partidos} onEliminar={eliminarPartido} />
          </TabsContent>

          <TabsContent value="admin">
            <div className="space-y-6">
              <div className="border rounded-md p-4 space-y-4 bg-slate-50">
                <h2 className="font-semibold text-lg text-center">Agregar Nuevo Equipo</h2>
                <div className="flex gap-2">
                  <Input placeholder="Nombre del equipo..." value={nuevoEquipo} onChange={(e) => setNuevoEquipo(e.target.value)} />
                  <Button onClick={agregarEquipo}>Agregar</Button>
                </div>
              </div>

              <div className="border rounded-md p-4 space-y-4 bg-slate-50">
                <h2 className="font-semibold text-lg text-center">Programar Partido</h2>
                <div className="grid grid-cols-2 gap-3">
                  <Input placeholder="Equipo Local" value={nuevoPartido.local} onChange={(e) => setNuevoPartido({ ...nuevoPartido, local: e.target.value })} />
                  <Input placeholder="Equipo Visitante" value={nuevoPartido.visitante} onChange={(e) => setNuevoPartido({ ...nuevoPartido, visitante: e.target.value })} />
                  <Input placeholder="Hora (ej: 21:00)" value={nuevoPartido.hora} onChange={(e) => setNuevoPartido({ ...nuevoPartido, hora: e.target.value })} />
                  <Input placeholder="Cancha (ej: Cancha 1)" value={nuevoPartido.cancha} onChange={(e) => setNuevoPartido({ ...nuevoPartido, cancha: e.target.value })} />
                </div>
                <Button className="w-full mt-2" onClick={agregarPartido}>Agregar al Fixture</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}