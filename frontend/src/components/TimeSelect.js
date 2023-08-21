import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function RoutineTable(props) {
  const {allowed , change} = props

React.useEffect(()=>{
  
},[allowed])

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
            <>
            <Grid item md={1.714}>
                <Item>{time[i]}</Item>
            </Grid>
            {[0,1,2,3,4,5].map((j) => 
                <Grid item md={1.714}>
                    <Box >
                    <Button onClick = {() => change(i,j)} variant={(allowed[i][j]===1)? "contained": "outlined"} fullWidth>{(allowed[i][j]===1)? "Selected": "OO"}</Button>
                    </Box>
                </Grid>
            )}
        </>
            )
        }
        
      </Grid>
    </Box>
  );
}
