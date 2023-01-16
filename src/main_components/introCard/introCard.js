import "./introCard.css";
import Button from 'react-bootstrap/Button';

const IntroCard = (props) => {
  return (
    <>
      <div className="intro-container center">
          <div className="image-title">
            <img
              style={{ width: "6vw" }}
              src="https://theme.zdassets.com/theme_assets/11435355/bceff9063d378e3cb6db2a82dec7685679d18255.png"
            />
          </div>
          <div className="main-stats">
            <div className="first-row center">
              <h1 style={{ fontSize: "5em", fontWeight:800 }}>{props.vacancy.length}</h1>
              <h2 style={{ fontSize: "1.5em" }}>Lowongan</h2>
            </div>
            <div className="second-row">
              {props.categoricalCounts.map((cat) => (
                <div className="lowongan-small center">
                  <h2
                    style={{
                      fontSize: "1.2em",
                      textAlign: "center",
                      minHeight: "2.4em",
                    }}
                  >
                    {cat.sector}
                  </h2>
                  <h1 style={{ fontSize: "4em", fontWeight:600 }}>{cat.counts}</h1>
                  <h2 style={{ fontSize: "1em" }}>Lowongan</h2>
                </div>
              ))}
              <div className="third-row">
              <Button variant="dark" href="/mitra">Detail</Button>
              </div>
            </div>
          </div>
      </div>
    </>
  );
};

export default IntroCard;