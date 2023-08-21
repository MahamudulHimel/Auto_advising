import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import TimeSelect from './TimeSelect';
import { Button } from '@mui/material';


export default function Time_Set(props) {

  const { userId } = props;

  const [allowed, setAllowed] = React.useState([
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
  ]);

  const change = React.useCallback((i,j) => {
    let arr = JSON.parse(JSON.stringify(allowed));
    if (allowed[i][j]) arr[i][j] = 0
    else arr[i][j] = 1;
    setAllowed(arr)
  },[allowed])

  const handleClick = () => {
    let arr1 = [] 
    for (let i in allowed){
        for (let j in allowed[i]){
            if (allowed[i][j]){
                arr1.push([parseInt(j)+1 , parseInt(i)+1])
            }
        }
    }
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ allowed_time : arr1 })
    };
    fetch(`http://localhost:4000/time_set/${userId}`, requestOptions);

  }

  React.useEffect(() => {
    fetch(`http://localhost:4000/time_get/${userId}`)
      .then((response) => response.json())
      .then((actualData) => setAllowed(actualData['routine']));
  }, []);

  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
    <Grid container spacing={1}>
      <Grid item xs={10}>
        <Box sx={{ flexGrow: 1 }}>
            <TimeSelect allowed = {allowed} userId = {userId} change = {change}/>
        </Box>
      </Grid>
      <Grid item xs={2}>
      </Grid>
      <Grid item xs={10}>
      </Grid>
      <Grid item xs={2}>
        <Box sx={{ flexGrow: 1 }}>
            <Button fullWidth onClick={()=>handleClick()} variant="contained" color="success" size='large'>Submit</Button>
        </Box>
      </Grid>

    </Grid>
    </Box>
    </>
  );
}