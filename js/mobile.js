const loadButton = () => {
  const searchInput = document.getElementById("search-input");
  const searchText = searchInput.value;
  searchInput.value = "";
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayLoad(data.data));
};

const displayLoad = (phones) => {
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.textContent = "";
  phones.forEach((phone) => {
    console.log(phone);
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
        <div class="card h-100">
            <img src="${phone.image}" class="card-img-top img-fluid" alt="..." />
            <div class="card-body">
                <h4 class="card-title">Brand : ${phone.brand}</h4>
                <h6 class="card-text">Phone Model : ${phone.phone_name}</h6>
            </div>
            <button><span>Show Details</span></button>
        </div>
    `;
    phoneContainer.appendChild(div);
  });
};
