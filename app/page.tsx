import Image from "next/image";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white dark:bg-zinc-950 font-sans selection:bg-zinc-900 selection:text-white">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gradient-to-br from-zinc-200 to-transparent rounded-full blur-3xl dark:from-zinc-800" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gradient-to-tl from-zinc-200 to-transparent rounded-full blur-3xl dark:from-zinc-800" />
      </div>

      <main className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto">
        <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto group">
            <div className="absolute inset-0 bg-zinc-900 rounded-full blur-2xl opacity-10 group-hover:opacity-20 transition-opacity duration-500" />
            <Image
              src="/logo.png"
              alt="Krishnanuja Logo"
              width={160}
              height={160}
              className="relative drop-shadow-2xl transition-transform duration-700 hover:scale-105"
              priority
            />
          </div>
        </div>

        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-50">
            Krishnanuja
          </h1>
          <p className="text-xl md:text-2xl text-zinc-500 dark:text-zinc-400 font-light max-w-2xl mx-auto leading-relaxed">
            Elevating your digital presence with timeless elegance and precision.
          </p>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
          <button className="px-8 py-4 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 rounded-full font-medium transition-all hover:scale-105 hover:shadow-xl active:scale-95">
            Explore Collection
          </button>
          <button className="px-8 py-4 bg-transparent border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-50 rounded-full font-medium transition-all hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:scale-105 active:scale-95">
            Our Story
          </button>
        </div>
      </main>

      <footer className="absolute bottom-8 text-zinc-400 dark:text-zinc-600 text-sm font-medium tracking-widest uppercase">
        © 2026 Krishnanuja
      </footer>
    </div>
  );
}

