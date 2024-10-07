import { useState, useEffect } from "react";

const Tables = ({ onSaveTable, sectionIndex, initialTables = [] }) => {
  const [tables, setTables] = useState(initialTables);

  useEffect(() => {
    if (tables.length > 0) {
      onSaveTable(sectionIndex, { tableData: tables });
    }
  }, [tables]);

  const handleAddTable = () => {
    const newTable = { headings: [], rows: [[]] };
    setTables((prev) => [...prev, newTable]);
  };
  const parseRowData = (row) => {
    if (Array.isArray(row)) {
      return row;
    }
    return row.split(",").map((cell) => cell.trim());
  };


  const handleHeadingChange = (tableIndex, headingIndex, e) => {
    const { value } = e.target;
    setTables((prev) => {
      const newTables = [...prev];
      newTables[tableIndex].headings[headingIndex] = value;
      return newTables;
    });
  };

  const handleAddHeading = (tableIndex) => {
    setTables((prev) => {
      const newTables = [...prev];
      newTables[tableIndex].headings.push("");
      newTables[tableIndex].rows.forEach((row) => row.push(""));
      return newTables;
    });
  };

  const handleDataChange = (tableIndex, rowIndex, colIndex, e) => {
    const { value } = e.target;
    setTables((prev) => {
      const newTables = [...prev];
      newTables[tableIndex].rows[rowIndex][colIndex] = value;
      return newTables;
    });
  };

  const handleAddRow = (tableIndex) => {
    setTables((prev) => {
      const newTables = [...prev];
      newTables[tableIndex].rows.push(
        new Array(newTables[tableIndex].headings.length).fill("")
      );
      return newTables;
    });
  };

  const handleRemoveRow = (tableIndex, rowIndex) => {
    setTables((prev) => {
      const newTables = [...prev];
      newTables[tableIndex].rows.splice(rowIndex, 1);
      return newTables;
    });
  };

  return (
    <div className="container mx-auto mt-2 mb-4">
      <button
        type="button"
        onClick={handleAddTable}
        className="w-full btn btn-primary btn-sm lg:btn"
      >
        Add Table
      </button>

      <form className="flex flex-col mt-2 space-y-4">
        {tables.map((table, tableIndex) => (
          <div key={tableIndex} className="p-4 mb-4 border rounded shadow-sm">
            <h3 className="mb-2 text-lg font-bold">Table {tableIndex + 1}</h3>

            <div className="mb-4">
              <h4 className="mt-2 font-bold">Add Headings:</h4>
              {table.headings.map((heading, headingIndex) => (
                <input
                  key={headingIndex}
                  type="text"
                  value={heading}
                  onChange={(e) =>
                    handleHeadingChange(tableIndex, headingIndex, e)
                  }
                  placeholder={`Heading ${headingIndex + 1}`}
                  className="w-full max-w-xs p-2 mt-2 mr-2 border input input-bordered"
                />
              ))}
              <button
                type="button"
                onClick={() => handleAddHeading(tableIndex)}
                className="mt-2 btn btn-success"
              >
                Add Heading
              </button>
            </div>

            <table className="w-full border-collapse rounded table-auto">
              <thead>
                <tr>
                  {table.headings.map((heading, headingIndex) => (
                    <th
                      key={headingIndex}
                      className="px-4 py-2 text-white bg-green-500 border"
                    >
                      {heading || `Heading ${headingIndex + 1}`}
                    </th>
                  ))}
                  <th className="px-4 py-2 text-white bg-green-500 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {table.rows.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, colIndex) => (
                      <td key={colIndex} className="px-4 py-2 border">
                        <input
                          type="text"
                          value={cell}
                          onChange={(e) =>
                            handleDataChange(tableIndex, rowIndex, colIndex, e)
                          }
                          placeholder={`Data ${colIndex + 1}`}
                          className="w-full max-w-xs p-2 mt-2 mr-2 border input input-bordered"
                        />
                      </td>
                    ))}
                    <td className="px-4 py-2 border">
                      <button
                        type="button"
                        onClick={() => handleRemoveRow(tableIndex, rowIndex)}
                        className="btn btn-error"
                      >
                        Remove Row
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              type="button"
              onClick={() => handleAddRow(tableIndex)}
              className="mt-2 btn btn-info"
            >
              Add Row
            </button>
          </div>
        ))}
      </form>
    </div>
  );
};

export default Tables;
