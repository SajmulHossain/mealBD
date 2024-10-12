async function dataFetch() {
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s=chicken"
  );
  const data = await response.json();

  showData(data.meals);
}

function showData(data) {
  let index = 6;
  const btnContainer = document.getElementById("btnContainer");

  showAll(data, index, btnContainer);

  btnContainer.children[0].addEventListener("click", function () {
    if (index === 6) {
      index = length - 1;
      showAll(data, index);
      btnContainer.children[0].innerText = "Show Less";
    } else {
      index = 6;
      showAll(data, index);
      btnContainer.children[0].innerText = "See All";
    }
  });
}

function showAll(data, index, btn) {
  const loader = document.getElementById("loader");
  const container = document.getElementById("container");
  container.innerHTML = "";

  setTimeout(() => {
    container.classList.remove("hidden");
    container.classList.add('flex','lg:grid');
    loader.classList.add("hidden");
    btn.classList.remove("hidden");
  }, 2000);

  const length = data.length;
  for (let i = 0; i < length; i++) {
    if (i === index) {
      break;
    }

    const element = data[i];
    const {strCategory, strArea, strInstructions, strYoutube,strMealThumb,strMeal} = element;
    const div = document.createElement("div");
    div.innerHTML = `
      <div class="flex gap-3 items-center">
          <div class="w-[230px]">
            <img src= ${strMealThumb} class="h-[200px] w-full object-cover rounded-md">
          </div>
  
          <div class="flex flex-col gap-6 w-full">
            <h4 class="font-bold text-2xl">Chicken Handi</h4>
            <p>There are many variations of passages of available, but majority have suffered</p>
            <div>
              <button onclick= "showDetails('${strMealThumb}','${strCategory}', '${strArea}',\`${strInstructions}\`, '${strYoutube}','${strMeal}' )" class="underline text-main font-semibold">View Details</button>
            </div>
          </div>
        </div>
    `;

    container.appendChild(div);
  }
}

function showDetails(img,category, area, instruction, youtube,meal) {
  document.getElementById('modal-img').src = img;
  document.getElementById('name').innerText = meal;
  document.getElementById('area').innerText = area;
  document.getElementById('category').innerText = category;
  document.getElementById('instruction').innerText = instruction;
  document.getElementById('yt').innerText = youtube;
  document.getElementById('yt').href = youtube;
  document.getElementById('modal').showModal();
}

dataFetch();
