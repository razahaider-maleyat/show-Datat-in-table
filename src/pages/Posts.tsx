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
import { Typography } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Grid from "@mui/material/Grid2";
import Image from "next/image";

type PostsTableProps = {
  postsData: PostData[];
};
const modalStyle = {
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: "10px",
  overflow: "hidden",
  p: 2,
  zIndex: 1000,

  display: "flex",
  flexDirection: "column",
  border: "1px solid #b1a7a7",

  ".css-4nmryk-MuiBackdrop-root-MuiModal-backdrop": {
    backgroundColor: "#fff !important",
  },
};

export default function PostsTable({ postsData }: PostsTableProps) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [currentModalImg, setCurrentModalImg] = React.useState("");
  const [currentImgDec, setCurrentImgDec] = React.useState("");

  const handleOpen = (currentImageURL: string, currentImgDecs: string) => {
    setIsModalOpen(true);
    setCurrentModalImg(currentImageURL);
    setCurrentImgDec(currentImgDecs);
  };
  const handleClose = () => {
    setIsModalOpen(false);
    setCurrentModalImg("");
    setCurrentImgDec("");
  };

  return (
    <>
      <TableContainer>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 12, md:12 }}>
            <Table aria-label="simple table" sx={{border:"1px solid #b1a7a7"}}>
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
                {postsData?.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      align="right"
                      sx={{
                        width: { xs: "100%", sm: 150 },
                        height: { xs: 100, sm: 150 },
                        cursor: "pointer",
                      }}
                    >
                      <Box
                        onClick={() => handleOpen(row.image, row.description)}
                      >
                        <img
                          src={row.image}
                          loading="lazy"
                          style={{ width: "100%", height: "auto" }}
                        />
                      </Box>
                    </TableCell>
                    <TableCell align="right">{row.title}</TableCell>
                    <TableCell align="right">{row.price}</TableCell>
                    <TableCell align="right">{row.category}</TableCell>
                    <TableCell align="right">
                      <Rating
                        name="read-only"
                        value={row.rating.rate}
                        readOnly
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Grid>
        </Grid>
      </TableContainer>

      <Modal open={isModalOpen} sx={modalStyle}>
        <>
          <HighlightOffIcon
            sx={{ color: "#c62828", ml: "auto", cursor: "pointer" }}
            onClick={handleClose}
          />

          <img
            src={currentModalImg}
            loading="lazy"
            style={{ width: "150px", height: "150px", margin: "auto" }}
          />

          <Typography
            sx={{ mt: 2, overflow: "auto", scrollbarWidth: "none" }}
            component="p"
          >
            {currentImgDec}
          </Typography>
        </>
      </Modal>
    </>
  );
}
