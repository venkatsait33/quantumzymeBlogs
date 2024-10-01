import { useState } from "react";

const TableForm = ({ onSaveTable }) => {
  const [rows, setRows] = useState(3); // default number of rows
  const [cols, setCols] = useState(3); // default number of columns
  const [tableData, setTableData] = useState([]);

  // Initialize table data with empty values
  useState(() => {
    setTableData(
      Array.from({ length: rows }, () => Array(cols).fill(''))
    );
  }, [rows, cols]);

  const handleCellChange = (rowIndex, colIndex, value) => {
    const updatedData = tableData.map((row, rIdx) => 
      row.map((cell, cIdx) => (rIdx === rowIndex && cIdx === colIndex ? value : cell))
    );
    setTableData(updatedData);
  };

  const handleAddRow = () => {
    setTableData([...tableData, Array(cols).fill('')]);
    setRows(rows + 1);
  };

  const handleAddCol = () => {
    setTableData(tableData.map(row => [...row, '']));
    setCols(cols + 1);
  };

  const handleSave = () => {
    onSaveTable({ type: "table", rows, cols, tableData });
  };

  return (
    <div className="table-form">
      <div className="form-control">
        <label className="label">Table (Rows: {rows}, Columns: {cols})</label>
        {tableData.map((row, rowIndex) => (
          <div key={rowIndex} className="mb-2 row">
            {row.map((cell, colIndex) => (
              <input
                key={`${rowIndex}-${colIndex}`}
                type="text"
                className="w-full input input-bordered"
                value={cell}
                onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
              />
            ))}
          </div>
        ))}
        <div className="mt-2">
          <button type="button" className="btn btn-sm" onClick={handleAddRow}>
            Add Row
          </button>
          <button type="button" className="ml-2 btn btn-sm" onClick={handleAddCol}>
            Add Column
          </button>
        </div>
        <button type="button" className="mt-2 btn btn-secondary" onClick={handleSave}>
          Save Table
        </button>
      </div>
    </div>
  );
};

export default TableForm;
