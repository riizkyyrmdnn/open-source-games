import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "@style/main.scss";
import LogoText from "../../../public/logo-text.svg";
import Logo from "../../../public/logo.svg";

HomePage.propTypes = {
  props: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      link: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default function HomePage({ props }) {
  return (
    <>
      <section className="home-section">
        <img src={LogoText} alt="Main logo" className="logo-main" />
        <main className="section-container">
          {props.map((game) => (
            <Link
              key={game.id}
              to={`${decodeURIComponent(game.link)}`}
              className="game-card"
            >
              <div className="logo">
                <img src={Logo} alt="Game thumbnail" className="logo--img" />
              </div>
              <div className="game-card-body">
                <h5 className="game-card-body--title">{game.title}</h5>
                <p className="game-card-body--category">
                  <img
                    src="https://www.svgrepo.com/show/444984/category-solid.svg"
                    alt="category"
                    className="icon"
                  />{" "}
                  {game.category}
                </p>
              </div>
            </Link>
          ))}
        </main>
      </section>
      <button
        onClick={() => window.open("https://github.com/riizkyyrmdnn", "_blank")}
        className="button-github"
      >
        <img
          src="https://www.svgrepo.com/show/512317/github-142.svg"
          alt="github"
        />
      </button>
    </>
  );
}
