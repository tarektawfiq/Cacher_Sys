let CloseIcon = document.querySelector(".CloseIcon");

let PopUp = document.querySelector(".PopUp");

let UploadImage = document.querySelector(".UploadImage");

if (document.querySelector(".IconBackDoor")) {
  let IconBackDoor = document.querySelector(".IconBackDoor");

  let Options = document.querySelector(".Options");

  let LogOut = document.querySelector(".LogOut");

  IconBackDoor.addEventListener("click", function () {
    Options.classList.toggle("Active");
  });
  if (window.location.pathname.includes("Store")) {
    document.querySelector(".LogOut").addEventListener("click", function () {
      window.location.href = "Boss.html";
    });
  } else if (window.location.pathname.includes("Safe")) {
    LogOut.addEventListener("click", function () {
      window.location.href = "Boss.html";
    });
  } else if (window.location.pathname.includes("ShoppingCart")) {
    document.querySelector(".LogOut").addEventListener("click", function () {
      window.location.href = `${localStorage.getItem("where")}.html`;
    });
  } else {
    document.querySelector(".LogOut").addEventListener("click", function () {
      sessionStorage.clear();
      window.location.href = "index.html";
    });
  }
}

if (document.querySelector(".Boss")) {
  document.querySelector(".Boss").addEventListener("click", function () {
    if (!sessionStorage.getItem("Bosspass")) {
      window.location.href = "index.html";
    }
  });
}

if (document.querySelector(".ShoppingCart")) {
  document.querySelector(".ShoppingCart").addEventListener("click", () => {
    let where;
    if (document.title == "Product Managment System") {
      where = "Boss";
    } else {
      where = "Cacher";
    }

    window.localStorage.where = where;
    window.location.href = "ShoppingCart.html";
  });
}


if (CloseIcon) {
  CloseIcon.addEventListener("click", function () {
    PopUp.classList.remove("Active");
    let ID = PopUp.getAttribute("id");
    PopUp.removeAttribute("id");
    UploadImage.removeAttribute("id");
    setTimeout(() => {
      UploadImage.style.cssText = "background-image: ;";
      UploadImage.classList.add("fa-add");
      UploadImage.textContent = "Empity";
    }, 200);
  });
}

function Total(Selling, Discount) {
  let afterDiscount;

  if (Discount === "") {
    afterDiscount = Selling;
  } else if (Discount.slice(-1) == "%") {
    afterDiscount = Number(
      Selling - (Selling / 100) * Discount.replace("%", "")
    );
  } else {
    afterDiscount = Number(Selling - Discount);
  }

  return afterDiscount;
}

if (!localStorage.getItem("Bosspass")) {
  window.location.href = "index.html";
}

// function Total(realNum , Selling , Discount) {
//     let afterDiscount;

//     if (Discount === "") {
//         afterDiscount = Selling
//     } else if (Discount.slice(-1) == "%") {
//          afterDiscount = Number(Selling - ((Selling / 100 ) * Discount.replace("%" ,"")))
//     } else {
//          afterDiscount = Number(Selling - Discount);
//     }

//     let mywin = afterDiscount - Number(realNum)

//     console.log(mywin);
//     console.log(afterDiscount);

//     return afterDiscount , mywin;
// }
