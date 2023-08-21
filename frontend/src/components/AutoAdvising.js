import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import CourseDetail from './CourseDetail';
import ExamRoutine from './ExamRoutine';
import TimeSelect from './TimeSelect';
import SelectedCourses from './SelectedCourse';
import CourseSearch from './CourseSearch';


export default function HomePage() {
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
    console.log(arr)
    setAllowed(arr)
  },[allowed])

  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
    <Grid container spacing={1}>
      <Grid item xs={8}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
        {/* <Grid item xs={12}>
            <CourseSearch />
          </Grid> */}
          <Grid item xs={10}>
            <TimeSelect allowed = {allowed} change = {change}/>
          </Grid>
          <Grid item xs={2}>
            <SelectedCourses />
          </Grid>
        </Grid>
        </Box>
      </Grid>

      {/* <Grid item xs ={4}><CourseDetail id = "1"></CourseDetail></Grid> */}
    </Grid>
    </Box>
    </>
  );
}