export default function createNewObject(products) {
  return new Promise((resolve) => {
    products = products + 1;

    const title = prompt("Name the Product");
    const price = prompt("Give price to product");
    const description = prompt("Write the description");

    const imageInput = document.createElement("input");
    imageInput.type = "file";
    imageInput.accept = "image/*";
    imageInput.style.display = "none"; // Hide the input element

    imageInput.addEventListener("change", (e) => {
      const imageFile = e.target.files[0];
      document.body.removeChild(imageInput);

      resolve({
        id: `${products}`,
        title: title,
        price: price,
        description: description,
        image: imageFile ? URL.createObjectURL(imageFile) : "",
        rating: {
          rate: 0,
          count: 0,
        },
      });
    });

    document.body.appendChild(imageInput);
    
   
    imageInput.click();
  });
}
