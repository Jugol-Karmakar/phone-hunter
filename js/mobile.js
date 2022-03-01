// button data load

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
  phones.slice(0, 20).forEach((phone) => {
    // console.log(phone);
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
};

// Phone Detail Id

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
  console.log(phone);
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
                <p><span>${phone.releaseDate}</span></p>
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
                <p><span class="fw-bold">Bluetooth : </span><span>${
                  phone.others.Bluetooth
                }</span></p>
                <p><span class="fw-bold">GPS : </span><span>${
                  phone.others.GPS
                }</span></p>
                <p><span class="fw-bold">NFC : </span><span>${
                  phone.others.NFC
                }</span></p>
                <p><span class="fw-bold">Radio : </span><span>${
                  phone.others.Radio
                }</span></p>
                <p><span class="fw-bold">USB : </span><span>${
                  phone.others.USB
                }</span></p>
                <p><span class="fw-bold">WLAN : </span><span>${
                  phone.others.WLAN
                }</span></p>
            </div>
        </div>
              
            
    </div>
    `;

  phoneDetail.appendChild(div);
};
