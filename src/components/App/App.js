import { Alert, Button, Container, Divider, Snackbar } from "@mui/material";
import Form from "../Form/Form";
import Header from "../Header/Header";
import {
  articles,
  collId,
  editedDocumentData,
  fournisseurs,
  nCommande,
  projets,
  typeDocument,
  user,
} from "../../dummy-datas/data";
import { useEffect, useState } from "react";
import axios from "axios";

var fournisseursFromBack = window.fournisseurs ?? fournisseurs;
var projetsFromBack = window.projets ?? projets;
var articlesFromBack = window.articles ?? articles;
var userFromBack = window.user ?? user;

var collIdFromBack = window.collId ?? collId;

var typeDocFromBack = window.typeDoc ?? typeDocument;

var edit = window.edit ?? false;

var editedDocumentDataFromBack = window.formdata ?? editedDocumentData;

var nCommandeFromBack = window.nCommande ?? nCommande;

const App = () => {
  const [initialState, setInitialState] = useState({});
  const [projet, setProjet] = useState({});
  const [fournisseur, setFournisseur] = useState({});
  const [articlesList, setArticlesList] = useState([]);
  const [reference, setReference] = useState("");
  const [message, setMessage] = useState({});

  const submitData = async (collId, typeDoc) => {
    let newState = { ...initialState };
    newState.projet = projet;
    newState.fournisseur = fournisseur;
    newState.articlesList = articlesList;
    newState.user = user;
    newState.collId = collIdFromBack;
    newState.typeDoc = typeDocFromBack;
    newState.reference = reference;
    setInitialState({ ...newState });

    const response = await axios({
      method: "POST",
      url: `traitement.php?coll_id=${collId}&type_doc=${typeDoc}&edit=${edit}`,
      data: newState,
    });

    const { data } = response;

    if (data.status.includes("OK")) {
      setMessage({
        success: true,
        message: "Le formulaire a été soumis avec succés",
      });
      setProjet({});
      setFournisseur({});
      setArticlesList([]);
      setReference("");
      setInitialState({});
    } else {
      setMessage({
        success: false,
        message: "Il y a eu un problème lors de la soumission du formulaire",
      });
    }
  };

  const handleSendDatas = () => {
    submitData(collIdFromBack, typeDocFromBack);
  };

  const handleCloseAlertMessage = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setMessage({});
  };

  useEffect(() => {
    if (edit) {
      const formDatas = JSON.parse(editedDocumentDataFromBack);
      console.log(formDatas);
      setProjet(formDatas.projet);
      setFournisseur(formDatas.fournisseur);
      setArticlesList(formDatas.articlesList);
      setReference(formDatas.reference);
    }
  }, []);

  return (
    <Container>
      <Header
        fournisseurs={fournisseursFromBack}
        projets={projetsFromBack}
        setProjet={setProjet}
        projet={projet}
        setFournisseur={setFournisseur}
        fournisseur={fournisseur}
        user={userFromBack}
        reference={reference}
        setReference={setReference}
        edit={edit}
        NCommande={nCommandeFromBack}
      />
      <Divider sx={{ margin: "20px" }} />
      <Form
        fournisseurs={fournisseursFromBack}
        articles={articlesFromBack}
        articlesList={articlesList}
        setArticlesList={setArticlesList}
      />
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "20px",
        }}
      >
        <Button
          type="button"
          onClick={handleSendDatas}
          color="success"
          variant="outlined"
        >
          Soumettre
        </Button>
      </Container>
      {Object.keys(message).length > 0 && (
        <Snackbar
          open={Object.keys(message).length > 0 ? true : false}
          autoHideDuration={6000}
          onClose={handleCloseAlertMessage}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={handleCloseAlertMessage}
            severity={message.success ? "success" : "error"}
            sx={{ width: "100%" }}
          >
            {message.message}
          </Alert>
        </Snackbar>
      )}
    </Container>
  );
};

export default App;
