let model;
const preview = document.getElementById("preview");
const fileInput = document.getElementById("fileInput");
const predictionResult = document.getElementById("predictionResult");
const predictBtn = document.getElementById("predictBtn");

// ✅ Load pre-trained AI model (PlantVillage Leaf Disease Model)
const MODEL_URL = "https://tfhub.dev/google/tfjs-model/plant_disease_model/1/default/1";

async function loadModel() {
  try {
    predictionResult.textContent = "🔄 Loading AI model...";
    model = await tf.loadGraphModel(MODEL_URL, { fromTFHub: true });
    predictionResult.textContent = "✅ Model loaded successfully! Upload or capture a leaf image.";
  } catch (error) {
    predictionResult.textContent = "❌ Failed to load model.";
    console.error(error);
  }
}
loadModel();

// 📸 Handle file upload
fileInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      preview.src = e.target.result;
      preview.style.display = "block";
    };
    reader.readAsDataURL(file);
  }
});

// 🔍 Predict Disease
predictBtn.addEventListener("click", async () => {
  if (!model || !preview.src) {
    predictionResult.textContent = "⚠️ Please upload an image first.";
    return;
  }

  try {
    const img = tf.browser.fromPixels(preview);
    const resized = tf.image.resizeBilinear(img, [224, 224]).div(255).expandDims(0);
    const predictions = await model.predict(resized).data();
    img.dispose();
    resized.dispose();

    const classes = ["Healthy", "Leaf Spot", "Rust", "Blight", "Mosaic Virus", "Mildew"];
    const maxIndex = predictions.indexOf(Math.max(...predictions));

    predictionResult.innerHTML = `
      🌿 <strong>Prediction:</strong> ${classes[maxIndex]}<br>
      📊 Confidence: ${(predictions[maxIndex] * 100).toFixed(2)}%
    `;
  } catch (error) {
    predictionResult.textContent = "❌ Error analyzing image.";
    console.error(error);
  }
});

// 💡 Popup for photo tips
const tipsBtn = document.getElementById("tipsBtn");
const tipsPopup = document.getElementById("tipsPopup");
const closePopup = document.getElementById("closePopup");

tipsBtn.addEventListener("click", () => (tipsPopup.style.display = "flex"));
closePopup.addEventListener("click", () => (tipsPopup.style.display = "none"));
