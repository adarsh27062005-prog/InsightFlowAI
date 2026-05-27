function GlobalLoader() {

  return (

    <div className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex items-center justify-center">

      <div className="bg-[#111827] border border-cyan-500/20 p-10 rounded-3xl flex flex-col items-center">

        <div className="flex gap-3 mb-5">

          <div className="w-3 h-3 rounded-full bg-cyan-400 animate-bounce" />

          <div className="w-3 h-3 rounded-full bg-cyan-400 animate-bounce delay-100" />

          <div className="w-3 h-3 rounded-full bg-cyan-400 animate-bounce delay-200" />

        </div>

        <h2 className="text-white text-xl font-bold">

          InsightFlow AI Processing

        </h2>

        <p className="text-gray-400 mt-2 text-sm">

          Enterprise analytics engine running...

        </p>

      </div>

    </div>

  );

}

export default GlobalLoader;