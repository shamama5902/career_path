// app.js - Main Application Logic, State Controller, and Interaction Sandbox

// Global state controller
class AppState {
  constructor() {
    this.initStorage();
    this.activeTab = "panel-dashboard";
    this.activeQuestion = null;
    
    // Aptitude Quiz State
    this.quizCategory = null;
    this.quizQuestions = [];
    this.quizIndex = 0;
    this.quizScore = 0;
    this.quizTimer = null;
    this.quizTimeLeft = 600; // 10 minutes in seconds
    this.selectedOption = null;
    this.isAnswerSubmitted = false;

    // HR State
    this.activeHRIndex = 0;
  }

  initStorage() {
    if (!localStorage.getItem("dsa_solved")) {
      localStorage.setItem("dsa_solved", JSON.stringify([]));
    }
    if (!localStorage.getItem("applied_jobs")) {
      localStorage.setItem("applied_jobs", JSON.stringify([]));
    }
    if (!localStorage.getItem("star_stories")) {
      localStorage.setItem("star_stories", JSON.stringify({}));
    }
    if (!localStorage.getItem("aptitude_scores")) {
      localStorage.setItem("aptitude_scores", JSON.stringify({ quantitative: [], logical: [], verbal: [] }));
    }
    if (!localStorage.getItem("code_executions_count")) {
      localStorage.setItem("code_executions_count", "0");
    }
    
    // Check-in streak calculation
    const today = new Date().toDateString();
    const lastActive = localStorage.getItem("last_active_date");
    let streak = parseInt(localStorage.getItem("activity_streak") || "0");
    
    if (!lastActive) {
      streak = 1;
    } else {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      if (lastActive === yesterday.toDateString()) {
        streak += 1;
      } else if (lastActive !== today) {
        streak = 1; // Streak broken, restart
      }
    }
    localStorage.setItem("last_active_date", today);
    localStorage.setItem("activity_streak", streak.toString());
  }

  getSolvedDSA() {
    return JSON.parse(localStorage.getItem("dsa_solved") || "[]");
  }

  toggleDSASolve(questionId) {
    const list = this.getSolvedDSA();
    const idx = list.indexOf(questionId);
    if (idx === -1) {
      list.push(questionId);
      this.addActivity("Completed DSA challenge: " + this.getQuestionTitle(questionId), "green");
    } else {
      list.splice(idx, 1);
    }
    localStorage.setItem("dsa_solved", JSON.stringify(list));
    this.updateDashboardMetrics();
  }

  getQuestionTitle(qId) {
    for (const cat of DSA_SHEET_DATA) {
      const found = cat.questions.find(q => q.id === qId);
      if (found) return found.title;
    }
    return qId;
  }

  getAppliedJobs() {
    return JSON.parse(localStorage.getItem("applied_jobs") || "[]");
  }

  applyJob(jobId, coverLetter) {
    const list = this.getAppliedJobs();
    if (!list.some(item => item.id === jobId)) {
      const jobInfo = JOBS_DATA.find(j => j.id === jobId);
      list.push({
        id: jobId,
        title: jobInfo.title,
        company: jobInfo.company,
        appliedAt: new Date().toLocaleDateString(),
        coverLetter: coverLetter,
        status: "Applied"
      });
      localStorage.setItem("applied_jobs", JSON.stringify(list));
      this.addActivity("Applied for " + jobInfo.title + " at " + jobInfo.company, "blue");
      this.updateDashboardMetrics();
    }
  }

  incrementCodeExecutions() {
    let count = parseInt(localStorage.getItem("code_executions_count") || "0");
    count++;
    localStorage.setItem("code_executions_count", count.toString());
    this.updateDashboardMetrics();
  }

  addActivity(title, color) {
    const activities = JSON.parse(localStorage.getItem("activities_log") || "[]");
    activities.unshift({
      title,
      color,
      time: "Just now"
    });
    // Keep last 6 logs
    localStorage.setItem("activities_log", JSON.stringify(activities.slice(0, 6)));
    this.renderActivityLog();
  }

  renderActivityLog() {
    const logList = document.getElementById("activity-log-list");
    if (!logList) return;
    
    const activities = JSON.parse(localStorage.getItem("activities_log") || "[]");
    if (activities.length === 0) {
      logList.innerHTML = `
        <div class="activity-item">
          <span class="activity-dot green"></span>
          <div class="activity-content">
            <span class="activity-title">Logged in to CareerHub Portal</span>
            <span class="activity-time">Just now</span>
          </div>
        </div>
      `;
      return;
    }

    logList.innerHTML = activities.map(act => `
      <div class="activity-item">
        <span class="activity-dot ${act.color}"></span>
        <div class="activity-content">
          <span class="activity-title">${act.title}</span>
          <span class="activity-time">${act.time}</span>
        </div>
      </div>
    `).join('');
  }

  updateDashboardMetrics() {
    const dsaSolved = this.getSolvedDSA().length;
    let totalDSA = 0;
    DSA_SHEET_DATA.forEach(cat => totalDSA += cat.questions.length);
    const dsaPct = totalDSA > 0 ? Math.round((dsaSolved / totalDSA) * 100) : 0;
    
    const appliedJobsCount = this.getAppliedJobs().length;
    
    // Aptitude average
    const aptScores = JSON.parse(localStorage.getItem("aptitude_scores") || "{}");
    let sumPct = 0;
    let countTests = 0;
    Object.keys(aptScores).forEach(cat => {
      aptScores[cat].forEach(scoreObj => {
        sumPct += (scoreObj.score / scoreObj.total) * 100;
        countTests++;
      });
    });
    const avgApt = countTests > 0 ? Math.round(sumPct / countTests) : 0;
    
    const executionsCount = localStorage.getItem("code_executions_count") || "0";
    
    // Update DOM Metrics
    document.getElementById("dashboard-dsa-pct").innerText = dsaPct + "%";
    document.getElementById("dashboard-jobs-count").innerText = appliedJobsCount;
    document.getElementById("dashboard-apt-score").innerText = avgApt + "%";
    document.getElementById("dashboard-codes-count").innerText = executionsCount;
    
    // Update SVG progress ring
    const circle = document.getElementById("progress-ring-circle");
    const ringPctText = document.getElementById("ring-pct-text");
    if (circle && ringPctText) {
      // Overall progress is average of DSA and Aptitude completion
      const overallProgress = Math.round((dsaPct + avgApt) / 2);
      ringPctText.innerText = overallProgress + "%";
      
      const radius = circle.r.baseVal.value;
      const circumference = 2 * Math.PI * radius; // ~314
      circle.style.strokeDasharray = `${circumference} ${circumference}`;
      
      const offset = circumference - (overallProgress / 100) * circumference;
      circle.style.strokeDashoffset = offset;
    }
    
    // Update widgets stats text
    document.getElementById("widget-dsa-stats").innerText = `${dsaSolved}/${totalDSA}`;
    document.getElementById("widget-jobs-stats").innerText = appliedJobsCount;
    document.getElementById("widget-quiz-stats").innerText = countTests;
    
    // Set streak tracker
    const streak = localStorage.getItem("activity_streak") || "1";
    document.getElementById("streak-days").innerText = streak;
  }
}

// Orchestrator Engine Instantiation
const app = new AppState();

document.addEventListener("DOMContentLoaded", () => {
  // Bind Sidebar navigation switching
  const navItems = document.querySelectorAll(".nav-item");
  navItems.forEach(item => {
    item.addEventListener("click", () => {
      navItems.forEach(i => i.classList.remove("active"));
      item.classList.add("active");
      
      const targetId = item.getAttribute("data-target");
      app.switchTab(targetId);
    });
  });

  // Bind sidebar collapse toggle
  const toggleBtn = document.getElementById("toggle-sidebar");
  const container = document.getElementById("app-container");
  const toggleIcon = document.getElementById("toggle-icon");
  toggleBtn.addEventListener("click", () => {
    container.classList.toggle("sidebar-collapsed");
    const collapsed = container.classList.contains("sidebar-collapsed");
    if (collapsed) {
      toggleIcon.setAttribute("data-lucide", "chevron-right");
    } else {
      toggleIcon.setAttribute("data-lucide", "chevron-left");
    }
    lucide.createIcons();
  });

  // Editor line numbers text syncer
  const codeArea = document.getElementById("dsa-code-textarea");
  const lineNumbers = document.getElementById("editor-line-numbers");
  codeArea.addEventListener("input", () => {
    const lines = codeArea.value.split('\n');
    let numbers = [];
    for (let i = 1; i <= Math.max(lines.length, 12); i++) {
      numbers.push(i);
    }
    lineNumbers.innerHTML = numbers.join('<br>');
  });

  // Load components
  app.renderActivityLog();
  app.updateDashboardMetrics();
  app.renderJobs();
  app.renderDSASheet();
  app.renderCSNotes();
  app.renderCSQuickQuiz();
  app.renderHRPrep();
  app.renderCompanies();

  // Load vector icons
  lucide.createIcons();
});

// View switching APIs
AppState.prototype.switchTab = function(targetPanelId) {
  // Switch visible panels
  const panels = document.querySelectorAll(".page-panel");
  panels.forEach(p => p.classList.remove("active"));
  
  const targetPanel = document.getElementById(targetPanelId);
  if (targetPanel) {
    targetPanel.classList.add("active");
  }

  // Update header text based on page name
  const titles = {
    "panel-dashboard": "Overview Dashboard",
    "panel-jobs": "Job Listings & Careers",
    "panel-dsa": "Dedicated DSA Sheet Practice",
    "panel-prep": "Preparation Hub",
    "panel-companies": "Companies Interview Guides"
  };
  document.getElementById("header-page-title").innerText = titles[targetPanelId] || "Dashboard";
  
  // Highlight correct menu button programmatically
  const navItems = document.querySelectorAll(".nav-item");
  navItems.forEach(item => {
    if (item.getAttribute("data-target") === targetPanelId) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });

  // Recreate icons in panels
  lucide.createIcons();
};

AppState.prototype.switchSubTab = function(activeBtnId, targetSubPanelId) {
  // Headers
  const buttons = document.querySelectorAll(".tab-btn");
  buttons.forEach(b => b.classList.remove("active"));
  document.getElementById(activeBtnId).classList.add("active");

  // Panels
  const subPanels = document.querySelectorAll(".sub-panel");
  subPanels.forEach(sp => sp.classList.remove("active"));
  document.getElementById(targetSubPanelId).classList.add("active");
  
  lucide.createIcons();
};

// ----------------------------------------------------
// JOB PORTAL INTERACTIVITY FLOWS
// ----------------------------------------------------
AppState.prototype.renderJobs = function() {
  const container = document.getElementById("jobs-grid-container");
  if (!container) return;

  container.innerHTML = JOBS_DATA.map(job => `
    <div class="glass-card job-card">
      <div>
        <div class="job-card-header">
          <div class="company-badge-wrapper">
            <div class="company-logo-placeholder" style="background-color: ${job.logoBg};">
              ${job.company[0]}
            </div>
            <div class="job-title-company">
              <h4 class="job-card-title" onclick="app.openJobDetailModal('${job.id}')">${job.title}</h4>
              <span class="job-card-company">${job.company}</span>
            </div>
          </div>
          <span class="tag-badge" style="background: hsl(var(--bg-element)); font-weight: 700;">${job.experience}</span>
        </div>
        
        <div class="job-card-meta">
          <div class="job-meta-row">
            <i data-lucide="map-pin" class="icon"></i>
            <span>${job.location}</span>
          </div>
          <div class="job-meta-row">
            <i data-lucide="clock" class="icon"></i>
            <span>${job.type}</span>
          </div>
        </div>

        <div class="job-card-tags">
          ${job.tags.map(t => `<span class="tag-badge">${t}</span>`).join('')}
        </div>
      </div>
      
      <div class="job-card-footer">
        <span class="job-salary">${job.salary}</span>
        <button class="primary-btn" onclick="app.openJobDetailModal('${job.id}')">
          Details
          <i data-lucide="arrow-right" style="width: 14px; height: 14px;"></i>
        </button>
      </div>
    </div>
  `).join('');
  
  lucide.createIcons();
};

AppState.prototype.filterJobs = function() {
  const query = document.getElementById("job-search-input").value.toLowerCase();
  const experience = document.getElementById("job-filter-experience").value;
  const type = document.getElementById("job-filter-type").value;
  const company = document.getElementById("job-filter-company").value;
  
  const filtered = JOBS_DATA.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(query) || 
                          job.company.toLowerCase().includes(query) || 
                          job.tags.some(t => t.toLowerCase().includes(query)) ||
                          job.description.toLowerCase().includes(query);
    const matchesExp = (experience === "All") || (job.experience === experience);
    const matchesType = (type === "All") || (job.type === type);
    const matchesCompany = (company === "All") || (job.company === company);

    return matchesSearch && matchesExp && matchesType && matchesCompany;
  });

  const container = document.getElementById("jobs-grid-container");
  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: hsl(var(--text-muted));">
        <i data-lucide="info" style="width: 42px; height: 42px; margin: 0 auto 12px auto; display: block;"></i>
        <p>No matching positions found. Broaden your search parameters or select a different filter.</p>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  container.innerHTML = filtered.map(job => `
    <div class="glass-card job-card">
      <div>
        <div class="job-card-header">
          <div class="company-badge-wrapper">
            <div class="company-logo-placeholder" style="background-color: ${job.logoBg};">
              ${job.company[0]}
            </div>
            <div class="job-title-company">
              <h4 class="job-card-title" onclick="app.openJobDetailModal('${job.id}')">${job.title}</h4>
              <span class="job-card-company">${job.company}</span>
            </div>
          </div>
          <span class="tag-badge" style="background: hsl(var(--bg-element)); font-weight: 700;">${job.experience}</span>
        </div>
        
        <div class="job-card-meta">
          <div class="job-meta-row">
            <i data-lucide="map-pin" class="icon"></i>
            <span>${job.location}</span>
          </div>
          <div class="job-meta-row">
            <i data-lucide="clock" class="icon"></i>
            <span>${job.type}</span>
          </div>
        </div>

        <div class="job-card-tags">
          ${job.tags.map(t => `<span class="tag-badge">${t}</span>`).join('')}
        </div>
      </div>
      
      <div class="job-card-footer">
        <span class="job-salary">${job.salary}</span>
        <button class="primary-btn" onclick="app.openJobDetailModal('${job.id}')">
          Details
          <i data-lucide="arrow-right" style="width: 14px; height: 14px;"></i>
        </button>
      </div>
    </div>
  `).join('');
  lucide.createIcons();
};

AppState.prototype.openJobDetailModal = function(jobId) {
  const job = JOBS_DATA.find(j => j.id === jobId);
  if (!job) return;

  const appliedList = this.getAppliedJobs();
  const alreadyApplied = appliedList.some(item => item.id === jobId);

  const body = document.getElementById("job-detail-body");
  body.innerHTML = `
    <div style="display: flex; gap: 16px; align-items: center; margin-bottom: 20px;">
      <div class="company-logo-placeholder" style="background-color: ${job.logoBg}; width: 56px; height: 56px; font-size: 24px;">
        ${job.company[0]}
      </div>
      <div>
        <h2 style="font-size: 20px; font-weight: 800;">${job.title}</h2>
        <span style="color: hsl(var(--text-secondary)); font-size: 14px;">${job.company} • ${job.location}</span>
      </div>
    </div>

    <div style="display: flex; gap: 8px; margin-bottom: 24px; flex-wrap: wrap;">
      <span class="tag-badge" style="background-color: hsl(var(--bg-element)); font-weight: 600;">${job.type}</span>
      <span class="tag-badge" style="background-color: hsl(var(--bg-element)); font-weight: 600;">${job.experience} Level</span>
      <span class="tag-badge" style="background-color: hsl(var(--bg-element)); font-weight: 600; color: hsl(var(--color-success));">${job.salary}</span>
    </div>

    <h4 style="font-size: 16px; margin-bottom: 8px; font-weight: 700;">Job Description</h4>
    <p style="color: hsl(var(--text-secondary)); font-size: 14px; line-height: 1.6; margin-bottom: 20px;">${job.description}</p>

    <h4 style="font-size: 16px; margin-bottom: 8px; font-weight: 700;">Requirements</h4>
    <ul style="color: hsl(var(--text-secondary)); font-size: 14px; line-height: 1.6; margin-bottom: 20px; padding-left: 20px;">
      ${job.requirements.map(req => `<li style="margin-bottom: 4px;">${req}</li>`).join('')}
    </ul>

    <h4 style="font-size: 16px; margin-bottom: 8px; font-weight: 700;">Compensation & Perks</h4>
    <ul style="color: hsl(var(--text-secondary)); font-size: 14px; line-height: 1.6; padding-left: 20px;">
      ${job.benefits.map(b => `<li style="margin-bottom: 4px;">${b}</li>`).join('')}
    </ul>
  `;

  // Render correct Apply Button state
  const footer = document.getElementById("job-detail-footer");
  if (alreadyApplied) {
    footer.innerHTML = `
      <button class="secondary-btn" onclick="app.closeJobDetailModal()">Close</button>
      <button class="secondary-btn" style="border-color: hsl(var(--color-success)/0.3); color: hsl(var(--color-success)); cursor: default;" disabled>
        ✓ Applied Already
      </button>
    `;
  } else {
    footer.innerHTML = `
      <button class="secondary-btn" onclick="app.closeJobDetailModal()">Close</button>
      <button class="primary-btn" onclick="app.openJobApplyModal('${job.id}')">Apply For Job</button>
    `;
  }

  document.getElementById("job-detail-modal").classList.add("active");
  lucide.createIcons();
};

AppState.prototype.closeJobDetailModal = function() {
  document.getElementById("job-detail-modal").classList.remove("active");
};

AppState.prototype.openJobApplyModal = function(jobId) {
  this.closeJobDetailModal();
  const job = JOBS_DATA.find(j => j.id === jobId);
  if (!job) return;

  document.getElementById("job-apply-title").innerText = `Apply for ${job.title} at ${job.company}`;
  document.getElementById("apply-cover-letter").value = "";
  
  // Save active job context in submit button trigger attribute
  const submitBtn = document.querySelector("#job-apply-modal .primary-btn");
  submitBtn.setAttribute("onclick", `app.submitJobApplication('${job.id}')`);

  document.getElementById("job-apply-modal").classList.add("active");
};

AppState.prototype.closeJobApplyModal = function() {
  document.getElementById("job-apply-modal").classList.remove("active");
};

AppState.prototype.handleMockFileChange = function(input) {
  const label = document.getElementById("mock-file-label");
  if (input.files && input.files.length > 0) {
    label.innerText = input.files[0].name;
    label.style.color = "hsl(var(--color-success))";
  }
};

AppState.prototype.generateAICoverLetter = function() {
  // Grab selected job from submit button trigger attribute
  const submitBtn = document.querySelector("#job-apply-modal .primary-btn");
  const jobId = submitBtn.getAttribute("onclick").match(/'([^']+)'/)[1];
  const job = JOBS_DATA.find(j => j.id === jobId);
  if (!job) return;

  const name = document.getElementById("apply-user-name").value;
  const skills = document.getElementById("apply-user-skills").value;

  const letterText = `Dear Hiring Manager at ${job.company},

I am writing to express my enthusiastic interest in the ${job.title} position currently open on your careers portal. With a focus on web optimization and frontend rendering pipelines, I am eager to contribute to the innovation cycles of your engineering organization.

As a developer, my toolkit includes: ${skills}. I noticed the requirements for the position focus heavily on:
${job.requirements.slice(0, 2).map(r => "- " + r).join("\n")}

I have worked on several algorithmic implementations and responsive projects that directly mirror these priorities. I am confident that my technical skills, combined with my commitment to building secure, accessible client products, will make me a productive addition to the team.

Thank you for your time and consideration. I look forward to speaking with you about this opportunity.

Sincerely,
${name}
shamama@gmail.com`;

  document.getElementById("apply-cover-letter").value = letterText;
};

AppState.prototype.submitJobApplication = function(jobId) {
  const name = document.getElementById("apply-user-name").value;
  const email = document.getElementById("apply-user-email").value;
  const coverLetter = document.getElementById("apply-cover-letter").value;

  if (!name || !email) {
    alert("Please fill in your name and email parameters.");
    return;
  }

  this.applyJob(jobId, coverLetter);
  this.closeJobApplyModal();
  alert("Application submitted successfully to our simulated corporate portal database!");
};


// ----------------------------------------------------
// DEDICATED DSA SHEET & CODE RUNNER
// ----------------------------------------------------
AppState.prototype.renderDSASheet = function() {
  const container = document.getElementById("dsa-categories-accordion");
  if (!container) return;

  const solved = this.getSolvedDSA();

  container.innerHTML = DSA_SHEET_DATA.map((cat, catIdx) => {
    const totalCount = cat.questions.length;
    const solvedCount = cat.questions.filter(q => solved.includes(q.id)).length;
    const isCategorySolved = solvedCount === totalCount;
    
    return `
      <div class="dsa-category-box">
        <div class="category-title-header">
          <h3>${cat.category}</h3>
          <span class="category-progress-pill" style="${isCategorySolved ? 'color:#10b981; background:rgba(16,185,129,0.1);' : ''}">
            ${solvedCount}/${totalCount}
          </span>
        </div>
        
        <div class="question-list-group">
          ${cat.questions.map(q => {
            const isChecked = solved.includes(q.id);
            const isActive = this.activeQuestion && this.activeQuestion.id === q.id;
            return `
              <div class="question-row-item ${isActive ? 'active' : ''}" data-qid="${q.id}">
                <div class="checkbox-label-wrapper">
                  <div class="dsa-checkbox ${isChecked ? 'checked' : ''}" onclick="event.stopPropagation(); app.toggleQuestionChecked('${q.id}')"></div>
                  <span class="question-name" onclick="app.loadDSAQuestion('${q.id}')">${q.title}</span>
                </div>
                <span class="diff-badge ${q.difficulty.toLowerCase()}">${q.difficulty}</span>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }).join('');

  // Update sheet metrics text
  let totalQs = 0;
  DSA_SHEET_DATA.forEach(cat => totalQs += cat.questions.length);
  document.getElementById("dsa-global-count").innerText = `${solved.length}/${totalQs} Solved`;
};

AppState.prototype.toggleQuestionChecked = function(qId) {
  this.toggleDSASolve(qId);
  this.renderDSASheet();
};

AppState.prototype.loadDSAQuestion = function(qId) {
  let foundQ = null;
  for (const cat of DSA_SHEET_DATA) {
    foundQ = cat.questions.find(q => q.id === qId);
    if (foundQ) break;
  }
  if (!foundQ) return;

  this.activeQuestion = foundQ;
  
  // Highlight active row in DOM list
  document.querySelectorAll(".question-row-item").forEach(row => {
    if (row.getAttribute("data-qid") === qId) {
      row.classList.add("active");
    } else {
      row.classList.remove("active");
    }
  });

  // Display details in editor workspace
  document.getElementById("editor-active-title").innerHTML = `
    <span style="font-weight:700;">${foundQ.title}</span> 
    <span class="diff-badge ${foundQ.difficulty.toLowerCase()}" style="margin-left:8px;">${foundQ.difficulty}</span>
  `;

  // Render starter template code & explanation details inside terminal
  document.getElementById("dsa-code-textarea").value = foundQ.starterCode;
  
  const consoleContent = document.getElementById("console-output-content");
  consoleContent.className = "console-content";
  consoleContent.innerText = `[PROBLEM SPECIFICATION]\n\n${foundQ.description}\n\nConsole is ready. Press 'Run Code' to run JS automated tests.`;
  document.getElementById("test-status-pill").innerText = "READY";
  document.getElementById("test-status-pill").style.color = "hsl(var(--text-muted))";

  // Trigger scroll index refresh
  const event = new Event('input');
  document.getElementById("dsa-code-textarea").dispatchEvent(event);
};

AppState.prototype.resetCodeEditor = function() {
  if (!this.activeQuestion) {
    alert("Select a DSA problem first before resetting workspace parameters.");
    return;
  }
  document.getElementById("dsa-code-textarea").value = this.activeQuestion.starterCode;
  const event = new Event('input');
  document.getElementById("dsa-code-textarea").dispatchEvent(event);
};

AppState.prototype.runCodeTests = function() {
  if (!this.activeQuestion) {
    alert("Select a problem from the list to start coding execution.");
    return;
  }

  const userCode = document.getElementById("dsa-code-textarea").value;
  const consoleContent = document.getElementById("console-output-content");
  const statusPill = document.getElementById("test-status-pill");

  this.incrementCodeExecutions();

  try {
    // Inject and execute within browser sandboxed runtime
    const runnerSource = `
      ${userCode}
      return (function() {
        ${this.activeQuestion.testCode}
      })();
    `;
    
    // Evaluate function safety wrapper
    const evaluation = new Function(runnerSource);
    const result = evaluation();

    if (result && result.success) {
      consoleContent.className = "console-content success";
      consoleContent.innerText = `✓ TEST PASSED\n\n${result.message}`;
      statusPill.innerText = "PASS";
      statusPill.style.color = "hsl(var(--color-success))";
      
      // Auto-check solved checkbox
      const list = this.getSolvedDSA();
      if (!list.includes(this.activeQuestion.id)) {
        this.toggleDSASolve(this.activeQuestion.id);
        this.renderDSASheet();
      }
    } else {
      consoleContent.className = "console-content error";
      consoleContent.innerText = `✗ TEST FAILED\n\n${result.message || 'Verification logic returned false.'}\n\nDebug Info:\n${result.debug || 'None provided.'}`;
      statusPill.innerText = "FAIL";
      statusPill.style.color = "hsl(var(--color-danger))";
    }
  } catch (e) {
    consoleContent.className = "console-content error";
    consoleContent.innerText = `✗ SYNTAX/RUNTIME ERROR\n\n${e.stack || e.message}`;
    statusPill.innerText = "ERROR";
    statusPill.style.color = "hsl(var(--color-danger))";
  }
};


// ----------------------------------------------------
// PREPARATION SUITE: APTITUDE INTERACTIVE QUIZ
// ----------------------------------------------------
AppState.prototype.startAptitudeQuiz = function(category) {
  this.quizCategory = category;
  this.quizQuestions = APTITUDE_DATA[category] || [];
  this.quizIndex = 0;
  this.quizScore = 0;
  this.quizTimeLeft = 600;
  this.selectedOption = null;
  this.isAnswerSubmitted = false;

  if (this.quizQuestions.length === 0) return;

  document.getElementById("apt-selection-view").style.display = "none";
  document.getElementById("apt-quiz-view").style.display = "block";
  document.getElementById("apt-score-view").style.display = "none";

  this.startQuizTimer();
  this.loadQuizQuestion();
};

AppState.prototype.startQuizTimer = function() {
  clearInterval(this.quizTimer);
  const timerText = document.getElementById("quiz-timer-text");
  
  this.quizTimer = setInterval(() => {
    this.quizTimeLeft--;
    if (this.quizTimeLeft <= 0) {
      clearInterval(this.quizTimer);
      this.finishQuiz();
      return;
    }
    
    const minutes = Math.floor(this.quizTimeLeft / 60);
    const seconds = this.quizTimeLeft % 60;
    timerText.innerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, 1000);
};

AppState.prototype.loadQuizQuestion = function() {
  const currentQ = this.quizQuestions[this.quizIndex];
  
  // Progress Bar
  const progressFill = document.getElementById("quiz-progress-fill");
  const pct = Math.round((this.quizIndex / this.quizQuestions.length) * 100);
  progressFill.style.width = pct + "%";
  
  document.getElementById("quiz-question-number").innerText = `Question ${this.quizIndex + 1} of ${this.quizQuestions.length}`;
  document.getElementById("quiz-question-text").innerText = currentQ.question;
  
  const optionsList = document.getElementById("quiz-options-container");
  optionsList.innerHTML = currentQ.options.map((opt, idx) => `
    <div class="option-item" onclick="app.selectQuizOption(${idx})" data-oidx="${idx}">
      <span style="font-weight:700; color:hsl(var(--accent-primary)); margin-right:8px;">${String.fromCharCode(65 + idx)}.</span>
      <span>${opt}</span>
    </div>
  `).join('');

  document.getElementById("quiz-explanation-box").style.display = "none";
  
  const nextBtn = document.getElementById("quiz-next-btn");
  nextBtn.innerText = "Submit Answer";
  nextBtn.setAttribute("onclick", "app.submitQuizAnswer()");
  
  this.selectedOption = null;
  this.isAnswerSubmitted = false;
};

AppState.prototype.selectQuizOption = function(idx) {
  if (this.isAnswerSubmitted) return;

  this.selectedOption = idx;
  document.querySelectorAll(".option-item").forEach(item => {
    const oidx = parseInt(item.getAttribute("data-oidx"));
    if (oidx === idx) {
      item.classList.add("selected");
    } else {
      item.classList.remove("selected");
    }
  });
};

AppState.prototype.submitQuizAnswer = function() {
  if (this.selectedOption === null) {
    alert("Please choose an option to evaluate your answer.");
    return;
  }

  const currentQ = this.quizQuestions[this.quizIndex];
  this.isAnswerSubmitted = true;

  // Reveal correct and incorrect answers
  document.querySelectorAll(".option-item").forEach(item => {
    const oidx = parseInt(item.getAttribute("data-oidx"));
    if (oidx === currentQ.answerIndex) {
      item.classList.remove("selected");
      item.classList.add("correct-reveal");
    } else if (oidx === this.selectedOption) {
      item.classList.remove("selected");
      item.classList.add("wrong-reveal");
    }
  });

  // Calculate scores
  const isCorrect = this.selectedOption === currentQ.answerIndex;
  if (isCorrect) {
    this.quizScore++;
  }

  // Display explanation
  document.getElementById("quiz-explanation-text").innerText = currentQ.explanation;
  document.getElementById("quiz-explanation-box").style.display = "block";

  // Change action button state
  const nextBtn = document.getElementById("quiz-next-btn");
  if (this.quizIndex < this.quizQuestions.length - 1) {
    nextBtn.innerText = "Next Question";
    nextBtn.setAttribute("onclick", "app.nextQuizQuestion()");
  } else {
    nextBtn.innerText = "Finish Quiz";
    nextBtn.setAttribute("onclick", "app.finishQuiz()");
  }
};

AppState.prototype.nextQuizQuestion = function() {
  this.quizIndex++;
  this.loadQuizQuestion();
};

AppState.prototype.finishQuiz = function() {
  clearInterval(this.quizTimer);
  
  // Save score to local storage logs
  const scores = JSON.parse(localStorage.getItem("aptitude_scores") || "{}");
  if (!scores[this.quizCategory]) scores[this.quizCategory] = [];
  
  scores[this.quizCategory].push({
    score: this.quizScore,
    total: this.quizQuestions.length,
    timestamp: new Date().toLocaleDateString()
  });
  localStorage.setItem("aptitude_scores", JSON.stringify(scores));

  document.getElementById("apt-quiz-view").style.display = "none";
  document.getElementById("apt-score-view").style.display = "block";
  document.getElementById("quiz-final-score").innerText = `${this.quizScore} / ${this.quizQuestions.length}`;

  const categoryLabels = { quantitative: "Quantitative math", logical: "Logical reasoning", verbal: "Verbal syntax" };
  this.addActivity(`Scored ${this.quizScore}/${this.quizQuestions.length} on ${categoryLabels[this.quizCategory]} quiz`, "purple");

  this.updateDashboardMetrics();
};

AppState.prototype.resetQuizViews = function() {
  document.getElementById("apt-selection-view").style.display = "block";
  document.getElementById("apt-quiz-view").style.display = "none";
  document.getElementById("apt-score-view").style.display = "none";
};

AppState.prototype.restartAptitudeQuiz = function() {
  this.startAptitudeQuiz(this.quizCategory);
};

AppState.prototype.quitQuiz = function() {
  clearInterval(this.quizTimer);
  this.resetQuizViews();
};


// ----------------------------------------------------
// PREPARATION SUITE: CS NOTES & MINI-QUIZ
// ----------------------------------------------------
AppState.prototype.renderCSNotes = function() {
  const container = document.getElementById("cs-notes-container");
  if (!container) return;

  container.innerHTML = CS_FUNDAMENTALS_DATA.map((subject, sIdx) => `
    <div class="glass-card" style="margin-bottom: 20px;">
      <h3 style="font-size: 16px; margin-bottom: 12px; border-bottom:1px solid var(--border-glass); padding-bottom: 8px;">
        ${subject.topic}
      </h3>
      <div class="notes-accordion">
        ${subject.notes.map((note, nIdx) => `
          <div class="notes-card" id="note-${sIdx}-${nIdx}" onclick="app.toggleNoteAccordion('note-${sIdx}-${nIdx}')">
            <div class="notes-card-header">
              <h4>${note.title}</h4>
              <i data-lucide="chevron-down" class="chevron" style="width: 16px; height: 16px;"></i>
            </div>
            <div class="notes-card-content">
              ${note.content}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
  
  lucide.createIcons();
};

AppState.prototype.toggleNoteAccordion = function(noteId) {
  const element = document.getElementById(noteId);
  if (!element) return;
  
  const wasOpen = element.classList.contains("open");
  
  // Close others in same container
  element.parentElement.querySelectorAll(".notes-card").forEach(card => card.classList.remove("open"));
  
  if (!wasOpen) {
    element.classList.add("open");
  }
};

AppState.prototype.renderCSQuickQuiz = function() {
  const container = document.getElementById("cs-quick-quiz-container");
  if (!container) return;

  // Flatten sample questions from fundamentals data
  let allQuiz = [];
  CS_FUNDAMENTALS_DATA.forEach(sub => {
    sub.quiz.forEach(q => {
      allQuiz.push({
        topic: sub.topic,
        ...q
      });
    });
  });

  // Display only first 2 questions for layout compactness
  const subset = allQuiz.slice(0, 2);

  container.innerHTML = subset.map((q, idx) => `
    <div style="margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid var(--border-glass);">
      <span class="tag-badge" style="background-color: hsl(var(--bg-element)); font-size:10px; margin-bottom: 8px; display:inline-block;">${q.topic}</span>
      <p style="font-size: 13px; font-weight: 500; margin-bottom: 12px; line-height:1.4;">${q.question}</p>
      
      <div style="display:flex; flex-direction:column; gap:8px; margin-bottom:12px;">
        ${q.options.map((opt, oIdx) => `
          <button class="secondary-btn" style="text-align:left; padding:8px 12px; font-size:12px; border-radius: var(--radius-sm);" 
                  onclick="app.checkCSQuickQuizAnswer(${idx}, ${oIdx}, ${q.answerIndex}, this)">
            ${opt}
          </button>
        `).join('')}
      </div>
      
      <div id="cs-explanation-${idx}" style="display:none; font-size:12px; line-height:1.4; color:hsl(var(--text-secondary)); background:hsl(var(--bg-element)/0.5); padding:8px 12px; border-radius:var(--radius-sm); border-left: 3px solid hsl(var(--accent-primary));">
        <strong>Explanation:</strong> ${q.explanation}
      </div>
    </div>
  `).join('');
};

AppState.prototype.checkCSQuickQuizAnswer = function(qIdx, selectedIdx, correctIdx, btnElement) {
  const parent = btnElement.parentElement;
  
  // Disable all buttons in this block
  parent.querySelectorAll("button").forEach(btn => btn.disabled = true);
  
  if (selectedIdx === correctIdx) {
    btnElement.style.borderColor = "hsl(var(--color-success))";
    btnElement.style.color = "hsl(var(--color-success))";
    btnElement.style.backgroundColor = "hsl(var(--color-success) / 0.1)";
  } else {
    btnElement.style.borderColor = "hsl(var(--color-danger))";
    btnElement.style.color = "hsl(var(--color-danger))";
    btnElement.style.backgroundColor = "hsl(var(--color-danger) / 0.1)";
    
    // Highlight correct option
    const buttons = parent.querySelectorAll("button");
    buttons[correctIdx].style.borderColor = "hsl(var(--color-success))";
    buttons[correctIdx].style.color = "hsl(var(--color-success))";
  }

  // Display explanation block
  document.getElementById(`cs-explanation-${qIdx}`).style.display = "block";
  this.addActivity("Answered CS Fundamentals conceptual checkpoint", "purple");
};


// ----------------------------------------------------
// PREPARATION SUITE: HR INTERVIEW STAR STORY BUILDER
// ----------------------------------------------------
AppState.prototype.renderHRPrep = function() {
  const select = document.getElementById("hr-question-select");
  if (!select) return;

  select.innerHTML = HR_DATA.map((q, idx) => `
    <option value="${idx}">${q.category}: ${q.question}</option>
  `).join('');

  this.loadHRQuestion();
  this.renderSTARStoryBank();
};

AppState.prototype.loadHRQuestion = function() {
  const select = document.getElementById("hr-question-select");
  const idx = parseInt(select.value);
  this.activeHRIndex = idx;

  const hrItem = HR_DATA[idx];
  document.getElementById("hr-strategy-tip").innerText = hrItem.strategy;

  // Retrieve saved responses for this question index if existing
  const saved = JSON.parse(localStorage.getItem("star_stories") || "{}");
  const story = saved[hrItem.id];

  if (story) {
    document.getElementById("star-situation").value = story.s || "";
    document.getElementById("star-task").value = story.t || "";
    document.getElementById("star-action").value = story.a || "";
    document.getElementById("star-result").value = story.r || "";
  } else {
    document.getElementById("star-situation").value = "";
    document.getElementById("star-task").value = "";
    document.getElementById("star-action").value = "";
    document.getElementById("star-result").value = "";
  }

  this.updateSTARPreview();
};

AppState.prototype.updateSTARPreview = function() {
  const s = document.getElementById("star-situation").value || "Not yet defined...";
  const t = document.getElementById("star-task").value || "Not yet defined...";
  const a = document.getElementById("star-action").value || "Not yet defined...";
  const r = document.getElementById("star-result").value || "Not yet defined...";

  document.getElementById("preview-s").innerHTML = s.replace(/\n/g, '<br>');
  document.getElementById("preview-t").innerHTML = t.replace(/\n/g, '<br>');
  document.getElementById("preview-a").innerHTML = a.replace(/\n/g, '<br>');
  document.getElementById("preview-r").innerHTML = r.replace(/\n/g, '<br>');

  const hrItem = HR_DATA[this.activeHRIndex];
  document.getElementById("star-preview-title").innerText = `STAR Preview: "${hrItem.question}"`;
};

AppState.prototype.saveSTARStory = function() {
  const s = document.getElementById("star-situation").value;
  const t = document.getElementById("star-task").value;
  const a = document.getElementById("star-action").value;
  const r = document.getElementById("star-result").value;

  if (!s || !t || !a || !r) {
    alert("Please fill in all S-T-A-R columns to complete the behavioral interview framework.");
    return;
  }

  const hrItem = HR_DATA[this.activeHRIndex];
  const saved = JSON.parse(localStorage.getItem("star_stories") || "{}");
  
  saved[hrItem.id] = { s, t, a, r, timestamp: new Date().toLocaleDateString() };
  localStorage.setItem("star_stories", JSON.stringify(saved));

  alert(`Behavioral STAR response saved successfully for Question: "${hrItem.question}"`);
  this.addActivity("Saved behavioral interview answer story", "purple");
  this.renderSTARStoryBank();
};

AppState.prototype.renderSTARStoryBank = function() {
  const container = document.getElementById("star-saved-bank-list");
  if (!container) return;

  const saved = JSON.parse(localStorage.getItem("star_stories") || "{}");
  const keys = Object.keys(saved);

  if (keys.length === 0) {
    container.innerHTML = "No stories saved yet. Fill the STAR inputs above and click 'Save Story' to add details to your browser database.";
    return;
  }

  container.innerHTML = keys.map(key => {
    const hrItem = HR_DATA.find(q => q.id === key);
    if (!hrItem) return '';
    return `
      <div style="background-color:hsl(var(--bg-element)); padding:10px 14px; border-radius: var(--radius-sm); display:flex; justify-content:space-between; align-items:center;">
        <div>
          <strong style="color:white; display:block;">${hrItem.question}</strong>
          <span style="font-size:11px; color:hsl(var(--text-muted));">Saved: ${saved[key].timestamp}</span>
        </div>
        <button class="secondary-btn" style="padding:4px 10px; font-size:11px;" onclick="app.loadSavedHRStory('${key}')">Load</button>
      </div>
    `;
  }).join('');
};

AppState.prototype.loadSavedHRStory = function(qId) {
  const idx = HR_DATA.findIndex(q => q.id === qId);
  if (idx === -1) return;

  const select = document.getElementById("hr-question-select");
  select.value = idx.toString();
  this.loadHRQuestion();
};


// ----------------------------------------------------
// COMPANY HIRING GUIDES DIRECTORY
// ----------------------------------------------------
AppState.prototype.renderCompanies = function() {
  const container = document.getElementById("companies-cards-container");
  if (!container) return;

  container.innerHTML = COMPANY_DATA.map(comp => `
    <div class="glass-card" style="display:flex; justify-content:space-between; align-items:center; cursor:pointer;" onclick="app.loadCompanyDetail('${comp.slug}')">
      <div style="display:flex; align-items:center; gap:16px;">
        <div class="company-logo-placeholder" style="background-color: ${comp.logoBg}; width:48px; height:48px; border-radius: var(--radius-md); font-size: 20px;">
          ${comp.name[0]}
        </div>
        <div>
          <h4 style="font-size: 16px; font-weight:700;">${comp.name}</h4>
          <span style="font-size: 12px; color:hsl(var(--text-muted));">Salary: ${comp.salaryAvg}</span>
        </div>
      </div>
      <span class="diff-badge ${comp.difficulty.toLowerCase()}">${comp.difficulty}</span>
    </div>
  `).join('');
};

AppState.prototype.loadCompanyDetail = function(slug) {
  const comp = COMPANY_DATA.find(c => c.slug === slug);
  if (!comp) return;

  const container = document.getElementById("company-detail-card");
  container.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; border-bottom:1px solid var(--border-glass); padding-bottom:16px;">
      <div style="display:flex; align-items:center; gap:16px;">
        <div class="company-logo-placeholder" style="background-color: ${comp.logoBg}; width:56px; height:56px; font-size: 24px;">
          ${comp.name[0]}
        </div>
        <div>
          <h2 style="font-size: 22px; font-weight: 800;">${comp.name} Hiring Process</h2>
          <span style="color: hsl(var(--text-secondary)); font-size:14px;">Difficulty Rating: <strong class="diff-badge ${comp.difficulty.toLowerCase()}" style="font-size:11px;">${comp.difficulty}</strong></span>
        </div>
      </div>
      <span style="font-size:16px; font-weight:700; color:hsl(var(--color-success));">${comp.salaryAvg}</span>
    </div>

    <h3 style="font-size: 16px; margin-bottom: 8px;">Process Overview</h3>
    <p style="color: hsl(var(--text-secondary)); font-size:14px; line-height:1.6; margin-bottom:24px;">${comp.overview}</p>

    <h3 style="font-size: 16px; margin-bottom: 16px;">Interview Rounds Flow</h3>
    <div class="company-timeline" style="margin-bottom:28px;">
      ${comp.rounds.map(r => `
        <div class="timeline-stage">
          <div class="timeline-dot"></div>
          <div class="stage-card">
            <h4 class="stage-title">${r.name}</h4>
            <p class="stage-desc">${r.details}</p>
          </div>
        </div>
      `).join('')}
    </div>

    <h3 style="font-size: 16px; margin-bottom: 12px;">Top Interview Preparation Tips</h3>
    <div style="background: hsl(var(--bg-element)/0.3); border:1px solid var(--border-glass); border-radius: var(--radius-md); padding:16px;">
      <ul style="color: hsl(var(--text-secondary)); font-size:14px; line-height:1.6; padding-left:20px;">
        ${comp.tips.map(t => `<li style="margin-bottom:6px;">${t}</li>`).join('')}
      </ul>
    </div>
  `;
};
