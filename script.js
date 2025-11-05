document.getElementById("predictionForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  // تحويل العمر إلى قيمة AgeCategory المعيارية
  const age = parseInt(document.getElementById("Age").value);
  let ageScaled = 0;

  if (age >= 18 && age <= 24) ageScaled = -1.816213;
  else if (age <= 29) ageScaled = -1.537240;
  else if (age <= 34) ageScaled = -1.258266;
  else if (age <= 39) ageScaled = -0.979292;
  else if (age <= 44) ageScaled = -0.700319;
  else if (age <= 49) ageScaled = -0.421345;
  else if (age <= 54) ageScaled = -0.142371;
  else if (age <= 59) ageScaled = 0.136602;
  else if (age <= 64) ageScaled = 0.415576;
  else if (age <= 69) ageScaled = 0.694549;
  else if (age <= 74) ageScaled = 0.973523;
  else if (age <= 79) ageScaled = 1.252497;
  else ageScaled = 1.531470; // 80+

  const raceSelected = document.getElementById("Race").value;
  const diabeticSelected = document.getElementById("Diabetic").value;

  const data = {
    "Unnamed: 0": 0,
    "BMI": parseFloat(document.getElementById("BMI").value),
    "Smoking": parseInt(document.getElementById("Smoking").value),
    "AlcoholDrinking": parseInt(document.getElementById("AlcoholDrinking").value),
    "Stroke": parseInt(document.getElementById("Stroke").value),
    "PhysicalHealth": parseInt(document.getElementById("PhysicalHealth").value),
    "MentalHealth": parseInt(document.getElementById("MentalHealth").value),
    "DiffWalking": parseInt(document.getElementById("DiffWalking").value),
    "Sex": parseInt(document.getElementById("Sex").value),
    "AgeCategory": ageScaled,
    "PhysicalActivity": parseInt(document.getElementById("PhysicalActivity").value),
    "GenHealth": parseInt(document.getElementById("GenHealth").value),
    "SleepTime": parseInt(document.getElementById("SleepTime").value),
    "Asthma": parseInt(document.getElementById("Asthma").value),
    "KidneyDisease": parseInt(document.getElementById("KidneyDisease").value),
    "SkinCancer": parseInt(document.getElementById("SkinCancer").value),
    "Race_Asian": raceSelected === "Asian" ? 1 : 0,
    "Race_Black": raceSelected === "Black" ? 1 : 0,
    "Race_Hispanic": raceSelected === "Hispanic" ? 1 : 0,
    "Race_Other": raceSelected === "Other" ? 1 : 0,
    "Race_White": raceSelected === "White" ? 1 : 0,
    "Diabetic_No, borderline diabetes": diabeticSelected === "No, borderline diabetes" ? 1 : 0,
    "Diabetic_Yes": diabeticSelected === "Yes" ? 1 : 0,
    "Diabetic_Yes (during pregnancy)": diabeticSelected === "Yes (during pregnancy)" ? 1 : 0
  };

  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "⏳ Predicting...";

  try {
    const response = await fetch("https://mlflow-model-serving-production.up.railway.app/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error("Network error");
    const result = await response.json();

    resultDiv.innerHTML =
      result?.prediction === 1
        ? "❤️‍🔥 High Risk of Heart Disease"
        : "💚 Low Risk of Heart Disease";
  } catch (error) {
    resultDiv.innerHTML = "❌ Error: Failed to fetch API";
    console.error(error);
  }
});
