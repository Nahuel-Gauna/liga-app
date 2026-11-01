"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { equipos as equiposIniciales, partidos as partidosIniciales } from "@/lib/data";
import TablaPosiciones from "@/components/TablaPosiciones";
import ListaPartidos from "@/components/ListaPartidos";
import { toast } from "sonner";

export default function Home() {
  // Estados para Equipos
  const [equipos, setEquipos] = useState(equiposIniciales);
  const [nuevoEquipo, setNuevoEquipo] = useState("");

  // Estados para Partidos
  const [partidos, setPartidos] = useState(partidosIniciales);
  const [nuevoPartido, setNuevoPartido] = useState({
    local: "",
    visitante: "",
    hora: "",
    cancha: ""
  });

  const agregarEquipo = () => {
    if (nuevoEquipo.trim() === "") return;
    const nuevo = { pos: equipos.length + 1, nombre: nuevoEquipo, pts: 0, pj: 0, dif: "0" };
    setEquipos([...equipos, nuevo]);
    toast.success(`Equipo "${nuevoEquipo}" agregado a la liga`);
    setNuevoEquipo("");
  };

  const agregarPartido = () => {
    if (!nuevoPartido.local || !nuevoPartido.visitante) return;
    setPartidos([...partidos, nuevoPartido]);
    toast.success(`Partido programado: ${nuevoPartido.local} vs ${nuevoPartido.visitante}`);
    setNuevoPartido({ local: "", visitante: "", hora: "", cancha: "" });
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
            <TablaPosiciones equipos={equipos} />
          </TabsContent>

          <TabsContent value="fixture">
            <ListaPartidos partidos={partidos} />
          </TabsContent>

          <TabsContent value="admin">
            <div className="space-y-6">
              {/* Formulario de Equipos */}
              <div className="border rounded-md p-4 space-y-4 bg-slate-50">
                <h2 className="font-semibold text-lg text-center">Agregar Nuevo Equipo</h2>
                <div className="flex gap-2">
                  <Input
                    placeholder="Nombre del equipo..."
                    value={nuevoEquipo}
                    onChange={(e) => setNuevoEquipo(e.target.value)}
                  />
                  <Button onClick={agregarEquipo}>Agregar</Button>
                </div>
              </div>

              {/* Formulario de Partidos */}
              <div className="border rounded-md p-4 space-y-4 bg-slate-50">
                <h2 className="font-semibold text-lg text-center">Programar Partido</h2>
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    placeholder="Equipo Local"
                    value={nuevoPartido.local}
                    onChange={(e) => setNuevoPartido({ ...nuevoPartido, local: e.target.value })}
                  />
                  <Input
                    placeholder="Equipo Visitante"
                    value={nuevoPartido.visitante}
                    onChange={(e) => setNuevoPartido({ ...nuevoPartido, visitante: e.target.value })}
                  />
                  <Input
                    placeholder="Hora (ej: 21:00)"
                    value={nuevoPartido.hora}
                    onChange={(e) => setNuevoPartido({ ...nuevoPartido, hora: e.target.value })}
                  />
                  <Input
                    placeholder="Cancha (ej: Cancha 1)"
                    value={nuevoPartido.cancha}
                    onChange={(e) => setNuevoPartido({ ...nuevoPartido, cancha: e.target.value })}
                  />
                </div>
                <Button className="w-full mt-2" onClick={agregarPartido}>
                  Agregar al Fixture
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}