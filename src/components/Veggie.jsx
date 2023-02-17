import { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const Veggie = () => {
  const [veggie, setVeggie] = useState([]);
  useEffect(() => {
    getVeggie();
  }, []);

  const getVeggie = async () => {
    const storagePopular = localStorage.getItem("veggie");
    if (storagePopular) {
      setVeggie(JSON.parse(storagePopular));
    } else {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${
          import.meta.env.VITE_API_KEY
        }&number=9&tags=vegetarian`
      );
      const data = await response.json();
      localStorage.setItem("veggie", JSON.stringify(data.recipes));
      setVeggie(data.recipes);
    }
  };

  return (
    <div>
      <Wrapper>
        <h3>Our Vegeterian Pics</h3>
        <Splide
          options={{
            perPage: 4,
            arrows: false,
            pagination: false,
            drag: "free",
            gap: "2rem",
          }}
        >
          {veggie.length
            ? veggie.map((recipe) => {
                return (
                  <SplideSlide key={recipe.id}>
                    <Card>
                      <Link to={"/recipe/" + recipe.id}>
                        <p>{recipe.title}</p>
                        <img src={recipe.image} alt={recipe.title} />
                        <Gradient />
                      </Link>
                    </Card>
                  </SplideSlide>
                );
              })
            : null}
        </Splide>
      </Wrapper>
    </div>
  );
};

const Wrapper = styled.div`
  maring: 4rem 0rem;
`;

const Card = styled.div`
  margin: 1rem 0rem;
  min-height: 25rem;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;
  p {
    position: absolute;
    z-index: 10;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 0);
    color: white;
    width: 100%;
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  img {
    border-radius: 2rem;
    position: absolute;
    left: 0;
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0,0,0,0), rgba(0,9,0,0.5);
`;

export default Veggie;
