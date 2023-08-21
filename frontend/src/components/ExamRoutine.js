import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const courses = [
    {name:"a", date: "5555", time:"4444"},
    {name:"a", date: "5555", time:"4444"},
    {name:"a", date: "5555", time:"4444"},
    {name:"a", date: "5555", time:"4444"},
];

const attr = ["name" , "date", "time"];

export default function ExamRoutine(props){
    const { d } = props;
    return (
        <Box sx={{ flexGrow: 1 , padding:0, paddingTop:4}}>
            <Grid container spacing={1}>
                <Grid item xs = {12}><h3>Exam Routine</h3></Grid>
                {attr.map(x => 
                <Grid item xs={4}><Item>{x}</Item></Grid>
                )}
                {console.log(d)}
                {d.map((x)=>
                    <>
                    <Grid item xs = {4}>
                        <Item>{x.course}</Item>
                    </Grid>
            
                    <Grid item xs = {4}>
                        <Item>{x.date}</Item>
                    </Grid>
            
                    <Grid item xs = {4}>
                        <Item>{x.time}</Item>
                    </Grid>
                    </>
                )}
            </Grid>
        </Box>
    )
}