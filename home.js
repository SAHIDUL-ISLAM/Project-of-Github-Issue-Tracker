const allCardsContainer = document.getElementById("all-cards-container");
const loadingSpinner = document.getElementById("loadingSpinner");

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

// All Data
async function loadAllData(){
    setActiveButton('btn-all');
    showLoading();
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();
    document.getElementById("open-count").innerText = data.data.length;
    hideLoading();
    displayCards(data.data);
}

// Open Data
async function loadOpenData(){
    setActiveButton('btn-open');
    showLoading();
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();
    const openIssues = data.data.filter(item => item.status === "open");
    document.getElementById("open-count").innerText = openIssues.length;
    hideLoading();
    displayCards(openIssues);
}

//close data
async function loadClosedData(){
    setActiveButton('btn-closed');
    showLoading();
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();
    const closedIssues = data.data.filter(item => item.status === "closed");
    document.getElementById("open-count").innerText = closedIssues.length;
    hideLoading();
    displayCards(closedIssues);
}


async function showIssueDetails(id) {
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);
    const result = await res.json();
    const issue = result.data;


    document.getElementById("modal-title").innerText = issue.title;
    document.getElementById("modal-body").innerHTML = `
        <div class="flex text-gray-400 gap-3">
            <p><span class="badge ${issue.status === 'open' ? 'badge-success text-white' : 'bg-purple-600 text-white'}">${issue.status}</span></p> .
            <p>Opended by ${issue.author}</p> .
            <p>${issue.createdAt}</p>        
        </div>
        <div class="bage flex gap-2">
            ${issue.labels[0] ? `<p class="px-2 py-1 bg-red-100 rounded-full text-xs">${issue.labels[0]}</p>` : ''}
            ${issue.labels[1] ? `<p class="px-2 py-1 bg-yellow-100 rounded-full text-xs">${issue.labels[1]}</p>` : ''}
        </div>
        <p>${issue.description}</p>
        <div class="p-4 bg-slate-100 rounded-md flex justify-between items-center">
            <p>Assignee: <br> <span class="font-bold">${issue.author}</span></p>
            <p>Priority: <br> <span class="bg-orange-100 rounded-full px-4 py-1"> ${issue.priority}</span></p>
        </div>
    `;

    document.getElementById("issue_modal").showModal();
}


function displayCards(cards) {
    allCardsContainer.innerHTML = "";
    
    cards.forEach((issue) => {
        const borderColor = issue.status === "open" ? "border-t-4 border-green-500" : "border-t-4 border-purple-600";
        
        const Card = document.createElement("div");
  
        Card.className = `card rounded shadow-md bg-white p-3 space-y-3 cursor-pointer ${borderColor}`;
        

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
                <p># ${issue.id} by ${issue.author}</p>
                <p>${issue.createdAt}</p>
            </div>`;

        allCardsContainer.appendChild(Card);
    });
}

loadAllData();


document.getElementById("btn-search").addEventListener("click", () => {
    const input = document.getElementById("input-search");
    const searchValue = input.value.trim().toLowerCase();

    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then((res) => res.json())
        .then((result) => {
            const allIssues = result.data;
            const filteredResults = allIssues.filter((issue) => 
                issue.title.toLowerCase().includes(searchValue)
            );
            document.getElementById("open-count").innerText = filteredResults.length;

            displayCards(filteredResults);
        });
});