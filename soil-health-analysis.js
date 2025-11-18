// AgriAssist - Soil Health Analysis
// by Prabhjot Kaur 🌾

const cropDatabase = [
  {
    name: "Wheat",
    image: "wheat.avif",
    soil: ["alluvial", "black"],
    ph: [6.0, 7.5],
    nitrogen: "medium",
    phosphorus: "medium",
    potassium: "high"
  },
  {
    name: "Rice",
    image: "rice.avif",
    soil: ["alluvial", "laterite"],
    ph: [5.5, 6.5],
    nitrogen: "high",
    phosphorus: "medium",
    potassium: "high"
  },
  {
    name: "Maize",
    image: "maize.avif",
    soil: ["alluvial", "red", "black"],
    ph: [5.5, 7.0],
    nitrogen: "high",
    phosphorus: "medium",
    potassium: "medium"
  },
  {
    name: "Sugarcane",
    image: "sugarcane.avif",
    soil: ["black", "alluvial"],
    ph: [6.0, 7.5],
    nitrogen: "high",
    phosphorus: "high",
    potassium: "high"
  },
  {
    name: "Cotton",
    image: "cotton.avif",
    soil: ["black", "red"],
    ph: [6.0, 8.0],
    nitrogen: "medium",
    phosphorus: "medium",
    potassium: "high"
  },
  {
    name: "Pulses",
    image: "pulses.webp",
    soil: ["red", "laterite", "arid"],
    ph: [6.0, 7.5],
    nitrogen: "low",
    phosphorus: "medium",
    potassium: "low"
  },
  {
    name: "Groundnut",
    image: "groundnut.avif",
    soil: ["red", "sandy", "black"],
    ph: [6.0, 7.0],
    nitrogen: "low",
    phosphorus: "medium",
    potassium: "medium"
  },
  {
    name: "Potato",
    image: "potato.avif",
    soil: ["alluvial", "loamy"],
    ph: [5.0, 6.5],
    nitrogen: "high",
    phosphorus: "high",
    potassium: "medium"
  }
];

function analyzeSoil() {
  const soilType = document.getElementById("soilType").value;
  const ph = parseFloat(document.getElementById("ph").value);
  const nitrogen = parseFloat(document.getElementById("nitrogen").value);
  const phosphorus = parseFloat(document.getElementById("phosphorus").value);
  const potassium = parseFloat(document.getElementById("potassium").value);
  const soilResult = document.getElementById("soilResult");
  const cropSuggestions = document.getElementById("cropSuggestions");

  soilResult.innerHTML = "";
  cropSuggestions.innerHTML = "";

  if (!soilType || isNaN(ph) || isNaN(nitrogen) || isNaN(phosphorus) || isNaN(potassium)) {
    soilResult.innerHTML = `<p style="color:red;">⚠️ Please fill all the fields correctly before analysis.</p>`;
    return;
  }

  // Soil fertility analysis logic
  let fertility = "Moderate";
  if (nitrogen > 300 && phosphorus > 50 && potassium > 350) fertility = "High";
  else if (nitrogen < 150 || phosphorus < 20 || potassium < 150) fertility = "Low";

  let phStatus = "Neutral";
  if (ph < 6) phStatus = "Acidic";
  else if (ph > 7.5) phStatus = "Alkaline";

  // Display Soil Health Report
  soilResult.innerHTML = `
    <h3>🧪 Soil Health Report</h3>
    <p><strong>Soil Type:</strong> ${soilType.charAt(0).toUpperCase() + soilType.slice(1)}</p>
    <p><strong>pH Level:</strong> ${ph} (${phStatus})</p>
    <p><strong>Nitrogen:</strong> ${nitrogen} mg/kg</p>
    <p><strong>Phosphorus:</strong> ${phosphorus} mg/kg</p>
    <p><strong>Potassium:</strong> ${potassium} mg/kg</p>
    <p><strong>Fertility Level:</strong> ${fertility}</p>
  `;

  // Recommend crops based on conditions
  const recommended = cropDatabase.filter(crop => {
    return (
      crop.soil.includes(soilType) &&
      ph >= crop.ph[0] &&
      ph <= crop.ph[1]
    );
  });

  if (recommended.length === 0) {
    cropSuggestions.innerHTML = `<p>❌ No suitable crops found for this soil condition.</p>`;
    return;
  }

  // Display recommended crops with images
  recommended.forEach(crop => {
    const card = document.createElement("div");
    card.classList.add("crop-card");
    card.innerHTML = `
      <img src="${crop.image}" alt="${crop.name}">
      <h4>${crop.name}</h4>
      <p><strong>Soil:</strong> ${crop.soil.join(", ")}</p>
      <p><strong>Ideal pH:</strong> ${crop.ph[0]} - ${crop.ph[1]}</p>
    `;
    cropSuggestions.appendChild(card);
  });
}


