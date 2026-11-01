import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { equipos, partidos } from "@/lib/data";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-slate-100">
      <div className="w-full max-w-3xl bg-white p-6 rounded-xl shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900 mb-6 text-center">Torneo Apertura</h1>

        <Tabs defaultValue="posiciones" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="posiciones">Posiciones</TabsTrigger>
            <TabsTrigger value="fixture">Fixture</TabsTrigger>
          </TabsList>

          <TabsContent value="posiciones">
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px] text-center">#</TableHead>
                    <TableHead>Equipo</TableHead>
                    <TableHead className="text-center font-bold">PTS</TableHead>
                    <TableHead className="text-center hidden sm:table-cell">PJ</TableHead>
                    <TableHead className="text-center hidden sm:table-cell">DIF</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {equipos.map((eq) => (
                    <TableRow key={eq.nombre}>
                      <TableCell className="text-center font-medium">{eq.pos}</TableCell>
                      <TableCell className="font-semibold">{eq.nombre}</TableCell>
                      <TableCell className="text-center font-bold text-blue-600">{eq.pts}</TableCell>
                      <TableCell className="text-center hidden sm:table-cell">{eq.pj}</TableCell>
                      <TableCell className="text-center hidden sm:table-cell">{eq.dif}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="fixture">
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
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}