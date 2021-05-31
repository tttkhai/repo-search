import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import SearchPage from "./components/SearchPage";
import DetailsPage from "./components/DetailsPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact component={SearchPage} />
        <Route path="/:id" component={DetailsPage} />
      </Router>
    </div>
  );
}

export default App;
