import {
  Autocomplete,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";

const articleModele = {
  fournisseur: {},
  qte: "",
  article: {},
};

const Form = ({ fournisseurs, articles }) => {
  const [articlesList, setArticlesList] = useState([]);
  useEffect(() => {
    setArticlesList([{ ...articleModele }]);
  }, []);

  console.log(articlesList);

  const handleChangeFournisseur = (index) => (e, newValue, reason) => {
    const newArticleList = [...articlesList];
    if (reason === "clear") {
      newArticleList[index].fournisseur = {};
    } else {
      newArticleList[index].fournisseur = newValue;
    }
    setArticlesList(newArticleList);
  };

  const handleChangeArticle = (index) => (e, newValue, reason) => {
    const newArticleList = [...articlesList];
    if (reason === "clear") {
      newArticleList[index].article = {};
    } else {
      newArticleList[index].article = newValue;
    }
    setArticlesList(newArticleList);
  };

  const handleChangeQuantite = (index) => (e) => {
    const { value } = e.target;
    const newArticleList = [...articlesList];
    newArticleList[index].qte = value;
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
      return option?.label;
    },
  };
  return (
    <TableContainer>
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
            <TableCell>Fournisseur</TableCell>
            <TableCell>Ref Fournisseur</TableCell>
            <TableCell>Description</TableCell>
            <TableCell align="center">Qté</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody id="table_body">
          {articlesList.map((articleElement, index) => {
            const { fournisseur, qte, article } = articleElement;
            return (
              <TableRow key={index} id={`table_row_${index}`}>
                <TableCell component="th" scope="row">
                  <div>
                    <Autocomplete
                      {...defaultProps}
                      disablePortal
                      id={`fournisseur-select_${index}`}
                      options={fournisseurs}
                      onChange={handleChangeFournisseur(index)}
                      value={fournisseur}
                      sx={{ width: 200 }}
                      renderInput={(params) => {
                        return <TextField {...params} label="Fournisseurs" />;
                      }}
                    />
                  </div>
                </TableCell>
                <TableCell component="th" scope="row">
                  <div id={`article-ref_${index}`}>{article?.label}</div>
                </TableCell>
                <TableCell component="th" scope="row">
                  <div>
                    <Autocomplete
                      {...defaultProps}
                      disablePortal
                      id={`article-select_${index}`}
                      options={articles}
                      onChange={handleChangeArticle(index)}
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
                      id={`article-qte${index}`}
                      value={qte}
                      type="number"
                      inputProps={{ min: 0 }}
                      placeholder="0"
                      variant="filled"
                      onChange={handleChangeQuantite(index)}
                    ></TextField>
                  </div>
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
    </TableContainer>
  );
};

export default Form;
