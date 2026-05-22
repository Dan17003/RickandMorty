import Link from "next/link";

export default function NotFound() {

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white">

      <h1 className="text-7xl font-bold text-red-500">
        404
      </h1>

      <p className="text-2xl mt-4">
        Personaje no encontrado
      </p>

      <Link
        href="/rickmorty"
        className="mt-6 bg-green-500 px-6 py-3 rounded-lg"
      >
        Volver
      </Link>

    </div>
  );
}