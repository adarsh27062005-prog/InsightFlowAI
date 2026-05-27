function EnterpriseTable({
  data = [],
}) {

  if (!data.length) {

    return null;

  }

  const columns =
    Object.keys(data[0]);

  return (

    <div className="bg-[#111827] border border-gray-800 rounded-3xl overflow-hidden">

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-[#1F2937]">

            <tr>

              {columns.map((column) => (

                <th
                  key={column}
                  className="px-6 py-5 text-left text-cyan-400 text-sm uppercase tracking-wider"
                >

                  {column}

                </th>

              ))}

            </tr>

          </thead>

          <tbody>

            {data.slice(0, 20).map(
              (
                row,
                index
              ) => (

                <tr
                  key={index}
                  className="border-t border-gray-800 hover:bg-[#1F2937]/60"
                >

                  {columns.map((column) => (

                    <td
                      key={column}
                      className="px-6 py-4 text-sm text-gray-300"
                    >

                      {String(
                        row[column]
                      )}

                    </td>

                  ))}

                </tr>

              )
            )}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default EnterpriseTable;