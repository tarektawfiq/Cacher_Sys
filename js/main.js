let exit = document.querySelector(".colse");
let btn = document.querySelector(".BtnEnter");
let ErrorText = document.querySelector(".Error");
let Boss = document.querySelector(".Boss");
let Cacher = document.querySelector(".Cacher");
let InputBoss = document.querySelector(".BossInput");
let FromBoss = document.querySelector(".FromBoss");
let ConfirmPass = document.querySelector(".ConfirmPass");

exit.addEventListener("click", () => {
  window.location.href = "closekiosk";
});

Boss.addEventListener("click", () => {
  if (localStorage.getItem("Bosspass")) {
    FromBoss.style.opacity = "1";
    FromBoss.style.pointerEvents = "all";
    ConfirmPass.style.display = "none";
    InputBoss.focus();
  } else {
    FromBoss.style.opacity = "1";
    FromBoss.style.pointerEvents = "all";
    InputBoss.focus();
  }
});

Cacher.addEventListener("click", () => {
  let location = Cacher.getAttribute("href");
  window.location.href = location;
});

btn.addEventListener("click", (e) => {
  e.preventDefault();
  if (localStorage.getItem("Bosspass")) {
    if (InputBoss.value == localStorage.getItem("Bosspass")) {
      window.location.href = "Boss.html";
      sessionStorage.setItem("Bosspass", "ta302002");
    } else {
      // console.log("wrong");
      ErrorText.style.cssText = "scale:1;";
      ErrorText.textContent = "The Password Is Wrong";
      setTimeout(() => {
        ErrorText.style.cssText = "scale:0;";
        ErrorText.textContent = "";
      }, 2000);
    }
  } else {
    if (InputBoss.value == ConfirmPass.value) {
      localStorage.setItem("Bosspass", InputBoss.value);
      window.location.href = "Boss.html";
      sessionStorage.setItem("Bosspass", InputBoss.value);
    } else {
      ErrorText.style.cssText = "scale:1;";
      ErrorText.textContent = "The Password Is Not Match";
      setTimeout(() => {
        ErrorText.style.cssText = "scale:0;";
        ErrorText.textContent = "";
      }, 2000);
    }
  }
});
// ##################################################################################
// Here There An Update U Will Make Export For All Data Not For Product Only#########
// ##################################################################################
function exportLocalStorageToJson(filename = "data.json") {
  // Retrieve item from localStorage
  const data = localStorage.getItem("Product");

  if (!data) {
    console.error("No data found in localStorage for 'Product'.");
    return;
  }

  try {
    const parsedData = JSON.parse(data);
    const jsonString = JSON.stringify(parsedData, null, 2);

    const blob = new Blob([jsonString], { type: "application/json" });

    const link = document.getElementById("backup");

    link.href = URL.createObjectURL(blob);

    link.download = filename;

    console.log("Generated Blob URL:", link.href);

    link.addEventListener("click", () => {
      // window.open(link.href)
      setTimeout(() => URL.revokeObjectURL(link.href), 100);
    });
  } catch (error) {
    console.error("Failed to parse 'Product' data:", error);
  }
}
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("service-worker.js")
    .then((reg) => console.log("Service Worker registered:", reg.scope))
    .catch((err) => console.error("Service Worker error:", err));
}
exportLocalStorageToJson("myLocalStorageData.json");
