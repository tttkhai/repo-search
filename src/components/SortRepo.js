export default function SortRepo({ sortedRepo }) {
  return (
    <>
      {/* By default, results are sorted by best match, but users also have options to sort them by number of stars and forks */}
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
