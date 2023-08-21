import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import RoutineTable from './RoutineTable';
import CourseDetail from './CourseDetail';
import ExamRoutine from './ExamRoutine';
import DropDownList from './DropDownList.js'
import SelectedCourses from './SelectedCourse';
import BasicTable from './Table'

export default function CourseSelect(props){
    const { userId } = props;

    let a = []
    let c = []
    const [b, setB] = React.useState([])

    const [c1, setC1] = React.useState([]);
    const [c2, setC2] = React.useState([]);
    const [c3, setC3] = React.useState([]);

    function change(i, c, setC){
        let arr1 = [...c];
        arr1.splice(i,1);
        setC(arr1);
      }

      const fetchData = async () =>{
        a = await fetch(`http://localhost:4000/courses`)
        c = await a.json()
        setB(c)
      }

      React.useEffect(() => {
        fetchData()
      }, []);


    return (<>
        <Box sx={{ flexGrow: 1 }}>
    <Grid container spacing={5}>
      <Grid item xs={8}>

        <Grid container>
          <Grid item xs={12}>
            <BasicTable b = {b} c1 = {c1} setC1 = {setC1} c2 = {c2} setC2 = {setC2} c3 = {c3} setC3 = {setC3}/>
          </Grid>
        </Grid>

      </Grid>

      <Grid item xs={4}>
        {/* <DropDownList s = {s} handleChange = {handleChange_dropdown} /> */}
        <Grid item xs={12} sx={{padding:"10px"}}>
            <SelectedCourses set = {1} courses = {c1} change = {change} setCourses= {setC1} userId = {userId}/>
        </Grid>
        <Grid item xs={12} sx={{padding:"10px"}}>
            <SelectedCourses set = {2} courses = {c2} change = {change} setCourses = {setC2} userId = {userId}/>
        </Grid>
        <Grid item xs={12} sx={{padding:"10px"}}>
            <SelectedCourses set = {3} courses = {c3} change = {change} setCourses = {setC3} userId = {userId}/>
        </Grid>
        
      </Grid>
    </Grid>
    </Box>
    
    </>)
}