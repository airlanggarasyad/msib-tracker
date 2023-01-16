import { BsGlobe, BsFillCalendar2WeekFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { FaMap } from "react-icons/fa";

import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";

import "./mitraPage.css";

import SECTORS from "../../constants/sector";

function CompanyCard(props) {
  const options = { year: "numeric", month: "long", day: "numeric" };

  const startDate = new Date(props.start_duration).toLocaleDateString(undefined, options);
  const endDate = new Date(props.end_duration).toLocaleDateString(undefined, options);
  console.log(props)
  return (
    <div className="company-card">
      <h4>{props.name}</h4>
      <span>
        <BsFillCalendar2WeekFill style={{ width: "5%" }} />
        <p style={{ width: "95%" }}>{startDate} - {endDate}</p>
      </span>
      <span>
        <FaMap style={{ width: "5%" }} />
        <p style={{ width: "95%" }}>{props.location}</p>
      </span>
      <span>
        <BsGlobe style={{ width: "5%" }} />
        <p style={{ width: "95%" }}>{props.activity_type}</p>
      </span>
    </div>
  );
}

function getAllData(toMerge) {
  let allData = [];

  Object.keys(toMerge).forEach(function (key, index) {
    allData = allData.concat(toMerge[key].data);
  });

  allData = allData.sort((a, b) => (a.mitra_name > b.mitra_name ? 1 : -1));

  return allData;
}

function getSortedObject(rawData) {
  const result = rawData.reduce(function (r, a) {
    r[a.mitra_name] = r[a.mitra_name] || [];
    r[a.mitra_name].push(a);
    return r;
  }, Object.create(null));

  const dataToShow = Object.keys(result)
    .sort()
    .reduce((obj, key) => {
      obj[key] = result[key];
      return obj;
    }, {});

  return dataToShow;
}

const MitraPage = (props) => {
  const allData = getAllData(props);
  const [data, setData] = useState(allData);

  const [objectData, setObjectData] = useState(getSortedObject(allData));

  const categoryFilter = (id) => {
    if (id < 0) {
      setData(allData);
      setObjectData(getSortedObject(allData));
    } else {
      // const dataToShow = props[id].data.sort((a, b) =>
      //   a.mitra_name > b.mitra_name ? 1 : -1
      // );

      const rawData = props[id].data;
      setObjectData(getSortedObject(rawData));

      setData(rawData);
    }
  };

  return (
    <>
      <div style={{ padding: "0 3em", height: "100%" }}>
        <div
          style={{
            height: "15%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "1em",
          }}
        >
          <h1>Lowongan</h1>
        </div>
        <div
          style={{
            height: "5%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <select
            className="selection"
            onChange={(e) => categoryFilter(e.target.value)}
          >
            <option value={-1}>Semua</option>
            {SECTORS.map((sector) => (
              <option value={sector.val}>{sector.name}</option>
            ))}
          </select>
          <p>
            <b>{data.length}</b> Lowongan
          </p>
        </div>
        <div style={{ height: "65%", overflow: "scroll" }}>
          <Accordion>
            {Object.keys(objectData).map((keyName, i) => (
              <Accordion.Item eventKey={{ keyName }}>
                <Accordion.Header>
                  <img
                    src={objectData[keyName][0].logo}
                    style={{
                      width: "10%",
                      height: "40px",
                      objectFit: "contain",
                      marginRight: "10px",
                    }}
                  />{" "}
                  {keyName}
                </Accordion.Header>
                <Accordion.Body>
                  {Object.keys(objectData[keyName]).map((vacancy) => (
                    <>
                      <CompanyCard {...objectData[keyName][vacancy]} />
                      <hr />
                    </>
                  ))}
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </div>
        <div style={{height: "15%", display:"flex", alignItems:"center", justifyContent:"center"}}>
          <Button variant="dark" href="/">
            Kembali
          </Button>
        </div>
      </div>
    </>
  );
};

export default MitraPage;
