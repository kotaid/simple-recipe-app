import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { FaSearch } from "react-icons/fa";

function Search() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/searched/" + search);
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <FaSearch></FaSearch>
      <input type="text" onChange={(e) => setSearch(e.target.value)} />
    </StyledForm>
  );
}

const StyledForm = styled.form`
  margin: 0 auto;
  position: relative;
  width: 50%;
  min-width: 20rem;

  input {
    width: 100%;
    border: none;
    background: linear-gradient(35deg, #494949, #313131);
    font-size: 1rem;
    color: white;
    padding: 1.5rem 3rem;
    border-radius: 1rem;
    outline: none;
  }

  svg {
    position: absolute;
    font-size: 1.5rem;
    top: 50%;
    left: 0%;
    transform: translate(100%, -50%);
    color: white;
  }
`;

export default Search;
