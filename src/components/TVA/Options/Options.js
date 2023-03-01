import { Checkbox, FormControlLabel, Typography } from "@mui/material";
import { Container } from "@mui/system";

const Options = ({ options, setOptions }) => {
  const handleCheckOptions = (e) => {
    setOptions({ ...options, [e.target.name]: e.target.checked });
  };

  return (
    <Container sx={{ display: "flex", flexDirection: "column" }}>
      <Typography variant="h5">Conditions de paiement</Typography>
      <FormControlLabel
        control={<Checkbox />}
        label="Accompte de 30%"
        name="30"
        onClick={handleCheckOptions}
        checked={options["30"]}
      />
      <FormControlLabel
        control={<Checkbox />}
        label="Accompte de 50%"
        name="50"
        onClick={handleCheckOptions}
        checked={options["50"]}
      />
      <FormControlLabel
        control={<Checkbox />}
        label="Paiement à 100% lors de la commande"
        name="cash-pistache"
        onClick={handleCheckOptions}
        checked={options["cash-pistache"]}
      />
    </Container>
  );
};

export default Options;
