
const samples = [
  {
    title: "Headless AEM Forms with Adobe Acrobat Sign",
    description: "Experience a seamless integration of Headless Adaptive Forms and Adobe Acrobat Sign",
    category: "Basic Forms",
    icon: "📩",
    url: "https://ic-document-service.onrender.com/registration"
  },
  {
    title: "Generic Map Component",
    description: "Create a generic map component to display form submissions by state",
    category: "Basic Forms",
    icon: "📝",
    url: "https://publish-p133654-e1305513.adobeaemcloud.com/content/bankingapplication/us/forms-dashboard.html"
  },
  {
    title: "Loan Application",
    description: "Multi-step application with conditional fields.",
    category: "Financial Services",
    icon: "🏦",
    url: ""
  },
  {
    title: "Insurance Application",
    description: "Dynamic form experience for insurance applications.",
    category: "Financial Services",
    icon: "🛡️",
    url: ""
  },
  {
    title: "Employee Onboarding",
    description: "Collect employee information using Adaptive Forms.",
    category: "HR",
    icon: "👤",
    url: ""
  },
  {
    title: "Customer Feedback",
    description: "Capture ratings, comments, and feedback.",
    category: "Basic Forms",
    icon: "⭐",
    url: ""
  }
];

const grid = document.getElementById("sampleGrid");
const filters = document.getElementById("categoryFilters");
const search = document.getElementById("searchInput");
const count = document.getElementById("resultCount");
const emptyState = document.getElementById("emptyState");

let activeCategory = "All";

const categories = [
  "All",
  ...new Set(samples.map(sample => sample.category))
];

function renderFilters() {
  filters.replaceChildren();

  categories.forEach(category => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "filter-btn";
    button.textContent = category;
    button.classList.toggle(
      "active",
      activeCategory === category
    );
    button.setAttribute(
      "aria-pressed",
      String(activeCategory === category)
    );

    button.addEventListener("click", () => {
      activeCategory = category;
      renderFilters();
      renderCards();
    });

    filters.appendChild(button);
  });
}

function createCard(sample) {
  const hasUrl = /^https?:\/\/\S+$/i.test(sample.url);

  const card = document.createElement(
    hasUrl ? "a" : "article"
  );

  card.className = "card";

  if (hasUrl) {
    card.href = sample.url;
    card.target = "_blank";
    card.rel = "noopener noreferrer";
  }

  const icon = document.createElement("div");
  icon.className = "card-icon";
  icon.textContent = sample.icon;
  icon.setAttribute("aria-hidden", "true");

  const category = document.createElement("span");
  category.className = "category";
  category.textContent = sample.category;

  const title = document.createElement("h2");
  title.textContent = sample.title;

  const description = document.createElement("p");
  description.textContent = sample.description;

  const link = document.createElement("span");
  link.className = "card-link";
  link.textContent = hasUrl
    ? "View Sample →"
    : "Coming Soon";

  card.append(icon, category, title, description, link);

  return card;
}

function renderCards() {
  const query = search.value.trim().toLowerCase();

  const filtered = samples.filter(sample => {
    const matchesCategory =
      activeCategory === "All" ||
      sample.category === activeCategory;

    const searchableText = [
      sample.title,
      sample.description,
      sample.category
    ].join(" ").toLowerCase();

    return matchesCategory &&
      searchableText.includes(query);
  });

  grid.replaceChildren(
    ...filtered.map(createCard)
  );

  count.textContent =
    `${filtered.length} sample${filtered.length === 1 ? "" : "s"}`;

  emptyState.hidden = filtered.length !== 0;
}

search.addEventListener("input", renderCards);

renderFilters();
renderCards();
