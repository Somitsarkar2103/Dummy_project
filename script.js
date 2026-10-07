/**
 * ============================================================================
 * CampusConnect REVA - Opportunity Intelligence Platform
 * Pure Vanilla JavaScript Implementation
 * 
 * Hackathon Presentation Architecture:
 * Profile -> Eligibility -> Personalized Matching -> Explanation ->
 * Skill Gap -> Deadline -> Application Tracking
 * ============================================================================
 */

// ============================================================================
// 1. DEFAULT PROFILE & DEMO OPPORTUNITIES DATA
// ============================================================================

// Default student profile as per prompt specification
const DEFAULT_PROFILE = {
  name: "Somit Sarkar",
  email: "somit.s@reva.edu.in",
  srn: "R21EN102",
  branch: "AIML",
  year: "2nd Year",
  cgpa: 9.4,
  careerGoal: "AI / ML Engineer",
  preferredLocation: "Bangalore / Remote",
  skills: ["Python", "C", "C++", "HTML", "CSS", "JavaScript", "SQL", "Machine Learning"]
};

// 12 Curated demo opportunities covering all required categories
const INITIAL_OPPORTUNITIES = [
  {
    id: "opp-1",
    title: "AI/ML Internship",
    org: "TechNova",
    type: "Internship",
    location: "Bangalore / Remote",
    deadline: "2026-10-09", // 2 days left
    minCGPA: 8.0,
    eligibleBranches: ["AIML", "CSE", "ISE"],
    eligibleYears: ["2nd Year", "3rd Year", "4th Year"],
    requiredSkills: ["Python", "Machine Learning", "SQL", "PyTorch"],
    targetRole: "AI / ML Engineer",
    description: "Work on production computer vision and predictive ML pipelines alongside senior data scientists. Involves real-world model deployment and data wrangling.",
    url: "https://technova.ai/careers"
  },
  {
    id: "opp-2",
    title: "REVA Innovation Hackathon",
    org: "REVA University",
    type: "Hackathon",
    location: "REVA Campus / Hybrid",
    deadline: "2026-10-12", // 5 days left
    minCGPA: 6.5,
    eligibleBranches: ["All"],
    eligibleYears: ["1st Year", "2nd Year", "3rd Year", "4th Year"],
    requiredSkills: ["Python", "JavaScript", "Machine Learning", "Problem Solving"],
    targetRole: "Full Stack / AI Developer",
    description: "Annual 36-hour flagship hackathon hosted at REVA University campus. Cash prizes up to ₹2,00,000, direct interview tracks, and incubator mentorship.",
    url: "https://reva.edu.in/hackathon-2026"
  },
  {
    id: "opp-3",
    title: "Data Analytics Certification",
    org: "IBM SkillsBuild",
    type: "Certification",
    location: "Online / Self-Paced",
    deadline: "2026-10-19", // 12 days left
    minCGPA: 7.0,
    eligibleBranches: ["All"],
    eligibleYears: ["1st Year", "2nd Year", "3rd Year", "4th Year"],
    requiredSkills: ["SQL", "Python", "Data Visualization", "Excel"],
    targetRole: "Data Analyst",
    description: "Industry-recognized credential by IBM covering advanced SQL queries, exploratory data analysis, and predictive dashboards with real case studies.",
    url: "https://skillsbuild.org/data-analytics"
  },
  {
    id: "opp-4",
    title: "Google Cloud Workshop",
    org: "Google Cloud Community REVA",
    type: "Workshop",
    location: "REVA Central Auditorium",
    deadline: "2026-10-25", // 18 days left
    minCGPA: 6.0,
    eligibleBranches: ["All"],
    eligibleYears: ["1st Year", "2nd Year", "3rd Year", "4th Year"],
    requiredSkills: ["Cloud Foundations", "Python", "Linux Basics"],
    targetRole: "Cloud Engineer",
    description: "Hands-on guided lab session covering Google Vertex AI, BigQuery, and scalable cloud microservices. Free Google Cloud credits & voucher provided.",
    url: "https://cloud.google.com/events/reva-cloud-summit"
  },
  {
    id: "opp-5",
    title: "Karnataka Student Scholarship",
    org: "Dept of Higher Education, Karnataka",
    type: "Scholarship",
    location: "Karnataka State",
    deadline: "2026-10-31", // 24 days left
    minCGPA: 8.5,
    eligibleBranches: ["All"],
    eligibleYears: ["1st Year", "2nd Year", "3rd Year"],
    requiredSkills: ["Academic Excellence"],
    targetRole: "Higher Education Merit",
    description: "Merit-based financial grant of ₹50,000 per academic year for top-ranking engineering undergraduate students in recognized state universities.",
    url: "https://ssp.karnataka.gov.in"
  },
  {
    id: "opp-6",
    title: "Web Development Internship",
    org: "NexGen Labs",
    type: "Internship",
    location: "Bangalore / Remote",
    deadline: "2026-10-16", // 9 days left
    minCGPA: 7.5,
    eligibleBranches: ["CSE", "ISE", "AIML", "ECE"],
    eligibleYears: ["2nd Year", "3rd Year", "4th Year"],
    requiredSkills: ["HTML", "CSS", "JavaScript", "SQL"],
    targetRole: "Web Developer",
    description: "Frontend and client dashboard engineering role. Work on responsive interfaces, component libraries, and REST API integration.",
    url: "https://nexgenlabs.io/jobs"
  },
  {
    id: "opp-7",
    title: "Cybersecurity Workshop",
    org: "REVA Cyber Club & Cisco",
    type: "Workshop",
    location: "REVA Tech Block Lab 3",
    deadline: "2026-10-22", // 15 days left
    minCGPA: 6.5,
    eligibleBranches: ["CSE", "ISE", "AIML", "ECE"],
    eligibleYears: ["1st Year", "2nd Year", "3rd Year", "4th Year"],
    requiredSkills: ["Networking", "Linux Basics", "C"],
    targetRole: "Security Analyst",
    description: "Hands-on penetration testing and ethical hacking workshop. Learn CTF problem solving, firewall auditing, and OWASP top 10 vulnerabilities.",
    url: "https://reva.edu.in/cyber-workshop"
  },
  {
    id: "opp-8",
    title: "Python Certification",
    org: "Python Software Foundation",
    type: "Certification",
    location: "Online",
    deadline: "2026-11-05", // 29 days left
    minCGPA: 6.0,
    eligibleBranches: ["All"],
    eligibleYears: ["1st Year", "2nd Year", "3rd Year", "4th Year"],
    requiredSkills: ["Python", "Object Oriented Programming", "DSA"],
    targetRole: "Software Engineer",
    description: "Comprehensive assessment testing mastery over advanced Python data structures, decorators, generator functions, and clean code principles.",
    url: "https://python.org/certification"
  },
  {
    id: "opp-9",
    title: "Startup Hackathon",
    org: "REVA NEST Incubation Centre",
    type: "Hackathon",
    location: "Bangalore",
    deadline: "2026-10-28", // 21 days left
    minCGPA: 6.0,
    eligibleBranches: ["All"],
    eligibleYears: ["1st Year", "2nd Year", "3rd Year", "4th Year"],
    requiredSkills: ["Problem Solving", "Prototyping", "Python", "JavaScript"],
    targetRole: "Startup Founder / Technologist",
    description: "Pitch and prototype your tech startup idea to angels and seed VCs. Winners receive ₹5 Lakhs seed grant and physical incubation at REVA NEST.",
    url: "https://revanest.com/hackathon"
  },
  {
    id: "opp-10",
    title: "UI/UX Internship",
    org: "DesignHub Studio",
    type: "Internship",
    location: "Bangalore",
    deadline: "2026-10-18", // 11 days left
    minCGPA: 7.0,
    eligibleBranches: ["All"],
    eligibleYears: ["2nd Year", "3rd Year", "4th Year"],
    requiredSkills: ["HTML", "CSS", "Figma", "User Research"],
    targetRole: "Product Designer",
    description: "Create user journey maps, wireframes, and interactive web mockups for next-generation EdTech platforms. Great for design-inclined coders.",
    url: "https://designhub.studio/careers"
  },
  {
    id: "opp-11",
    title: "Machine Learning Bootcamp",
    org: "DeepLearning.AI Student Chapter",
    type: "Workshop",
    location: "Online / Hybrid",
    deadline: "2026-10-14", // 7 days left
    minCGPA: 7.5,
    eligibleBranches: ["AIML", "CSE", "ISE"],
    eligibleYears: ["2nd Year", "3rd Year", "4th Year"],
    requiredSkills: ["Python", "Machine Learning", "Mathematics"],
    targetRole: "AI / ML Engineer",
    description: "Intensive 2-week fast-track boot camp covering neural nets, gradient descent, feature engineering, and hands-on Scikit-Learn labs.",
    url: "https://deeplearning.ai/events"
  },
  {
    id: "opp-12",
    title: "Software Development Internship",
    org: "CloudScale Systems",
    type: "Internship",
    location: "Bangalore / Remote",
    deadline: "2026-10-20", // 13 days left
    minCGPA: 8.0,
    eligibleBranches: ["CSE", "ISE", "AIML"],
    eligibleYears: ["3rd Year", "4th Year"],
    requiredSkills: ["C++", "Python", "SQL", "Data Structures"],
    targetRole: "Software Engineer",
    description: "Build high-throughput distributed microservices in C++ and Python. Requires solid understanding of algorithms, caching, and database schemas.",
    url: "https://cloudscale.systems/interns"
  }
];

// Initial demo applications tracked in pipeline
const INITIAL_APPLICATIONS = [
  { id: "opp-1", status: "Applied", date: "2026-10-06" },
  { id: "opp-2", status: "Under Review", date: "2026-10-05" },
  { id: "opp-3", status: "Saved", date: "2026-10-04" },
  { id: "opp-6", status: "Interview", date: "2026-10-02" },
  { id: "opp-11", status: "Selected", date: "2026-09-28" }
];

// Initial saved opportunity IDs
const INITIAL_SAVED = ["opp-1", "opp-3"];


// ============================================================
// 2. STATE MANAGEMENT & LOCAL STORAGE
// ============================================================

let currentProfile = {};
let opportunities = [];
let applications = [];
let savedOpportunityIds = [];

// Initialize state from localStorage or load defaults
function initState() {
  // 1. Profile
  const storedProfile = localStorage.getItem("cc_reva_profile");
  if (storedProfile) {
    try {
      currentProfile = JSON.parse(storedProfile);
    } catch (e) {
      currentProfile = { ...DEFAULT_PROFILE };
    }
  } else {
    currentProfile = { ...DEFAULT_PROFILE };
    localStorage.setItem("cc_reva_profile", JSON.stringify(currentProfile));
  }

  // 2. Opportunities (include any custom ones created via Admin view)
  const storedOpps = localStorage.getItem("cc_reva_opportunities");
  if (storedOpps) {
    try {
      opportunities = JSON.parse(storedOpps);
    } catch (e) {
      opportunities = [...INITIAL_OPPORTUNITIES];
    }
  } else {
    opportunities = [...INITIAL_OPPORTUNITIES];
    localStorage.setItem("cc_reva_opportunities", JSON.stringify(opportunities));
  }

  // 3. Applications
  const storedApps = localStorage.getItem("cc_reva_applications");
  if (storedApps) {
    try {
      applications = JSON.parse(storedApps);
    } catch (e) {
      applications = [...INITIAL_APPLICATIONS];
    }
  } else {
    applications = [...INITIAL_APPLICATIONS];
    localStorage.setItem("cc_reva_applications", JSON.stringify(applications));
  }

  // 4. Saved Opportunities
  const storedSaved = localStorage.getItem("cc_reva_saved");
  if (storedSaved) {
    try {
      savedOpportunityIds = JSON.parse(storedSaved);
    } catch (e) {
      savedOpportunityIds = [...INITIAL_SAVED];
    }
  } else {
    savedOpportunityIds = [...INITIAL_SAVED];
    localStorage.setItem("cc_reva_saved", JSON.stringify(savedOpportunityIds));
  }
}

// Persist helper functions
function saveProfileToStorage() {
  localStorage.setItem("cc_reva_profile", JSON.stringify(currentProfile));
}

function saveOpportunitiesToStorage() {
  localStorage.setItem("cc_reva_opportunities", JSON.stringify(opportunities));
}

function saveApplicationsToStorage() {
  localStorage.setItem("cc_reva_applications", JSON.stringify(applications));
}

function saveSavedToStorage() {
  localStorage.setItem("cc_reva_saved", JSON.stringify(savedOpportunityIds));
}


// ============================================================
// 3. INTELLIGENCE ENGINE: MATCH SCORE & ELIGIBILITY
// ============================================================

/**
 * Deterministic match score calculation based on project architecture:
 * - Skill match: 35%
 * - Interest / career goal: 20%
 * - Academic fit (CGPA): 15%
 * - Location / preference: 10%
 * - Experience (Student Year): 10%
 * - Deadline urgency: 10%
 */
function calculateMatchScore(opp, profile) {
  // Normalize skills for case-insensitive comparison
  const studentSkills = (profile.skills || []).map(s => s.toLowerCase().trim());
  const requiredSkills = (opp.requiredSkills || []).map(s => s.toLowerCase().trim());

  // 1. Skill Match (35%)
  let matchedSkillsCount = 0;
  requiredSkills.forEach(req => {
    if (studentSkills.includes(req) || studentSkills.some(st => st.includes(req) || req.includes(st))) {
      matchedSkillsCount++;
    }
  });
  const skillMatchFraction = requiredSkills.length > 0 ? (matchedSkillsCount / requiredSkills.length) : 1;
  const skillScore = skillMatchFraction * 35;

  // 2. Interest / Career Goal (20%)
  const studentGoal = (profile.careerGoal || "").toLowerCase();
  const oppRole = (opp.targetRole || opp.title || "").toLowerCase();
  let goalScore = 10; // baseline alignment
  if (studentGoal && (oppRole.includes(studentGoal) || studentGoal.includes(oppRole) || 
      (opp.title && opp.title.toLowerCase().includes("ai/ml")))) {
    goalScore = 20;
  } else if (opp.type === "Hackathon" || opp.type === "Workshop") {
    goalScore = 16;
  }

  // 3. Academic Fit / CGPA (15%)
  const studentCGPA = parseFloat(profile.cgpa) || 8.0;
  const reqCGPA = parseFloat(opp.minCGPA) || 6.0;
  let academicScore = 0;
  if (studentCGPA >= reqCGPA) {
    academicScore = 15;
  } else {
    academicScore = Math.max(0, 15 - (reqCGPA - studentCGPA) * 10);
  }

  // 4. Location Match (10%)
  const studentLoc = (profile.preferredLocation || "").toLowerCase();
  const oppLoc = (opp.location || "").toLowerCase();
  let locScore = 7;
  if (oppLoc.includes("remote") || oppLoc.includes("reva") || 
      oppLoc.includes("bangalore") || studentLoc.includes("bangalore")) {
    locScore = 10;
  }

  // 5. Experience / Year Match (10%)
  const studentYear = profile.year || "2nd Year";
  let expScore = 8;
  if (opp.eligibleYears.includes(studentYear) || opp.eligibleYears.includes("All")) {
    expScore = 10;
  } else {
    expScore = 4;
  }

  // 6. Deadline Urgency (10%)
  const daysLeft = calculateDaysRemaining(opp.deadline);
  let urgencyScore = 8;
  if (daysLeft <= 3) urgencyScore = 10;
  else if (daysLeft <= 7) urgencyScore = 9;
  else if (daysLeft <= 15) urgencyScore = 8;
  else urgencyScore = 6;

  // Total deterministic sum
  let totalScore = Math.round(skillScore + goalScore + academicScore + locScore + expScore + urgencyScore);
  if (totalScore > 98) totalScore = 98; // Realistic ceiling
  if (totalScore < 45) totalScore = 45;

  return totalScore;
}

/**
 * Deterministic Eligibility Check
 * Evaluates CGPA, Branch, and Academic Year
 */
function checkEligibility(opp, profile) {
  const reasons = [];
  let isEligible = true;

  // 1. CGPA Check
  const studentCGPA = parseFloat(profile.cgpa) || 0;
  const reqCGPA = parseFloat(opp.minCGPA) || 0;
  if (studentCGPA < reqCGPA) {
    isEligible = false;
    reasons.push(`Minimum CGPA required: ${reqCGPA.toFixed(1)} (Your CGPA: ${studentCGPA.toFixed(1)})`);
  } else {
    reasons.push(`Your CGPA meets the requirement (${studentCGPA.toFixed(1)} >= ${reqCGPA.toFixed(1)})`);
  }

  // 2. Branch Check
  const studentBranch = (profile.branch || "").toUpperCase();
  const branches = opp.eligibleBranches.map(b => b.toUpperCase());
  if (!branches.includes("ALL") && !branches.includes(studentBranch)) {
    isEligible = false;
    reasons.push(`Branch not eligible: Requires ${opp.eligibleBranches.join(", ")}`);
  } else {
    reasons.push(`Your branch (${studentBranch}) is eligible`);
  }

  // 3. Year Check
  const studentYear = profile.year || "";
  const years = opp.eligibleYears;
  if (!years.includes("All") && !years.includes(studentYear)) {
    isEligible = false;
    reasons.push(`Year not eligible: Open to ${opp.eligibleYears.join(", ")} (You: ${studentYear})`);
  } else {
    reasons.push(`Your year (${studentYear}) is eligible`);
  }

  return {
    isEligible: isEligible,
    reasons: reasons
  };
}

/**
 * Skill Gap Analysis
 * Returns missing skills required by the opportunity
 */
function getSkillGap(opp, profile) {
  const studentSkills = (profile.skills || []).map(s => s.toLowerCase().trim());
  const requiredSkills = opp.requiredSkills || [];
  
  const matched = [];
  const missing = [];

  requiredSkills.forEach(req => {
    const isMatch = studentSkills.includes(req.toLowerCase().trim()) || 
                    studentSkills.some(s => s.includes(req.toLowerCase().trim()));
    if (isMatch) {
      matched.push(req);
    } else {
      missing.push(req);
    }
  });

  return { matched, missing };
}

/**
 * Deadline countdown calculator
 * Computes exact integer days remaining from current date
 */
function calculateDaysRemaining(deadlineStr) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const targetDate = new Date(deadlineStr);
  targetDate.setHours(0, 0, 0, 0);

  const diffTime = targetDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

function formatDeadlineBadge(daysRemaining) {
  if (daysRemaining <= 2) {
    return {
      text: `${daysRemaining <= 0 ? 'Closing today' : daysRemaining + ' days left'}`,
      urgencyClass: "urgency-urgent",
      dot: "🔴"
    };
  } else if (daysRemaining <= 7) {
    return {
      text: `${daysRemaining} days left`,
      urgencyClass: "urgency-medium",
      dot: "🟠"
    };
  } else {
    return {
      text: `${daysRemaining} days left`,
      urgencyClass: "urgency-relaxed",
      dot: "🟢"
    };
  }
}


// ============================================================
// 4. NAVIGATION & PAGE CONTROLLER
// ============================================================

function navigateTo(pageId) {
  // Update sidebar active link
  document.querySelectorAll(".sidebar-nav .nav-link").forEach(btn => {
    if (btn.getAttribute("data-page") === pageId) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  // Switch visible page view
  document.querySelectorAll(".page-view").forEach(page => {
    page.classList.remove("active");
  });

  const targetPage = document.getElementById(pageId);
  if (targetPage) {
    targetPage.classList.add("active");
    // Scroll content container to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Refresh page data when entering specific pages
  if (pageId === "dashboardPage") {
    renderDashboard();
  } else if (pageId === "opportunitiesPage") {
    renderOpportunities();
  } else if (pageId === "recommendationsPage") {
    renderRecommendations();
  } else if (pageId === "applicationsPage") {
    renderApplications();
  } else if (pageId === "deadlinesPage") {
    renderDeadlines();
  } else if (pageId === "roadmapPage") {
    renderRoadmap();
  } else if (pageId === "profilePage") {
    populateProfileForm();
  } else if (pageId === "adminPage") {
    renderAdmin();
  }
}


// ============================================================
// 5. RENDER FUNCTIONS
// ============================================================

/**
 * 5.1 Dashboard Screen
 */
function renderDashboard() {
  // Update Header greeting
  const firstName = (currentProfile.name || "Student").split(" ")[0];
  document.getElementById("welcomeUserName").textContent = firstName;
  document.getElementById("sidebarName").textContent = currentProfile.name || "Student";
  
  // Set avatar initials
  const initials = (currentProfile.name || "RE")
    .split(" ")
    .map(n => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
  document.getElementById("sidebarAvatar").textContent = initials;

  // Calculate 4 Statistics
  let eligibleCount = 0;
  let deadlineSoonCount = 0;

  opportunities.forEach(opp => {
    const el = checkEligibility(opp, currentProfile);
    if (el.isEligible) eligibleCount++;

    const days = calculateDaysRemaining(opp.deadline);
    if (days >= 0 && days <= 5) deadlineSoonCount++;
  });

  document.getElementById("statRecommended").textContent = opportunities.length;
  document.getElementById("statEligible").textContent = eligibleCount;
  document.getElementById("statApplications").textContent = applications.length;
  document.getElementById("statDeadlines").textContent = deadlineSoonCount;

  // Career Match Card
  document.getElementById("dashCareerRole").textContent = currentProfile.careerGoal || "AI / ML Engineer";
  document.getElementById("dashCareerMatchPct").textContent = "92%";
  document.getElementById("dashProgressBar").style.width = "92%";

  // Top Skills
  const topSkillsContainer = document.getElementById("dashTopSkills");
  topSkillsContainer.innerHTML = "";
  const skillsToShow = (currentProfile.skills || []).slice(0, 4);
  skillsToShow.forEach(skill => {
    const span = document.createElement("span");
    span.className = "skill-pill highlight";
    span.textContent = skill;
    topSkillsContainer.appendChild(span);
  });

  // Top Recommendations (Top 3-4 cards)
  const sorted = [...opportunities].sort((a, b) => {
    return calculateMatchScore(b, currentProfile) - calculateMatchScore(a, currentProfile);
  });

  const topCards = sorted.slice(0, 4);
  const container = document.getElementById("dashboardRecommendationsGrid");
  container.innerHTML = "";
  topCards.forEach(opp => {
    container.appendChild(createOpportunityCard(opp));
  });
}

/**
 * 5.2 Opportunity Card Element Builder
 */
function createOpportunityCard(opp) {
  const matchScore = calculateMatchScore(opp, currentProfile);
  const eligibility = checkEligibility(opp, currentProfile);
  const daysLeft = calculateDaysRemaining(opp.deadline);
  const isSaved = savedOpportunityIds.includes(opp.id);

  const card = document.createElement("div");
  card.className = "opp-card";

  // Category badge class
  const badgeClass = `badge-${opp.type.toLowerCase().replace(" ", "-")}`;

  card.innerHTML = `
    <div class="opp-card-top">
      <span class="opp-type-badge ${badgeClass}">${opp.type}</span>
      <button class="save-toggle-btn ${isSaved ? 'saved' : ''}" data-id="${opp.id}" title="${isSaved ? 'Saved' : 'Save opportunity'}">
        ${isSaved ? '♥' : '♡'}
      </button>
    </div>

    <h3 class="opp-title">${opp.title}</h3>
    <p class="opp-org">${opp.org}</p>

    <div class="opp-meta-list">
      <div class="opp-meta-item">
        <span>📍</span>
        <span>${opp.location}</span>
      </div>
      <div class="opp-meta-item">
        <span>📅</span>
        <span>Deadline: ${opp.deadline} &bull; <strong>${daysLeft <= 0 ? 'Today' : daysLeft + ' days left'}</strong></span>
      </div>
    </div>

    <div class="opp-scores-bar">
      <span class="opp-match-stat">⚡ ${matchScore}% Match</span>
      <span class="opp-eligibility-badge ${eligibility.isEligible ? 'eligible' : 'not-eligible'}">
        ${eligibility.isEligible ? '✓ Eligible' : '✕ Not Eligible'}
      </span>
    </div>

    <div class="opp-skills-list">
      ${opp.requiredSkills.map(sk => `<span class="opp-skill-tag">${sk}</span>`).join("")}
    </div>

    <div class="opp-actions-footer">
      <button class="btn btn-outline btn-sm btn-why" data-id="${opp.id}">Why Recommended?</button>
      <button class="btn btn-outline btn-sm btn-view-details" data-id="${opp.id}">View Details</button>
      <button class="btn btn-primary btn-sm btn-apply-direct" data-id="${opp.id}">Apply</button>
    </div>
  `;

  // Attach event listeners
  const saveBtn = card.querySelector(".save-toggle-btn");
  saveBtn.addEventListener("click", () => toggleSaveOpportunity(opp.id, saveBtn));

  const whyBtn = card.querySelector(".btn-why");
  whyBtn.addEventListener("click", () => openWhyRecommendedModal(opp.id));

  const detailsBtn = card.querySelector(".btn-view-details");
  detailsBtn.addEventListener("click", () => openOpportunityDetailsModal(opp.id));

  const applyBtn = card.querySelector(".btn-apply-direct");
  applyBtn.addEventListener("click", () => handleApplyOpportunity(opp.id));

  return card;
}

/**
 * 5.3 Opportunities Page Rendering with Search, Filter & Sorting
 */
function renderOpportunities() {
  const container = document.getElementById("opportunitiesGrid");
  container.innerHTML = "";

  const searchQuery = (document.getElementById("oppSearchInput").value || "").toLowerCase().trim();
  const activePill = document.querySelector("#categoryFilterGroup .filter-pill.active");
  const selectedCategory = activePill ? activePill.getAttribute("data-category") : "All";
  const sortBy = document.getElementById("sortBySelect").value;

  // Filter list
  let filtered = opportunities.filter(opp => {
    // Category filter
    if (selectedCategory !== "All" && opp.type !== selectedCategory) {
      return false;
    }

    // Search query filter
    if (searchQuery) {
      const matchTitle = opp.title.toLowerCase().includes(searchQuery);
      const matchOrg = opp.org.toLowerCase().includes(searchQuery);
      const matchDesc = opp.description.toLowerCase().includes(searchQuery);
      const matchSkills = opp.requiredSkills.some(s => s.toLowerCase().includes(searchQuery));
      if (!matchTitle && !matchOrg && !matchDesc && !matchSkills) {
        return false;
      }
    }

    return true;
  });

  // Sort list
  if (sortBy === "bestMatch") {
    filtered.sort((a, b) => calculateMatchScore(b, currentProfile) - calculateMatchScore(a, currentProfile));
  } else if (sortBy === "deadline") {
    filtered.sort((a, b) => calculateDaysRemaining(a.deadline) - calculateDaysRemaining(b.deadline));
  } else if (sortBy === "latest") {
    filtered.reverse();
  }

  // Update counter
  document.getElementById("resultsCount").textContent = `Showing ${filtered.length} opportunit${filtered.length === 1 ? 'y' : 'ies'}`;

  // Render cards or empty message
  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; background: #FFFFFF; border-radius: 12px; border: 1px dashed var(--border);">
        <p style="font-size: 1.1rem; font-weight: 600; color: var(--text-muted);">No opportunities match your search criteria.</p>
        <button class="btn btn-primary btn-sm" style="margin-top: 1rem;" onclick="resetFilters()">Reset Filters</button>
      </div>
    `;
    return;
  }

  filtered.forEach(opp => {
    container.appendChild(createOpportunityCard(opp));
  });
}

function resetFilters() {
  document.getElementById("oppSearchInput").value = "";
  document.getElementById("clearSearchBtn").style.display = "none";
  document.querySelectorAll("#categoryFilterGroup .filter-pill").forEach(p => p.classList.remove("active"));
  document.querySelector('#categoryFilterGroup .filter-pill[data-category="All"]').classList.add("active");
  document.getElementById("sortBySelect").value = "bestMatch";
  renderOpportunities();
}

/**
 * 5.4 Recommendations Page
 */
function renderRecommendations() {
  const container = document.getElementById("recommendationsGrid");
  container.innerHTML = "";

  // Sort strictly by match score descending
  const sorted = [...opportunities].sort((a, b) => {
    return calculateMatchScore(b, currentProfile) - calculateMatchScore(a, currentProfile);
  });

  sorted.forEach(opp => {
    container.appendChild(createOpportunityCard(opp));
  });
}

/**
 * 5.5 Applications Page & Status Tracker
 */
function renderApplications() {
  const container = document.getElementById("applicationsContainer");
  container.innerHTML = "";

  if (applications.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 2rem; background: #FFF; border-radius: 10px; border: 1px dashed var(--border);">
        <p style="color: var(--text-muted);">No tracked applications yet. Click "Apply" on any opportunity to track it here!</p>
      </div>
    `;
  } else {
    applications.forEach(app => {
      const opp = opportunities.find(o => o.id === app.id) || {
        id: app.id,
        title: "Opportunity Application",
        org: "Company / Program",
        type: "Opportunity"
      };

      const card = document.createElement("div");
      card.className = "application-row-card";

      const statusCleanClass = `status-${app.status.replace(/\s+/g, '-')}`;

      card.innerHTML = `
        <div class="app-row-info">
          <h3>${opp.title}</h3>
          <p>${opp.org} &bull; ${opp.type}</p>
        </div>

        <div class="app-row-meta">
          <span class="app-status-badge ${statusCleanClass}">${app.status}</span>
          
          <div class="status-select-wrap">
            <select data-id="${app.id}">
              <option value="Saved" ${app.status === 'Saved' ? 'selected' : ''}>Saved</option>
              <option value="Applied" ${app.status === 'Applied' ? 'selected' : ''}>Applied</option>
              <option value="Under Review" ${app.status === 'Under Review' ? 'selected' : ''}>Under Review</option>
              <option value="Interview" ${app.status === 'Interview' ? 'selected' : ''}>Interview</option>
              <option value="Selected" ${app.status === 'Selected' ? 'selected' : ''}>Selected</option>
              <option value="Rejected" ${app.status === 'Rejected' ? 'selected' : ''}>Rejected</option>
            </select>
          </div>

          <button class="btn btn-outline btn-sm" onclick="openOpportunityDetailsModal('${opp.id}')">View</button>
        </div>
      `;

      // Status change listener
      const select = card.querySelector("select");
      select.addEventListener("change", (e) => {
        updateApplicationStatus(app.id, e.target.value);
      });

      container.appendChild(card);
    });
  }

  // Render Saved Opportunities Grid
  const savedGrid = document.getElementById("savedGrid");
  savedGrid.innerHTML = "";

  const savedOpps = opportunities.filter(o => savedOpportunityIds.includes(o.id));
  if (savedOpps.length === 0) {
    savedGrid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 2rem; background: #FFF; border-radius: 10px; border: 1px dashed var(--border);">
        <p style="color: var(--text-muted);">You haven't saved any opportunities yet. Click the heart icon (♡) on any card to save it.</p>
      </div>
    `;
  } else {
    savedOpps.forEach(opp => {
      savedGrid.appendChild(createOpportunityCard(opp));
    });
  }
}

/**
 * 5.6 Deadlines Page (Sorted by urgency)
 */
function renderDeadlines() {
  const container = document.getElementById("deadlinesList");
  container.innerHTML = "";

  // Sort by days remaining ascending
  const sorted = [...opportunities].sort((a, b) => {
    return calculateDaysRemaining(a.deadline) - calculateDaysRemaining(b.deadline);
  });

  sorted.forEach(opp => {
    const days = calculateDaysRemaining(opp.deadline);
    const badge = formatDeadlineBadge(days);

    const card = document.createElement("div");
    card.className = "deadline-card";

    card.innerHTML = `
      <div class="deadline-left">
        <div class="urgency-badge ${badge.urgencyClass}">
          <span>${badge.dot}</span>
          <span>${badge.text}</span>
        </div>
        <div class="deadline-info">
          <h3>${opp.title}</h3>
          <p>${opp.org} &bull; Deadline: <strong>${opp.deadline}</strong> &bull; ${opp.type}</p>
        </div>
      </div>
      <div class="deadline-actions">
        <button class="btn btn-outline btn-sm" onclick="openOpportunityDetailsModal('${opp.id}')">Details</button>
        <button class="btn btn-primary btn-sm" onclick="handleApplyOpportunity('${opp.id}')">Apply Now</button>
      </div>
    `;

    container.appendChild(card);
  });
}

/**
 * 5.7 Career Roadmap (Section 17)
 */
function renderRoadmap() {
  const roleTitle = currentProfile.careerGoal || "AI / ML Engineer";
  document.getElementById("roadmapRoleTitle").textContent = `${roleTitle} Roadmap`;
  document.getElementById("roadmapReadinessPct").textContent = "72%";

  const container = document.getElementById("roadmapFlowContainer");
  container.innerHTML = `
    <div class="roadmap-step-pill completed">
      <span>1. Python Programming</span>
      <span>✓ Mastered</span>
    </div>
    <div class="roadmap-arrow">&darr;</div>

    <div class="roadmap-step-pill completed">
      <span>2. SQL & Relational Databases</span>
      <span>✓ Mastered</span>
    </div>
    <div class="roadmap-arrow">&darr;</div>

    <div class="roadmap-step-pill completed">
      <span>3. Machine Learning Foundations</span>
      <span>✓ Mastered</span>
    </div>
    <div class="roadmap-arrow">&darr;</div>

    <div class="roadmap-step-pill gap">
      <span>4. Deep Learning & Neural Nets</span>
      <span style="color: var(--warning); font-size: 0.85rem;">⏳ In Progress</span>
    </div>
    <div class="roadmap-arrow">&darr;</div>

    <div class="roadmap-step-pill gap">
      <span>5. PyTorch Framework</span>
      <span style="color: var(--danger); font-size: 0.85rem;">⚠️ Skill Gap</span>
    </div>
    <div class="roadmap-arrow">&darr;</div>

    <div class="roadmap-step-pill target">
      <span>6. AI/ML Internship (TechNova)</span>
      <span>🎯 Target Goal</span>
    </div>
  `;
}

/**
 * 5.8 Admin Portal
 */
function renderAdmin() {
  document.getElementById("adminTotalOpp").textContent = opportunities.length;
  document.getElementById("adminVerifiedOpp").textContent = opportunities.length;
  document.getElementById("adminTrackedApps").textContent = applications.length;
}

function populateProfileForm() {
  document.getElementById("profName").value = currentProfile.name || "";
  document.getElementById("profEmail").value = currentProfile.email || "";
  document.getElementById("profSRN").value = currentProfile.srn || "";
  document.getElementById("profBranch").value = currentProfile.branch || "AIML";
  document.getElementById("profYear").value = currentProfile.year || "2nd Year";
  document.getElementById("profCGPA").value = currentProfile.cgpa || 9.4;
  document.getElementById("profLocation").value = currentProfile.preferredLocation || "Bangalore / Remote";
  document.getElementById("profGoal").value = currentProfile.careerGoal || "AI / ML Engineer";
  document.getElementById("profSkills").value = (currentProfile.skills || []).join(", ");
}


// ============================================================
// 6. ACTION HANDLERS (SAVE, APPLY, STATUS UPDATE)
// ============================================================

// Toggle Save Opportunity
function toggleSaveOpportunity(oppId, buttonElement) {
  const index = savedOpportunityIds.indexOf(oppId);
  if (index > -1) {
    savedOpportunityIds.splice(index, 1);
    if (buttonElement) {
      buttonElement.classList.remove("saved");
      buttonElement.textContent = "♡";
    }
    showToast("Opportunity removed from saved list");
  } else {
    savedOpportunityIds.push(oppId);
    if (buttonElement) {
      buttonElement.classList.add("saved");
      buttonElement.textContent = "♥";
    }
    showToast("Opportunity saved to your bookmarks! ♥");
  }
  saveSavedToStorage();
}

// Update Application Status in Tracker
function updateApplicationStatus(oppId, newStatus) {
  const app = applications.find(a => a.id === oppId);
  if (app) {
    app.status = newStatus;
  } else {
    applications.push({
      id: oppId,
      status: newStatus,
      date: new Date().toISOString().split("T")[0]
    });
  }
  saveApplicationsToStorage();
  showToast(`Application status updated to "${newStatus}"`);
  renderApplications();
  renderDashboard();
}

// Handle Direct Apply
function handleApplyOpportunity(oppId) {
  const opp = opportunities.find(o => o.id === oppId);
  if (!opp) return;

  // If not tracked yet, add to tracker as 'Applied'
  const existing = applications.find(a => a.id === oppId);
  if (!existing) {
    applications.push({
      id: oppId,
      status: "Applied",
      date: new Date().toISOString().split("T")[0]
    });
    saveApplicationsToStorage();
  }

  showToast(`Applied for ${opp.title}! Added to Application Tracker.`);

  // Open destination URL in a new browser tab
  if (opp.url) {
    window.open(opp.url, "_blank", "noopener,noreferrer");
  }
}


// ============================================================
// 7. MODALS LOGIC
// ============================================================

// Section 12: Why Recommended Modal
function openWhyRecommendedModal(oppId) {
  const opp = opportunities.find(o => o.id === oppId);
  if (!opp) return;

  const score = calculateMatchScore(opp, currentProfile);
  const eligibility = checkEligibility(opp, currentProfile);
  const skillGap = getSkillGap(opp, currentProfile);

  const body = document.getElementById("whyModalBody");
  body.innerHTML = `
    <div class="why-score-header">
      <div>
        <h3 style="font-size: 1.15rem; font-weight: 800; color: var(--primary);">${opp.title}</h3>
        <p style="font-size: 0.85rem; color: var(--text-muted);">${opp.org} &bull; ${opp.type}</p>
      </div>
      <div class="score">${score}% Match</div>
    </div>

    <h4 class="detail-section-title">Eligibility & Profile Alignment</h4>
    <ul class="why-checks-list">
      ${eligibility.reasons.map(r => `
        <li class="why-check-item ${r.includes('not') || r.includes('Minimum') ? 'fail' : 'pass'}">
          <span>${r.includes('not') || r.includes('Minimum') ? '✕' : '✓'}</span>
          <span>${r}</span>
        </li>
      `).join("")}
      <li class="why-check-item pass">
        <span>✓</span>
        <span>Your ${currentProfile.careerGoal || 'AI/ML'} career goal matches this role</span>
      </li>
      ${skillGap.matched.map(s => `
        <li class="why-check-item pass">
          <span>✓</span>
          <span>Your <strong>${s}</strong> skill matches</span>
        </li>
      `).join("")}
    </ul>

    ${skillGap.missing.length > 0 ? `
      <div class="gap-box">
        <h4>Skill Gap Identified</h4>
        <p style="font-size: 0.85rem; color: var(--text-main);">
          To reach 100% eligibility for this role, you are missing:
          <strong>${skillGap.missing.join(", ")}</strong>
        </p>
      </div>
    ` : `
      <div style="background: var(--success-bg); color: var(--success); padding: 0.75rem; border-radius: 8px; font-size: 0.85rem; font-weight: 600;">
        🎉 Zero skill gap! Your skillset completely matches this opportunity.
      </div>
    `}

    <div style="margin-top: 1.5rem; text-align: right;">
      <button class="btn btn-primary btn-block" onclick="closeWhyModal(); navigateTo('roadmapPage');">
        View Career Roadmap &rarr;
      </button>
    </div>
  `;

  document.getElementById("whyModal").classList.add("show");
}

function closeWhyModal() {
  document.getElementById("whyModal").classList.remove("show");
}

// Section 21: Opportunity Details Modal
function openOpportunityDetailsModal(oppId) {
  const opp = opportunities.find(o => o.id === oppId);
  if (!opp) return;

  const score = calculateMatchScore(opp, currentProfile);
  const eligibility = checkEligibility(opp, currentProfile);
  const skillGap = getSkillGap(opp, currentProfile);
  const days = calculateDaysRemaining(opp.deadline);
  const isSaved = savedOpportunityIds.includes(opp.id);

  document.getElementById("detTypeBadge").textContent = opp.type;
  document.getElementById("detTitle").textContent = opp.title;
  document.getElementById("detOrg").textContent = `${opp.org} &bull; ${opp.location}`;

  const body = document.getElementById("detailsModalBody");
  body.innerHTML = `
    <div style="margin-bottom: 1rem;">
      <p style="font-size: 0.95rem; color: var(--text-main); line-height: 1.6;">${opp.description}</p>
    </div>

    <div class="opp-scores-bar" style="margin-bottom: 1.25rem;">
      <span class="opp-match-stat">⚡ ${score}% Match Fit</span>
      <span class="opp-eligibility-badge ${eligibility.isEligible ? 'eligible' : 'not-eligible'}">
        ${eligibility.isEligible ? '✓ Fully Eligible' : '✕ Currently Ineligible'}
      </span>
      <span style="font-size: 0.8rem; font-weight: 600; color: var(--text-muted);">
        📅 ${days <= 0 ? 'Closes today' : days + ' days remaining'}
      </span>
    </div>

    <div class="form-row-2" style="margin-bottom: 1rem;">
      <div>
        <h4 class="detail-section-title">Eligibility Criteria</h4>
        <ul style="font-size: 0.85rem; color: var(--text-muted); list-style: none; display: flex; flex-direction: column; gap: 0.3rem;">
          <li>&bull; Minimum CGPA: <strong>${opp.minCGPA}</strong></li>
          <li>&bull; Eligible Branches: <strong>${opp.eligibleBranches.join(", ")}</strong></li>
          <li>&bull; Eligible Years: <strong>${opp.eligibleYears.join(", ")}</strong></li>
        </ul>
      </div>

      <div>
        <h4 class="detail-section-title">Required Skills</h4>
        <div style="display: flex; flex-wrap: wrap; gap: 0.35rem;">
          ${opp.requiredSkills.map(sk => `<span class="skill-pill">${sk}</span>`).join("")}
        </div>
      </div>
    </div>

    ${skillGap.missing.length > 0 ? `
      <div class="gap-box" style="margin-top: 0.5rem;">
        <h4>Target Skill Improvement</h4>
        <p style="font-size: 0.84rem;">Recommended skill to acquire: <strong>${skillGap.missing.join(", ")}</strong></p>
      </div>
    ` : ''}

    <div style="margin-top: 1rem; font-size: 0.78rem; color: var(--text-light);">
      Official Source: <a href="${opp.url}" target="_blank" style="color: var(--primary); text-decoration: underline;">${opp.url}</a>
    </div>
  `;

  // Modal Footer Actions
  const saveBtn = document.getElementById("detSaveBtn");
  saveBtn.textContent = isSaved ? "♥ Saved" : "♡ Save";
  saveBtn.onclick = () => {
    toggleSaveOpportunity(opp.id);
    saveBtn.textContent = savedOpportunityIds.includes(opp.id) ? "♥ Saved" : "♡ Save";
  };

  const whyBtn = document.getElementById("detWhyBtn");
  whyBtn.onclick = () => {
    closeDetailsModal();
    openWhyRecommendedModal(opp.id);
  };

  const applyBtn = document.getElementById("detApplyBtn");
  applyBtn.href = opp.url || "#";
  applyBtn.onclick = (e) => {
    // Also track in application tracker
    handleApplyOpportunity(opp.id);
  };

  document.getElementById("detailsModal").classList.add("show");
}

function closeDetailsModal() {
  document.getElementById("detailsModal").classList.remove("show");
}


// ============================================================
// 8. TOAST NOTIFICATIONS
// ============================================================

function showToast(message) {
  const container = document.getElementById("toastContainer");
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px)";
    toast.style.transition = "all 0.25s ease-out";
    setTimeout(() => toast.remove(), 250);
  }, 2800);
}


// ============================================================
// 9. EVENT LISTENERS & INITIALIZATION
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  // Load state from localStorage
  initState();

  // Check login status (Section 5)
  const storedUser = localStorage.getItem("cc_reva_username");
  const loginScreen = document.getElementById("loginScreen");
  const appLayout = document.getElementById("appLayout");

  if (storedUser) {
    // Already stored -> jump straight to dashboard
    loginScreen.style.display = "none";
    appLayout.style.display = "flex";
    navigateTo("dashboardPage");
  } else {
    // First time -> show welcome screen
    loginScreen.style.display = "flex";
    appLayout.style.display = "none";
  }

  // Login Form Submission
  const loginForm = document.getElementById("loginForm");
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("loginName").value.trim() || "Somit Sarkar";
    const email = document.getElementById("loginEmail").value.trim() || "somit.s@reva.edu.in";
    
    // Store in localStorage
    localStorage.setItem("cc_reva_username", name);
    currentProfile.name = name;
    currentProfile.email = email;
    saveProfileToStorage();

    // Transition to dashboard
    loginScreen.style.display = "none";
    appLayout.style.display = "flex";
    navigateTo("dashboardPage");
    showToast(`Welcome to CampusConnect REVA, ${name}!`);
  });

  // Navigation Links
  document.querySelectorAll(".sidebar-nav .nav-link").forEach(btn => {
    btn.addEventListener("click", () => {
      const page = btn.getAttribute("data-page");
      if (page) navigateTo(page);
    });
  });

  // Topbar Admin Quick Switch Button
  const topAdminBtn = document.getElementById("topAdminBtn");
  if (topAdminBtn) {
    topAdminBtn.addEventListener("click", () => navigateTo("adminPage"));
  }

  // Notification Bell Toggle Dropdown (Section 19)
  const notifButton = document.getElementById("notifButton");
  const notifDropdown = document.getElementById("notifDropdown");
  notifButton.addEventListener("click", (e) => {
    e.stopPropagation();
    notifDropdown.classList.toggle("show");
  });

  document.addEventListener("click", (e) => {
    if (!notifDropdown.contains(e.target) && e.target !== notifButton) {
      notifDropdown.classList.remove("show");
    }
  });

  // Modal Closers
  document.getElementById("closeWhyModal").addEventListener("click", closeWhyModal);
  document.getElementById("whyModal").addEventListener("click", (e) => {
    if (e.target.id === "whyModal") closeWhyModal();
  });

  document.getElementById("closeDetailsModal").addEventListener("click", closeDetailsModal);
  document.getElementById("detailsModal").addEventListener("click", (e) => {
    if (e.target.id === "detailsModal") closeDetailsModal();
  });

  // Close modals on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeWhyModal();
      closeDetailsModal();
    }
  });

  // Search Input in Opportunities
  const searchInput = document.getElementById("oppSearchInput");
  const clearSearchBtn = document.getElementById("clearSearchBtn");

  searchInput.addEventListener("input", () => {
    if (searchInput.value.length > 0) {
      clearSearchBtn.style.display = "block";
    } else {
      clearSearchBtn.style.display = "none";
    }
    renderOpportunities();
  });

  clearSearchBtn.addEventListener("click", () => {
    searchInput.value = "";
    clearSearchBtn.style.display = "none";
    renderOpportunities();
  });

  // Category Filter Pills
  document.querySelectorAll("#categoryFilterGroup .filter-pill").forEach(pill => {
    pill.addEventListener("click", () => {
      document.querySelectorAll("#categoryFilterGroup .filter-pill").forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      renderOpportunities();
    });
  });

  // Sort By Select
  document.getElementById("sortBySelect").addEventListener("change", () => {
    renderOpportunities();
  });

  // Profile Form Submission (Section 18)
  const profileForm = document.getElementById("profileForm");
  profileForm.addEventListener("submit", (e) => {
    e.preventDefault();
    currentProfile.name = document.getElementById("profName").value.trim();
    currentProfile.email = document.getElementById("profEmail").value.trim();
    currentProfile.srn = document.getElementById("profSRN").value.trim();
    currentProfile.branch = document.getElementById("profBranch").value;
    currentProfile.year = document.getElementById("profYear").value;
    currentProfile.cgpa = parseFloat(document.getElementById("profCGPA").value) || 9.4;
    currentProfile.preferredLocation = document.getElementById("profLocation").value.trim();
    currentProfile.careerGoal = document.getElementById("profGoal").value.trim();
    
    // Split skills string into array
    const rawSkills = document.getElementById("profSkills").value;
    currentProfile.skills = rawSkills.split(",").map(s => s.trim()).filter(s => s.length > 0);

    saveProfileToStorage();

    const toastMsg = document.getElementById("profileSaveMsg");
    toastMsg.style.display = "inline";
    setTimeout(() => { toastMsg.style.display = "none"; }, 3000);

    showToast("Profile changes saved to localStorage!");
    renderDashboard();
  });

  // Admin Add Opportunity Form (Section 20)
  const addOppForm = document.getElementById("addOppForm");
  addOppForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const rawSkills = document.getElementById("newOppSkills").value;
    const skillsArr = rawSkills.split(",").map(s => s.trim()).filter(Boolean);

    const rawBranches = document.getElementById("newOppBranch").value;
    const branchesArr = rawBranches.split(",").map(b => b.trim()).filter(Boolean);

    const rawYears = document.getElementById("newOppYears").value;
    const yearsArr = rawYears.split(",").map(y => y.trim()).filter(Boolean);

    const newOpp = {
      id: "opp-" + Date.now(),
      title: document.getElementById("newOppTitle").value.trim(),
      org: document.getElementById("newOppOrg").value.trim(),
      type: document.getElementById("newOppType").value,
      location: document.getElementById("newOppLocation").value.trim(),
      deadline: document.getElementById("newOppDeadline").value,
      minCGPA: parseFloat(document.getElementById("newOppMinCGPA").value) || 7.0,
      eligibleBranches: branchesArr.length > 0 ? branchesArr : ["All"],
      eligibleYears: yearsArr.length > 0 ? yearsArr : ["All"],
      requiredSkills: skillsArr,
      targetRole: document.getElementById("newOppTitle").value.trim(),
      description: document.getElementById("newOppDesc").value.trim(),
      url: document.getElementById("newOppUrl").value.trim() || "https://reva.edu.in"
    };

    // Prepend to list
    opportunities.unshift(newOpp);
    saveOpportunitiesToStorage();

    addOppForm.reset();
    showToast(`Successfully published "${newOpp.title}"!`);

    // Return to opportunities view to inspect
    navigateTo("opportunitiesPage");
  });
});
