import Link from "next/link";
import { Trophy } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="container mx-auto flex h-16 max-w-5xl items-center px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-slate-900">
          <Trophy className="h-6 w-6 text-blue-600" />
          <span>LigaManager</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/" className="text-sm font-medium text-slate-900 hover:text-blue-600 transition-colors">
            Torneos
          </Link>
          <Link href="/equipos" className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">
            Equipos
          </Link>
          <Link href="#" className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">
            Contacto
          </Link>
        </nav>
      </div>
    </header>
  );
}