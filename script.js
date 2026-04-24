let data = [];
let current = 0;
let score = 0;

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
    score += 10;
    document.getElementById("result").innerHTML =
      "✅ Benar!<br>" + penjelasan;
  } else {
    document.getElementById("result").innerHTML =
      "❌ Salah! Jawaban: " + data[current].jawaban +
      "<br>" + penjelasan;
  }

  document.getElementById("score").innerText = score;
  document.getElementById("nextBtn").disabled = false;
}

function nextQuestion() {
  current++;
  if (current >= data.length) {
    alert("Game selesai! Score kamu: " + score);
    current = 0;
    score = 0;
  }
  loadQuestion();
}
