import React, { useEffect, useState } from "react";
import Card from "./Card";
import PokeInfo from "./PokeInfo";
import axios from "axios";

const Main = () => {
  const [pokeData, setPokeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon");
  const [nexturl, setNextUrl] = useState();
  const [previousurl, setPreviousUrl] = useState();
  const [pokeDex, setPokeDex] = useState();

  const pokeFun = async () => {
    setLoading(true);
    const res = await axios.get(url);
    // console.log(res.data.results);
    setNextUrl(res.data.next);
    setPreviousUrl(res.data.previous);
    getPokemon(res.data.results);
    setLoading(false);
  };
  const getPokemon = async (res) => {
    res.map(async (item) => {
      const result = await axios.get(item.url);
      // console.log(result.data);
      setPokeData((state) => {
        state = [...state, result.data];
        state.sort((a, b) => (a.id > b.id ? 1 : -1));
        return state;
      });
    });
  };
  useEffect(() => {
    pokeFun();
  }, [url]);
  return (
    <>
      <div className="container">
        <div className="left-content">
          <Card
            pokemon={pokeData}
            loading={loading}
            infoPokemon={(poke) => setPokeDex(poke)}
          />

          <div className="button-group">
            {previousurl && (
              <button
                onClick={() => {
                  setPokeData([]);
                  setUrl(previousurl);
                }}
              >
                Previous
              </button>
            )}
            {nexturl && (
              <button
                onClick={() => {
                  setPokeData([]);
                  setUrl(nexturl);
                }}
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="right-content">
        <PokeInfo data={pokeDex} />
      </div>
    </>
  );
};

export default Main;
