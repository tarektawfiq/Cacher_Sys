document.addEventListener("DOMContentLoaded", function () {
  let ConProducts = document.querySelector(".Products");

  let data = JSON.parse(localStorage.getItem("Product"));

  let Shopping = document.querySelector(".ShoppingCart");

  let redDot = document.querySelector(".redDot");

  let SearchCatigory = document.querySelector(".SearchCategory");

  let SearchType = document.querySelector(".SearchType");

  let BtnSearch = document.querySelector(".BtnSearch");

  let CancelT = document.querySelector(".CancelT");

  let CancelC = document.querySelector(".CancelC");

  let CancelSearch = document.querySelectorAll(".CancelSearch");

  let array = [];
  let productsArr = [];
  let ArrP = [];

  if (localStorage.getItem("Product")) {
    ArrP = JSON.parse(localStorage.getItem("Product"));
  }

  if (localStorage.getItem("sale")) {
    array = JSON.parse(localStorage.getItem("sale"));

    if (
      JSON.parse(localStorage.getItem("sale"))[
        JSON.parse(localStorage.getItem("sale")).length - 1
      ].done != false
    ) {
      Shopping.style.cssText = "display: none;";
    } else {
      productsArr =
        array[JSON.parse(localStorage.getItem("sale")).length - 1].products;
    }
  } else {
    Shopping.style.cssText = "display: none;";
  }

  if (!ConProducts.closest(".ContainerOfProducts")) {
    // start from here
    let EmpitySpan = `<span style='text-align: center;color: var(--main_color); letter-spacing: 2px;line-height: 1.5;'>Theren't Products, <br> Add Products Please</span>`;
    ConProducts.style.cssText = "text-align: center; margin-top: 50px;";
    ConProducts.innerHTML = EmpitySpan;
  }

  if (localStorage.getItem("Product")) {
    RememberData();
  }

  function RememberData() {
    let num = 0;
    ConProducts.innerHTML = "";
    data = data.filter((e) => e.stat == true);
    data.forEach((e) => {
      if (e.storage == false) {
        num++;
        let numberloop = document.createElement("span");
        numberloop.classList = "AddPhoto";
        numberloop.setAttribute("id", e.id);
        numberloop.setAttribute("path", e.image);
        numberloop.textContent = num;
        let Product = document.createElement("div");
        Product.setAttribute("id", e.id);
        Product.classList = "ContainerOfProducts";
        Product.classList.add(`id${e.id}`);
        let spanName = document.createElement("span");
        spanName.textContent = e.nOfp;
        let spanCategory = document.createElement("span");
        spanCategory.textContent = e.cOfP;
        let spanPurchasingPrice = document.createElement("span");
        spanPurchasingPrice.textContent = e.Buy;
        let spanSellingPrice = document.createElement("span");
        spanSellingPrice.textContent = e.selling;
        let spanCard = document.createElement("span");
        spanCard.classList.add("AddCard");
        spanCard.textContent = "Add To CARD";
        let spanquantaty = document.createElement("span");
        spanquantaty.classList.add("QuantatyInput");
        spanquantaty.setAttribute("contenteditable", "true");
        spanquantaty.textContent = "1";
        Product.append(
          numberloop,
          spanName,
          spanCategory,
          spanSellingPrice,
          spanquantaty,
          spanCard
        );
        ConProducts.append(Product);
        let DoneOrnO, NumberArr;
        spanCard.addEventListener("click", function () {
          let parent = document.querySelector(`.id${e.id}`);

          if (localStorage.getItem("sale")) {
            NumberArr = JSON.parse(localStorage.getItem("sale")).length;
            DoneOrnO = JSON.parse(localStorage.getItem("sale"))[NumberArr - 1]
              .done;
          }

          if (Number(parent.children[4].textContent)) {
            const Name = parent.children[1].textContent;
            const SellingPrice = parent.children[3].textContent;
            const Quantaty = parent.children[4].textContent;
            const IDProduct = e.id;

            const ID = new Date().getTime();

            let date = new Date();

            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();

            let fulldate = day + "-" + month + "-" + year;
            if (localStorage.getItem("sale")) {
              let NewQuantaty;
              if (DoneOrnO != true) {
                array[NumberArr - 1].products.forEach((element) => {
                  if (element.IdProduct == IDProduct) {
                    NewQuantaty =
                      Number(element.ConQuantaty) + Number(Quantaty);
                    productsArr = array[NumberArr - 1].products.filter(
                      (product) => product.IdProduct != IDProduct
                    );
                  } else {
                    NewQuantaty = Quantaty;
                  }
                });
              }
              let LastQ = NewQuantaty ? NewQuantaty : Quantaty;
              // console.log(LastQ);

              const con = {
                ConName: Name,
                ConSelling: SellingPrice,
                ConQuantaty: LastQ,
                IdProduct: IDProduct,
              };
              productsArr.push(con);
              redDot.style.cssText = "scale: 1;";

              if (DoneOrnO != true) {
                let res = JSON.parse(localStorage.getItem("sale"));
                array = array.filter(
                  (product) => product.id != res[NumberArr - 1].id
                );
                const obj = {
                  id: res[NumberArr - 1].id,
                  date: res[NumberArr - 1].date,
                  products: productsArr,
                  done: false,
                  discount: "0%",
                  hide: false,
                };

                array.push(obj);
              } else {
                const obj = {
                  id: ID,
                  date: fulldate,
                  products: productsArr,
                  done: false,
                  discount: "0%",
                  hide: false,
                };
                array.push(obj);
              }
            } else {
              const con = {
                ConName: Name,
                ConSelling: SellingPrice,
                ConQuantaty: Quantaty,
                IdProduct: IDProduct,
              };
              productsArr.push(con);
              const obj = {
                id: ID,
                date: fulldate,
                products: productsArr,
                done: false,
                discount: "0%",
                hide: false,
              };
              array.push(obj);
              Shopping.style.cssText = "display: block;";
              redDot.style.cssText = "scale: 1;";
            }
            Shopping.style.cssText = DoneOrnO == true && "display: block;";
            remember(array);
          } else {
            return false;
          }
          ArrP = ArrP.filter((product) => product.id != e.id);
          const obj = {
            id: e.id,
            nOfp: e.nOfp,
            cOfP: e.cOfP,
            Buy: e.Buy,
            selling: e.selling,
            number: e.number,
            image: e.image,
            date: e.date,
            stat: false,
          };
          ArrP.push(obj);
          RProduct(ArrP);
          this.parentElement.remove();
          if (ConProducts.children.length == 0) {
            let EmpitySpan = `<span style='text-align: center;color: var(--main_color); letter-spacing: 2px;line-height: 1.5;'>Theren't Products, <br> Add Products Please</span>`;
            ConProducts.style.cssText = "text-align: center; margin-top: 50px;";
            ConProducts.innerHTML = EmpitySpan;
          }
        });
      }
    });
  }
  document.querySelector(".ShoppingCart").addEventListener("click", () => {
    window.localStorage.where = "Cacher";
    window.location.href = "ShoppingCart.html";
  });

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
      ConProducts.innerHTML = "";
      SearchCatigory.value = "";
      SearchType.value = "";
      RememberData();
    });
  });

  let test = true;
  function Search(value, where) {
    let num;
    if (where == "title") {
      num = 1;
    } else if (where == "catigory") {
      num = 2;
    }

    if (test) {
      [ConProducts.childNodes][0][0].remove();
      test = false;
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

  function remember(arr) {
    const res = JSON.stringify(arr);
    window.localStorage.sale = res;
  }

  function RProduct(ObjP) {
    ObjP = JSON.stringify(ObjP);
    window.localStorage.Product = ObjP;
  }
});
