document.addEventListener("DOMContentLoaded", function () {
  let ContainerResData = document.querySelector(".Res");
  let image = document.getElementById("Image");
  let PopUp = document.querySelector(".PopUp");
  let UploadImage = document.querySelector(".UploadImage");

  if (!sessionStorage.getItem("Bosspass")) {
    window.location.href = "index.html";
  }


  let num = 0;
  let array = [];

  if (localStorage.getItem("Product")) {
    array = JSON.parse(localStorage.getItem("Product"));
  }
  Fetch(array);

  function Fetch(data) {
    ContainerResData.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      if (element.storage == true) {
        tamplete(element);
      }
    }
  }

  function tamplete(element) {
    num++;
    let Body = `
        <div class='ContainerStorage' id='${element.id}' date='${element.date}'>
            <span id='${element.id}' class='AddPhoto' path='${element.image}' Where='${num}'>${num}</span>
            <span class='Name'>${element.nOfp}</span>
            <span class='Category'>${element.cOfP}</span>
            <span class='BuyPrice'>${element.Buy}</span>
            <span class='sellingPrice'>${element.selling}</span>
            <span class="storage" id="${element.id}"></span>
        </div>
    `;
    ContainerResData.innerHTML += Body;
  }
  // ##################################################################################################
  // You Can Make One Function Handle All Edites (UploadPhoto & handelStore) ===>> (handleUpdates)#####
  // ##################################################################################################

  function UpdatePhoto(img, ID) {
    let Name = document.querySelector(
        '.ContainerStorage[id="' + ID + '"] .Name'
      ).innerText,
      category = document.querySelector(
        '.ContainerStorage[id="' + ID + '"] .Category'
      ).innerText,
      Purchasing = document.querySelector(
        '.ContainerStorage[id="' + ID + '"] .BuyPrice'
      ).innerText,
      silling = document.querySelector(
        '.ContainerStorage[id="' + ID + '"] .sellingPrice'
      ).innerText,
      entafen = document
        .querySelector('.AddPhoto[id="' + ID + '"]')
        .getAttribute("Where"),
      Date = document
        .querySelector('.ContainerStorage[id="' + ID + '"]')
        .getAttribute("date");

    entafen = Number(entafen) - 1;

    console.log(silling);

    array = array.filter((product) => product.id != ID);

    const obj = {
      id: ID,
      nOfp: Name,
      cOfP: category,
      Buy: Purchasing,
      selling: silling,
      number: 1,
      image: img,
      date: Date,
      stat: true,
      storage: true,
    };
    array.splice(entafen, 0, obj);
    Insert(array);
  }

  function handelStore(id) {
    let Name = document.querySelector(
        '.ContainerStorage[id="' + id + '"] .Name'
      ).innerText,
      category = document.querySelector(
        '.ContainerStorage[id="' + id + '"] .Category'
      ).innerText,
      Purchasing = document.querySelector(
        '.ContainerStorage[id="' + id + '"] .BuyPrice'
      ).innerText,
      silling = document.querySelector(
        '.ContainerStorage[id="' + id + '"] .sellingPrice'
      ).innerText,
      entafen = document
        .querySelector('.AddPhoto[id="' + id + '"]')
        .getAttribute("Where"),
      Date = document
        .querySelector('.ContainerStorage[id="' + id + '"]')
        .getAttribute("date"),
      path = document
        .querySelector('.AddPhoto[id="' + id + '"]')
        .getAttribute("path");

    entafen = Number(entafen) - 1;

    console.log(silling);

    array = array.filter((product) => product.id != id);

    const obj = {
      id: id,
      nOfp: Name,
      cOfP: category,
      Buy: Purchasing,
      selling: silling,
      number: 1,
      image: path,
      date: Date,
      stat: true,
      storage: false,
    };
    array.splice(entafen, 0, obj);
    console.log(array);
    Insert(array);
  }

  function Insert(data) {
    const DATA = JSON.stringify(data);
    window.localStorage.Product = DATA;
  }

  image.addEventListener("change", function (e) {
    let id = PopUp.getAttribute("id");
    let src = e.target.files;
    for (var i = 0; i < src.length; i++) {
      var file = src[i];
      var reader = new FileReader();
      reader.onloadend = function () {
        UploadImage.classList.remove("fa-add");
        UploadImage.style.cssText =
          "background-image:url(" +
          reader.result +
          ") ;background-size:cover; width: 100% ;background-position: center;background-size: contain;background-repeat: no-repeat; border-style:none;padding: 100px 30px;";
        document
          .querySelector('.AddPhoto[id="' + id + '"]')
          .setAttribute("path", reader.result);
        UpdatePhoto(reader.result, id);
      };
      reader.readAsDataURL(file);
    }
  });

  let storage = document.querySelectorAll(".storage");

  storage.forEach((Btn) => {
    Btn.addEventListener("click", function () {
      const ID = this.getAttribute("id");
      handelStore(ID);
      document.querySelector('.ContainerStorage[id = "' + ID + '"]').remove();
    });
  });

  let AddPhoto = document.querySelectorAll(".AddPhoto");

  AddPhoto.forEach((element) => {
    element.addEventListener("click", function () {
      PopUp.classList.add("Active");
      let ID = this.getAttribute("id"),
        path = this.getAttribute("path");
      PopUp.setAttribute("id", ID);
      if (path != false) {
        UploadImage.setAttribute("id", ID);
        UploadImage.classList.remove("fa-add");
        UploadImage.textContent = "";
        document.querySelector(
          '.UploadImage[id="' + ID + '"]'
        ).style.cssText = `background-image:url(${path}) ;background-size:cover; width: 100% ;background-position: center;background-size: contain;background-repeat: no-repeat; border-style:none;padding: 100px 30px;`;
      }
    });
  });
});
