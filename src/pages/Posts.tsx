import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { PostData } from "@/app/page";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";

type PostsTableProps = {
  postsData: PostData[];
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function PostsTable({ postsData }: PostsTableProps) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [currentModalImg, setCurrentModalImg] = React.useState("");
  const [currentImgDec, setCurrentImgDec] = React.useState("");
  const [currentTitle, setCurrentTitle] = React.useState("");

  const handleOpen = (currentImageURL: string, currentImgDecs: string, currentTitle: string) => {
    setIsModalOpen(true);
    setCurrentModalImg(currentImageURL);
    setCurrentImgDec(currentImgDecs);
    setCurrentTitle(currentTitle);
  };
  const handleClose = () => {
    setIsModalOpen(false);
    setCurrentModalImg("null");
    setCurrentImgDec("");
    setCurrentTitle("");
  };

  return (
    <>
      <TableContainer>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 12, md: 12 }}>
            <Table
              aria-label="simple table"
              sx={{ border: "1px solid #b1a7a7" }}
            >
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
                        onClick={() => handleOpen(row.image, row.description, row.title)} sx={{
                          width: { xs: 50, sm: 80 },
                          height: { xs: 50, sm: 80 },
                        }}
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

      <React.Fragment>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={isModalOpen}
        >
          <DialogTitle sx={{ my:0,mx:2, p: 2, fontSize:15 }} id="customized-dialog-title">
            {currentTitle}
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={(theme) => ({
              position: "absolute",
              right: 8,
              top: 8,
              color: theme.palette.grey[500],
            })}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>
            <img
              src={currentModalImg}
              loading="lazy"
              style={{ width: "150px", height: "150px", margin: "auto" }}
            />
            <Typography gutterBottom sx={{ mt: 2 }} component="p">
              {currentImgDec}
            </Typography>
          </DialogContent>
        </BootstrapDialog>
      </React.Fragment>
    </>
  );
}
