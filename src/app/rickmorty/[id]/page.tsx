import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Character, CharacterResponse } from "../../../types/rickmorty";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

async function getCharacter(id: string): Promise<Character> {

  const res = await fetch(
    `https://rickandmortyapi.com/api/character/${id}`,
    {
      next: {
        revalidate: 864000,
      },
    }
  );

  if (!res.ok) notFound();

  return res.json();
}

export async function generateStaticParams() {

  const res = await fetch(
    "https://rickandmortyapi.com/api/character"
  );

  const data: CharacterResponse = await res.json();

  return data.results.map((character) => ({
    id: character.id.toString(),
  }));
}

export default async function CharacterDetail({
  params,
}: Props) {

  const { id } = await params;

  const character = await getCharacter(id);

  return (
    <div className="p-8">

      <div className="max-w-5xl mx-auto bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">

        <div className="grid md:grid-cols-2">

          <div>

            <Image
              src={character.image}
              alt={character.name}
              width={500}
              height={500}
              className="w-full h-full object-cover"
              priority
            />

          </div>

          <div className="p-8 text-white">

            <h1 className="text-5xl font-bold text-green-400 mb-6">
              {character.name}
            </h1>

            <div className="space-y-4 text-lg">

              <p><strong>ID:</strong> {character.id}</p>

              <p><strong>Status:</strong> {character.status}</p>

              <p><strong>Species:</strong> {character.species}</p>

              <p><strong>Type:</strong> {character.type || "Unknown"}</p>

              <p><strong>Gender:</strong> {character.gender}</p>

              <p><strong>Origin:</strong> {character.origin.name}</p>

              <p><strong>Location:</strong> {character.location.name}</p>

              <p><strong>Episodios:</strong> {character.episode.length}</p>

              <p><strong>Created:</strong> {character.created}</p>

              <p><strong>URL:</strong> {character.url}</p>

            </div>

            <Link
              href="/rickmorty"
              className="inline-block mt-8 bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg font-bold"
            >
              Volver
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}