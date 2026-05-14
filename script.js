let data = [];
let current = 0;
let score = 0;

fetch("cerdas_cermat_islam.json")
  .then(res => {
    if (!res.ok) {
      throw new Error("File JSON tidak ditemukan");
    }
    return res.json();
  })
  .then(json => {
    data = shuffle(json);

    if (data.length === 0) {
      document.getElementById("question").innerText =
        "Soal kosong";
      return;
    }

    loadQuestion();
  })
  .catch(err => {
    console.error(err);

    document.getElementById("question").innerText =
      "Gagal memuat soal";
  });

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

function loadQuestion() {

  if (!data[current]) {
    document.getElementById("question").innerText =
      "Soal tidak ditemukan";
    return;
  }

  document.getElementById("question").innerText =
    data[current].pertanyaan;

  document.getElementById("answer").value = "";

  document.getElementById("result").innerText = "";

  document.getElementById("nextBtn").disabled = true;
}

function checkAnswer() {

  let user = document
    .getElementById("answer")
    .value
    .trim()
    .toLowerCase();

  let correct = String(data[current].jawaban)
    .trim()
    .toLowerCase();

  let penjelasan =
    data[current].penjelasan || "";

  if (user === correct) {

    score += 10;

    document.getElementById("result").innerHTML =
      "✅ Benar!<br>" + penjelasan;

  } else {

    document.getElementById("result").innerHTML =
      "❌ Salah! Jawaban: " +
      data[current].jawaban +
      "<br>" +
      penjelasan;
  }

  document.getElementById("score").innerText =
    score;

  document.getElementById("nextBtn").disabled =
    false;
}

function nextQuestion() {

  current++;

  if (current >= data.length) {

    alert("Game selesai! Score kamu: " + score);

    current = 0;

    score = 0;

    data = shuffle(data);

    document.getElementById("score").innerText =
      score;
  }

  loadQuestion();
}
