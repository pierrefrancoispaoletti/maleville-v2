import { Container, Divider } from "@mui/material";
import Form from "../Form/Form";
import Header from "../Header/Header";
import { AppContainer } from "./app.style";

const fournisseurs = [
  {
    label: "furnisseur 1",
    id: 1,
    address: {
      addr1: "ligne 1",
      addr2: "ligne 2",
      addr3: "ligne 3",
      cp: "20000",
      ville: "Ajaccio",
    },
  },
  {
    label: "furnisseur 2",
    id: 2,
    address: {
      addr1: "ligne 1-2",
      addr2: "ligne 2-2",
      addr3: "ligne 3",
      cp: "20000",
      ville: "Ajaccio",
    },
  },
];

const projets = [
  { label: "AFF0001", id: "1", nom: "projet 1" },
  { label: "AFF0002", id: "2", nom: "projet 2" },
  { label: "AFF0003", id: "3", nom: "projet 3" },
  { label: "AFF0004", id: "4", nom: "projet 4" },
];

const articles = [
  { label: "article 1", id: "1", nom: "article 1" },
  { label: "article 2", id: "2", nom: "article 2" },
  { label: "article 3", id: "3", nom: "article 3" },
  { label: "article 4", id: "4", nom: "article 4" },
  { label: "article 5", id: "5", nom: "article 5" },
];

const App = () => {
  return (
    <Container>
      <Header fournisseurs={fournisseurs} projets={projets} />
      <Divider sx={{ margin: "20px" }} />
      <Form fournisseurs={fournisseurs} articles={articles} />
    </Container>
  );
};

export default App;
