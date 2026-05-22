import Link from "next/link";
import Image from "next/image";
import { Character } from "../../../types/rickmorty";

interface Props {
  character: Character;
}

export default function CharacterCard({ character }: Props) {

  return (
    <Link
      href={`/rickmorty/${character.id}`}
      className="transform hover:scale-105 transition"
    >

      <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-green-500/40">

        <Image
          src={character.image}
          alt={character.name}
          width={300}
          height={300}
          className="w-full h-72 object-cover"
          priority={false}
        />

        <div className="p-5">

          <h2 className="text-2xl font-bold text-white">
            {character.name}
          </h2>

          <p className="text-green-400">
            {character.status}
          </p>

          <p className="text-gray-300">
            {character.species}
          </p>

          <p className="text-gray-400">
            {character.gender}
          </p>

        </div>

      </div>

    </Link>
  );
}