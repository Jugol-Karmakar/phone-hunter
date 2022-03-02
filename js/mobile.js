// button data load api

const loadButton = () => {
  const searchInput = document.getElementById("search-input");
  const searchText = searchInput.value;
  searchInput.value = "";
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayLoad(data.data));
};

// show search result

const displayLoad = (phones) => {
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.textContent = "";

  if (phones.length > 0) {
    phones.slice(0, 20).map((phone) => {
      const div = document.createElement("div");
      div.classList.add("col");
      div.innerHTML = `
        <div class="card h-100 shadow">
            <img src="${phone.image}" class="card-img-top img-fluid" alt="..." />
            <div class="card-body text-center">
                <h4 class="card-title">Brand : ${phone.brand}</h4>
                <h6>Phone Model : ${phone.phone_name}</h6>
            </div>
            <a href="#phone-detail" onclick="loadPhoneDetail('${phone.slug}')"><span>Show Details</span></a>
        </div>
    `;
      phoneContainer.appendChild(div);
    });
  } else {
    const error = document.createElement("h4");
    const classes = ["text-danger", "mx-auto", "fw-bold"];
    error.classList.add(...classes);
    error.innerHTML = `
    Result Not Found
    `;
    phoneContainer.appendChild(error);
  }
};

// Phone Detail Id api

const loadPhoneDetail = (phoneId) => {
  const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) =>
      displayPhoneDetail(data.data, data.data.mainFeatures.sensors)
    );
};

// Show Phone Details Result

const displayPhoneDetail = (phone, sensors) => {
  const { Bluetooth, GPS, NFC, Radio, USB, WLAN } = phone?.others || {};
  const phoneDetail = document.getElementById("phone-detail");
  phoneDetail.textContent = "";

  const div = document.createElement("div");
  div.classList.add("card");
  div.innerHTML = `
    <div class="row g-0">
        <div id="phone" class="col-lg-4">
            <img src="${phone.image}" class="image" alt="..." />
        </div>
        <div class="col-lg-8">
            <div class="card-body">
                <h4 class="card-title">${phone.name}</h4>
                <p><span>${
                  phone.releaseDate
                    ? phone.releaseDate
                    : "No Release Date Available"
                }</span></p>
                <p><span class="fw-bold">Storage : </span><span>${
                  phone.mainFeatures.storage
                }</span></p>
                <p><span class="fw-bold">Chipset : </span><span>${
                  phone.mainFeatures.chipSet
                }</span></p>
                <p><span class="fw-bold">Display : </span><span>${
                  phone.mainFeatures.displaySize
                }</span></p>
                <p><span class="fw-bold">Memory : </span><span>${
                  phone.mainFeatures.memory
                }</span></p>
            </div>
            <hr class="hr">  
            <div class="row">
                <div class="col-lg-4">
                    <h4>Sensor :</h4>
                    <ul>
                    ${sensors
                      .map((sensor) => {
                        return '<li class="">' + sensor + "</li>";
                      })
                      .join("")}
                    </ul>
                </div>

                <div class="col-lg-6">
                <h4>Others Feature :</h4>
                <p><span class="fw-bold">Bluetooth : </span>
                <span>${Bluetooth ? Bluetooth : "No Data Available"}</span></p>
                <p><span class="fw-bold">GPS : </span>
                <span>${GPS ? GPS : "No Data Available"}</span></p>
                <p><span class="fw-bold">NFC : </span><span>${
                  NFC ? NFC : "No Data Available"
                }</span></p>
                <p><span class="fw-bold">Radio : </span><span>${
                  Radio ? Radio : "No Date Available"
                }</span></p>
                <p><span class="fw-bold">USB : </span><span>${
                  USB ? USB : "No Data Available"
                }</span></p>
                <p><span class="fw-bold">WLAN : </span><span>${
                  WLAN ? WLAN : "No Data Available"
                }</span></p>
            </div>
        </div>         
    </div>
    `;

  phoneDetail.appendChild(div);
};
