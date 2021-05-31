export default function SortRepo({ sortedRepo }) {
  return (
    <>
      <label>Sort by</label>
        <select
          defaultValue={"keys"}
          onChange={(e) => sortedRepo(e.target.value)}
        >
          sortedRepo
          <option value="keys">best match</option>
          <option value="stars">stars</option>
          <option value="forks">forks</option>
        </select>
    </>
  );
}
