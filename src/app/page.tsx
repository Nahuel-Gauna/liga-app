import Link from "next/link";
import Image from "next/image";

export default function InicioPublico() {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center">
      {/* Cabecera / Banner */}
      <header className="w-full bg-secondary text-secondary-foreground py-12 px-4 flex flex-col items-center justify-center border-b-4 border-primary shadow-md">
        <div className="bg-white p-2 rounded-full shadow-lg mb-4">
          {/* Logo dinámico desde la carpeta public */}
          <Image 
            src="/logo.png" 
            alt="Logo Torneos Argen10" 
            width={120} 
            height={120} 
            className="rounded-full object-cover"
          />
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-center uppercase">
          Torneos Argen10
        </h1>
        <p className="mt-4 max-w-2xl text-center text-lg opacity-90">
          Fútbol 11 • Domingos • Mar del Plata. <br/>
          Premios, competencia y amigos. Sumate a la mejor liga amateur de la ciudad.
        </p>
      </header>

      {/* Menú de Navegación Principal */}
      <section className="w-full max-w-4xl p-6 mt-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">Información del Torneo</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tabla de Posiciones */}
          <Link href="/posiciones" className="group block p-6 bg-white rounded-xl shadow-sm border border-slate-200 hover:border-primary hover:shadow-md transition-all">
            <h3 className="text-xl font-bold text-primary group-hover:text-secondary mb-2">🏆 Tabla de Posiciones</h3>
            <p className="text-slate-600">Consultá los puntos, goles a favor, en contra y diferencia de gol de todos los equipos.</p>
          </Link>

          {/* Fixture / Fechas */}
          <Link href="/fixture" className="group block p-6 bg-white rounded-xl shadow-sm border border-slate-200 hover:border-primary hover:shadow-md transition-all">
            <h3 className="text-xl font-bold text-primary group-hover:text-secondary mb-2">📅 Fechas y Partidos</h3>
            <p className="text-slate-600">Mirá el fixture completo, próximos encuentros y resultados de la jornada.</p>
          </Link>

          {/* Goleadores */}
          <Link href="/goleadores" className="group block p-6 bg-white rounded-xl shadow-sm border border-slate-200 hover:border-primary hover:shadow-md transition-all">
            <h3 className="text-xl font-bold text-primary group-hover:text-secondary mb-2">⚽ Tabla de Goleadores</h3>
            <p className="text-slate-600">Descubrí quién es el máximo artillero del torneo y los destacados de la fecha.</p>
          </Link>

          {/* Valla Invicta */}
          <Link href="/arqueros" className="group block p-6 bg-white rounded-xl shadow-sm border border-slate-200 hover:border-primary hover:shadow-md transition-all">
            <h3 className="text-xl font-bold text-primary group-hover:text-secondary mb-2">🧤 Mejor Arquero</h3>
            <p className="text-slate-600">Estadísticas de la valla menos vencida y los arqueros más sólidos de la liga.</p>
          </Link>
        </div>
      </section>
      
      {/* Acceso Administradores (Oculto o discreto) */}
      <div className="mt-auto py-8">
        <Link href="/admin" className="text-sm text-slate-400 hover:text-primary transition-colors">
          Acceso Administradores
        </Link>
      </div>
    </main>
  );
}