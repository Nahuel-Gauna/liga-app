import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const equipos = [
  { pos: 1, nombre: "Los Pibes FC", pts: 15, pj: 5, dif: "+10" },
  { pos: 2, nombre: "Deportivo Norte", pts: 12, pj: 5, dif: "+5" },
  { pos: 3, nombre: "Real Bañil", pts: 10, pj: 5, dif: "+2" },
  { pos: 4, nombre: "Atlético Sur", pts: 7, pj: 5, dif: "-1" },
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-slate-100">
      <div className="w-full max-w-3xl bg-white p-6 rounded-xl shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900 mb-6 text-center">Torneo Apertura</h1>
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
      </div>
    </main>
  );
}