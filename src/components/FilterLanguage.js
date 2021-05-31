export default function FilterLanguage({ languages, filterInput }) {
  return (
    <div style={{ float: "right" }}>
      Filter by language
      <form>
        <select onChange={(e) => filterInput(e.target.value)}>
          <option value={"default"}>Select a language</option>
          {languages.map((data, index) => {
            <option></option>;
            return (
              <option key={index} value={data}>
                {data}
              </option>
            );
          })}
        </select>
      </form>
    </div>
  );
}
