import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { CardHeader, TextField } from '@mui/material';
import { Message } from '@mui/icons-material';


const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function SelectedCourses(props) {

  const [num, setNum] = React.useState(1)

  const { set , courses, change , setCourses, userId} = props;


  const handleClick = (set, num , userId, courses) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "courses": courses, "num" : num })
    };
    console.log(num,courses)
    fetch(`http://localhost:4000/auto_advise/${userId}/${set}`, requestOptions).then(alert(num,courses));

  }

  React.useEffect(() => {
  }, [courses]);

  return (
    <Card sx={{ 
        height: "95%",
        display: "flex",
        flexDirection: "column", padding:"10px"
      }}>
          
        <CardContent>
        <Typography sx={{ mb: 1.5 }}>
            Courses Selected for {set}
          </Typography>
        <Card elevation={0} sx={{ overflow: 'auto' }}>
        {Object.keys(courses).map((x)=>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
            <IconButton aria-label="delete" size="small">
              <DeleteIcon fontSize="inherit" onClick = {()=> change(x, courses, setCourses)}/>
            </IconButton>
              {courses[x]}
        </Typography>
        )}
       
        </Card>
      </CardContent>
      <CardActions disableSpacing sx={{ mt: "auto" }}>
      <TextField id="outlined-basic" label="TargetNum" size="small" onChange={(event) => {setNum(event.target.value)}}>{num}</TextField>
        <Button fullWidth variant='contained' color='success' onClick={() => handleClick(set,num,userId,courses)}>Advice-{set}</Button>
      </CardActions>
    </Card>
  );
}