import React from 'react';

function CalculatorTable({data, type, removeItem}) {
    return (
      <>
          {data.length > 0 &&
          <div>
              <h3>Revenues</h3>
              <table>
                  <thead>
                  <tr>
                      <th>Name</th>
                      <th>Amount</th>
                      <th>Category</th>
                      <th>Action</th>
                  </tr>
                  </thead>
                  <tbody>
                  {data.map((row, index) => (
                      <tr id={`${type}-row-${index}`} key={index}>
                          {Object.keys(row).map((value, indexValue) => (
                              <td key={indexValue}>{row[value]}</td>
                          ))}
                          <td>
                              <button title="Remove" onClick={(e) => removeItem(index, type)}>Remove</button>
                          </td>
                      </tr>
                  ))}
                  </tbody>
              </table>
          </div>
          }
      </>
    );
}

export default CalculatorTable;