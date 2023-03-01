import {
  Alert,
  Button,
  Container,
  createTheme,
  CssBaseline,
  Divider,
  Snackbar,
  ThemeProvider,
} from "@mui/material";
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
import { MaterialUISwitch } from "./app.style";
import Commentaire from "../Commentaire/Commentaire";
import Options from "../TVA/Options/Options";
import TVACalculatorComponent from "../TVA/TVACalculator/TVACalculator";
import TotalTVA from "../TVA/TotalTVA/TotalTVA";

var fournisseursFromBack = window.fournisseurs ?? fournisseurs;
var projetsFromBack = window.projets ?? projets;
var articlesFromBack = window.articles ?? articles;
var userFromBack = window.user ?? user;

var collIdFromBack = window.collId ?? collId;

var typeDocFromBack = window.typeDoc ?? typeDocument;

var edit = window.edit ?? false;

var editedDocumentDataFromBack = window.formdata ?? editedDocumentData;

var nCommandeFromBack = window.nCommande ?? nCommande;

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

const App = () => {
  const [initialState, setInitialState] = useState({});
  const [projet, setProjet] = useState({});
  const [fournisseur, setFournisseur] = useState({});
  const [articlesList, setArticlesList] = useState([]);
  const [reference, setReference] = useState("");
  const [message, setMessage] = useState({});
  const [commentaire, setCommentaire] = useState("");
  const [options, setOptions] = useState({
    30: false,
    50: false,
    "cash-pistache": false,
  });
  const [TVACalculator, setTVACalculator] = useState({
    taux: 0,
    base: 0,
    TVA: 0,
  });

  const [totaux, setTotaux] = useState({
    port: 0,
    net: 0,
  });

  const [theme, setTheme] = useState(lightTheme);

  const submitData = async (collId, typeDoc) => {
    let newState = { ...initialState };
    newState.projet = projet;
    newState.fournisseur = fournisseur;
    newState.articlesList = articlesList;
    newState.user = user;
    newState.collId = collIdFromBack;
    newState.typeDoc = typeDocFromBack;
    newState.reference = reference;
    newState.commentaire = commentaire;
    newState.options = options;
    newState.TVACalculator = TVACalculator;
    newState.totaux = totaux;

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
      setCommentaire("");
      setOptions({ 30: false, 50: false, "cash-pistache": false });
      TVACalculator({ taux: 0, base: 0, TVA: 0 });
      setTotaux({ port: 0, net: 0 });
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

  const handleChangeTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === lightTheme ? darkTheme : lightTheme;
      localStorage.setItem("theme", newTheme.palette.mode);
      return newTheme;
    });
  };

  useEffect(() => {
    if (edit) {
      const formDatas = JSON.parse(editedDocumentDataFromBack);
      setProjet(formDatas.projet);
      setFournisseur(formDatas.fournisseur);
      setArticlesList(formDatas.articlesList);
      setReference(formDatas.reference);
    }
    if (localStorage.getItem("theme") === "dark") {
      setTheme(darkTheme);
      localStorage.setItem("theme", "dark");
    }
    if (localStorage.getItem("theme") === "light") {
      setTheme(lightTheme);
      localStorage.setItem("theme", "light");
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container sx={{ display: "flex", justifyContent: "flex-end" }}>
        <MaterialUISwitch
          sx={{ m: 1 }}
          checked={theme === lightTheme}
          onClick={handleChangeTheme}
          theme={theme}
        />
      </Container>
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
          titre={"Bon de commande"}
        />
        <Divider sx={{ margin: "20px" }} />
        <Container
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Commentaire
            commentaire={commentaire}
            setCommentaire={setCommentaire}
          />
          <Divider orientation="vertical" flexItem />
          <Options options={options} setOptions={setOptions} />
          <Divider orientation="vertical" flexItem />
          <TVACalculatorComponent
            TVACalculator={TVACalculator}
            setTVACalculator={setTVACalculator}
            articlesList={articlesList}
          />
        </Container>
        <Divider sx={{ margin: "20px" }} />
        <Container>
          <TotalTVA
            totaux={totaux}
            setTotaux={setTotaux}
            TVACalculator={TVACalculator}
          />
        </Container>
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
    </ThemeProvider>
  );
};

export default App;
