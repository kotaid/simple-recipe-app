import { FaPizzaSlice, FaHamburger } from "react-icons/fa";
import { GiNoodles, GiChopsticks } from "react-icons/gi";
import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";

const Category = () => {
  return (
    <List>
      <Slink to="/cuisine/italian">
        <FaPizzaSlice />
        <h4>Italian</h4>
      </Slink>
      <Slink to="/cuisine/american">
        <FaHamburger />
        <h4>American</h4>
      </Slink>
      <Slink to="/cuisine/thai">
        <GiNoodles />
        <h4>Thai</h4>
      </Slink>
      <Slink to="/cuisine/japanese">
        <GiChopsticks />
        <h4>Japanese</h4>
      </Slink>
    </List>
  );
};

const List = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0;
`;

const Slink = styled(NavLink)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin-right: 1.5rem;
  text-decoration: none;
  background: linear-gradient(35deg, #494949, #313131);
  width: 4rem;
  height: 4rem;
  cursoe: pointer;
  tranform: scale(0.8);

  h4 {
    font-size: 0.6rem;
    color: white;
  }
  svg {
    color: white;
    font-size: 1.2rem;
  }
  &.active {
    background: linear-gradient(to right, #f27121, #e94057);
    svg {
      color: white;
    }
  }
`;

export default Category;
