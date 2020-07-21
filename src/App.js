import React, { useState, useEffect } from "react";
import "./App.css";
import AppButton from "./components/AppButton";
import MySnackBar from "./components/MySnackBar";
import Tally from "./components/Tally";
import CachedIcon from "@material-ui/icons/Cached";
import { Box, Grid, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

function App() {
  const classes = useStyles();
  const [totalCountLimit, setTotalCountLimit] = useState(5);
  const [countPlayer1Wins, setPlayer1WinCount] = useState(0);
  const [countPlayer2Wins, setPlayer2WinCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [countPlayer1Tally, setPlayer1Tally] = useState(0);
  const [countPlayer2Tally, setPlayer2Tally] = useState(0);
  const [onePointAway, setOnePointAway] = useState(false);
  const [twoPointsAway, setTwoPointsAway] = useState(false);
  const [winSnackBarVisibility, setWinSnackBarVisibility] = useState(false);
  const [gameOverSnackBarVisibility, setGameOverSnackBarVisibility] = useState(false);

  function player1_add_win() {
    if(countPlayer1Wins >= totalCountLimit) {
      setPlayer1Tally(countPlayer1Tally + 1);
    }
  }

  function player2_add_win() {
    if(countPlayer2Wins >= totalCountLimit) {
      setPlayer2Tally(countPlayer2Tally + 1);
    }
  }

  function player1_clicked() {
    if(!gameOver) {
      setPlayer1WinCount(countPlayer1Wins + 1);
    }
  }

  function player2_clicked() {
    if(!gameOver) {
      setPlayer2WinCount(countPlayer2Wins + 1);
    }
  }

  function reset() {
    setPlayer1WinCount(0);
    setPlayer2WinCount(0);
    setGameOver(false);
    setOnePointAway(false);
    showGameOverSnackBar();
  }
 
  function showWinSnackBar() {
    setWinSnackBarVisibility(true);
  }

  function hideWinSnackBar() {
    setWinSnackBarVisibility(false);
  }

  function showGameOverSnackBar() {
    setGameOverSnackBarVisibility(true);
  }

  function hideGameOverSnackBar() {
    setGameOverSnackBarVisibility(false);
  }

  const handleChange = (event) => {
    setTotalCountLimit(parseInt(event.target.value));
  };

  useEffect(() => {
    if(countPlayer1Wins >= totalCountLimit) {
      showWinSnackBar();
      player1_add_win();
      setGameOver(true);
    }
  }, [countPlayer1Wins]);

  useEffect(() => {
    if(countPlayer2Wins >= totalCountLimit) {
      showWinSnackBar();
      player2_add_win();
      setGameOver(true);
    }
  }, [countPlayer2Wins]);

  useEffect(() => {
    if(countPlayer1Wins === (totalCountLimit - 1) || countPlayer2Wins === (totalCountLimit - 1)) {
      setOnePointAway(true);
      setTwoPointsAway(false);
    }
  }, [countPlayer1Wins, countPlayer2Wins]);

  useEffect(() => {
    if(countPlayer1Wins === (totalCountLimit - 2) || countPlayer2Wins === (totalCountLimit - 2)) {
      setTwoPointsAway(true);
    }
  }, [countPlayer1Wins, countPlayer2Wins]);

  return(
    <div className="App">
      <Grid container direction="column" justify="center" spacing={6}>
        <Grid item>
          <Typography variant="h3" gutterBottom>
            Rock Paper Scissors Game
          </Typography>
          <img
            style={{ height: 200 }}
            alt="Rock Paper Scissors"
            src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fstatic1.squarespace.com%2Fstatic%2F595543f6b11be1695b0fdb29%2Ft%2F59555414cd0f68572370bb64%2F1498764324553%2FDFP-RockPaperScissors-Black.png%3Fformat%3D1000w&f=1&nofb=1"
          />
        </Grid>
        <Grid item>
          <Grid container position="row" justify="center">
            <Grid item>
              <Tally
                header="SCOREBOARD"
                adj="points"
                player1={countPlayer1Wins}
                player2={countPlayer2Wins}
              />
            </Grid>
            <Grid item>
              <Tally
                header="TALLY OF WINS"
                adj="wins"
                player1={countPlayer1Tally}
                player2={countPlayer2Tally}
              />
            </Grid>
          </Grid>
          <Grid item>
            <Box className={classes.container}>
              <Typography variant="h6" gutterBottom>
                First to reach {totalCountLimit} points wins
              </Typography>
              <TextField
                id="standard-basic"
                label="Win"
                type="number"
                variant="outlined"
                value={totalCountLimit}
                onChange={handleChange}
              />
            </Box>
            <Grid container justify="center">
              <Grid item>
                <AppButton label="Player One" onClick={player1_clicked} />
              </Grid>
              <Grid item>
                <AppButton label="Player Two" onClick={player2_clicked} />
              </Grid>
              <Grid item>
                <AppButton
                  label="Reset"
                  onClick={reset}
                  startIcon={<CachedIcon />}
                />
              </Grid>
            </Grid>
            <MySnackBar
              open={winSnackBarVisibility}
              autoHideDuration={2000}
              message="Congratulations, you win!"
              onClose={hideWinSnackBar}
              type="success"
            />
            <MySnackBar
              open={gameOverSnackBarVisibility}
              autoHideDuration={2000}
              message="A new game has begun, good luck."
              onClose={hideGameOverSnackBar}
              type="info"
            />
            <MySnackBar
              open={twoPointsAway}
              autoHideDuration={2000}
              message="Two more points until victory!"
              onClose={onePointAway}
              type="warning"
            />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(5)
  },
}));

export default App;