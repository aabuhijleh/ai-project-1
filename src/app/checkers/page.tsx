"use client";

import { Game } from "./game";

export default function Checkers() {
  return (
    <main className="min-h-screen flex flex-col items-center p-14">
      <div>
        <h1 className="text-4xl font-semibold">Checkers</h1>
        <Game />
      </div>
    </main>
  );
}
