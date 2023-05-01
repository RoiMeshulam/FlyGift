import React, { useEffect, useState } from "react";
import {
  Grid,
  Box,
  Typography,
  Autocomplete,
  TextField,
} from "@mui/material";
import { styled } from "@mui/system";
import { grey } from "@mui/material/colors";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import Papa from "papaparse";
import allAirports from "./allAirports.csv";

// npm install papaparse --save
const TextFieldCenter = styled(TextField)({
    "& .MuiInputLabel-root":{
        marginTop: "5px",
        left: '35%'
    }
  });

const GridRtl = styled(Grid)({
  direction: "rtl",
});

const AutocompleteW = styled(Autocomplete)({
  "& .MuiOutlinedInput-root": {
    background: "white",
    border: "1px solid",
    height: "53px",
  },
});

const AltIcon = styled(SyncAltIcon)({
  color: grey[500],
});

const SelectFlights = ({ departure, setDeparture, arrival, setArrival }) => {
  const [airports, setAirports] = useState([]);
 
  useEffect(() => {
    const fetchParseData = async () => {
      Papa.parse(allAirports, {
        download: true,
        delimiter: ",",
        complete: (results) => {
          const airportsFormat = results.data
            .slice(1)
            .map(
              (row) => row[0] + "," + row[15] + "," + row[29] + "," + row[19]
            );
          const a = airportsFormat.map((row) => ({
            value: row,
            label: row.charAt(0).toUpperCase() + row.slice(1),
          }));
          setAirports(a);
        },
      });
    };
    fetchParseData();
  }, []);

  const handleDepartureChange = (value) => {
    setDeparture(value);
  };

  const handleArrivalChange = (value) => {
    setArrival(value);
  };

  const swapDirections = () => {
    const temp = arrival;
    setArrival(departure);
    setDeparture(temp);
  }

  return (
    <GridRtl container height={100}>
      <Grid item sm={5}>
        <Box display={"grid"} marginRight={"5%"}>
          <Typography variant="h6" fontWeight={"700"} color={grey[100]}>
            {"מוצא"}
          </Typography>
          <AutocompleteW
            disablePortal
            id="departure_autocomplete"
            value={departure}
            options={Array.from(new Set(airports.map((row) => row.value))).map(
              (airport) => airport
            )}
            onChange={(event,value) => { handleDepartureChange(value);}}
            renderInput={(params) => (
              <TextFieldCenter
                {...params}
                label={"בחר/י מהרשימה"}
                size="small"
                sx={{ py: 0, fontSize: "6px,1.5vw", mr: 1, Width: "100%" }}
                InputLabelProps={{ style: { fontSize: "6px,1.5vw" } }}
                inputProps={{
                  style: { fontSize: "6px,1.5vw" },
                  ...params.inputProps,
                  autoComplete: "new-password", // disable autocomplete and autofill
                }}
              />
            )}
          />
        </Box>
      </Grid>
      <Grid item sm={1} display={"flex"} justifyContent={"center"}>
        <Box alignSelf={"center"} marginTop={"10%"}>
          <AltIcon fontSize="large" onClick={swapDirections}/>
        </Box>
      </Grid>
      <Grid item sm={5}>
        <Box display={"grid"} marginLeft={"-10%"}>
          <Typography variant="h6" fontWeight={"700"} color={grey[100]}>
            {"יעד"}
          </Typography>
          <AutocompleteW
            sx={{width:'90%'}}
            disablePortal
            id="departure_autocomplete"
            value={arrival}
            options={Array.from(new Set(airports.map((row) => row.value))).map(
              (airport) => airport
            )}
            onChange={(event,value) => { handleArrivalChange(value);}}
            renderInput={(params) => (
              <TextFieldCenter
                {...params}
                label={"בחר/י מהרשימה"}
                size="small"
                sx={{ py: 0, fontSize: "6px,1.5vw", mr: 1, Width: "100%", display:'flex' }}
                InputLabelProps={{ style: { fontSize: "6px,1.5vw" } }}
                inputProps={{
                  style: { fontSize: "6px,1.5vw" },
                  ...params.inputProps,
                  autoComplete: "new-password", // disable autocomplete and autofill
                }}
              />
            )}
          />
        </Box>
      </Grid>
    </GridRtl>
  );
};

export default SelectFlights;
