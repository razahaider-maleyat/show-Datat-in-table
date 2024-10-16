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
import { Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
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
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [currentModalImg, setCurrentModalImg] = React.useState<string>(" ");
  const [currentImgDec, setCurrentImgDec] = React.useState<string>("");
  const [currentTitle, setCurrentTitle] = React.useState<string>("");
  const [visibleCount, setVisibleCount] = React.useState<number>(5);
  const handleOpen = (
    currentImageURL: string,
    currentImgDecs: string,
    currentTitle: string
  ) => {
    setIsModalOpen(true);
    setCurrentModalImg(currentImageURL);
    setCurrentImgDec(currentImgDecs);
    setCurrentTitle(currentTitle);
  };
  const handleClose = () => {
    setIsModalOpen(false);
    setCurrentModalImg(" ");
    setCurrentImgDec("");
    setCurrentTitle("");
  };

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => Math.min(prevCount + 5, postsData?.length)); // Load 5 more products
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
                  <TableCell align="left">Image</TableCell>
                  <TableCell align="left">Description</TableCell>
                  <TableCell align="left">Title</TableCell>
                  <TableCell align="left">Price</TableCell>
                  <TableCell align="left">Category</TableCell>
                  <TableCell align="left">Rating</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {postsData?.slice(0, visibleCount).map((row) => (
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
                        onClick={() =>
                          handleOpen(row.image, row.description, row.title)
                        }
                        sx={{
                          width: { xs: 50, sm: 60 },
                          height: { xs: 50, sm: 60 },
                        }}
                      >
                        <Tooltip title={row.title}>
                          <img
                            src={row.image}
                            loading="lazy"
                            style={{ width: "100%", height: "auto" }}
                          />
                        </Tooltip>
                      </Box>
                    </TableCell>
                    <Tooltip title={row.description}>
                    <TableCell align="left">{row.description}</TableCell>
                    </Tooltip>
                    <TableCell align="left">{row.title}</TableCell>
                    <TableCell align="left">{row.price}</TableCell>
                    <TableCell align="left">{row.category}</TableCell>
                    <TableCell align="left">
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
        {visibleCount < postsData?.length && (
          <Button
            variant="contained"
            onClick={handleLoadMore}
            sx={{ margin: "16px auto", display: "block" }}
          >
            Load More
          </Button>
        )}
      </TableContainer>

      <React.Fragment>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={isModalOpen}
        >
          <DialogTitle
            sx={{ my: 0, mx: 2, p: 2, fontSize: 15 }}
            id="customized-dialog-title"
          >
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
