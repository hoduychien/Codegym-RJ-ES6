// Config
const key = `vYEwuICTfFp8OA5hVcOU6rm11d7qq2ER`;

// Function validate data
let checkData = (data) => {
  if (data) {
    return true;
  } else {
    return false;
  }
};

// Function search gif
let searchGyphy = async (inputData) => {
  if (checkData(inputData)) {
    const url = `http://api.giphy.com/v1/gifs/search?q=${inputData}&api_key=${key}`;
    let res = await fetch(url);
    let data = await res.json();
    let imgArray = [...data.data]
    if (imgArray.length > 0) {
      imgArray.map((item) => {
        renderGyphy(item.images.original.url)
      })
      document.getElementById('error').style.visibility = 'hidden'
    }
    else {
      document.getElementById('error').style.visibility = 'visible'
    }
  }
  else {
    alert('message')
  }
};


// Function display gif on the screen
let renderGyphy = (url) => {
  let img = document.createElement("img");
  img.src = url
  let listImage = document.getElementById("results");
  listImage.appendChild(img);
}


// Function remove gif
let removeGyphy = () => {
  const listImage = document.getElementById("results");
  while (listImage.firstChild) {
    listImage.firstChild.remove()
  }
}


// Handle click search button
document.getElementById("search-button").addEventListener("click", () => {
  const listImage = document.getElementById("results");
  let inputData = document.getElementById("input-data").value;
  if (listImage.childElementCount > 0) {
    removeGyphy()
    searchGyphy(inputData)
  } else {
    searchGyphy(inputData)
  }
});

// Handle click remove button
document.getElementById("clear-button").addEventListener("click", () => {
  removeGyphy()
})
