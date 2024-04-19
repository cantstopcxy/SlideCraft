import styled from 'styled-components';

const Sidebar = styled.div`
  width: 250px;
  background-color: #f0f0f0;
  height: 100vh;
  padding: 20px;
  box-sizing: border-box;

  @media (max-hight: 700px) {
    width: 5px;
  }

  @media (max-width: 400px) {
    width: 150px;
  }
`;

export default Sidebar;
