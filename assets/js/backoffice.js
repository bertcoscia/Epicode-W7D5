const URL = "https://striveschool-api.herokuapp.com/api/product/";
const auth = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjZiZjk5NzdjMjM5YzAwMTUyZjRiM2MiLCJpYXQiOjE3MTgzNTIyNzksImV4cCI6MTcxOTU2MTg3OX0.iqJ9iKifEmv4QneeBjeH2alL6rTwRy3dLqfFcopl1co ";
const params = new URLSearchParams(window.location.search);
const id = params.get("productId");
