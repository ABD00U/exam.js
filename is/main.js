document.addEventListener("DOMContentLoaded", function () {
  $(".loading").fadeOut(2000);
});
function load() {
  document.addEventListener("DOMContentLoaded", function () {
    $(".loading").fadeOut(2000);
  });
}
let left = $(".boxmodal").css("left");
let width = $(".inner").outerWidth();

$(".boxmodal").animate({ left: `-${width}px` }, 0);

$(".open").on("click", function () {
  width = $(".inner").outerWidth();
  left = $(".boxmodal").css("left");
  $(".text-inner ").animate({ left: "40px" }, 2000);
  $(".boxmodal").animate({ left: `0px` }, 1000);

  $(".close").removeClass("d-none");
  $(".open").addClass("d-none");
});
$(".close").on("click", function () {
  width = $(".inner").outerWidth();
  left = $(".boxmodal").css("left");
  $(".text-inner ").animate({ left: "0px" }, 2000);

  $(".boxmodal").animate({ left: `-${width}px` }, 1000);
  $(".open").removeClass("d-none");
  $(".close").addClass("d-none");
});

function hidesearch() {
  $("#search-content").addClass("d-none");
  $(".temphide").removeClass("d-none");
}
function hidetemp() {
  $("#search-content").removeClass("d-none");
  $(".temphide").addClass("d-none");
}
function showtemp() {
  $(".temphide").removeClass("d-none");
}

let homelist = [];

async function gethome() {
  let home = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s`
  );
  let cate = await home.json();
  homelist = cate.meals;
  console.log(cate);
  showhome();
  hidesearch();
  load();
}
gethome();

function showhome() {
  let temp = "";
  homelist.forEach((element) => {
    temp += `
      <div class="inside row-cols-1 row-cols-md-4 py-4">
            <div class="w-100 h-100 overflow-hidden position-relative">
              <img
                src="${element.strMealThumb}"
                class="rounded-4 w-100"
              />

              <div
                class="layer bg-white opacity-75 rounded-4 text-center text-black"
                onclick="getalldetails('${element.strMeal}')"
              >
                <h2>${element.strMeal}</h2>
                
              </div>
            </div>
          </div>
    
  
  `;
  });

  document.getElementById("show").innerHTML = temp;
}

let meal = [];
$("#cate").click(function () {
  async function getdate() {
    let meallist = await fetch(
      `https://www.themealdb.com/api/json/v1/1/categories.php`
    );
    let cate = await meallist.json();
    meal = cate.categories;
    console.log(cate);
    hidesearch();
    load();
    showdate();
  }
  getdate();

  function showdate() {
    let temp = "";
    meal.forEach((element) => {
      temp += `
      <div class="inside row-cols-1 row-cols-md-4 py-4">
            <div class="w-100 h-100 overflow-hidden position-relative">
              <img
                src="${element.strCategoryThumb}"
                class="rounded-4 w-100"
               
              />

              <div
                class="layer bg-white opacity-75 rounded-4 text-center text-black"
                onclick="getcatedetail('${element.strCategory}')"
              >
                <h2>${element.strCategory}</h2>
                <p>${element.strCategoryDescription}</p>
              </div>
            </div>
          </div>
    
  
  `;
    });

    document.getElementById("show").innerHTML = temp;

    $(".boxmodal").animate({ left: `-${width}px` }, 1000);
    $(".open").removeClass("d-none");
    $(".close").addClass("d-none");
  }
});

let area = [];

$("#area").click(function () {
  async function getarea() {
    let arealist = await fetch(
      `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
    );
    let cate = await arealist.json();
    area = cate.meals;
    console.log(cate);
    hidesearch();

    load();
    showarea();
  }
  getarea();

  function showarea() {
    let temp = "";
    area.forEach((e) => {
      temp += `
      <div class="inside row-cols-1 row-cols-md-4 py-4">
      <div class="w-100 h-100 text-center text-white">
      <div onclick="getarealist('${e.strArea}')">
      <i class="fa-solid fa-house-laptop fa-5x"></i>

       
      <h2>${e.strArea} </h2>
          
        </div>
      </div>
    </div>

      `;
    });
    document.getElementById("show").innerHTML = temp;

    $(".boxmodal").animate({ left: `-${width}px` }, 1000);
    $(".open").removeClass("d-none");
    $(".close").addClass("d-none");
  }
});

$("#search").click(function () {
  hidetemp();
  showtemp();

  document.querySelector("#search-content").innerHTML = `
  
  <div class="ms-5  ">
          <div class=" mt-5 ms-5  ">
            <input
              type="text"
              class="btn btn-primary bg-dark border-0 text-start mb-4"
              placeholder="search by name"
              id="searchname"
            />
            <input
              type="text"
              class="btn btn-primary bg-dark border-0 text-start mb-4"
              placeholder="search by first letter"
              id="searchid"
            />
          </div>
        </div>


  `;
  $(".boxmodal").animate({ left: `-${width}px` }, 1000);
  $(".open").removeClass("d-none");
  $(".close").addClass("d-none");

  $("#searchid").on("keyup", function () {

    let searchinput = document.getElementById("searchid");
    let searchid = searchinput.value;
    getsearchid(searchid);

    let searchidlist = [];

    async function getsearchid(valu) {
      let home = await fetch(
        `https:www.themealdb.com/api/json/v1/1/search.php?f=${valu}`
      );
      let cate = await home.json();
      searchidlist = cate.meals;
      console.log(cate);
      

      showsearchid();
      load();
    }

    function showsearchid() {
      let temp = "";
      searchidlist.forEach((element) => {
        temp += `
      <div class="inside row-cols-1 row-cols-md-4 py-4">
            <div class="w-100 h-100 overflow-hidden position-relative">
              <img
                src="${element.strMealThumb}"
                class="rounded-4 w-100"
              />

              <div
                class="layer bg-white opacity-75 rounded-4 text-center text-black"
              >
                <h2>${element.strMeal}</h2>
                
              </div>
            </div>
          </div>
    
  
  `;
      });

      document.getElementById("show").innerHTML = temp;
    }
  });
  $("#searchname").on("keyup", function () {
    let searchinput = document.getElementById("searchname");
    let searchin = searchinput.value;
    getsearchname(searchin);

    let searchnamelist = [];

    async function getsearchname(valu) {
      let home = await fetch(
        `https:www.themealdb.com/api/json/v1/1/search.php?s=${valu}`
      );
      let cate = await home.json();
      searchnamelist = cate.meals;
      console.log(cate);

      showsearchname();
      load();
    }

    function showsearchname() {
      let temp = "";
      searchnamelist.forEach((element) => {
        temp += `
      <div class="inside row-cols-1 row-cols-md-4 py-4">
            <div class="w-100 h-100 overflow-hidden position-relative">
              <img
                src="${element.strMealThumb}"
                class="rounded-4 w-100"
              />

              <div
                class="layer bg-white opacity-75 rounded-4 text-center text-black"
              >
                <h2>${element.strMeal}</h2>
                
              </div>
            </div>
          </div>
    
  
  `;
      });

      document.getElementById("show").innerHTML = temp;
    }
  });
});

let Ingredients = [];

$("#Ingredients").click(function () {
  async function getIngredients() {
    let Ingredientslist = await fetch(
      `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
    );
    let cate = await Ingredientslist.json();
    Ingredients = cate.meals;
    console.log(cate);
    hidesearch();

    load();
    showIngredients();
  }
  getIngredients();

  function showIngredients() {
    let temp = "";

    for (let e = 0; e < Ingredients.length; e++) {
      temp += `
      <div class="inside row-cols-1 row-cols-md-4 py-4" 
      >
      <div class="w-100 h-100 text-center text-white" >
    <div  onclick="getIngredient('${Ingredients[e].strIngredient}')">
    <i class="fa-solid fa-drumstick-bite fa-5x"></i>
    <h2>${Ingredients[e].strIngredient} </h2>
    </div>
        </div>
      </div>
      `;

      if (Ingredients[e].idIngredient == 25) {
        break;
      }
    }
    document.getElementById("show").innerHTML = temp;

    $(".boxmodal").animate({ left: `-${width}px` }, 1000);
    $(".open").removeClass("d-none");
    $(".close").addClass("d-none");
  }
});

$("#contact").click(function () {
  hidetemp();
  document.querySelector("#search-content").innerHTML = `
  
  <div class="contact min-vh-100 d-flex justify-content-center align-items-center ms-5">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control w-100" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control w-100 " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control w-100 " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control w-100 " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control w-100 " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control w-100 " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> 
  `;
  $(".boxmodal").animate({ left: `-${width}px` }, 1000);
  $(".open").removeClass("d-none");
  $(".close").addClass("d-none");
});

let Ingredient = [];

async function getIngredient(valu) {
  let Ingredientslist = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${valu}`
  );
  let cate = await Ingredientslist.json();
  console.log(cate);
  Ingredient = cate.meals;
  hidesearch();
  load();
  showIngredient();
}

function showIngredient() {
  let temp = "";

  Ingredient.forEach((element) => {
    temp += `
      <div class="inside row-cols-1 row-cols-md-4 py-4">
            <div class="w-100 h-100 overflow-hidden position-relative">
              <img
                src="${element.strMealThumb}"
                class="rounded-4 w-100"
              />

              <div
                class="layer bg-white opacity-75 rounded-4 text-center text-black"
                onclick="getalldetails('${element.strMeal}')"
              >
                <h2>${element.strMeal}</h2>
                
              </div>
            </div>
          </div>
    
  
  `;
  });

  document.getElementById("show").innerHTML = temp;
}

let catedetaillist = [];

async function getcatedetail(valu) {
  let catedetail = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${valu}`
  );
  let cate = await catedetail.json();
  console.log(cate);
  catedetaillist = cate.meals;
  hidesearch();
  load();
  showcatedetails();
}

function showcatedetails() {
  let temp = "";

  catedetaillist.forEach((element) => {
    temp += `
      <div class="inside row-cols-1 row-cols-md-4 py-4">
            <div class="w-100 h-100 overflow-hidden position-relative">
              <img
                src="${element.strMealThumb}"
                class="rounded-4 w-100"
              />

              <div
                class="layer bg-white opacity-75 rounded-4 text-center text-black"
                onclick="getalldetails('${element.strMeal}')"
              >
                <h2>${element.strMeal}</h2>
                
              </div>
            </div>
          </div>
    
  
  `;
  });

  document.getElementById("show").innerHTML = temp;
}

let arealist = [];

async function getarealist(valu) {
  let arealistslist = await fetch(
    `https:www.themealdb.com/api/json/v1/1/filter.php?a=${valu}`
  );
  let cate = await arealistslist.json();
  console.log(cate);
  arealist = cate.meals;
  hidesearch();
  load();
  showarealist();
}

function showarealist() {
  let temp = "";

  arealist.forEach((element) => {
    temp += `
      <div class="inside row-cols-1 row-cols-md-4 py-4">
            <div class="w-100 h-100 overflow-hidden position-relative">
              <img
                src="${element.strMealThumb}"
                class="rounded-4 w-100"
              />

              <div
                class="layer bg-white opacity-75 rounded-4 text-center text-black"
                onclick="getalldetails('${element.strMeal}')"
              >
                <h2>${element.strMeal}</h2>
                
              </div>
            </div>
          </div>
    
  
  `;
  });

  document.getElementById("show").innerHTML = temp;
}

let alldetailslist = [];

async function getalldetails(valu) {
  let arealistslist = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${valu}`
  );
  let cate = await arealistslist.json();
  console.log(cate);
  alldetailslist = cate.meals;
  hidesearch();
  load();
  showalldetails();
}

function showalldetails() {
  let temp = "";

  alldetailslist.forEach((element) => {
    temp += `
      <div class="inside  py-1 pb-3  w-100 h-100">
      <div class="text-white row  " >
      <div class="col-lg-5">
      <img src="${element.strMealThumb}" class="w-100 rounded-4">
      <h2>${element.strMeal}</h2>
      </div>
      <div class="col-lg-7 ps-3 ">
      <h2>Instructions</h2>
      <p class="">${element.strInstructions}</p>
      <h2 class="text-text-uppercase">area:${element.strArea} </h2>
      <h2 class="text-text-uppercase">Category:${element.strCategory} </h2>
      <h2 class="text-text-uppercase">Recipes: </h2>
      <div class="row gap-1">
      <h4 class=" col-3 cook py-1 px-4 fs-6 rounded-5">${element.strMeasure1} ${element.strIngredient1}</h4>
      <h4 class=" col-3 cook py-1 px-4 fs-6 rounded-5">${element.strMeasure2} ${element.strIngredient2}</h4>
      <h4 class=" col-3 cook py-1 px-4 fs-6 rounded-5">${element.strMeasure3} ${element.strIngredient3}</h4>
      <h4 class=" col-3 cook py-1 px-4 fs-6 rounded-5">${element.strMeasure4} ${element.strIngredient4}</h4>
      <h4 class=" col-3 cook py-1 px-4 fs-6 rounded-5">${element.strMeasure5} ${element.strIngredient5}</h4>
      <h4 class=" col-3 cook py-1 px-4 fs-6 rounded-5">${element.strMeasure6} ${element.strIngredient6}</h4>
      <h4 class=" col-3 cook py-1 px-4 fs-6 rounded-5">${element.strMeasure7} ${element.strIngredient7}</h4>
      </div>
      <h2 class="text-text-uppercase">tag:</h2>
      <div class="d-grid gap-2 d-md-block mt-3">
  <a class="btn btn-dark"  href="${element.strSource}" target="_blank">source</a>
  <a class="btn btn-danger"  href="${element.strYoutube}" target="_blank">youtube</a>
</div>
      </div>
      </div>
          </div>
    
  
  `;
  });

  document.getElementById("show").innerHTML = temp;
}
