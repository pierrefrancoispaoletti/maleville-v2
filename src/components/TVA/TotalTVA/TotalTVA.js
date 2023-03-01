import {
  Container,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect } from "react";

const TotalTVA = ({ totaux, setTotaux, TVACalculator }) => {
  useEffect(() => {
    const totalHorsPort =
      Number(TVACalculator.base) +
      Number(TVACalculator.TVA) +
      Number(totaux.port);
    setTotaux({
      ...totaux,
      net: totalHorsPort.toFixed(2),
    });
  }, [TVACalculator.TVA, TVACalculator.base, totaux.port]);
  const handleChangePort = (event) => {
    const { value } = event.target;
    setTotaux({
      ...totaux,
      port: value,
    });
  };
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h5">Totaux</Typography>
      <Container
        sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}
      >
        <FormControlLabel
          control={<TextField fullWidth />}
          disabled
          name="HT"
          labelPlacement="top"
          value={TVACalculator.base}
          label="Total HT"
          placeholder="0"
        />
        <FormControlLabel
          control={
            <TextField fullWidth type="number" inputProps={{ min: 0 }} />
          }
          name="port"
          labelPlacement="top"
          value={totaux.port}
          onChange={handleChangePort}
          label="Port"
          placeholder="0"
        />
        <FormControlLabel
          control={<TextField fullWidth />}
          disabled
          name="TVA"
          labelPlacement="top"
          value={TVACalculator.TVA}
          label="Total TVA"
          placeholder="0"
        />
        <FormControlLabel
          control={<TextField fullWidth />}
          disabled
          name="net"
          labelPlacement="top"
          value={totaux.net}
          label="Net à payer"
          placeholder="0"
        />
      </Container>
    </Container>
  );
};

export default TotalTVA;
