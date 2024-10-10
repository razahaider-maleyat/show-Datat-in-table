import * as React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { PostData } from "@/app/page";
import Rating from "@mui/material/Rating";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
type PostsTableProps = {
  postsData: PostData[];
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  p: 4,
  zIndex:1000,
  height: 400,
  
};

export default function PostsTable({ postsData }: PostsTableProps) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [currentModalImg, setCurrentModalImg] = React.useState("");

  const handleOpen = (currentImageURL: string) => {
    setIsModalOpen(true);
    setCurrentModalImg(currentImageURL);
  }

  console.log(currentModalImg)

  const handleClose = () => {
    setIsModalOpen(false);
    setCurrentModalImg("");
  }

  return (
    <Box sx={{mx:320, width:"100%", margin:'auto', paddingX: 20, my:2}}>
    <TableContainer sx={{position:'relative', width:'100%', border:1, borderColor: '#f3f3f3'}}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right"></TableCell>
            <TableCell align="left">Title</TableCell>
            <TableCell align="left">Price</TableCell>
            <TableCell align="left">Category</TableCell>
            <TableCell align="left">Rating</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {postsData?.map((row: PostData) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                align="right"
                sx={{ width: 150, height: 150 , cursor:"pointer"}}
              >
                  <Box onClick={()=> handleOpen(row.image)}>
                    <img src={row.image} loading="lazy" />
                  </Box>
                  <Box>
                  {isModalOpen &&
                  <Modal open={isModalOpen} onClose={handleClose} sx={modalStyle}>
                  <img src={currentModalImg} loading="lazy" style={{width:'100%', height:'100%'}} />
                </Modal>}
                  </Box>
              </TableCell>
              <TableCell align="right">{row.title}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{row.category}</TableCell>
              <TableCell align="right">
                <Rating name="read-only" value={row.rating.rate} readOnly />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
  );
}
