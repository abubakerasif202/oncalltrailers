interface SpecTableProps {
  rows: readonly (readonly [label: string, value: string])[];
  caption?: string;
}

/** Compact specification table. Only verified rows are ever passed in. */
export function SpecTable({ rows, caption = 'Specifications' }: SpecTableProps) {
  return (
    <table className="spec-table">
      <caption className="visually-hidden">{caption}</caption>
      <tbody>
        {rows.map(([label, value]) => (
          <tr key={label}>
            <th scope="row">{label}</th>
            <td>{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
