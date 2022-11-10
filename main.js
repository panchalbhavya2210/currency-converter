let btn = document.getElementById("submit");

btn.addEventListener("click", convert);

let currency = document.getElementById("currency");

currency.addEventListener("keyup", () => {
  let currency = document.getElementById("currency").value;
  let warnToggMinus = document.getElementById("warnToggMinus");

  if (currency < "0" && currency != "") {
    btn.disabled = true;
    warnToggMinus.classList.add("warnEmToggle");
  } else if (currency == "") {
    btn.disabled = false;
    warnToggMinus.classList.remove("warnEmToggle");
  } else {
    btn.disabled = false;
    warnToggMinus.classList.remove("warnEmToggle");
  }
});

function convert() {
  let currency = document.getElementById("currency").value;

  let toXon = document.getElementById("toConvert");
  let toCon = toXon.value;
  let forXon = document.getElementById("forConvert");
  let forCon = forXon.value;
  let warnTogg = document.getElementById("warnTogg");
  let fieldTogg = document.getElementById("warnEmptyField");
  let isEmt = document.getElementById("isEmpty");

  if (toCon == forCon) {
    fieldTogg.classList.add("warnEmToggle");
    setTimeout(() => {
      fieldTogg.classList.remove("warnEmToggle");
    }, 3000);
    isEmt.innerHTML = "Please select different currency...";
  } else if (toCon == "empty" || forCon == "empty") {
    fieldTogg.classList.add("warnEmToggle");
    setTimeout(() => {
      fieldTogg.classList.remove("warnEmToggle");
    }, 3000);
    isEmt.innerHTML = "Please select both currencies...";
  } else if (currency == "") {
    warnTogg.classList.add("warnEmToggle");
    setTimeout(() => {
      warnTogg.classList.remove("warnEmToggle");
    }, 3000);
  } else {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Host":
          "currency-conversion-and-exchange-rates.p.rapidapi.com",
        "X-RapidAPI-Key": "809a0bf07dmsh81685045fb7b3dcp1605c9jsn13035c2f0611",
      },
    };

    fetch(
      `https://currency-conversion-and-exchange-rates.p.rapidapi.com/convert?from=${toCon}&to=${forCon}&amount=${currency}`,
      options
    )
      .then((response) => {
        if (response.status == 200) {
          let responseClass = document.getElementById("xResult");

          xResult.style.opacity = "1";
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        let fResult = document.getElementById("finalResult");
        let mRound = data.result;
        fResult.innerHTML = mRound.toFixed(2);
      });

    let valOne = document.getElementById("valOne");
    let valTwo = document.getElementById("valTwo");
    let x = document.getElementById("x");
    let y = document.getElementById("y");
    let inpRes = document.getElementById("inputResult");

    x.innerHTML = toCon;
    y.innerHTML = forCon;
    valOne.innerHTML = toCon + " " + "AMOUNT";
    valTwo.innerHTML = forCon + " " + "AMOUNT";
    inpRes.innerHTML = currency;
    //  fResult.innerHTML = data.result;
  }
}
