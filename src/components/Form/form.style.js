import { css, TableContainer } from "@mui/material";
import styled from "styled-components";

export const TableContainerStyled = styled(TableContainer)(({ theme }) => {
  return css`
    background-color: red;
  `;
});
