const allCardsContainer = document.getElementById("all-cards-container");
const loadingSpinner = document.getElementById("loadingSpinner");

// Helper function to manage active button styles
function setActiveButton(activeId) {
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => {
        btn.classList.remove('btn-primary');
    });
    document.getElementById(activeId).classList.add('btn-primary');
}

function showLoading(){
    loadingSpinner.classList.remove("hidden");
    allCardsContainer.innerHTML = "";
}

function hideLoading(){
    loadingSpinner.classList.add("hidden");
}

// Requirement: Load All Data
async function loadAllData(){
    setActiveButton('btn-all');
    showLoading();
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();
    hideLoading();
    displayCards(data.data);
}

// Requirement: Load Open Data
async function loadOpenData(){
    setActiveButton('btn-open');
    showLoading();
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();
    const openIssues = data.data.filter(item => item.status === "open");
    hideLoading();
    displayCards(openIssues);
}


async function loadClosedData(){
    setActiveButton('btn-closed');
    showLoading();
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();
    const closedIssues = data.data.filter(item => item.status === "closed");
    hideLoading();
    displayCards(closedIssues);
}


async function showIssueDetails(id) {
    // API endpoint for single issue: https://phi-lab-server.vercel.app/api/v1/lab/issue/{id}
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);
    const result = await res.json();
    const issue = result.data;

    // Set content in the modal
    // document.getElementById("modal-title").innerText = issue.title;
    // document.getElementById("modal-body").innerHTML = `
    //     <p><strong>Description:</strong> ${issue.description}</p>
    //     <p><strong>Author:</strong> ${issue.author}</p>
    //     <p><strong>Status:</strong> <span class="badge ${issue.status === 'open' ? 'badge-success' : 'bg-purple-600 text-white'}">${issue.status}</span></p>
    //     <p><strong>Priority:</strong> ${issue.priority}</p>
    //     <p><strong>Labels:</strong> ${issue.labels.join(', ')}</p>
    //     <p><strong>Date:</strong> ${issue.createdAt}</p>
    // `;

    // Show the modal
    document.getElementById("issue_modal").showModal();
}

// Update your existing displayCards function to add the click listener
function displayCards(cards) {
    allCardsContainer.innerHTML = "";
    
    cards.forEach((issue) => {
        const borderColor = issue.status === "open" ? "border-t-4 border-green-500" : "border-t-4 border-purple-600";
        
        const Card = document.createElement("div");
        // Add 'cursor-pointer' to show it's clickable
        Card.className = `card rounded shadow-md bg-white p-3 space-y-3 cursor-pointer ${borderColor}`;
        
        // Requirement: Clicking on an issue card will open a modal
        Card.onclick = () => showIssueDetails(issue.id);

        Card.innerHTML = `
            <div class="card-top flex justify-between">
                <img src="./assets/${issue.status}-Status.png" alt="">
                <p class="px-4 py-1 bg-orange-100 rounded-full text-xs font-bold">${issue.priority}</p>
            </div>
            <h2 class="font-bold">${issue.title}</h2>
            <p class="line-clamp-2 text-sm text-gray-600">${issue.description}</p>
            <div class="bage flex gap-2">
                ${issue.labels[0] ? `<p class="px-2 py-1 bg-red-100 rounded-full text-xs">${issue.labels[0]}</p>` : ''}
                ${issue.labels[1] ? `<p class="px-2 py-1 bg-yellow-100 rounded-full text-xs">${issue.labels[1]}</p>` : ''}
            </div>
            <hr>
            <div class="flex justify-between text-xs text-gray-500">
                <p># by ${issue.author}</p>
                <p>${issue.createdAt}</p>
            </div>`;

        allCardsContainer.appendChild(Card);
    });
}

loadAllData();