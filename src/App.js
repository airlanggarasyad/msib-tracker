import "./App.css";

import { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";

import SECTORS from "./constants/sector";
import axios from "axios";

import IntroCard from "./main_components/introCard/introCard";

function App() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [vacancy, setVacancy] = useState([]);
  const [categoricalCounts, setCategoricalCounts] = useState([]);

  const api =
    "https://api.kampusmerdeka.kemdikbud.go.id/magang/browse/position?offset=0&limit=&location_key=&mitra_key=&keyword=&sector_id=";

  useEffect(() => {
    fetch(api)
      .then((res) => res.json())
      .then(
        (result) => {
          setVacancy(result.data);
        },

        (error) => {
          setLoading(true);
          setError(error);
        }
      );

    const data = [];
    const fetchData = async () => {
      for (let i = 0; i < 6; i++) {
        const resps = await axios(`${api}${SECTORS[i].sectorID}`);

        data.push({
          sector: SECTORS[i].name,
          data: resps.data.data,
          counts: resps.data.data.length,
        });
      }

      setCategoricalCounts(data);
      setLoading(true);
    };

    fetchData();
  }, []);

  let intro_modal_props = {
    vacancy: vacancy,
    categoricalCounts: categoricalCounts
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <IntroCard {...intro_modal_props} />
    );
  }
}

export default App;
