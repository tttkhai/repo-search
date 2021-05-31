export default function SortRepo({ sortedRepo }) {
  const handleChange = (e) => {
    sortedRepo(e.target.value);
  };
  return (
    <div style={{ float: "right" }}>
      Sort by
      <form>
        <select defaultValue={"keys"} onChange={handleChange}>
          sortedRepo
          <option value="keys">best match (default)</option>
          <option value="stars">stars</option>
          <option value="forks">forks</option>
        </select>
      </form>
    </div>
  );
}
