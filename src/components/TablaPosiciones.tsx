import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type Equipo = { pos: number; nombre: string; pts: number; pj: number; dif: string };

export default function TablaPosiciones({ equipos }: { equipos: Equipo[] }) {
  return (
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
  );
}