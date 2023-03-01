import {
  Autocomplete,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect } from "react";
import { TableContainerStyled } from "../Header/header.style";

const articleModele = {
  qte: "",
  article: {},
  prix: "",
};

const Form = ({ fournisseurs, articles, articlesList, setArticlesList }) => {
  useEffect(() => {
    setArticlesList([{ ...articleModele }]);
  }, []);

  const handleChangeItem = (index) => (e, newValue, reason) => {
    const { id } = e.target;
    const type = id.split("-")[0];
    const newArticleList = [...articlesList];
    if (reason === "clear") {
      newArticleList[index][type] = {};
    } else {
      newArticleList[index][type] = newValue;
    }
    setArticlesList(newArticleList);
  };

  const handleChangeQuantite = (index) => (e) => {
    const { value } = e.target;
    const newArticleList = [...articlesList];
    newArticleList[index].qte = value;
    setArticlesList(newArticleList);
  };

  const handleChangePrix = (index) => (e) => {
    const { value } = e.target;
    const newArticleList = [...articlesList];
    newArticleList[index].prix = value;
    setArticlesList(newArticleList);
  };

  const addArticleLine = () => {
    const newArticleList = [...articlesList, { ...articleModele }];
    setArticlesList(newArticleList);
  };

  const deleteArticleLine = (index) => () => {
    const newArticleList = [...articlesList];
    newArticleList.splice(index, 1);
    setArticlesList(newArticleList);
  };

  const defaultProps = {
    getOptionLabel: (option) => {
      if (Object.keys(option).length === 0 || !option) {
        return "";
      }
      return option?.nom;
    },
  };
  return (
    <TableContainerStyled>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => addArticleLine()}
        >
          Ajouter Article
        </Button>
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Ref Fournisseur</TableCell>
            <TableCell>Description</TableCell>
            <TableCell align="center">Qté</TableCell>
            <TableCell align="center">Prix HT</TableCell>
            <TableCell>Total</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody id="table_body">
          {articlesList.map((articleElement, index) => {
            const { qte, article, prix } = articleElement;
            return (
              <TableRow key={index} id={`table_row_${index}`}>
                <TableCell component="th" scope="row">
                  <div id={`article-ref_${index}`}>{article?.label}</div>
                </TableCell>
                <TableCell component="th" scope="row">
                  <div>
                    <Autocomplete
                      {...defaultProps}
                      id={`article-select_${index}`}
                      options={articles}
                      onChange={handleChangeItem(index)}
                      value={article}
                      sx={{ width: 300 }}
                      renderInput={(params) => {
                        return <TextField {...params} label="Articles" />;
                      }}
                    />
                  </div>
                </TableCell>
                <TableCell component="th" scope="row" align="center">
                  <div>
                    <TextField
                      id={`article-qte_${index}`}
                      value={qte}
                      type="number"
                      inputProps={{ min: 0 }}
                      placeholder="0"
                      variant="filled"
                      onChange={handleChangeQuantite(index)}
                    ></TextField>
                  </div>
                </TableCell>
                <TableCell component="th" scope="row" align="center">
                  <div>
                    <TextField
                      id={`article-prix_${index}`}
                      value={prix}
                      type="number"
                      inputProps={{ min: 0 }}
                      placeholder="0"
                      variant="filled"
                      onChange={handleChangePrix(index)}
                    ></TextField>
                  </div>
                </TableCell>
                <TableCell component="th" scope="row" align="center">
                  <div>{isNaN(prix * qte) ? 0 : (prix * qte).toFixed(2)}</div>
                </TableCell>
                {index !== 0 && (
                  <TableCell component="th" scope="row">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        height: "100%",
                      }}
                    >
                      <IconButton
                        variant="outlined"
                        color="error"
                        onClick={deleteArticleLine(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  </TableCell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainerStyled>
  );
};

export default Form;
