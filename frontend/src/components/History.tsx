type RecordType = {
  city: string;
  aqi: number;
  pm25: number;
  pm10: number;
  created_at: string;
};

type Props = {
  records: RecordType[];
};

function History({ records }: Props) {
  return (
    <div className="card">
      <h2>Recent Searches</h2>

      <table width="100%">
        <thead>
          <tr>
            <th>City</th>
            <th>AQI</th>
            <th>PM2.5</th>
          </tr>
        </thead>

        <tbody>
          {records.map((record, index) => (
            <tr key={index}>
              <td>{record.city}</td>
              <td>{record.aqi}</td>
              <td>{record.pm25}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default History;