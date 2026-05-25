(function() {
  const SECRET_KEY = "open-sesame";
  const cmdInput  = document.getElementById("cmd");
  const outputDiv = document.getElementById("output");
  const wishDiv   = document.getElementById("wish");

  cmdInput.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
      const userInput = cmdInput.value.trim();
      const echoLine  = document.createElement("div");
      echoLine.textContent = "➜ " + userInput;
      outputDiv.appendChild(echoLine);

      if (userInput === SECRET_KEY) {
        const ok = document.createElement("div");
        ok.textContent = "Access granted. Loading birthday wish…";
        outputDiv.appendChild(ok);
        wishDiv.style.display = "block";
      } else {
        const fail = document.createElement("div");
        fail.textContent = "Access denied. Try again.";
        outputDiv.appendChild(fail);
      }

      cmdInput.value = "";
      setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 10);
    }
  });
})();
