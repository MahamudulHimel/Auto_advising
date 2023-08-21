import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

var randomColor = require('randomcolor');

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function display(time, routine){
    return(
        <>
            <Grid item md={1.714}>
                <Item>{time}</Item>
            </Grid>
            {routine.map((x) => 
                <Grid item md={1.714}>
                    {(x == 0)? <Item>{x}</Item> : <Item sx={{color: randomColor()}}>{x}</Item>}
                </Grid>
            )}
        </>
    )
}

export default function RoutineTable(props) {
  const { r } = props;

  React.useEffect(() => {
    
  }, [r])

    let time = ["8:00am", "9:30am", "11:00am", "12:30pm", "2:00pm","3:30pm"]
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        {['/',"Sat","Sun","Mon","Tues","Wed","Thurs"].map((x) =>
        <Grid item md={1.714}>
          <Item>{x}</Item>
        </Grid>
        )}
        {
            [0,1,2,3,4,5].map((i) =>
                display(time[i],r[i])
            )
        }
        
      </Grid>
    </Box>
  );
}
