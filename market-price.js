document.getElementById("fetchBtn").addEventListener("click", fetchPrices);

async function fetchPrices(){
  const commodity = document.getElementById("commoditySelect").value;
  const state = document.getElementById("stateSelect").value;
  const market = document.getElementById("marketSelect").value;

  if(!commodity || !state || !market){
    alert("Please select commodity, state and market.");
    return;
  }

  // API endpoint – using a placeholder dataset because Agmarknet doesn't provide a simple JSON for all
  const endpoint = `https://api.example.com/market-price?commodity=${encodeURIComponent(commodity)}&state=${encodeURIComponent(state)}&market=${encodeURIComponent(market)}`;

  document.getElementById("fetchBtn").innerText = "Loading…";
  document.getElementById("fetchBtn").disabled = true;

  try {
    // For demonstration, using a mock response
    // You should replace with real API call if you integrate with Agmarknet or a backend proxy.
    const mockResponse = {
      date: "2025-10-24",
      min_price: 2200,
      max_price: 2600,
      modal_price: 2350
    };

    // const response = await fetch(endpoint);
    // const data = await response.json();
    const data = mockResponse;

    document.getElementById("resCommodity").textContent = commodity;
    document.getElementById("resMarket").textContent = market + ", " + state;
    document.getElementById("resDate").textContent = data.date;
    document.getElementById("resMin").textContent = data.min_price;
    document.getElementById("resMax").textContent = data.max_price;
    document.getElementById("resModal").textContent = data.modal_price;

    document.getElementById("resultsSection").classList.remove("hidden");
  }
  catch(error){
    console.error("Error fetching prices:", error);
    alert("Error retrieving data. Please try again later.");
  }
  finally {
    document.getElementById("fetchBtn").innerText = "Fetch Prices";
    document.getElementById("fetchBtn").disabled = false;
  }
}
