document.addEventListener("DOMContentLoaded", function () {
  let Arrow = document.querySelector(".Arrow");
  let Inputs = document.querySelector(".Inputs");
  let DivAddProduct = document.querySelector(".AddProduct");
  let BtnAddProduct = document.querySelector(".BtnAddProduct");
  let NameOfProduct = document.querySelector(".NameOfProduct");
  let Category = document.querySelector(".Category");
  let PurchasingPrice = document.querySelector(".PurchasingPrice");
  let SellingPrice = document.querySelector(".SellingPrice");
  let LoopProducts = document.querySelector(".LoopProducts");
  let ErrorText = document.querySelector(".Error");
  let ConProducts = document.querySelector(".Products");
  let PopUp = document.querySelector(".PopUp");
  let PopUpProduct = document.querySelector(".PopUpProduct");
  let UploadImage = document.querySelector(".UploadImage");
  let image = document.getElementById("Image");
  let SearchCatigory = document.querySelector(".SearchCategory");
  let SearchType = document.querySelector(".SearchType");
  let BtnSearch = document.querySelector(".BtnSearch");
  let CancelT = document.querySelector(".CancelT");
  let CancelC = document.querySelector(".CancelC");
  let CancelSearch = document.querySelectorAll(".CancelSearch");
  let Stock = document.querySelector(".Stock");
  let Safe = document.querySelector(".Safe");

  if (sessionStorage.getItem("Bosspass")) {
    Arrow.addEventListener("click", () => {
      Arrow.classList.toggle("Up");

      if (Arrow.classList[3] == "Up") {
        Inputs.style.cssText =
          "transform: scale(1); opacity: 1; pointer-events: all;";
        DivAddProduct.style.cssText = "height: 250px;";
        Arrow.style.rotate = "180deg";
      } else {
        Inputs.style.cssText =
          "transform: scale(0);opacity: 0; pointer-events: none;";
        DivAddProduct.style.cssText = "height: 0px;";
        Arrow.style.rotate = "0deg";
      }
    });

    let array = [];
    if (localStorage.getItem("Product")) {
      array = JSON.parse(localStorage.getItem("Product"));
    }
    remember(array);
    if (ConProducts.children.length == 0) {
      let EmpitySpan = `<span style='text-align: center;color: var(--main_color); letter-spacing: 2px;line-height: 1.5;'>Theren't Products, <br> Add Products Please</span>`;
      ConProducts.style.cssText = "text-align: center; margin-top: 50px;";
      ConProducts.innerHTML = EmpitySpan;
    }
    BtnAddProduct.addEventListener("click", (e) => {
      e.preventDefault();

      if (document.querySelector("input[type='text']").value == "") {
        // console.log(document.querySelector("input"));

        ErrorText.style.opacity = "1";
        ErrorText.style.fontSize = "22px";
        ErrorText.textContent = "Input Is Empty";
        setTimeout(() => {
          ErrorText.style.opacity = "0";
          ErrorText.style.fontSize = "0px";
        }, 4000);
      } else {
        let ID = new Date().getTime();
        let date = new Date();

        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        let fulldate = day + "-" + month + "-" + year;
        // Total(PurchasingPrice.value , SellingPrice.value , Discount.value)

        for (let i = 0; i < LoopProducts.value; i++) {
          ID = ID + i;
          const obj = {
            id: ID,
            nOfp: NameOfProduct.value,
            cOfP: Category.value,
            Buy: PurchasingPrice.value,
            selling: SellingPrice.value,
            number: LoopProducts.value,
            image: false,
            date: fulldate,
            stat: true,
            storage: false,
          };

          array.push(obj);
          // array = array.filter((e) => e.storage != true);
          remember(array);
        }
        setTimeout(() => {
          document.querySelectorAll("input").forEach((e) => {
            e.value = "";
            BtnAddProduct.value = "ADD PRODUCT";
          });
        }, 1000);
        Arrow.click();
      }
    });

    function remember(arr) {
      let res = JSON.stringify(arr);
      window.localStorage.Product = [res];
      let get = JSON.parse(localStorage.getItem("Product"));
      // console.log(get);

      ConProducts.style.cssText = "margin-top: 0px;";
      ConProducts.innerHTML = "";
      let num = 0;
      let WhereInArr = 0;
      get.forEach((e) => {
        WhereInArr++;
        if (e.stat == true && e.storage == false) {
          num++;
          let Product = document.createElement("div");

          Product.setAttribute("id", e.id);

          Product.classList = "ContainerOfProducts";

          Product.classList.add(`id${e.id}`);

          let numberloop = document.createElement("span");

          numberloop.classList = "AddPhoto";

          numberloop.setAttribute("id", e.id);

          numberloop.setAttribute("path", e.image);

          numberloop.textContent = num;

          numberloop.setAttribute("Where", WhereInArr);

          let entafen = num - 1;

          let whereRU = WhereInArr - 1;

          let spanName = document.createElement("span");

          spanName.textContent = e.nOfp;

          let spanCategory = document.createElement("span");

          spanCategory.textContent = e.cOfP;

          let spanPurchasingPrice = document.createElement("span");

          spanPurchasingPrice.textContent = e.Buy;

          let spanSellingPrice = document.createElement("span");

          spanSellingPrice.textContent = e.selling;

          let edit = document.createElement("span");

          edit.setAttribute("id", e.id);

          edit.setAttribute("quantaty", e.number);

          edit.classList = "BtnEdite fas fa-edit";
          edit.setAttribute("where", entafen);

          // edit.textContent = "Edite";

          let delet = document.createElement("span");

          delet.classList = "BtnDelete fas fa-trash-alt";

          // delet.textContent = "Delete";

          let storage = document.createElement("span");

          storage.classList.add("storage");

          storage.setAttribute("ID", e.id);

          Product.append(
            numberloop,
            spanName,
            spanCategory,
            spanPurchasingPrice,
            spanSellingPrice,
            edit,
            delet,
            storage
          );

          ConProducts.append(Product);

          let Date = e.date;

          let StorgData = e.storage;

          Product.setAttribute("date", Date);
          Product.setAttribute("StorgData", StorgData);

          delet.addEventListener("click", function (el) {
            let ID = el.target.parentElement.getAttribute("id");
            removeItem(ID);
            el.target.parentElement.remove();
            if (Product.length == 0) {
              let EmpitySpan = `<span style='text-align: center;color: var(--main_color); letter-spacing: 2px;line-height: 1.5;'>Theren't Products, <br> Add Products Please</span>`;
              ConProducts.style.cssText =
                "text-align: center; margin-top: 50px;";
              ConProducts.innerHTML = EmpitySpan;
            }
          });

          edit.addEventListener("click", function (el) {
            let Elemets = el.target.parentElement.children;

            BtnAddProduct.value = "Edite";
            BtnAddProduct.classList.remove("BtnAddProduct");
            BtnAddProduct.classList.add(`EditeBTN`);
            BtnAddProduct.setAttribute("lol", true);

            // Elemets[5].getAttribute("where") => he say what the num length of this object
            let [entafen, Name, category, Purchasing, silling, ID, img] = [
              Elemets[5].getAttribute("where"),
              Elemets[1].innerText,
              Elemets[2].innerText,
              Elemets[3].innerText,
              Elemets[4].innerText,
              Elemets[5].id,
              Elemets[0].getAttribute("path"),
            ];
            [
              NameOfProduct.value,
              Category.value,
              PurchasingPrice.value,
              SellingPrice.value,
              LoopProducts.value,
              LoopProducts.style.pointerEvents,
            ] = [Name, category, Purchasing, silling, "", "none"];
            NameOfProduct.setAttribute("SerialID", ID);
            NameOfProduct.setAttribute("num", entafen);
            NameOfProduct.setAttribute("Where", whereRU);
            LoopProducts.setAttribute("path", img);
            LoopProducts.setAttribute("date", Date);
            Arrow.click();

            // Edit(Elemets, img, entafen, ID);
            Edito();
          });
          StorageBtn();
        }
      });
    }

    // let edit = document.querySelectorAll(".BtnEdite");

    // edit.forEach((editebtns)=> {

    // })

    SearchCatigory.addEventListener("focus", () => {
      BtnSearch.setAttribute("where", "catigory");
      if (SearchCatigory.value.length >= 1) {
        CancelC.style.cssText = "opacity: 1;scale: 1;";
      } else {
        CancelC.style.cssText = "opacity: 0;";
      }
    });
    SearchType.addEventListener("focus", () => {
      BtnSearch.setAttribute("where", "title");
      if (SearchType.value.length >= 1) {
        CancelT.style.cssText = "opacity: 1;scale: 1;";
      } else {
        CancelT.style.cssText = "opacity: 0;";
      }
    });

    SearchCatigory.addEventListener("focusout", () => {
      if (SearchCatigory.value.length >= 1) {
        CancelC.style.cssText = "opacity: 1;scale: 1;";
      } else {
        CancelC.style.cssText = "opacity: 0;";
      }
    });

    SearchType.addEventListener("focusout", () => {
      if (SearchType.value.length >= 1) {
        CancelT.style.cssText = "opacity: 1;scale: 1;";
      } else {
        CancelT.style.cssText = "opacity: 0;";
      }
    });

    CancelSearch.forEach((element) => {
      element.addEventListener("click", () => {
        element.style.cssText = "opacity: 0;";
        ConProducts.innerHTML = "";
        SearchCatigory.value = "";
        SearchType.value = "";
        remember(array);
      });
    });

    function Search(value, where) {
      let num;
      if (where == "title") {
        num = 1;
      } else if (where == "catigory") {
        num = 2;
      }

      [ConProducts.childNodes].forEach((element) => {
        element.forEach((el) => {
          el.childNodes[1].style.cssText =
            "background-color: transparent;border-radius: 0px;";
          el.childNodes[2].style.cssText =
            "background-color: transparent;border-radius: 0px;";
          let ArrayFrom = Array.from(el.childNodes[num].textContent);
          for (let i = 0; value.length > i; i++) {
            for (let j = 0; ArrayFrom.length > j; j++) {
              if (
                value[i].toLocaleLowerCase() == ArrayFrom[j].toLocaleLowerCase()
              ) {
                el.childNodes[num].style.cssText =
                  "background-color: rgb(102 219 102 / 49%);border-radius: 3px;";
                ConProducts.prepend(el);
              }
            }
          }
        });
      });
    }

    BtnSearch.addEventListener("click", () => {
      let where = BtnSearch.getAttribute("where");

      let val;
      if (where == "title") {
        val = SearchType.value;
      } else if (where == "catigory") {
        val = SearchCatigory.value;
      }

      Search(val, where);
    });
    function removeItem(ID) {
      array = array.filter((product) => product.id != ID);
      remember(array);
    }

    function Edito() {
      let EditeBTN = document.querySelector(`.EditeBTN`);

      if (EditeBTN.hasAttribute("lol")) {
        EditeBTN.addEventListener("click", function (e) {
          e.preventDefault();

          let [img, num, ID, Date, whereRU] = [
            LoopProducts.getAttribute("path"),
            NameOfProduct.getAttribute("num"),
            NameOfProduct.getAttribute("SerialID"),
            LoopProducts.getAttribute("date"),
            NameOfProduct.getAttribute("Where"),
          ];
          let target = document.querySelectorAll(".ContainerOfProducts")[num]
            .children;

          target[1].textContent = NameOfProduct.value;
          target[2].textContent = Category.value;
          target[3].textContent = PurchasingPrice.value;
          target[4].textContent = SellingPrice.value;

          array = array.filter((product) => product.id != ID);
          // console.log(array);

          // console.log(NameOfProduct.value + "/" + Category.value);
          const obj = {
            id: ID,
            nOfp: NameOfProduct.value,
            cOfP: Category.value,
            Buy: PurchasingPrice.value,
            selling: SellingPrice.value,
            image: img,
            date: Date,
            stat: true,
            storage: false,
          };

          array.splice(whereRU, 0, obj);

          remember(array);
          LoopProducts.removeAttribute("path");
          LoopProducts.removeAttribute("date");
          NameOfProduct.removeAttribute("num");
          NameOfProduct.removeAttribute("Where");
          NameOfProduct.removeAttribute("SerialID");

          setTimeout(() => {
            EditeBTN.classList.remove("EditeBTN");
            EditeBTN.classList.add("BtnAddProduct");
            EditeBTN.removeAttribute("lol");
            LoopProducts.style.pointerEvents = "all";
            LoopProducts.value = 1;
          }, 200);
        });
      }
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
            .querySelector(`.id${id}`)
            .childNodes[0].setAttribute("path", reader.result);
          UpdatePhoto(reader.result, id);
        };
        reader.readAsDataURL(file);
      }
    });
    function UpdatePhoto(img, ID) {
      let parent = document.querySelector(`.id${ID}`);
      let Name = parent.childNodes[1].innerText;
      let category = parent.childNodes[2].innerText;
      let Purchasing = parent.childNodes[3].innerText;
      let silling = parent.childNodes[4].innerText;
      let entafen = parent.childNodes[0].getAttribute("Where");
      let Date = parent.getAttribute("date");
      // let StorgData = parent.getAttribute("StorgData");

      entafen = Number(entafen) - 1;

      NameOfProduct.value = Name;
      Category.value = category;
      PurchasingPrice.value = Purchasing;
      SellingPrice.value = silling;
      LoopProducts.value = 1;

      array = array.filter((product) => product.id != ID);

      const obj = {
        id: ID,
        nOfp: NameOfProduct.value,
        cOfP: Category.value,
        Buy: PurchasingPrice.value,
        selling: SellingPrice.value,
        number: LoopProducts.value,
        image: img,
        date: Date,
        stat: true,
        storage: false,
      };

      array.splice(entafen, 0, obj);
      remember(array);
    }
    StorageBtn();
    function StorageBtn() {
      document.querySelectorAll(".storage").forEach((ele) => {
        ele.addEventListener("click", function () {
          let elements = this.parentElement.childNodes;
          let Date = this.parentElement.getAttribute("date");
          let ID = this.getAttribute("id");

          let path = elements[0].getAttribute("path"),
            Name = elements[1].textContent,
            CAT = elements[2].textContent,
            BUY = elements[3].textContent,
            SEll = elements[4].textContent;

          array = array.filter((e) => e.id != ID);
          this.parentElement.remove();
          const NewProduct = {
            id: ID,
            date: Date,
            stat: true,
            image: path,
            nOfp: Name,
            cOfP: CAT,
            Buy: BUY,
            selling: SEll,
            storage: true,
          };

          array.push(NewProduct);
          remember(array);
        });
      });
    }
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
    document.querySelector(".ShoppingCart").addEventListener("click", () => {
      window.localStorage.where = "Boss";
      window.location.href = "ShoppingCart.html";
    });
    Safe.addEventListener("click", () => {
      window.location.href = "Safe.html";
    });
    Stock.addEventListener("click", () => {
      window.location.href = "Store.html";
    });
  } else {
    window.location.href = "index.html";
  }
});
