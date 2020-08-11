import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  image: {
    backgroundImage: `url(${require('../assets/images/bg1.unsplash.jpg')})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[150]
        : theme.palette.grey[100],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
}));

export default function Informing() {
  const classes = useStyles();
  return (
    <Grid item xs={false} sm={4} md={7} className={classes.image}>
      <Box mt={5}>
        <Container maxWidth='sm'>
          <br />
          <br />
          <br />
          <Typography
            component='h1'
            variant='h2'
            align='center'
            color='textPrimary'
            gutterBottom
          >
            Travels Up
          </Typography>
          <Divider />
          <Typography
            variant='h4'
            align='center'
            color='textPrimary'
            paragraph
            style={{
              backgroundImage:
                'linear-gradient(rgba(255, 255, 255, 0.03) 50%,rgba(0, 0, 0, 0.3) 100%)',
            }}
          >
            Something short and leading about the collection below—its contents,
            the creator, etc. Make it short and sweet, but not too short so
            folks don&apos;t simply skip over it entirely.
          </Typography>
          <br />
          <br />
          <div className={classes.heroButtons}>
            <Grid container spacing={2} justify='center'>
              <Grid item>
                <Button variant='contained' color='primary'>
                  <h3>Main call to action</h3>
                </Button>
              </Grid>
              <Grid item>
                <Button variant='contained' color='#009688'>
                  <h3>Main call to action</h3>
                </Button>
              </Grid>
            </Grid>
          </div>
        </Container>
      </Box>
    </Grid>
  );
}
