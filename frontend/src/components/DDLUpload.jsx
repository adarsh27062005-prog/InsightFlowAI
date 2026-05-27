import { useRef } from "react";

function DDLUpload({
  setSchema,
}) {

  const fileRef = useRef(null);

  // =========================
  // PARSE DDL
  // =========================
  const parseDDL = (text) => {

    const regex =
      /(\w+)\s+(VARCHAR|CHAR|TEXT|DATE|TIMESTAMP|INTEGER|INT|BIGINT|DOUBLE|FLOAT|DECIMAL)/gi;

    const columns = [];

    let match;

    while (
      (match = regex.exec(text)) !== null
    ) {

      columns.push({

        name: match[1],

        type: match[2],

      });
    }

    return columns;
  };

  // =========================
  // HANDLE FILE
  // =========================
  const handleUpload = async (e) => {

    const file =
      e.target.files[0];

    if (!file) return;

    const text =
      await file.text();

    const parsed =
      parseDDL(text);

    setSchema(parsed);
  };

  return (

    <div className="bg-[#111827] p-8 rounded-2xl border border-gray-800">

      <div className="mb-6">

        <h2 className="text-2xl font-bold">

          DDL Upload Engine

        </h2>

        <p className="text-gray-400 text-sm mt-1">

          Upload SQL DDL schema to generate synthetic healthcare datasets

        </p>

      </div>

      <button
        onClick={() =>
          fileRef.current?.click()
        }
        className="bg-cyan-500 hover:bg-cyan-400 text-black px-6 py-3 rounded-xl font-semibold transition"
      >

        Upload DDL File

      </button>

      <input
        ref={fileRef}
        type="file"
        accept=".sql,.txt"
        onChange={handleUpload}
        className="hidden"
      />

    </div>
  );
}

export default DDLUpload;