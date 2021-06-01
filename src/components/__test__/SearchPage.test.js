import {getRepos} from '../SearchPage';
import {filterByLanguage} from '../Results'

test('should return a result with length of at least 1 when received an existing repo name as input', async () => {
  const userInput='foody-ui'
  const sortValue='keys'
  const repos= await getRepos(userInput, sortValue)
  expect(repos.data.items.length).toBeGreaterThan(0);
});
  

test('should return no result with input as a non-exist repo name', async () => {
  // given a non-exist repo name, the length of returned result should be 0.  
  const userInput='fdfdsafdfdsfdsfdsfdsfdsfas'
  const sortValue='keys'
  const repos= await getRepos(userInput, sortValue)
  expect(repos.data.items.length).toBe(0);
});


test('results are sorted by stars correctly', async () => {
  const userInput='foody-ui'
  const sortValue='stars'
  const result= await getRepos(userInput, sortValue)
  const repos=result.data.items

  // Since it's sorted by stars in descendant order so the very first repo should have the 
  // largest number of stars. Then we can find the max number of stars within the returned result and compare them.
  // Those 2 values should be equal.
  const repositoryHasMostStars=Math.max(...repos.map(({stargazers_count})=> stargazers_count))
  expect(repos[0].stargazers_count).toBe(repositoryHasMostStars);
});


test('should contain a repo named "foody-ui-react" when filtered the repos by language, which is Javascript in this case', async () => {
  const userInput='foody-ui'
  const sortValue='keys'
  const result= await getRepos(userInput, sortValue)
  const repos=result.data.items
  const repoFilterByJavascript = filterByLanguage(repos, 'JavaScript')
  expect(repoFilterByJavascript.filter(({name})=> name==='foody-ui-react').length).toBeGreaterThan(0);
});