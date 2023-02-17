import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Cuisine = () => {
  const [cuisine, setCuisine] = useState([]);
  const { type } = useParams();
  const getCuisine = async (cuisineName) => {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${
        import.meta.env.VITE_API_KEY
      }&cuisine=${cuisineName}&number=9`
    );
    const data = await response.json();
    setCuisine(data.results);
  };
  useEffect(() => {
    getCuisine(type);
  }, [type]);

  return (
    <Grid
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {cuisine.map((recipe) => {
        return (
          <Card key={recipe.id}>
            <Link to={"/recipe/" + recipe.id}>
              <img src={recipe.image} alt={recipe.title} />
              <h4>{recipe.title}</h4>
            </Link>
          </Card>
        );
      })}
    </Grid>
  );
};

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
  grid-gap: 3rem;
`;
const Card = styled(motion.div)`
  img {
    width: 100%;
    border-radius: 2rem;
  }
  a {
    text-decoration: none;
  }
  h4 {
    font-size: 1.5rem;
    text-align: center;
    padding: 1rem;
  }
`;

export default Cuisine;
