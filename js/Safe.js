document.addEventListener("DOMContentLoaded", function () {
  // #########################################################################################
  // There is Problems Here This The End Of Problems Ya Rayeeeeeees###########################
  // Problem Is Done Now #####################################################################
  // #########################################################################################
  let BodyTable = document.querySelector(".BodyTable");

  let array = [];

  if (!sessionStorage.getItem("Bosspass")) {
    window.location.href = "index.html";
  }

  localStorage.getItem("Safe")
    ? (array = JSON.parse(localStorage.getItem("Safe")))
    : (array = []);

  let date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  let fulldate = day + "-" + month + "-" + year;

  if (array.length != 0) {
    RememberData(array);
  }

  let DateIntable, Income, Expenses, Gain;

  function RememberData(Data) {
    Data.forEach((Row) => {
      if (Row.date != fulldate) {
          if (Row.Exp == 0 && Row.IN == 0) {
            array = array.filter((e)=> e.date != Row.date)
          }
      }
      
      let Gdate = Row.date,
        Gexp = Row.Exp,
        Gin = Row.IN,
        Ggn = Row.GN;

      if (fulldate > Gdate) {
        let NewROW = `
                <tr>
                        <td class="RowX Date">${Gdate}</td>
                        <td class="RowX Expenses">${Gexp}</td>
                        <td class="RowX Income">${Gin}</td>
                        <td class="RowX Gain">${Ggn}</td>
                </tr>
            `;
        BodyTable.innerHTML += NewROW;
      }
    });
  }

  DateIntable = fulldate;

  let DataFormStore = localStorage.getItem("Product");

  let SellingProducts = localStorage.getItem("sale");
  if (DataFormStore) {
    DataFormStore = JSON.parse(DataFormStore);

    let totalBuy = 0;
    DataFormStore.forEach((Obj) => {
      if (Obj.date == fulldate) {
        let Buy = Number(Obj.Buy);
        totalBuy += Buy;
      }
    });

    if (Expenses != 0) {
      Expenses = totalBuy;
    } else {
      Expenses = 0;
    }
  } else {
    Expenses = 0;
  }
  if (SellingProducts) {
    SellingProducts = JSON.parse(SellingProducts);
    let TotalGain = 0;
    SellingProducts.forEach((reset) => {
      if (reset.date == fulldate) {
        let TotalWin = 0;
        reset.products.forEach((el) => {
          TotalWin += Number(el.ConSelling);
        });
        // console.log(Total(TotalWin, reset.discount));

        TotalGain += Total(TotalWin, reset.discount);
      }
    });
    if (TotalGain != 0) {
      Income = TotalGain;
    } else {
      Income = 0;
    }
  } else {
    Income = 0;
  }
  if (Income != 0 && Expenses != 0) {
    Gain = Number(Income) - Number(Expenses);
  } else if (Income != 0) {
    Gain = Number(Income);
  } else {
    Gain = 0;
  }

  let NewROW = `
        <tr>
                <td class="RowX Date Out">${DateIntable}</td>
                <td class="RowX Expenses Out">${Expenses}</td>
                <td class="RowX Income Out">${Income}</td>
                <td class="RowX Gain Out">${Gain}</td>
        </tr>
    `;

  BodyTable.innerHTML += NewROW;
  array.push({ date: DateIntable, Exp: Expenses, GN: Gain, IN: Income });

  array.forEach((Ele) => {    
    if (fulldate == Ele.date) {
      let Rdate = Ele.date;
      // ,Rex = Ele.Exp,
      // Rgn = Ele.GN,
      // Rin = Ele.Income
      array = array.filter((arr) => arr.date != Rdate);
      const OBJ = {
        date: Rdate,
        Exp: Expenses,
        GN: Gain,
        IN: Income,
      };
      array.push(OBJ);
      InsertData(array);
    } else {
      const OBJ = {
        date: DateIntable,
        Exp: Expenses,
        GN: Gain,
        IN: Income,
      };
      array.push(OBJ);
      InsertData(array);
    }
  });

  function InsertData(data) {
    let NewData = JSON.stringify(data);
    window.localStorage.Safe = NewData;
  }
});
