import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

function Recipe() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});
  const [activeTab, setActiveTab] = useState("instructions");
  const getRecipe = async () => {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${
        import.meta.env.VITE_API_KEY
      }`
    );
    const resRecipe = await response.json();
    setRecipe(resRecipe);
  };

  useEffect(() => {
    getRecipe();
  }, [id]);
  return (
    <Wrapper
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div>
        <h2>{recipe.title}</h2>
        <img src={recipe.image} alt={recipe.title} />
      </div>
      <Info>
        <Button
          className={activeTab === "instructions" ? "active" : ""}
          onClick={() => setActiveTab("instructions")}
        >
          Instructions
        </Button>
        <Button
          className={activeTab === "ingredients" ? "active" : ""}
          onClick={() => setActiveTab("ingredients")}
        >
          Ingredients
        </Button>
        {activeTab === "instructions" && (
          <div>
            <h3 dangerouslySetInnerHTML={{ __html: recipe.summary }}></h3>
            <h3 dangerouslySetInnerHTML={{ __html: recipe.instructions }}></h3>
          </div>
        )}
        {activeTab === "ingredients" && (
          <ul>
            {recipe.extendedIngredients.map((ingredient) => (
              <li key={ingredient.id}>{ingredient.original}</li>
            ))}
          </ul>
        )}
      </Info>
    </Wrapper>
  );
}

const Wrapper = styled(motion.div)`
  margin-top: 10rem;
  margin-bottom: 5rem;
  display: flex;
  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }
  h2 {
    margin-bottom: 2rem;
  }
  li {
    font-size: 1.2rem;
    line-height: 2.5rem;
  }
  ul {
    margin-top: 2rem;
  }
  img {
    border-radius: 1rem;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  margin-right: 2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.1s linear;
  .active {
    background: #313131;
  }
  &:hover {
    background: #494949;
    color: white;
  }
`;

const Info = styled.div`
  margin-left: 5rem;
  div {
    margin-top: 2rem;
  }
`;

export default Recipe;
