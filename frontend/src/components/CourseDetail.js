import { Box, Button, Card, CardActions, Toolbar, Typography } from '@mui/material';
import * as React from 'react';

export default function CourseDetail(id){
    const [num , setNum] = React.useState(id)
    let courses = [
        {name:"a", id:1, time:"aasa", instructor: "aaa", title:"aaaa", code:"aaa"},
        {name:"b", id:2, time:"aasa", instructor: "aaa", title:"aaaa", code:"aaa"},
    ]
    if ((num)) return (
        <>
        <Box component="div" sx={{ overflow: 'scroll', height:600}}>
            <Card elevation={10}>
                {courses[num].code}
                {courses[num].time}
                {courses[num].name}
            </Card>
        </Box>
        <Button fullWidth variant='contained' color= "error" onClick={()=> setNum("")}>Close</Button>
        </>
    
);

    else return (
        <>
        <Box component="div" sx={{ overflow: 'scroll', height:600}}>
            <Card elevation={10}>
            </Card>
        </Box>
        <Button fullWidth variant='contained' color= "error" onClick={()=> setNum("")}>Close</Button>
    </>
    );
}