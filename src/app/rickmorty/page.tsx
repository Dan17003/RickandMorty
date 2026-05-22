import { CharacterResponse } from "../../types/rickmorty";
import CharacterCard from "./components/CharacterCard";
import SearchBar from "./components/SearchBar";

async function getCharacters() {

  const res = await fetch(
    "https://rickandmortyapi.com/api/character",
    {
      cache: "force-cache",
      next: {
        revalidate: 864000,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Error cargando personajes");
  }

  const data: CharacterResponse = await res.json();

  return data.results;
}

export default async function RickMortyPage() {

  const characters = await getCharacters();

  return (
    <div className="p-8">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-bold text-green-400 mb-10">
          Rick and Morty Characters
        </h1>

        {/* SSR + SSG */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {characters.map((character) => (
            <CharacterCard
              key={character.id}
              character={character}
            />
          ))}

        </div>

        {/* CSR */}
        <SearchBar />

      </div>

    </div>
  );
}