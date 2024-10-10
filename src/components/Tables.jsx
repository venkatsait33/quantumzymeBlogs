import { useState, useEffect } from "react";

const Tables = ({ onSaveTable, sectionIndex, initialTables = [] }) => {
  const [tables, setTables] = useState(initialTables);
  const [tableTitles, setTableTitles] = useState(
    initialTables.map((table) => table.title || "")
  );

  useEffect(() => {
    if (tables.length > 0) {
      onSaveTable(sectionIndex, { tableData: tables }, tableTitles);
    }
  }, [tables, tableTitles]); // Include tableTitles in the dependency array

  // Function to handle adding a new table
  const handleAddTable = () => {
    const newTable = { title: "", headings: [], rows: [[]] };
    setTables((prev) => [...prev, newTable]);
  };

  // Function to handle removing a table
  const handleRemoveTable = (tableIndex) => {
    setTables((prev) => prev.filter((_, index) => index !== tableIndex));
  };

  // Handle adding a heading
  const handleAddHeading = (tableIndex) => {
    setTables((prev) => {
      const newTables = [...prev];
      newTables[tableIndex].headings.push(""); // Add an empty heading
      // Update rows to add corresponding columns for the new heading
      newTables[tableIndex].rows.forEach((row) => row.push(""));
      return newTables;
    });
  };

  // Handle removing a heading
  const handleRemoveHeading = (tableIndex, headingIndex) => {
    setTables((prev) => {
      const newTables = [...prev];
      newTables[tableIndex].headings.splice(headingIndex, 1);
      newTables[tableIndex].rows.forEach((row) => row.splice(headingIndex, 1)); // Remove corresponding column data
      return newTables;
    });
  };

  // Handle updating a heading value
  const handleHeadingChange = (tableIndex, headingIndex, e) => {
    const { value } = e.target;
    setTables((prev) => {
      const newTables = [...prev];
      newTables[tableIndex].headings[headingIndex] = value;
      return newTables;
    });
  };

  // Handle adding a new row
  const handleAddRow = (tableIndex) => {
    setTables((prev) => {
      const newTables = [...prev];
      newTables[tableIndex].rows.push(
        new Array(newTables[tableIndex].headings.length).fill("") // Add empty cells for the new row
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

  // Handle updating the cell data
  const handleDataChange = (tableIndex, rowIndex, colIndex, e) => {
    const { value } = e.target;
    setTables((prev) => {
      const newTables = [...prev];
      newTables[tableIndex].rows[rowIndex][colIndex] = value;
      return newTables;
    });
  };

  // Handle table title change
const handleTableTitleChange = (tableIndex, e) => {
  const { value } = e.target;
  setTableTitles((prev) => {
    const newTitles = [...prev];
    newTitles[tableIndex] = value; // Update title for the specific table
    return newTitles;
  });
  setTables((prev) => {
    const newTables = [...prev];
    newTables[tableIndex].title = value; // Update table title in the tables state
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
            {/* Table Title Input */}

            <h3 className="mb-2 text-lg font-bold">Table {tableIndex + 1}</h3>

            <div className="mb-4">
              <h4 className="mt-2 font-bold">Add Headings:</h4>
              {table.headings.map((heading, headingIndex) => (
                <div key={headingIndex} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={heading}
                    onChange={(e) =>
                      handleHeadingChange(tableIndex, headingIndex, e)
                    }
                    placeholder={`Heading ${headingIndex + 1}`}
                    className="w-full max-w-xs p-2 mt-2 border input input-bordered"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      handleRemoveHeading(tableIndex, headingIndex)
                    }
                    className="mt-2 btn btn-error"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddHeading(tableIndex)}
                className="mt-2 btn btn-success"
              >
                Add Heading
              </button>
            </div>

            <div className="overflow-x-auto">
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
                    <th className="px-4 py-2 text-white bg-green-500 border">
                      Actions
                    </th>
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
                              handleDataChange(
                                tableIndex,
                                rowIndex,
                                colIndex,
                                e
                              )
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
            </div>
            <button
              type="button"
              onClick={() => handleAddRow(tableIndex)}
              className="mt-2 btn btn-info"
            >
              Add Row
            </button>
            <div className="mt-4">
              <span>Table Title</span>
              <input
                type="text"
                value={tableTitles[tableIndex]} // Use state to manage title
                onChange={(e) => handleTableTitleChange(tableIndex, e)}
                placeholder={`Table Title ${tableIndex + 1}`}
                className="w-full p-2 mb-4 border input input-bordered"
              />
            </div>

            <div>
              <button
                type="button"
                onClick={() => handleRemoveTable(tableIndex)}
                className="mt-4 btn btn-error"
              >
                Remove Table
              </button>
            </div>
          </div>
        ))}
      </form>
    </div>
  );
};

export default Tables;
