document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("prediction-form");
  const resultDiv = document.getElementById("result");

  function convertAgeToCategory(age) {
    if (age < 25) return -1.816213;
    else if (age < 30) return -1.537240;
    else if (age < 35) return -1.258266;
    else if (age < 40) return -0.979292;
    else if (age < 45) return -0.700319;
    else if (age < 50) return -0.421345;
    else if (age < 55) return -0.142371;
    else if (age < 60) return 0.136602;
    else if (age < 65) return 0.415576;
    else if (age < 70) return 0.694549;
    else if (age < 75) return 0.973523;
    else if (age < 80) return 1.252497;
    else return 1.531470;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    resultDiv.innerText = "⏳ Processing...";

    const formData = {
      "Unnamed: 0": 0,
      "BMI": parseFloat(document.getElementById("BMI").value),
      "Smoking": parseInt(document.getElementById("Smoking").value),
      "AlcoholDrinking": parseInt(document.getElementById("AlcoholDrinking").value),
      "Stroke": parseInt(document.getElementById("Stroke").value),
      "PhysicalHealth": parseFloat(document.getElementById("PhysicalHealth").value),
      "MentalHealth": parseFloat(document.getElementById("MentalHealth").value),
      "DiffWalking": parseInt(document.getElementById("DiffWalking").value),
      "Sex": parseInt(document.getElementById("Sex").value),
      "AgeCategory": convertAgeToCategory(parseInt(document.getElementById("Category").value)),
      "PhysicalActivity": parseInt(document.getElementById("PhysicalActivity").value),
      "GenHealth": parseInt(document.getElementById("GenHealth").value),
      "SleepTime": parseFloat(document.getElementById("SleepTime").value),
      "Asthma": parseInt(document.getElementById("Asthma").value),
      "KidneyDisease": parseInt(document.getElementById("KidneyDisease").value),
      "SkinCancer": parseInt(document.getElementById("SkinCancer").value),
      "Race_Asian": 0,
      "Race_Black": 0,
      "Race_Hispanic": 0,
      "Race_Other": 0,
      "Race_White": parseInt(document.getElementById("Race_White").value),
      "Diabetic_No, borderline diabetes": parseInt(document.getElementById("Diabetic_No").value),
      "Diabetic_Yes": parseInt(document.getElementById("Diabetic_Yes").value),
      "Diabetic_Yes (during pregnancy)": parseInt(document.getElementById("Diabetic_Preg").value)
    };

    try {
      const response = await fetch("https://mlflow-model-serving-production.up.railway.app/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error("API request failed");

      const data = await response.json();

      if (data.prediction === 1) {
        resultDiv.innerHTML = "<span style='color: #e63946;'>⚠️ High Risk of Heart Disease</span>";
      } else {
        resultDiv.innerHTML = "<span style='color: #2a9d8f;'>✅ Low Risk of Heart Disease</span>";
      }
    } catch (error) {
      console.error(error);
      resultDiv.innerHTML = "<span style='color: #e76f51;'>❌ Error: Failed to fetch API</span>";
    }
  });
});
