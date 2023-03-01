import {
  Container,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect } from "react";

const TVACalculatorComponent = ({
  TVACalculator,
  setTVACalculator,
  articlesList,
}) => {
  useEffect(() => {
    const totalHT = articlesList.reduce(
      (acc, { prix, qte }) => acc + prix * qte,
      0
    );
    const totalTVA = TVACalculator.base * (TVACalculator.taux / 100);
    setTVACalculator((prev) => ({
      ...prev,
      base: totalHT.toFixed(2),
      TVA: totalTVA.toFixed(2),
    }));
  }, [articlesList, TVACalculator.base, TVACalculator.taux, setTVACalculator]);

  const onChangeTaux = (e) => {
    const { name } = e.target;
    setTVACalculator({
      ...TVACalculator,
      [name]: Number(e.target.value),
    });
  };
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h5">Taux TVA</Typography>
      <FormControlLabel
        control={
          <TextField
            fullWidth
            type="number"
            inputProps={{ min: 0, max: 20, step: 1 }}
          />
        }
        name="taux"
        labelPlacement="top"
        label="Taux"
        placeholder="0"
        value={TVACalculator.taux}
        onChange={onChangeTaux}
      />
      <FormControlLabel
        control={<TextField fullWidth />}
        disabled
        name="base"
        value={TVACalculator.base}
        labelPlacement="top"
        label="HT"
        placeholder="0"
      />
      <FormControlLabel
        control={<TextField fullWidth />}
        disabled
        name="TVA"
        value={TVACalculator.TVA}
        labelPlacement="top"
        label="TVA"
        placeholder="0"
      />
    </Container>
  );
};

export default TVACalculatorComponent;
