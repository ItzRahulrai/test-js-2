var selectedRow = null;

function showAlert(messsage, className){
    const div = document.createElement("div");
    div.className = `alert alert - ${className}`;

    div.appendChild(document.createTextNode(messsage));
    const container = document.querySelector(".container");
    const main = document.querySelector(".main");
    container.insertBefore(div,main);

    setTimeout(()=>document.querySelector(".alert").remove,3000);
}


function clearFields(){
    document.querySelector("#sp").value = "";
    document.querySelector("#pro").value = "";
    document.querySelector("#ctg").value = "";
}


document.querySelector("#product-form").addEventListener("submit", (e)=>{
    e.preventDefault();

    const SellingP = document.querySelector("#sp").value;
    const Product = document.querySelector("#pro").value;
    const Category = document.querySelector("#ctg").value;

    if(SellingP == "" || Product == "" || Category==""){
        alert("Please fill in all fields","danger");
    }
    else{
       if(selectedRow==null){
         const list = document.querySelector("#product-list");
         const row = document.createElement("tr");

        row.innerHTML = `
        <td>${SellingP}</td>
        <td>${Product}</td>
        <td>${Category}</td>
        <td>
          <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
        </td>`

        list.appendChild(row);
        // localStorage.setItem("Selling Price",SellingP);
        // localStorage.setItem("Product",Product);
        // localStorage.setItem("Category",Category);

        selectedRow=null;
            showAlert("Product Added", "success");
       }
       let myObj = {
        Selling_Price : SellingP,
        Product_Name : Product,
        P_Category : Category 
      };

      const API_ENDPOINT =  "https://crudcrud.com/api/68a3a210218d417d81cc"
      const PRODUCTS_ENDPOINT = API_ENDPOINT + "/products";

      fetch(PRODUCTS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(myObj)
    });

    }
});

document.querySelector("#product-list").addEventListener("click",(e)=>{
      target = e.target;
      if(target.classList.contains("delete")){
        target.parentElement.parentElement.remove();

        
        alert("Product Deleted","danger");
      }
      const response = fetch(
        PRODUCTS_ENDPOINT + "/" + myObj._id, 
        { method: "DELETE" }
    )
});
