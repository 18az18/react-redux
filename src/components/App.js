import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import Nav from "./Nav";
import store from "../store";
import Routes from "./Routes";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Nav />
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Routes />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
