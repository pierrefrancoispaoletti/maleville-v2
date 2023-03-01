import {
  Autocomplete,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  useTheme,
} from "@mui/material";
import {
  AddressBlock,
  ContainerWrapper,
  TableCellStyled,
  TableContainerStyled,
} from "./header.style";

const Header = ({
  titre,
  fournisseurs,
  projets,
  user,
  setFournisseur,
  setProjet,
  fournisseur,
  projet,
  reference,
  setReference,
  edit,
  NCommande,
}) => {
  const { FirstName, LastName } = user;
  const handleChangeFournisseur = (e, newValue, reason) => {
    if (reason === "clear") {
      setFournisseur({});
    }
    setFournisseur(newValue);
  };
  const handleChangeProjet = (e, newValue, reason) => {
    if (reason === "clear") {
      setProjet({});
    }
    setProjet(newValue);
  };
  const handleChangeReference = (e) => {
    const { value } = e.target;
    setReference(value);
  };
  const defaultPropsProjet = {
    getOptionLabel: (option) => {
      if (Object.keys(option).length === 0 || !option) {
        return "";
      }
      return option?.label;
    },
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
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCellStyled>N Commande</TableCellStyled>
                  <TableCell align="right">
                    {NCommande.length > 0
                      ? NCommande
                      : "Généré à la soumission du formulaire"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCellStyled>Code projet</TableCellStyled>
                  <TableCell align="right">
                    <Autocomplete
                      {...defaultPropsProjet}
                      disablePortal
                      id="projets-select"
                      options={projets}
                      value={projet}
                      onChange={handleChangeProjet}
                      sx={{ width: 300 }}
                      renderInput={(params) => {
                        return <TextField {...params} label="Code projet" />;
                      }}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCellStyled>Nom du projet</TableCellStyled>
                  <TableCell align="right">{projet?.nom}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCellStyled>Référence</TableCellStyled>
                  <TableCell align="right">
                    <TextField
                      value={reference}
                      onChange={handleChangeReference}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCellStyled>Demandeur</TableCellStyled>
                  <TableCell align="right">{`${FirstName} ${LastName}`}</TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </TableContainerStyled>
        </div>
      </div>
      <div>
        <ContainerWrapper>
          <h1>{titre}</h1>
        </ContainerWrapper>
        <div>
          <div>
            <Autocomplete
              {...defaultProps}
              disablePortal
              id="fournisseur-select"
              options={fournisseurs}
              value={fournisseur}
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
                {fournisseur.nom && <p>{fournisseur.nom}</p>}
                {fournisseur.address.addr1 && (
                  <p>{fournisseur.address.addr1}</p>
                )}
                {fournisseur.address.addr2 && (
                  <p>{fournisseur.address.addr2}</p>
                )}
                {fournisseur.address.addr3 && (
                  <p>{fournisseur.address.addr3}</p>
                )}
                {fournisseur.address.cp && (
                  <span>{fournisseur.address.cp}</span>
                )}{" "}
                {fournisseur.address.ville && (
                  <span>{fournisseur.address.ville}</span>
                )}{" "}
                {fournisseur.address.pays && (
                  <span>{fournisseur.address.pays}</span>
                )}
              </address>
            </AddressBlock>
          )}
          <AddressBlock>
            <p>Adresse de livraison :</p>
            <address>
              <p>Maleville</p>
              <p>66 rue Saint Dominique</p>
              <span>75007</span> <span>Paris</span> <span>FR</span>
            </address>
          </AddressBlock>
        </div>
      </div>
    </ContainerWrapper>
  );
};

export default Header;
