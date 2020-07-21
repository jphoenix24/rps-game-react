import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardHeader, Container, Typography } from '@material-ui/core/';

export default function Tally(props) {
  const classes = useStyles();
  const header = props.header;
  const player1 = props.player1;
  const player2 = props.player2;
  const adj = props.adj;
  useEffect( ()=>{},[props.player1, props.player2] )

  return(
    <Container>
    <Card className={classes.root} variant="outlined">
        
      <CardHeader className={classes.tallyHeader}
        title={<h3 style={{color:"white"}}>{header}</h3>}/>
      <CardContent>
        <Typography variant="h5" component="h2">
          Player 1 {adj}: {player1}
          <br />
          Player 2 {adj}: {player2}
        </Typography>
      </CardContent>
    </Card>
    </Container>
  );
}

const useStyles = makeStyles({
  root: {
    backgroundColor: '#fcfcfc',
    borderRadius: '15px 15px 15px 15px',
    fontFamily: 'Roboto',
    margin: '0 auto',
    maxWidth: '250px'
  },
  tallyHeader: {
    backgroundColor: '#ef6551',
    borderRadius: '15px 15px 0 0',
    height: '35px'
  }
});