import { useState } from "react";
import "./App.css";
import axios from "axios";
import { useEffect } from "react";
function App() {
  const [Jokes, setJokes] = useState([]);
  useEffect(() => {
    axios
      .get("/api/jokes")
      .then((response) => {
        setJokes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });
  return (
    <>
      <h1>Hey this is Devang</h1>
      <p>Jokes : {Jokes.length}</p>
      {Jokes.map((Joke, index) => (
        <div key={Joke.id}>
          <h3>{Joke.title}</h3>
          <p>{Joke.content}</p>
        </div>
      ))}
    </>
  );
}
export default App;
