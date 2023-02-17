import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

function Serched() {
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  const { search } = useParams();
  const getSearch = async (search) => {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/random?apiKey=${
        import.meta.env.VITE_API_KEY
      }&query=${search}&number=9`
    );
    const data = await response.json();
    setSearchedRecipes(data.recipes);
  };
  useEffect(() => {
    getSearch(search);
  }, [search]);

  return (
    <Grid>
      {searchedRecipes.map((recipe) => {
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
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
  grid-gap: 3rem;
`;
const Card = styled.div`
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

export default Serched;
