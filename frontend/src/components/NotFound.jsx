import {
  AlertTriangle,
  ArrowLeft,
} from "lucide-react";

import {
  Link,
} from "react-router-dom";

function NotFound() {

  return (

    <div className="min-h-[70vh] flex items-center justify-center">

      <div className="bg-[#111827] border border-gray-800 rounded-3xl p-12 max-w-2xl w-full text-center">

        {/* ICON */}
        <div className="flex justify-center mb-8">

          <div className="w-24 h-24 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">

            <AlertTriangle
              size={48}
              className="text-red-400"
            />

          </div>

        </div>

        {/* TITLE */}
        <h1 className="text-6xl font-black text-white mb-4">

          404

        </h1>

        <h2 className="text-3xl font-bold mb-4">

          Page Not Found

        </h2>

        {/* DESCRIPTION */}
        <p className="text-gray-400 leading-8 mb-10">

          The requested enterprise analytics module could not be located.
          Return to the main healthcare intelligence dashboard.

        </p>

        {/* BUTTON */}
        <Link
          to="/"
          className="inline-flex items-center gap-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-8 py-4 rounded-2xl transition-all duration-300"
        >

          <ArrowLeft size={20} />

          Return to Dashboard

        </Link>

      </div>

    </div>

  );

}

export default NotFound;