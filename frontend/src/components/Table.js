import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';



export default function BasicTable(props) {

    const {b, c1 , c2 , c3, setC1, setC2, setC3} = props;

    
      React.useEffect(() => {
      }, [b]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 600}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Code</TableCell>
            <TableCell align="right">Set 1</TableCell>
            <TableCell align="right">Set 2</TableCell>
            <TableCell align="right">Set 3</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {b.map((x) => (
            <TableRow
              key={x.course}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {x.course}
              </TableCell>
              <TableCell align="right"><Button variant="text" onClick = {() => setC1(current => [...current, x.course])}>1</Button></TableCell>
              <TableCell align="right"><Button variant="text" onClick = {() => setC2(current => [...current, x.course])}>2</Button></TableCell>
              <TableCell align="right"><Button variant="text" onClick = {() => setC3(current => [...current, x.course])}>3</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
