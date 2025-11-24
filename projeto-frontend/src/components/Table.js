import React from 'react';

const Table = ({ columns, data, onEdit, onDelete }) => {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        fontSize: '14px'
      }}>
        <thead>
          <tr style={{ backgroundColor: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
            {columns.map((col, idx) => (
              <th key={idx} style={{
                padding: '12px',
                textAlign: 'left',
                fontWeight: '600',
                color: '#374151'
              }}>
                {col.header}
              </th>
            ))}
            {(onEdit || onDelete) && (
              <th style={{
                padding: '12px',
                textAlign: 'center',
                fontWeight: '600',
                color: '#374151'
              }}>
                Ações
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + 1} style={{
                padding: '24px',
                textAlign: 'center',
                color: '#6b7280'
              }}>
                Nenhum registro encontrado
              </td>
            </tr>
          ) : (
            data.map((row, rowIdx) => (
              <tr key={rowIdx} style={{
                borderBottom: '1px solid #e5e7eb',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                {columns.map((col, colIdx) => (
                  <td key={colIdx} style={{ padding: '12px', color: '#111827' }}>
                    {col.render ? col.render(row) : row[col.accessor]}
                  </td>
                ))}
                {(onEdit || onDelete) && (
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                      {onEdit && (
                        <button
                          onClick={() => onEdit(row)}
                          style={{
                            padding: '6px 12px',
                            backgroundColor: '#3b82f6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '13px'
                          }}
                        >
                          Editar
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => onDelete(row)}
                          style={{
                            padding: '6px 12px',
                            backgroundColor: '#ef4444',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '13px'
                          }}
                        >
                          Excluir
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;