document.addEventListener("DOMContentLoaded", () => {
  let ContainersOfResets = document.querySelector(".ContainersOfResets");
  let NumberArr, ArrLoacl, IsDone, stat, hide;
  if (localStorage.getItem("sale")) {
    let ArrayProducts = [];
    if (localStorage.getItem("where") == "Cacher") {
      if (localStorage.getItem("Product")) {
        ArrayProducts = JSON.parse(localStorage.getItem("Product"));
      }

      rememberProducts(ArrayProducts);

      function rememberProducts(arr) {
        arr = JSON.stringify(arr);
        window.localStorage.Product = arr;
      }
    }

    ArrLoacl = JSON.parse(localStorage.getItem("sale"));

    NumberArr = JSON.parse(localStorage.getItem("sale")).length;

    JSON.parse(localStorage.getItem("sale")).forEach((con) => {
      stat = con.done;
      hide = con.hide;
      if (stat == true) {
        IsDone = "Ended";
      } else {
        IsDone = "";
      }
      let reset = `<div class="Reset Reset${con.id}" done='${con.done}'>
            <span class='IsDone'>${IsDone}<span class='DeleteReset fas fa-close' id='${con.id}'></span></span>
        <h2><span class="LogoOfReset"></span>El 7amama</h2>

        <div class="HeadDetails HeadDetails${con.id}">

        </div>
        <hr>
        <div class="ContainerOfSaleProducts">
            <span class="NameSection">Name</span>
            <span class="QuantatySection">Quantaty</span>
            <span class="PriceSection">Price Of One</span>
            <!-- <span>Discount</span> -->
            <span class="TotalSection">Total</span>
        </div>
        <hr>
        <div class="respnose respnose${con.id}">
            
        </div>
        <hr>
        <div class="EndSection">
            <span class="TotalPriceSection${con.id}"></span>
            <div class="ConDiscunt">
                Discunt:
                <span class="DiscountSection DiscountSection${con.id}" contenteditable="true">0%</span>
            </div>
        </div>
        <hr>
        <div class="Buttons">
            <div class="BtnPrint BTNS" id='BtnPrint${con.id}'>Print</div>
            <div class="BtnDone BTNS" id='BtnDone${con.id}'>Cach</div>
        </div>
    </div>`;

      if (localStorage.getItem("where") == "Boss") {
        if (stat == true) {
          if (hide == false || !hide) {
            ContainersOfResets.innerHTML += reset;
          }
        }
      } else if (localStorage.getItem("where") == "Cacher") {
        if (stat == false) {
          ContainersOfResets.innerHTML += reset;
          document.querySelector(".DeleteReset").remove();
        }
      }
    });

    let HeadDetails = document.querySelector(".HeadDetails");
    let respnose = document.querySelector(".respnose");
    let TotalPriceSection = document.querySelector(".TotalPriceSection");
    let DiscountSection = document.querySelector(".DiscountSection");
    let BtnPrint = document.querySelector(".BtnPrint");
    let BtnDone = document.querySelector(".BtnDone");
    let res = JSON.parse(localStorage.getItem("sale"));
    if (localStorage.getItem("where") == "Cacher") {
      res = res.filter((e) => e.hide != true && e.done == false);
    } else {
      res = res.filter((e) => e.hide != true);
    }
    let resetnumber = 0;

    res.forEach((element) => {
      hide = element.hide;
      let ID = element.id;
      let Date = element.date;
      let Done = element.done;
      let disc = element.discount;
      // if (hide == false || !hide) {
      resetnumber++;

      HeadDetails = document.querySelector(`.HeadDetails${ID}`);
      TotalPriceSection = document.querySelector(`.TotalPriceSection${ID}`);
      DiscountSection = document.querySelector(`.DiscountSection${ID}`);

      BtnDone = document.getElementById(`BtnDone${ID}`);
      BtnPrint = document.getElementById(`BtnPrint${ID}`);
      let spanID = document.createElement("span");
      spanID.classList.add("spanID");
      spanID.textContent = `Serial ID: ${ID}`;
      respnose = document.querySelector(`.respnose${ID}`);
      let spanDate = document.createElement("span");
      spanDate.classList.add("spanDate");
      spanDate.textContent = `Date: ${Date}`;
      DiscountSection.textContent = `${disc}`;

      let spanNumber = document.createElement("span");
      spanNumber.classList.add("spanNumber");
      spanNumber.textContent = `Number: ${resetnumber}`;
      HeadDetails.append(spanID, spanNumber, spanDate);
      let TotalPrice = 0;

      element.products.forEach((e) => {
        let NameP = e.ConName;
        let SellingP = e.ConSelling;
        let QuantatyP = e.ConQuantaty;
        let IDP = e.IdProduct;

        SellingP = Number(SellingP);

        QuantatyP = Number(QuantatyP);

        let conOp = document.createElement("div");

        conOp.classList.add("ContainerInReset");

        conOp.setAttribute("id", IDP);

        let spanName = document.createElement("span");

        spanName.classList.add("ResetName");

        spanName.textContent = NameP;

        let Delete = document.createElement("i");

        Delete.classList.add(`RemoveProduct`);

        Delete.classList.add(`RemoveProduct${ID}`);

        Delete.textContent = "-";

        let spanSelling = document.createElement("span");

        spanSelling.textContent = SellingP;

        let spanquantaty = document.createElement("span");

        spanquantaty.classList.add("NumQuantaty");

        spanquantaty.textContent = QuantatyP;

        let spanID = document.createElement("span");

        spanID.classList.add("SpanID");

        spanID.textContent = "#" + IDP;

        let spanDiscount = document.createElement("span");

        spanDiscount.setAttribute("contenteditabe", "true");

        let SpanTotal = document.createElement("span");

        SpanTotal.classList.add("TotalPrice");

        SpanTotal.textContent = QuantatyP * SellingP;

        TotalPrice += Number(SpanTotal.textContent);

        TotalPriceSection.textContent =
          (disc != "0%" && Total(TotalPrice, disc)) || TotalPrice;

        spanName.append(spanID);

        if (localStorage.getItem("where") == "Cacher") {
          conOp.append(Delete, spanName, spanquantaty, spanSelling, SpanTotal);
        } else if (localStorage.getItem("where") == "Boss") {
          conOp.append(spanName, spanquantaty, spanSelling, SpanTotal);
        }

        respnose.append(conOp);

        if (Done == true) {
          Delete.style.cssText = "display: none;";
          DiscountSection.textContent = disc;
          DiscountSection.style.cssText = "pointer-events: none;";
          BtnDone.style.cssText = "pointer-events: none;";
        } else {
          Delete.addEventListener("click", function (el) {
            var NewProducts = res[0].products;
            if (localStorage.getItem("where") == "Cacher") {
              NewProducts.forEach((prod) => {
                let Sobj;
                ArrayProducts.forEach((arr) => {
                  let id = arr.id,
                    Nbuy = arr.Buy,
                    NcOfP = arr.cOfP,
                    Ndate = arr.date,
                    Nimage = arr.image,
                    NnOfp = arr.nOfp,
                    Nselling = arr.selling;

                  ArrayProducts = ArrayProducts.filter(
                    (ele) => ele.id != prod.IdProduct
                  );

                  Sobj = {
                    id: id,
                    nOfp: NnOfp,
                    cOfP: NcOfP,
                    Buy: Nbuy,
                    selling: Nselling,
                    image: Nimage,
                    number: 1,
                    date: Ndate,
                    stat: true,
                    storage: false,
                  };
                });
                ArrayProducts.push(Sobj);
                rememberProducts(ArrayProducts);
              });
            }
            let IDParent = el.target.parentElement.getAttribute("id");
            DiscountSection = document.querySelector(
              `.DiscountSection${ID}`
            ).textContent;

            NewProducts = NewProducts.filter(
              (product) => product.IdProduct != IDParent
            );
            ArrLoacl = ArrLoacl.filter((list) => list.id != ID);

            const NewData = {
              id: ID,
              date: Date,
              products: NewProducts,
              done: false,
              discount: `${DiscountSection}`,
            };
            ArrLoacl.push(NewData);
            this.parentElement.remove();
            remember(ArrLoacl);

            if (respnose.children.length == 0) {
              window.location.href = "Cacher.html";
            }
          });
        }
      });
      // } else {
      //     return
      // }

      if (hide == false || !hide) {
        stat = document.querySelector(`.Reset${ID}`).getAttribute("done");
      }

      if (localStorage.getItem("where") == "Cacher") {
        TotalPriceSection.textContent =
          (JSON.parse(localStorage.getItem("sale"))[NumberArr - 1].discount !=
            "0%" &&
            Total(
              TotalPrice,
              JSON.parse(localStorage.getItem("sale"))[NumberArr - 1].discount
            )) ||
          TotalPrice;
      }

      DiscountSection.addEventListener("focusout", () => {
        if (stat == true) return;
        DiscountSection = document.querySelector(
          `.DiscountSection${ID}`
        ).textContent;

        TotalPriceSection.textContent = Total(TotalPrice, DiscountSection);

        let NewProducts = res[0].products;

        ArrLoacl = ArrLoacl.filter((list) => list.id != ID);
        const NewData = {
          id: ID,
          date: Date,
          products: NewProducts,
          done: false,
          discount: `${DiscountSection}`,
        };
        ArrLoacl.push(NewData);
        remember(ArrLoacl);
      });

      if (localStorage.getItem("where") == "Cacher") {
        if (stat == "true") {
          document.querySelector(`.Reset${ID}`).remove();
        }
      } else {
        BtnDone.style.cssText = "pointer-events: none;";
      }

      BtnPrint.addEventListener("click", function () {
        window.print();
      });

      BtnDone.addEventListener("click", function () {
        if (localStorage.getItem("where") == "Boss") return;

        let Products = JSON.parse(localStorage.getItem("sale"))[NumberArr - 1]
          .products;

        let ID = JSON.parse(localStorage.getItem("sale"))[NumberArr - 1].id;

        let Date = JSON.parse(localStorage.getItem("sale"))[NumberArr - 1].date;

        DiscountSection = document.querySelector(
          `.DiscountSection${ID}`
        ).textContent;
        ArrLoacl = ArrLoacl.filter((list) => list.id != ID);
        const DoneReset = {
          id: ID,
          date: Date,
          products: Products,
          done: true,
          discount: `${DiscountSection}`,
          hide: false,
        };

        ArrLoacl.push(DoneReset);

        remember(ArrLoacl);
        DiscountSection = document.querySelector(`.DiscountSection${ID}`);
        DiscountSection.style.cssText = "pointer-events: none;";
        BtnDone.style.cssText = "pointer-events: none;";
        document.querySelectorAll(".RemoveProduct").forEach((btn) => {
          btn.style.cssText = "display: none;";
        });
        if (localStorage.getItem("where") == "Cacher") {
          window.location.href = "Cacher.html";
        }
      });
    });

    function remember(data) {
      let resdata = JSON.stringify(data);
      window.localStorage.sale = resdata;
    }

    if (
      JSON.parse(localStorage.getItem("sale"))[NumberArr - 1].done != false &&
      localStorage.getItem("where") == "Cacher"
    ) {
      window.location.href = "Cacher.html";
    }

    document.querySelectorAll(".DeleteReset").forEach((Bd) => {
      Bd.addEventListener("click", function () {
        let ID = this.getAttribute("id");

        NewArr = ArrLoacl.filter((e) => e.id == ID);
        let target = NewArr[0],
          Date = target.date,
          Discount = target.discount,
          Done = target.done,
          Gproducts = target.products;

        ArrLoacl = ArrLoacl.filter((el) => el.id != ID);

        const obj = {
          id: ID,
          date: Date,
          products: Gproducts,
          discount: `${Discount}`,
          done: Done,
          hide: true,
        };

        ArrLoacl.push(obj);

        remember(ArrLoacl);

        this.parentElement.parentElement.remove();
      });
    });
  } else {
    window.location.href = "Cacher.html";
  }
});
