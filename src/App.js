import "./App.css";

import { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";

import SECTORS from "./constants/sector";
import axios from "axios";

const TextScroller = (props) => {
  const [key, setKey] = useState(1);

  const scrolling = useSpring({
    from: { transform: "translate(-300%,0)" },
    to: { transform: "translate(120%,0)" },
    config: { duration: 30000 },
    reset: true,
    // reverse: key % 2 == 0,
    onRest: () => {
      setKey(key + 1);
    },
  });

  return (
    <div key={key} style={{ whiteSpace: "nowrap" }}>
      <animated.div style={scrolling}>{props.text}</animated.div>
    </div>
  );
};

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
          counts: resps.data.data.length,
        });
      }

      setCategoricalCounts(data);
      setLoading(true);
    };

    fetchData();
  }, []);

  const groupBy = (array, key) => {
    // Return the end result
    return array.reduce((result, currentValue) => {
      // If an array already present for key, push it to the array. Else create an array and push the object
      (result[currentValue[key]] = result[currentValue[key]] || []).push(
        currentValue
      );
      // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
      return result;
    }, {}); // empty object is the initial value for result object
  };

  const mitra_name = Object.keys(groupBy(vacancy, "mitra_name"));
  const mitra_name_string = mitra_name.join(" • ");

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="main-content-container">
        <div className="first-row center">
          <div className="image-title">
            <img
              style={{ width: "6vw" }}
              src="https://theme.zdassets.com/theme_assets/11435355/bceff9063d378e3cb6db2a82dec7685679d18255.png"
            />
          </div>
          <div className="main-stats">
            <div className="first-row center">
              <h1 style={{ fontSize: "8em" }}>{vacancy.length}</h1>
              <h2 style={{ fontSize: "2em" }}>Lowongan</h2>
            </div>
            <div className="second-row">
              {categoricalCounts.map((cat) => 
                <div className="lowongan-small center">
                  <h2 style={{ fontSize: "1.2em", textAlign:"center", minHeight: "2.4em" }}>{cat.sector}</h2>
                  <h1 style={{ fontSize: "4em" }}>{cat.counts}</h1>
                  <h2 style={{ fontSize: "1em" }}>Lowongan</h2>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
