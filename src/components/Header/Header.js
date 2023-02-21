import {
  Autocomplete,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useState } from "react";
import {
  AddressBlock,
  ContainerWrapper,
  TableContainerStyled,
} from "./header.style";

const Header = ({ fournisseurs, projets }) => {
  const [projet, setProjet] = useState("");
  const [fournisseur, setFournisseur] = useState({});
  const handleChangeFournisseur = (e, newValue, reason) => {
    if (reason === "clear") {
      setFournisseur({});
    }
    setFournisseur({ ...newValue?.address });
  };
  const handleChangeProjet = (e, newValue) => {
    setProjet(newValue?.nom);
  };
  return (
    <ContainerWrapper>
      <div>
        <div className="img-wrapper">
          <img
            width={300}
            src={process.env.PUBLIC_URL + "/images/logo-maleville.png"}
            alt="logo de l'entreprise maleville"
          />
        </div>
        <div>
          <TableContainerStyled>
            <Table sx={{}} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>N Commande</TableCell>
                  <TableCell align="right">TEST</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Code projet</TableCell>
                  <TableCell align="right">
                    <Autocomplete
                      disablePortal
                      id="projets-select"
                      options={projets}
                      onChange={handleChangeProjet}
                      sx={{ width: 300 }}
                      renderInput={(params) => {
                        return <TextField {...params} label="Code projet" />;
                      }}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Nom du projet</TableCell>
                  <TableCell align="right">{projet}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Référence</TableCell>
                  <TableCell align="right">
                    <TextField />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Demandeur</TableCell>
                  <TableCell align="right">TEST</TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </TableContainerStyled>
        </div>
      </div>
      <div>
        <h1>Demande d'achat(s)</h1>
        <div>
          <div>
            <p>Paris, le 10/10/2023</p>
          </div>
          <div>
            <Autocomplete
              disablePortal
              id="fournisseur-select"
              options={fournisseurs}
              onChange={handleChangeFournisseur}
              sx={{ width: 300 }}
              renderInput={(params) => {
                return <TextField {...params} label="Fournisseurs" />;
              }}
            />
          </div>
          {Object.keys(fournisseur).length > 0 && (
            <AddressBlock>
              <address>
                {fournisseur.addr1 && <p>{fournisseur.addr1}</p>}
                {fournisseur.addr2 && <p>{fournisseur.addr2}</p>}
                {fournisseur.addr3 && <p>{fournisseur.addr3}</p>}
                {fournisseur.cp && <p>{fournisseur.cp}</p>}
                {fournisseur.ville && <p>{fournisseur.ville}</p>}
              </address>
            </AddressBlock>
          )}
          <AddressBlock>
            <p>Adresse de livraison :</p>
            <address>
              <p>addr l1</p>
              <p>addr l2</p>
              <p>addr l3</p>
              <p>cp</p>
              <p>ville</p>
            </address>
          </AddressBlock>
        </div>
      </div>
    </ContainerWrapper>
  );
};

export default Header;
