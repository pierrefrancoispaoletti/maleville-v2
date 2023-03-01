import { TableContainer } from "@mui/material";
import styled, { css } from "styled-components";

export const ContainerWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-flow: column;
    justify-content: center;
    align-items: center;
    .img-wrapper {
      width: 100%;
      display: flex;
      justify-content: center;
    }
  }
`;

const typeCard = () => {
  return css`
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 8px;
    margin-top: 16px;
    box-sizing: border-box;
    border: 1px solid rgba(0, 0, 0, 0.1);
  `;
};

export const AddressBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  ${typeCard()}
  p {
    line-height: 0.8;
    letter-spacing: 1.2px;
  }
`;

export const TableContainerStyled = styled(TableContainer)`
  ${typeCard()}
`;
