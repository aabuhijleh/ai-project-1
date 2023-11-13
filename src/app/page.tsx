import Link from "next/link";
import { GithubIcon } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <a
          className="fixed left-0 top-0 flex items-center gap-2 w-full justify-center border-b transition-colors border-gray-300 bg-gradient-to-b from-slate-200 pb-6 pt-8 backdrop-blur-2xl dark:border-slate-800 dark:bg-slate-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-slate-800/30 hover:dark:bg-slate-900/30"
          href="https://github.com/aabuhijleh"
          target="_blank"
          rel="noopener noreferrer"
        >
          Made by Abdurrahman Abu-Hijleh <GithubIcon size={14} />
        </a>
      </div>

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <h2 className="text-3xl font-mono font-extrabold">ai project 1</h2>
      </div>

      <div className="mt-12 mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-2 lg:mt-0">
        <Link
          href="/knapsack"
          className="flex flex-col items-center group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-slate-700 hover:dark:bg-slate-800/30"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Knapsack{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Knapsack Problem Solver using Simulated Annealing.
          </p>
        </Link>

        <Link
          href="/checkers"
          className="flex flex-col items-center justify-center group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-slate-700 hover:dark:bg-slate-800/30"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Checkers{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Checkers Game with Alpha-Beta Algorithm.
          </p>
        </Link>
      </div>
    </main>
  );
}
