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
    // console.log(phone);
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
        <div class="card h-100">
            <img src="${phone.image}" class="card-img-top img-fluid" alt="..." />
            <div class="card-body">
                <h4 class="card-title">Brand : ${phone.brand}</h4>
                <h6 class="card-text">Phone Model : ${phone.phone_name}</h6>
            </div>
            <button onclick="loadPhoneDetail('${phone.slug}')"><span>Show Details</span></button>
        </div>
    `;
    phoneContainer.appendChild(div);
  });
};

const loadPhoneDetail = (phoneId) => {
  const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayPhoneDetail(data.data));
};

const displayPhoneDetail = (phone) => {
  console.log(phone);
  const phoneDetail = document.getElementById("phone-detail");
  phoneDetail.textContent = "";

  const div = document.createElement("div");
  div.classList.add("card");
  div.innerHTML = `
    <div class="row g-0">
        <div class="col-md-4">
        <img src="${phone.image}" class="img-fluid rounded-start" alt="..." />
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h4 class="card-title">${phone.name}</h4>
                <p class="card-text">${phone.releaseDate}</p>
                <p class="card-text">${phone.mainFeatures.storage}</p>
                <p class="card-text">${phone.mainFeatures.chipSet}</p>
                <p class="card-text">${phone.mainFeatures.displaySize}</p>
            </div>
        </div>
        <hr class="hr">
        <div class="col">
            <div class="card-body">
                <p class="card-text"><span>Announced : </span>${phone.releaseDate}</p>
                <p class="card-text"><span>Display : </span>${phone.mainFeatures.displaySize}</p>
                <p class="card-text"><span>Memory : </span>${phone.mainFeatures.memory}</p>
                <p class="card-text"><span>Chipset : </span>${phone.mainFeatures.chipSet}</p>
                <p class="card-text"><span>Bluetooth : </span>${phone.others.Bluetooth}</p>
                <p class="card-text"><span>GPS : </span>${phone.others.GPS}</p>
                <p class="card-text"><span>NFC : </span>${phone.others.NFC}</p>
                <p class="card-text"><span>Radio : </span>${phone.others.Radio}</p>
                <p class="card-text"><span>USB : </span>${phone.others.USB}</p>
                <p class="card-text"><span>WLAN : </span>${phone.others.WLAN}</p>
            </div>
        </div>
  </div>
    `;

  phoneDetail.appendChild(div);
};
