import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="bg-gray-100 dark:bg-gray-800 p-4 flex gap-x-8 items-center justify-center mx-auto">
      <Link href="/" className="font-semibold hover:underline">Inicio</Link>
      <Link href="/watchlist" className="font-semibold hover:underline">Watchlists</Link>
      <Link href="/events" className="font-semibold hover:underline">Eventos</Link>
    </nav>
  );
}
