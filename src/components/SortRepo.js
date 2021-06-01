export default function SortRepo({ sortedRepo }) {
  return (
    <>
      {/* By default, results are sorted by best match, but users can also have options to sort them either by number of stars or forks */}
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
