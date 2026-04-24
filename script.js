let data = [];
let current = 0;

// load JSON
fetch("cerdas_cermat_islam.json")
  .then(res => res.json())
  .then(json => {
    data = shuffle(json);
    loadQuestion();
  });

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function loadQuestion() {
  document.getElementById("question").innerText = data[current].pertanyaan;
  document.getElementById("answer").value = "";
  document.getElementById("result").innerText = "";
  document.getElementById("nextBtn").disabled = true;
}

function checkAnswer() {
  let user = document.getElementById("answer").value.trim().toLowerCase();
  let correct = String(data[current].jawaban).toLowerCase();
  let penjelasan = data[current].penjelasan || "";

  if (user === correct) {
    document.getElementById("result").innerHTML =
      "✅ BENAR!<br><br>" + penjelasan;
  } else {
    document.getElementById("result").innerHTML =
      "❌ SALAH! Jawaban: " + data[current].jawaban +
      "<br><br>" + penjelasan;
  }

  document.getElementById("nextBtn").disabled = false;
}

function nextQuestion() {
  current++;

  if (current >= data.length) {
    data = shuffle(data);
    current = 0;
  }

  loadQuestion();
}