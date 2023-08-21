import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import RoutineTable from './RoutineTable';
import CourseDetail from './CourseDetail';
import ExamRoutine from './ExamRoutine';
import DropDownList from './DropDownList.js'

export default function HomePage(props) {

  const { userId } = props;

  const [r, setR] = React.useState([
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0]
  ]);

  const [s, setS] = React.useState(1)

  const [d, setD] = React.useState([])

  const handleChange_dropdown = (event) => {
    setS(event.target.value);
  };

  const fetchData = async () =>{
    const a = await fetch(`http://localhost:4000/routine/${s}/${userId}`)
    const b = await a.json()
    setR(b[0]);
    setD(b[1])
  }


  React.useEffect(() => {
    fetchData()
  }, [s]);
 
  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
    <Grid container spacing={5}>
      <Grid item xs={8}>

        <Grid container>
          <Grid item xs={12}>
            <RoutineTable r = {r}/>
          </Grid>
          <Grid item xs={12}>
            <ExamRoutine d = {d}/>
          </Grid>
        </Grid>

      </Grid>

      <Grid item xs={4}>
        <DropDownList s = {s} handleChange = {handleChange_dropdown} />
      </Grid>
    </Grid>
    </Box>
    </>
  );
}