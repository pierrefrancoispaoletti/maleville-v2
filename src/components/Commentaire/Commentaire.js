import { TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";

const Commentaire = ({ commentaire, setCommentaire }) => {
  const handleChangeCommentaire = (e) => {
    setCommentaire(e.target.value);
  };
  return (
    <Container>
      <Typography variant="h5">Commentaire</Typography>
      <TextField
        value={commentaire}
        style={{ width: "100%" }}
        multiline
        rows={8}
        onChange={handleChangeCommentaire}
      />
    </Container>
  );
};

export default Commentaire;
