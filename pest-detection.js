// pest.js - AgriAssist Pest Detection with drag-drop & camera support
const MODEL_URL = "https://teachablemachine.withgoogle.com/models/[...]"; // Replace with TFJS model URL if you have one
let modelLoaded = false;
let model = null;

// Elements
const imageInput = document.getElementById('imageInput');
const dropZone = document.getElementById('dropZone');
const preview = document.getElementById('preview');
const analyzeBtn = document.getElementById('analyzeBtn');
const demoBtn = document.getElementById('demoBtn');
const cameraBtn = document.getElementById('cameraBtn');
const resultsEl = document.getElementById('results');
const predictionsEl = document.getElementById('predictions');
const adviceEl = document.getElementById('advice');
const modelStatus = document.getElementById('modelStatus');

// Tutorial modal
const openTutorial = document.getElementById('openTutorial');
const closeTutorial = document.getElementById('closeTutorial');
const tutorialModal = document.getElementById('tutorialModal');

// Open & close tutorial
openTutorial.addEventListener('click', ()=> tutorialModal.classList.remove('hidden'));
closeTutorial.addEventListener('click', ()=> tutorialModal.classList.add('hidden'));

// Camera capture
cameraBtn.addEventListener('click', async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
  const video = document.createElement('video');
  video.srcObject = stream;
  video.play();

  // Temporary preview window
  const overlay = document.createElement('div');
  overlay.className = 'modal';
  overlay.innerHTML = `
    <div class="modal-content">
      <h2>📷 Capture Image</h2>
      <video id="camPreview" autoplay playsinline style="width:100%; border-radius:8px;"></video>
      <button id="snapBtn" class="btn" style="margin-top:10px;">Capture</button>
    </div>`;
  document.body.appendChild(overlay);

  overlay.querySelector('#camPreview').srcObject = stream;

  overlay.querySelector('#snapBtn').addEventListener('click', () => {
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth; canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    const dataUrl = canvas.toDataURL('image/jpeg');
    preview.src = dataUrl;
    analyzeBtn.disabled = false;
    resultsEl.classList.add('hidden');
    stream.getTracks().forEach(t => t.stop());
    document.body.removeChild(overlay);
  });
});

// Drag and Drop
dropZone.addEventListener('dragover', e => {
  e.preventDefault();
  dropZone.classList.add('dragover');
});
dropZone.addEventListener('dragleave', e => {
  e.preventDefault();
  dropZone.classList.remove('dragover');
});
dropZone.addEventListener('drop', e => {
  e.preventDefault();
  dropZone.classList.remove('dragover');
  const file = e.dataTransfer.files[0];
  if (file && file.type.startsWith('image/')) {
    handleImage(file);
  }
});

// File selection
imageInput.addEventListener('change', (e)=>{
  const file = e.target.files[0];
  if (file) handleImage(file);
});

function handleImage(file){
  const url = URL.createObjectURL(file);
  preview.src = url;
  preview.onload = () => URL.revokeObjectURL(url);
  analyzeBtn.disabled = false;
  resultsEl.classList.add('hidden');
}

// Analyze (demo only for now)
analyzeBtn.addEventListener('click', ()=>{
  runDemoDetection();
});
demoBtn.addEventListener('click', ()=>{
  runDemoDetection();
});

// Mock demo detection
function runDemoDetection(){
  predictionsEl.innerHTML='';
  adviceEl.innerHTML='';
  resultsEl.classList.remove('hidden');

  const samples = [
    {label:"Healthy Leaf", advice:"Your crop looks healthy! Continue regular monitoring."},
    {label:"Leaf Spot (Fungal)", advice:"Use a mild fungicide and avoid overhead irrigation."},
    {label:"Insect Damage", advice:"Inspect for caterpillars and apply biocontrol if needed."},
    {label:"Powdery Mildew", advice:"Improve ventilation and apply sulfur spray."}
  ];
  const random = samples.sort(()=>0.5 - Math.random()).slice(0,2);

  random.forEach((s,i)=>{
    const card=document.createElement('div');
    card.className='pred-card';
    const percent= (80 - i*20) + Math.floor(Math.random()*10);
    card.innerHTML=`
      <h4>${s.label} — ${percent}%</h4>
      <div class="pred-bar"><i style="width:${percent}%;"></i></div>
      <p>${s.advice}</p>`;
    predictionsEl.appendChild(card);
  });
  adviceEl.innerHTML=`<strong>Tip:</strong> Capture photos in good light and focus on one leaf for best results.`;
}
