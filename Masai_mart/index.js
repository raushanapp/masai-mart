// fetch all detail regrading for job
let masaiDiv = document.getElementById("masaiMart")
let productList
async function fetchMartList() {
    try {
        let resp = await fetch('https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-products?limit=10')
        let martList=await resp.json()
        productList = martList.data
        // console.log(productList)
        showAllJob(productList)
    }
    catch (e) {
        console.log("errorr comning for fetch data job list card",e)
    }
}
fetchMartList()
function showAllJob(productList) {
    masaiDiv.innerText = ''
    productList?.length > 0 && productList.forEach((el, index) => {
        // console.log("brand",el.brand)
        let cardDiv = document.createElement('div')
        cardDiv.setAttribute('id', "cardDiv")
        let allTxtDiv = document.createElement('div');
        allTxtDiv.setAttribute('id', "allTxtDiv")

        let titles = document.createElement("p");
        titles.setAttribute("id", "title")
        titles.innerText = el.title;

        let brands = document.createElement("p");
        brands.setAttribute("id", "brand")
        brands.innerText = el.brand;

        let categorys = document.createElement("p");
        categorys.setAttribute("id", "category")
        categorys.innerText = el.category;

        let prices = document.createElement("p");
        prices.setAttribute("id", "price")
        prices.innerText = el.price;
        
        let spanWish = document.createElement("span");
        spanWish.setAttribute("id", "spanWish")
        // spanWish.innerText = "";
        let image = document.createElement("img");
        image.setAttribute("id", "image")
        image.src = el.image;
        allTxtDiv.append(brands, titles, categorys,prices )
        cardDiv.append(image, allTxtDiv)
        masaiDiv.appendChild(cardDiv)

    })
}




//  select filter by tag filter
let filterByRole = document.getElementById("selectByCategory");
filterByRole.addEventListener('change', (e) => {
    // console.log('filter',productList)
    let category = e.target.value
    console.log(category)
    let newProductList;
    if (category) {
        newProductList = productList?.length > 0 && productList.filter((el) => el.category === category)
        console.log(newProductList,"list")
    }
    else {
        // todo
    }
    newProductList?.length > 0 ? showAllJob(newProductList) : showAllJob(productList)
})

// sort by 
let sortBy = document.getElementById("sortBy")
sortBy.addEventListener("change", sortByOrderFunc)  

async function sortByOrderFunc(e) {
    try {
        let order = e.target.value
        let resp= await fetch(`https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-products?limit=10&orderBy=${order}`)
        let sort = await resp.json()
        let data = sort.data
        console.log(data, "sort")
        data?.length>0 ? showAllJob(data):showAllJob(productList)
    }
    catch (e) {
        console.log("errorn sort by",e)
    }
}