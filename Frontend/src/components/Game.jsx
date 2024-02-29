import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const BlogDetails = () => {
  const [inputs, setInputs] = useState({});
  const [blog, setBlog] = useState({});
  const id = useParams().id;
  const navigate = useNavigate();
  const getBlogDetails = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/blog/get-blog/${id}`
      );
      if (data.success) {
        setBlog(data?.blog);
        setInputs({
          title: data?.blog.title,
          description: data?.blog.description,
          image: data?.blog.image,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlogDetails();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    try {
      const { data } = await axios.put(
        `http://localhost:8080/api/v1/blog/update-blog/${id}`,
        {
          title: inputs.title,
          description: inputs.description,
          image: inputs.image,
          user: id,
        }
      );
      if (data?.success) {
        toast.success("Blog Updated successfully");
        navigate("/my-blogs");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  console.log(blog);

  return (
    <>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Box
          width="30%"
          borderRadius={10}
          padding={5}
          boxShadow="19px 19px 9px 3px #888"
          bgcolor="#f9f9f9"
          color="black"
          transition="all 0.3s ease"
        >
          <Typography
            variant="h4"
            textAlign="center"
            fontWeight="bold"
            marginBottom={3}
          >
            Edit Blog Here
          </Typography>
          <TextField
            label="Title"
            variant="outlined"
            name="title"
            value={inputs.title}
            onChange={handleInputChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Description"
            variant="outlined"
            name="description"
            multiline
            rows={4}
            value={inputs.description}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Image URL"
            variant="outlined"
            name="image"
            value={inputs.image}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            required
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            style={{ marginTop: 20, backgroundColor: "black" }}
          >
            Update
          </Button>
        </Box>
      </form>
    </>
  );
};

export default BlogDetails;