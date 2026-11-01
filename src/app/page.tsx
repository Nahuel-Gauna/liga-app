"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { equipos as equiposIniciales, partidos } from "@/lib/data";
import TablaPosiciones from "@/components/TablaPosiciones";
import ListaPartidos from "@/components/ListaPartidos";

export default function Home() {
  const [equipos, setEquipos] = useState(equiposIniciales);
  const [nuevoEquipo, setNuevoEquipo] = useState("");

  const agregarEquipo = () => {
    if (nuevoEquipo.trim() === "") return;
    const nuevo = {
      pos: equipos.length + 1,
      nombre: nuevoEquipo,
      pts: 0,
      pj: 0,
      dif: "0"
    };
    setEquipos([...equipos, nuevo]);
    setNuevoEquipo("");
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
            <div className="border rounded-md p-4 space-y-4">
              <h2 className="font-semibold text-lg text-center mb-4">Agregar Nuevo Equipo</h2>
              <div className="flex gap-2">
                <Input
                  placeholder="Nombre del equipo..."
                  value={nuevoEquipo}
                  onChange={(e) => setNuevoEquipo(e.target.value)}
                />
                <Button onClick={agregarEquipo}>Agregar</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}