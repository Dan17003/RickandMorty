"use client";

import { useEffect, useState } from "react";
import CharacterCard from "./CharacterCard";

export default function SearchBar() {

  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [gender, setGender] = useState("");
  const [type, setType] = useState("");

  const [characters, setCharacters] = useState([]);

  useEffect(() => {

    async function searchCharacters() {

      const params = new URLSearchParams();

      if (name) params.append("name", name);
      if (status) params.append("status", status);
      if (gender) params.append("gender", gender);
      if (type) params.append("type", type);

      const res = await fetch(
        `https://rickandmortyapi.com/api/character/?${params.toString()}`
      );

      if (!res.ok) {
        setCharacters([]);
        return;
      }

      const data = await res.json();

      setCharacters(data.results || []);
    }

    searchCharacters();

  }, [name, status, gender, type]);

  return (
    <div className="mt-12">

      <h2 className="text-4xl text-white font-bold mb-6">
        Búsqueda en Tiempo Real (CSR)
      </h2>

      <div className="grid md:grid-cols-4 gap-4 mb-8">

        <input
          type="text"
          placeholder="Buscar por nombre"
          className="p-3 rounded-lg bg-gray-800 text-white"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <select
          className="p-3 rounded-lg bg-gray-800 text-white"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">Estado</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>

        <select
          className="p-3 rounded-lg bg-gray-800 text-white"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="">Género</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="genderless">Genderless</option>
          <option value="unknown">Unknown</option>
        </select>

        <input
          type="text"
          placeholder="Buscar por tipo"
          className="p-3 rounded-lg bg-gray-800 text-white"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />

      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {characters.map((character: any) => (
          <CharacterCard
            key={character.id}
            character={character}
          />
        ))}

      </div>

    </div>
  );
}