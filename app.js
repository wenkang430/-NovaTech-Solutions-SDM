
"use strict";
// Local SVG navigation icons; no external icon library required.
const NAV_ICONS = {
  "overview": "<rect x=\"3\" y=\"3\" width=\"7\" height=\"9\" rx=\"1\"/><rect x=\"14\" y=\"3\" width=\"7\" height=\"5\" rx=\"1\"/><rect x=\"14\" y=\"12\" width=\"7\" height=\"9\" rx=\"1\"/><rect x=\"3\" y=\"16\" width=\"7\" height=\"5\" rx=\"1\"/>",
  "notifications": "<path d=\"M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4\"/>",
  "requests": "<rect x=\"5\" y=\"4\" width=\"14\" height=\"17\" rx=\"2\"/><rect x=\"9\" y=\"2\" width=\"6\" height=\"4\" rx=\"1\"/><path d=\"M9 10h6M9 14h6M9 18h4\"/>",
  "proposals": "<path d=\"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M8 15l3 3 5-5\"/>",
  "projects": "<path d=\"M3 7V5a2 2 0 0 1 2-2h5l2 3h7a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM8 11v6M12 11v3M16 11v5\"/>",
  "milestones": "<path d=\"M5 22V3m0 1c5-5 9 4 15 0v12c-6 4-10-5-15 0\"/>",
  "messages": "<rect x=\"3\" y=\"5\" width=\"18\" height=\"14\" rx=\"2\"/><path d=\"m3 7 9 6 9-6\"/>",
  "changes": "<circle cx=\"6\" cy=\"5\" r=\"2\"/><circle cx=\"6\" cy=\"19\" r=\"2\"/><circle cx=\"18\" cy=\"19\" r=\"2\"/><path d=\"M6 7v10M18 17V8l-4-4m0 4V4h4\"/>",
  "meetings": "<rect x=\"3\" y=\"5\" width=\"18\" height=\"16\" rx=\"2\"/><path d=\"M16 3v4M8 3v4M3 10h18M8 14h2m4 0h2m-8 3h2\"/>",
  "documents": "<path d=\"M3 7V5a2 2 0 0 1 2-2h5l2 3h7a2 2 0 0 1 2 2v2M3 7v12a2 2 0 0 0 2 2h13l4-11H7L3 19\"/>",
  "payments": "<rect x=\"3\" y=\"5\" width=\"18\" height=\"15\" rx=\"2\"/><path d=\"M3 8V5l14-3v3M16 11h5v5h-5a2.5 2.5 0 0 1 0-5z\"/>",
  "feedback": "<path d=\"M21 11a8 8 0 0 1-8 8H8l-5 3v-7a8 8 0 0 1 8-12h2a8 8 0 0 1 8 8zM8 10h8M8 14h5\"/>",
  "tasks": "<rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"3\"/><path d=\"m7 12 3 3 7-7\"/>",
  "schedule": "<rect x=\"3\" y=\"5\" width=\"18\" height=\"16\" rx=\"2\"/><path d=\"M8 3v4M16 3v4M3 10h18M7 14h10M7 17h6\"/>",
  "issues": "<path d=\"M12 3 2 20h20L12 3zM12 9v5M12 17h.01\"/>",
  "staff": "<circle cx=\"9\" cy=\"8\" r=\"3\"/><path d=\"M3 21v-3a6 6 0 0 1 12 0v3M16 5a3 3 0 0 1 0 6M21 21v-3a5 5 0 0 0-4-5\"/>",
  "supplierAssignments": "<rect x=\"2\" y=\"5\" width=\"20\" height=\"15\" rx=\"2\"/><path d=\"M8 5V3h8v2M2 11h20M10 11v3h4v-3\"/>",
  "reports": "<path d=\"M3 3v18h18M7 16v-4M12 16V7M17 16V4\"/>",
  "supplierPayments": "<rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\"/><path d=\"M16 8h-6a2 2 0 0 0 0 4h4a2 2 0 0 1 0 4H8M12 6v12\"/>",
  "registration": "<path d=\"M3 21h18M5 21V3h14v18M9 7h1m4 0h1M9 11h1m4 0h1M10 21v-5h4v5\"/>",
  "suppliers": "<rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\"/><circle cx=\"12\" cy=\"9\" r=\"3\"/><path d=\"M6 18a6 6 0 0 1 12 0\"/>",
  "users": "<circle cx=\"9\" cy=\"8\" r=\"3\"/><path d=\"M3 21v-3a6 6 0 0 1 12 0v3M17 7h4M19 5v4\"/>",
  "settings": "<circle cx=\"12\" cy=\"12\" r=\"3\"/><path d=\"m10 2-.6 3-2 .9-2.6-1.5-2.4 4.2 2.5 1.8v3.2l-2.5 1.8 2.4 4.2 2.6-1.5 2 .9.6 3h4l.6-3 2-.9 2.6 1.5 2.4-4.2-2.5-1.8v-3.2l2.5-1.8-2.4-4.2-2.6 1.5-2-.9L14 2z\"/>",
  "account": "<circle cx=\"12\" cy=\"8\" r=\"4\"/><path d=\"M4 21v-2a8 8 0 0 1 16 0v2\"/>"
};
function navIcon(key) {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${NAV_ICONS[key] || NAV_ICONS.overview}</svg>`;
}


const $ = id => document.getElementById(id);
const esc = v => String(v ?? "").replace(/[&<>"']/g,c=>({
  "&":"&amp;","<":"&lt;",">":"&gt;",
  '"':"&quot;","'":"&#39;"
}[c]));
const money = v => "RM "+Number(v||0).toLocaleString("en-MY",{
  minimumFractionDigits:2,maximumFractionDigits:2
});
const n = v => Number(v)||0;
const dateNow = () => new Date().toISOString();

let db = loadData();
let me = null;
let page = "overview";
let modalAction = null;
let toastTimer;

const user = id => db.users.find(x=>x.id===Number(id));
const project = id => db.projects.find(x=>x.id===Number(id));
const supplier = id => db.suppliers.find(x=>x.id===Number(id));
const assignment = id => db.supplierAssignments.find(x=>x.id===Number(id));
const uname = id => user(id)?.name || "Unknown";
const pname = id => project(id)?.title || "Unknown Project";
const role = (...r) => r.includes(me?.role);
const allowed = p => MENUS[me?.role]?.some(x=>x[0]===p) && !((db.settings?.disabled?.[me.role]||[]).includes(p));

function notify(userId,title,message,target="notifications") {
  if (!user(userId)) return;
  db.notifications.unshift({
    id:nextId(db.notifications),
    userId:Number(userId),title,message,target,
    read:false,date:dateNow()
  });
}
function notifyRole(r,title,message,target) {
  db.users.filter(u=>u.role===r && u.active!==false)
    .forEach(u=>notify(u.id,title,message,target));
}
function unread() {
  return db.notifications.filter(x=>x.userId===me.id&&!x.read).length;
}
function toast(s) {
  clearTimeout(toastTimer);
  $("toast").textContent=s;
  $("toast").classList.remove("hidden");
  toastTimer=setTimeout(()=>$("toast").classList.add("hidden"),3500);
}
function save(message="") {
  if(message) recordActivity(db,me.id,message);
  saveData(db);
  render();
  if(message) toast(message);
}
function badge(s) {
  s=String(s||"Unknown");
  const good=["Approved","Accepted","Completed","Paid","Active"];
  const bad=["Rejected","Cancelled","Declined","Closed"];
  const color=good.includes(s)?"success":
    bad.includes(s)?"danger":
    /Pending|Awaiting|In Progress|Scheduled|Submitted/.test(s)
      ?"warning":"info";
  return `<span class="badge ${color}">${esc(s)}</span>`;
}
function btn(label,action,id="",style="primary") {
  return `<button type="button" class="btn small ${style}"
    data-action="${esc(action)}" data-id="${esc(id)}">${esc(label)}</button>`;
}
function field(label,name,type="text",value="",extra="") {
  return `<label>${esc(label)}<input type="${esc(type)}"
    name="${esc(name)}" value="${esc(value)}" ${extra} required></label>`;
}
function optional(label,name,type="text",value="") {
  return `<label>${esc(label)}<input type="${esc(type)}"
    name="${esc(name)}" value="${esc(value)}"></label>`;
}
function area(label,name,value="") {
  return `<label>${esc(label)}<textarea name="${esc(name)}"
    required>${esc(value)}</textarea></label>`;
}
function select(label,name,items,selected="") {
  return `<label>${esc(label)}<select name="${esc(name)}" required>
    ${items.map(([v,t])=>`<option value="${esc(v)}"
    ${String(v)===String(selected)?"selected":""}>${esc(t)}</option>`).join("")}
    </select></label>`;
}
function modal(title,body,callback,submit="Save") {
  $("modalTitle").textContent=title;
  $("modalBody").innerHTML=body;
  $("modalSubmit").textContent=submit;
  modalAction=callback;
  $("modalOverlay").classList.remove("hidden");
}
function closeModal() {
  $("modalOverlay").classList.add("hidden");
  $("modalForm").reset();
  modalAction=null;
}
function finish(s) {closeModal();save(s);}
function heading(title,subtitle="",actions="") {
  $("pageTitle").textContent=title;
  $("pageSubtitle").textContent=subtitle;
  $("pageEyebrow").textContent="YOUR WORKSPACE";
  $("breadcrumbPage").textContent=title;
  $("pageActions").innerHTML=actions;
}
function empty(title="No records yet",desc="Nothing to display.") {
  return `<div class="empty"><h3>${esc(title)}</h3><p>${esc(desc)}</p></div>`;
}
function panel(title,body) {
  return `<section class="panel"><div class="panel-head">
    <h3>${esc(title)}</h3></div>${body}</section>`;
}
function table(headers,rows) {
  if(!rows.length)return empty();
  return `<div class="table-wrap"><table><thead><tr>
    ${headers.map(h=>`<th>${esc(h)}</th>`).join("")}
    </tr></thead><tbody>${rows.map(row=>`<tr>
    ${row.map(c=>`<td>${c}</td>`).join("")}
    </tr>`).join("")}</tbody></table></div>`;
}
function stat(label,value,icon="◈") {
  return `<div class="stat"><span class="stat-icon">${icon}</span>
    <small>${esc(label)}</small><h2>${esc(value)}</h2></div>`;
}
function progress(value) {
  const p=Math.max(0,Math.min(100,n(value)));
  return `<div class="progress-track"><div class="progress-fill"
    style="width:${p}%"></div></div>
    <div class="progress-caption"><span>Progress</span><b>${p}%</b></div>`;
}
function ownProjects() {
  if(role("client"))return db.projects.filter(p=>p.clientId===me.id);
  if(role("manager"))return db.projects.filter(p=>p.managerId===me.id);
  if(role("developer")) {
    const ids=new Set(db.tasks.filter(t=>t.assigneeId===me.id)
      .map(t=>t.projectId));
    return db.projects.filter(p=>ids.has(p.id));
  }
  return db.projects;
}
function canProject(id) {return ownProjects().some(p=>p.id===Number(id));}
function ownRequests() {
  return role("client")?db.requests.filter(r=>r.clientId===me.id):db.requests;
}
function ownProposals() {
  if(role("client")) {
    const ids=new Set(ownRequests().map(r=>r.id));
    return db.proposals.filter(p=>ids.has(p.requestId));
  }
  if(role("manager"))return db.proposals.filter(p=>p.managerId===me.id);
  return db.proposals;
}
function ownSupplier() {return db.suppliers.find(s=>s.userId===me.id);}
function ownAssignments() {
  if(role("supplier")) {
    const s=ownSupplier();
    return s?db.supplierAssignments.filter(a=>a.supplierId===s.id):[];
  }
  if(role("manager"))return db.supplierAssignments.filter(a=>
    canProject(a.projectId));
  return db.supplierAssignments;
}
function ownStatements() {
  const s=ownSupplier();
  return s?db.supplierPayments.filter(x=>x.supplierId===s.id):[];
}
function activeAssignment(a) {
  return ["Active","Pending Supplier Approval"].includes(a.status);
}
function reservedCapacity(sid) {
  return db.supplierAssignments.filter(a=>
    a.supplierId===Number(sid)&&activeAssignment(a)
  ).reduce((sum,a)=>sum+n(a.quantity),0);
}
function availableCapacity(s) {
  return Math.max(0,n(s.capacity)-reservedCapacity(s.id));
}
function allocatedMonthlyCost(projectId) {
  return db.supplierAssignments.filter(a=>
    a.projectId===Number(projectId)&&activeAssignment(a)
  ).reduce((sum,a)=>sum+n(a.monthlyCost),0);
}
function participants(projectId) {
  const p=project(projectId);
  if(!p)return [];
  const ids=new Set([p.clientId,p.managerId]);
  db.tasks.filter(t=>t.projectId===p.id).forEach(t=>ids.add(t.assigneeId));
  return [...ids].map(user).filter(u=>u&&u.active!==false);
}
function canMeeting(m) {
  return role("client","manager")?canProject(m.projectId):
    role("developer")&&db.meetingInvitations.some(i=>
      i.meetingId===m.id&&i.userId===me.id);
}
function updateProjectProgress(p) {
  const tasks=db.tasks.filter(t=>t.projectId===p.id);
  if(!tasks.length){p.progress=0;return;}
  p.progress=Math.round(100*tasks.filter(t=>
    t.status==="Completed").length/tasks.length);
}
function projectReady(p) {
  const tasks=db.tasks.filter(t=>t.projectId===p.id);
  return tasks.length>0&&tasks.every(t=>t.status==="Completed")&&
    db.milestones.filter(m=>m.projectId===p.id).every(m=>m.status==="Completed")&&
    db.issues.filter(i=>i.projectId===p.id).every(i=>i.status==="Resolved");
}
function closeProject(p) {
  p.status="Accepted";
  p.reviewStatus="Accepted";
  p.acceptedDate=todayISO();
  // Final acceptance is only possible when all required work is completed.
  updateProjectProgress(p);
  p.progress=100;

  db.supplierAssignments.filter(a=>
    a.projectId===p.id&&activeAssignment(a)
  ).forEach(a=>{
    const old=a.status;
    a.status="Closed";
    a.endDate=todayISO();
    a.closeReason="Project accepted by client";
    notify(supplier(a.supplierId)?.userId,
      "Supplier assignment closed",
      `${p.title}: Your ${a.service} assignment has ended.`,"supplierAssignments");
    if(old==="Pending Supplier Approval")a.closeReason="Project closed before supplier acceptance";
  });

  db.meetings.filter(m=>m.projectId===p.id&&m.status==="Scheduled")
    .forEach(m=>{
      m.status="Project Closed";m.closedReason="Project accepted by client";
      db.meetingInvitations.filter(i=>i.meetingId===m.id).forEach(i=>
        notify(i.userId,"Meeting closed",
          `${m.title} was ${m.status.toLowerCase()} because the project ended.`,
          "meetings"));
    });

  // Final amount is based on the approved project budget,
  // less payments already created for the project.
  const invoiced=db.payments.filter(x=>
    x.projectId===p.id&&x.paymentType!=="final"
  ).reduce((sum,x)=>sum+n(x.amount),0);
  const existing=db.payments.some(x=>
    x.projectId===p.id&&x.paymentType==="final"
  );
  const finalAmount=Math.max(0,Math.round((n(p.budget)-invoiced)*100)/100);
  if(!existing&&finalAmount>0) {
    db.payments.push({
      id:nextId(db.payments),projectId:p.id,clientId:p.clientId,
      title:"Final Project Balance",paymentType:"final",
      amount:finalAmount,status:"Pending",date:todayISO()
    });
    notify(p.clientId,"Final payment due",
      `${p.title}: ${money(finalAmount)} is now due.`,"payments");
    notifyRole("finance","Final invoice created",
      `${p.title}: ${money(finalAmount)} is due.`,"payments");
  }

  notify(p.managerId,"Project accepted",
    `${p.title} has been accepted by the client.`,"projects");
  notifyRole("management","Project completed",
    `${p.title} has been accepted.`,"projects");
}
function closeSidebar() {
  $("sidebar").classList.remove("open");
  $("mobileOverlay").classList.add("hidden");
}
function navigate(p) {
  if(!allowed(p))return;
  page=p;closeSidebar();render();
}
function logout() {
  me=null;sessionStorage.removeItem(SESSION_KEY);
  $("loginForm").reset();
  closeSidebar();
  showScreen("loginScreen");
}
function showScreen(id) {
  ["loginScreen","registerScreen","appScreen"].forEach(x=>
    $(x).classList.toggle("hidden",x!==id));
}
function initials(s) {
  return String(s||"N").split(/\s+/).slice(0,2)
    .map(x=>x[0]||"").join("").toUpperCase();
}

/* LOGIN AND REGISTRATION */

function setupAuth() {
  const demos=[
    ["Client","client@demo.com"],["Manager","manager@demo.com"],
    ["Developer","developer@demo.com"],["Finance","finance@demo.com"],
    ["Supplier","supplier@demo.com"],["Management","management@demo.com"],
    ["Admin","admin@demo.com"]
  ];
  $("demoAccounts").innerHTML=demos.map(([name,email])=>
    `<button type="button" data-demo="${email}">${name}</button>`).join("");
  $("demoAccounts").onclick=e=>{
    const b=e.target.closest("[data-demo]");
    if(!b)return;
    $("loginEmail").value=b.dataset.demo;
    $("loginPassword").value="123456";
  };
  $("showRegister").onclick=()=>showScreen("registerScreen");
  $("backToLogin").onclick=()=>showScreen("loginScreen");
  $("registerBackTop").onclick=()=>showScreen("loginScreen");
  function syncAccountType() {
    const selected=$("regRole").value;
    document.querySelectorAll("[data-account-role]").forEach(button=>{
      const active=button.dataset.accountRole===selected;
      button.classList.toggle("is-selected",active);
      button.setAttribute("aria-pressed",String(active));
    });
    $("supplierNotice").classList.toggle("hidden",selected!=="supplier");
  }
  document.querySelectorAll("[data-account-role]").forEach(button=>{
    button.addEventListener("click",()=>{
      $("regRole").value=button.dataset.accountRole;
      syncAccountType();
    });
  });
  $("regRole").onchange=syncAccountType;
  syncAccountType();

  $("loginForm").onsubmit=e=>{
    e.preventDefault();db=loadData();
    const email=$("loginEmail").value.trim().toLowerCase();
    const u=db.users.find(x=>x.email.toLowerCase()===email&&
      x.password===$("loginPassword").value&&x.active!==false);
    if(!u||!MENUS[u.role]) {
      $("loginError").textContent="Invalid credentials or inactive account.";
      return;
    }
    $("loginError").textContent="";
    me=u;page="overview";
    sessionStorage.setItem(SESSION_KEY,String(u.id));
    showScreen("appScreen");render();
    const count=unread();
    if(count)toast(`You have ${count} unread notification(s).`);
  };

  $("registerForm").onsubmit=e=>{
    e.preventDefault();
    const name=$("regName").value.trim();
    const email=$("regEmail").value.trim().toLowerCase();
    const pass=$("regPassword").value;
    const r=$("regRole").value;
    const error=$("registerError");
    error.textContent="";
    if(!["client","supplier"].includes(r)||name.length<2||
      pass.length<8||pass!==$("regConfirm").value) {
      error.textContent="Check your details and password (minimum 8 characters).";
      return;
    }
    db=loadData();
    if(db.users.some(u=>u.email.toLowerCase()===email)) {
      error.textContent="Email already registered.";return;
    }
    const u={id:nextId(db.users),name,email,password:pass,role:r,active:true};
    db.users.push(u);saveData(db);
    $("registerForm").reset();
    syncAccountType();
    $("loginEmail").value=email;
    showScreen("loginScreen");toast("Account registered. Please sign in.");
  };

  $("logoutBtn").onclick=logout;
  $("menuToggle").onclick=()=>{
    $("sidebar").classList.toggle("open");
    $("mobileOverlay").classList.toggle("hidden",
      !$("sidebar").classList.contains("open"));
  };
  $("mobileOverlay").onclick=closeSidebar;
  $("closeModal").onclick=closeModal;
  $("cancelModal").onclick=closeModal;
  $("modalOverlay").onclick=e=>{
    if(e.target===$("modalOverlay"))closeModal();
  };
  $("modalForm").onsubmit=e=>{
    e.preventDefault();
    if(modalAction)Promise.resolve(modalAction(Object.fromEntries(new FormData(e.target).entries()))).catch(err=>toast(err.name==="QuotaExceededError"?"Browser storage full. Use smaller files.":err.message));
  };
  $("sideNav").onclick=e=>{
    const b=e.target.closest("[data-page]");
    if(b)navigate(b.dataset.page);
  };
  $("pageContent").onclick=handleAction;
  $("pageActions").onclick=handleAction;

  const id=Number(sessionStorage.getItem(SESSION_KEY));
  me=db.users.find(u=>u.id===id&&u.active!==false&&MENUS[u.role])||null;
  if(me){showScreen("appScreen");render();}
  else showScreen("loginScreen");
}

/* MAIN RENDER */

function render() {
  if(!me)return;
  db=loadData();
  const expired=expireProposals();
  const billed=generateDueStatements();
  if(expired||billed)saveData(db);
  me=db.users.find(u=>u.id===me.id&&u.active!==false)||null;
  if(!me){logout();return;}
  if(!allowed(page))page="overview";
  meetingReminderScan();

  $("sideUserName").textContent=me.name;
  $("sideUserRole").textContent=ROLES[me.role];
  $("sideAvatar").textContent=initials(me.name);
  $("topAvatar").textContent=initials(me.name);
  $("todayDate").textContent=new Date().toLocaleDateString("en-MY",{
    day:"numeric",month:"short",year:"numeric"
  });

  const count=unread();
  $("sideNav").innerHTML=MENUS[me.role].filter(([key])=>allowed(key)).map(([key,label,icon])=>
    `<button class="nav-item ${page===key?"active":""}" data-page="${key}">
      <span class="nav-icon" aria-hidden="true">${navIcon(key)}</span>${esc(label)}
      ${key==="notifications"&&count?
        `<span class="badge warning" style="margin-left:auto">${count}</span>`:""}
    </button>`).join("");

  const views={
    account:renderAccount,settings:renderSettings,schedule:renderSchedule,milestones:renderMilestones,issues:renderIssues,messages:renderMessages,staff:renderStaff,
    overview:renderOverview,notifications:renderNotifications,
    requests:renderRequests,proposals:renderProposals,
    projects:renderProjects,tasks:renderTasks,
    supplierAssignments:renderSupplierAssignments,
    changes:renderChanges,meetings:renderMeetings,
    documents:renderDocuments,payments:renderPayments,
    registration:renderRegistration,suppliers:renderSuppliers,
    supplierPayments:renderSupplierPayments,
    feedback:renderFeedback,users:renderUsers,reports:renderReports
  };
  views[page]();
}

/* DASHBOARD AND NOTIFICATIONS */

function renderOverview() {
  heading(`Welcome back, ${me.name.split(" ")[0]} 👋`,
    `${ROLES[me.role]} workspace`,
    btn(`Notifications (${unread()})`,"goNotifications","","outline"));

  const mine=ownProjects();
  const items=[
    ["Projects",mine.length,"▣"],
    ["Unread Alerts",unread(),"♧"],
    ["Open Meetings",db.meetings.filter(m=>m.status==="Scheduled"&&
      canMeeting(m)).length,"▦"],
    ["Active Tasks",db.tasks.filter(t=>
      (role("developer")?t.assigneeId===me.id:
       role("manager")?canProject(t.projectId):false)&&
      !["Completed","Closed"].includes(t.status)).length,"☑"]
  ];

  const recent=db.notifications.filter(x=>x.userId===me.id)
    .slice(0,5).map(x=>`<div class="activity-item">
      <span class="activity-dot"></span><div>
      <strong>${esc(x.title)}</strong><p>${esc(x.message)}</p>
      <small>${esc(x.date.slice(0,10))}</small></div></div>`).join("");

  const cards=mine.slice(0,4).map(p=>`<div class="card">
    <div class="card-top"><h3>${esc(p.title)}</h3>${badge(p.status)}</div>
    ${progress(p.progress)}</div>`).join("");

  $("pageContent").innerHTML=`
    <div class="stats">${items.map(x=>stat(...x)).join("")}</div>
    <div class="cards">
      ${panel("My Projects",cards||empty())}
      ${panel("Recent Notifications",recent||empty("No notifications"))}
    </div>`;
}

function renderNotifications() {
  heading("Notifications","New actions and updates for your account.",
    btn("Mark All Read","readAll","","outline"));
  const records=db.notifications.filter(x=>x.userId===me.id);
  const rows=records.map(x=>[
    `<strong>${esc(x.title)}</strong><span class="subtext">
    ${esc(x.message)}</span>`,
    esc(x.date.slice(0,16).replace("T"," ")),
    badge(x.read?"Read":"Unread"),
    `<div class="actions">
      ${!x.read?btn("Mark Read","readNotification",x.id,"outline"):""}
      ${allowed(x.target)?btn("Open","openNotification",x.id):""}
    </div>`
  ]);
  $("pageContent").innerHTML=panel("Notification Center",
    table(["Notification","Date","Status","Action"],rows));
}

/* Read-only detail dialogs: information is not editable from these views. */
function detailRecord(title,fields){
 const body=fields.map(([label,value])=>`<div class="detail-line"><strong>${esc(label)}</strong><div class="detail-value">${esc(value===undefined||value===null||value===''?'—':String(value))}</div></div>`).join('');
 modal(title,`<div class="record-detail">${body}</div>`,()=>closeModal(),'Close');
}
function viewRequest(id){const r=db.requests.find(x=>x.id===id);if(!r||!ownRequests().some(x=>x.id===id))return;
 detailRecord('Project request — '+r.title,[['Client',uname(r.clientId)],['Title',r.title],['Requirements',r.description],['Objectives',r.objectives],['Required Features',r.features],['Estimated Budget',money(r.budget)],['Expected Completion',r.expectedCompletion],['Status',r.status]]);}
function viewProposal(id){const p=db.proposals.find(x=>x.id===id);if(!p||!ownProposals().some(x=>x.id===id))return;
 detailRecord('Proposal — '+p.title,[['Title',p.title],['Quotation',money(p.amount)],['Duration',p.duration],['Proposal Expiry',p.expiryDate],['Project Schedule',p.schedule],['Deliverables',p.deliverables],['Terms and Conditions',p.terms],['Scope of Work',p.details],['Status',p.status]]);}
function viewIssue(id){const i=db.issues.find(x=>x.id===id);if(!i||!canProject(i.projectId))return;
 detailRecord('Issue — '+i.title,[['Project',pname(i.projectId)],['Description',i.description],['Severity',i.severity],['Status',i.status],['Reported By',uname(i.reportedBy)],['Resolution',i.resolution],['Resolved By',i.resolvedBy?uname(i.resolvedBy):'—'],['Resolved Date',i.resolvedDate]]);}
function viewMessage(id){const m=db.messages.find(x=>x.id===id);if(!m||!canProject(m.projectId)||(m.from!==me.id&&m.to!==me.id))return;
 detailRecord('Message — '+m.subject,[['Project',pname(m.projectId)],['From',uname(m.from)],['To',uname(m.to)],['Subject',m.subject],['Message',m.body],['Sent',m.date]]);}
function replyMessage(id){const m=db.messages.find(x=>x.id===id);if(!m||!canProject(m.projectId)||(m.from!==me.id&&m.to!==me.id))return;
 const recipient=m.from===me.id?m.to:m.from;const pr=project(m.projectId);
 modal('Reply to '+uname(recipient),`<div class="notice">Regarding: ${esc(m.subject)}</div>`+area('Reply','body'),v=>{
 if(!v.body.trim())return toast('Enter a reply.');
 const msg={id:nextId(db.messages),projectId:m.projectId,from:me.id,to:recipient,subject:m.subject.startsWith('Re:')?m.subject:'Re: '+m.subject,body:v.body.trim(),replyTo:m.id,date:dateNow()};
 db.messages.unshift(msg);notify(recipient,'Reply received',`${pr?.title}: ${msg.subject}`,'messages');finish('Reply sent');},'Send Reply');}
function viewProject(id){const p=project(id);if(!p||!canProject(id))return;
 detailRecord('Project — '+p.title,[['Title',p.title],['Project Reference',p.reference||'Pending payment'],['Description / Scope',p.description],['Client',uname(p.clientId)],['Project Manager',uname(p.managerId)],['Approved Project Budget',money(p.budget)],['Supplier Monthly Allocation Cap',money(p.supplierMonthlyBudget)],['Start Date',p.startDate],['Deadline',p.deadline||db.requests.find(r=>r.id===p.requestId)?.expectedCompletion],['Progress',p.progress+'%'],['Delivery Review',p.reviewStatus],['Status',p.status],['Cancellation Status',p.cancellation?.status||'None'],['Cancellation Requested By',p.cancellation?.requestedBy?uname(p.cancellation.requestedBy):'—'],['Cancellation Reason',p.cancellation?.reason||'—'],['Cancellation Decision Reason',p.cancellation?.decisionReason||'—'],['Cancellation Date',p.cancelledDate||'—']]);}
function viewTask(id){const t=db.tasks.find(x=>x.id===id);if(!t||!canProject(t.projectId))return;
 detailRecord('Task — '+t.title,[['Project',pname(t.projectId)],['Developer',uname(t.assigneeId)],['Required Skill',t.requiredSkill],['Priority',t.priority],['Start Date',t.start],['Due Date',t.due],['Predecessor',db.tasks.find(x=>x.id===t.predecessor)?.title],['Progress',t.progress+'%'],['Status',t.status],['Manager Correction Advice',t.reviewReason||'No correction requested'],['Correction Date',t.reviewDate||'—']]);}
function viewSupplierAssignment(id){const a=assignment(id);if(!a||!ownAssignments().some(x=>x.id===id))return;
 const pr=project(a.projectId);detailRecord('Supplier assignment',[['Project',pname(a.projectId)],['Project Approved Budget',money(pr?.budget)],['Supplier Monthly Limit',money(pr?.supplierMonthlyBudget)],['Supplier',supplier(a.supplierId)?.company],['Service',a.service],['Quantity',a.quantity+' '+a.unit],['Agreed Monthly Unit Rate',money(a.rate)],['Monthly Cost (automatically calculated)',money(a.monthlyCost)],['Start Date',a.startDate],['Status',a.status],['Cancellation Reason',a.cancelReason],['Service End Reason',a.closeReason],['Service End Date',a.endDate]]);}
function viewMeeting(id){const m=db.meetings.find(x=>x.id===id);if(!m||!canMeeting(m))return;
 const inv=db.meetingInvitations.find(i=>i.meetingId===id&&i.userId===me.id);
 detailRecord('Meeting — '+m.title,[['Project',pname(m.projectId)],['Organizer',uname(m.createdBy)],['Date',m.date],['Time',m.time],['Agenda',m.notes],['Outcomes',m.outcomes],['Online Meeting URL',m.url],['My Invitation Status',inv?.status||'Organizer'],['My Decline Reason',inv?.reason],['Cancellation Reason',m.cancelReason],['Status',m.status]]);}
function viewChange(id){const c=db.changes.find(x=>x.id===id);if(!c||!canProject(c.projectId))return;
 detailRecord('Change request — '+c.title,[['Project',pname(c.projectId)],['Title',c.title],['Description',c.description],['Cost',money(c.cost)],['Delay (days)',c.delay],['Resource Impact',c.resources],['Evaluation',c.evaluation],['Status',c.status]]);}
/* PROJECT REQUESTS */

function renderRequests() {
  heading("Project Requests","Submit and review client requirements.",
    role("client")?btn("+ New Request","newRequest"):"");
  const rows=ownRequests().map(r=>[
    `<strong>${esc(r.title)}</strong><span class="subtext">
      ${esc(r.description)}</span>`,
    esc(uname(r.clientId)),money(r.budget),badge(r.status),
    role("manager")&&r.status==="Pending Review"?
      `<div class="actions">${btn("Accept","acceptRequest",r.id,"success")}
      ${btn("Reject","rejectRequest",r.id,"danger")}</div>`:
    role("manager")&&r.status==="Accepted"&&r.reviewedBy===me.id?
      btn("Create Proposal","newProposal",r.id):""
  ]);
  rows.forEach((row,i)=>{row[4]=btn("View Details","viewRequest",ownRequests()[i].id,"outline")+" "+row[4];});
  $("pageContent").innerHTML=panel("Request Register",
    table(["Request","Client","Budget","Status","Action"],rows));
}
function newRequest() {
  if(!role("client"))return;
  modal("New Project Request",
    field("Project Title","title")+
    area("Requirements","description")+
    field("Estimated Budget (RM)","budget","number","",
      'min="1" step="0.01"')+
    field("Expected Completion","expectedCompletion","date")+
    area("Project Objectives","objectives")+
    area("Required Features","features"),
    v=>{
      if(n(v.budget)<=0)return toast("Invalid budget.");
      db.requests.push({
        id:nextId(db.requests),clientId:me.id,title:v.title.trim(),
        description:v.description.trim(),budget:n(v.budget),
        objectives:v.objectives.trim(),features:v.features.trim(),
        expectedCompletion:v.expectedCompletion,
        status:"Pending Review",date:todayISO()
      });
      notifyRole("manager","New project request",
        `${me.name} submitted ${v.title}.`,"requests");
      finish("Request submitted");
    },"Submit Request");
}
function decideRequest(id,approve) {
  if(!role("manager"))return;
  const r=db.requests.find(x=>x.id===id);
  if(!r||r.status!=="Pending Review")return toast("Request unavailable.");
  if(!confirm(`${approve?"Accept":"Reject"} request?`))return;
  r.status=approve?"Accepted":"Rejected";
  r.reviewedBy=me.id;
  notify(r.clientId,"Project request reviewed",
    `${r.title}: ${r.status}.`,"requests");
  finishWithoutModal(`Request ${r.status.toLowerCase()}`);
}

/* PROPOSALS */

function renderProposals() {
  heading("Proposals","Project quotations, deadlines and client approval.",role("manager")?btn("+ Create Proposal","chooseProposalRequest"):"");
  const rows=ownProposals().map(p=>{
    const r=db.requests.find(x=>x.id===p.requestId);
    return [
      `<strong>${esc(p.title)}</strong><span class="subtext">${esc(p.details)}</span>
      <span class="subtext">Expires: ${esc(p.expiryDate||'Not set (legacy)')} | Deliverables: ${esc(p.deliverables||'—')}</span>`,
      money(p.amount),esc(p.duration),badge(p.status),
      role("client")&&r?.clientId===me.id&&
        p.status==="Pending Client Approval"?
        `<div class="actions">${btn("Approve","approveProposal",p.id,"success")}
        ${btn("Reject","rejectProposal",p.id,"danger")}</div>`:"—"
    ];
  });
  rows.forEach((row,i)=>{row[4]=btn("View Full Proposal","viewProposal",ownProposals()[i].id,"outline")+" "+row[4];});
  $("pageContent").innerHTML=panel("Proposal Register",
    table(["Proposal","Quotation","Duration","Status","Action"],rows));
}
function chooseProposalRequest(){if(!role('manager'))return;const rs=db.requests.filter(r=>r.status==='Accepted'&&r.reviewedBy===me.id);if(!rs.length)return toast('Accept a project request before creating its proposal.');modal('Choose accepted request',select('Accepted Request','requestId',rs.map(r=>[r.id,r.title])),v=>{closeModal();newProposal(Number(v.requestId));},'Continue');}
function newProposal(id) {
  if(!role("manager"))return;
  const r=db.requests.find(x=>x.id===id);
  if(!r||r.status!=="Accepted"||r.reviewedBy!==me.id)
    return toast("Accept request first.");
  modal("Create Proposal",
    field("Title","title","text",r.title)+
    field("Quotation (RM)","amount","number",r.budget,
      'min="1" step="0.01"')+
    field("Duration","duration")+
    field("Proposal Expiry","expiryDate","date",dateAfter(14))+
    area("Project Schedule","schedule")+
    area("Deliverables","deliverables")+
    area("Terms and Conditions","terms")+
    area("Scope of Work","details"),
    v=>{
      if(n(v.amount)<=0)return toast("Invalid quotation.");
      if(v.expiryDate<todayISO())return toast("Expiry must not be in the past.");
      db.proposals.push({
        id:nextId(db.proposals),requestId:r.id,managerId:me.id,
        title:v.title.trim(),amount:n(v.amount),
        duration:v.duration.trim(),details:v.details.trim(),
        expiryDate:v.expiryDate,schedule:v.schedule.trim(),
        deliverables:v.deliverables.trim(),terms:v.terms.trim(),
        status:"Pending Client Approval",date:todayISO()
      });
      r.status="Proposal Sent";
      notify(r.clientId,"Proposal awaiting approval",
        `${v.title}: ${money(v.amount)}.`,"proposals");
      finish("Proposal sent");
    },"Send Proposal");
}
function decideProposal(id,approve) {
  if(!role("client"))return;
  const p=db.proposals.find(x=>x.id===id);
  const r=db.requests.find(x=>x.id===p?.requestId);
  if(!p||!r||r.clientId!==me.id||
    p.status!=="Pending Client Approval")return toast("Unavailable.");
  if(expireProposals())saveData(db);if(p.status==="Expired"){render();return toast("Proposal has expired.");}
  if(!confirm(`${approve?"Approve":"Reject"} proposal?`))return;
  p.status=approve?"Approved":"Rejected";
  if(!approve){
    r.status="Rejected";
    notify(p.managerId,"Proposal rejected",p.title,"proposals");
    return save("Proposal rejected");
  }
  r.status="Awaiting Initial Payment";
  notify(r.clientId,'Initial deposit required',`${p.title}: please open Client Payments and submit the 30% initial deposit before work begins.`,'payments');
  const pr={
    id:nextId(db.projects),proposalId:p.id,requestId:r.id,
    title:p.title,description:p.details,
    clientId:me.id,managerId:p.managerId,
     budget:n(p.amount),baseBudget:n(p.amount),
     reference:"",
     supplierMonthlyBudget:n(p.amount),
    progress:0,status:"Awaiting Payment",
    reviewStatus:"Not Submitted",deadline:"",date:todayISO()
  };
  db.projects.push(pr);
  const amount=Math.round(n(p.amount)*30)/100;
  db.payments.push({
    id:nextId(db.payments),projectId:pr.id,clientId:me.id,
    title:"Initial Deposit (30%)",paymentType:"initial",
    amount,status:"Pending",date:todayISO()
  });
  notify(p.managerId,"Proposal approved",
    `${p.title} awaits initial payment.`,"projects");
  notifyRole("finance","Initial deposit created",
    `${p.title}: ${money(amount)}.`,"payments");
  save("Proposal approved");
}

/* PROJECT DELIVERY AND ACCEPTANCE */

function renderProjects() {
  heading("Projects","Delivery, review and final client acceptance.");
  const cards=ownProjects().map(p=>{
    let actions=p.status==="Accepted"?btn("Completion Record","completionRecord",p.id,"outline"):"";
    if(role("manager")&&p.managerId===me.id&&p.status==="In Progress"){
      actions+=btn("Project Settings","editProject",p.id,"outline")+" ";
      if(p.reviewStatus!=="Awaiting Client Acceptance") {
        if(projectReady(p)&&p.cancellation?.status!=="Pending Approval") actions+=btn("Submit Final Delivery","submitProject",p.id,"success");
        else actions+=`<span class="badge warning">Final submission unavailable: complete all tasks, milestones and issues first</span>`;
      }
    }
    if((role("client")&&p.clientId===me.id||role("manager")&&p.managerId===me.id)&&p.status==="In Progress"){
      if(p.cancellation?.status==="Pending Approval"){
        actions+=`<span class="badge warning">Cancellation requested by ${esc(uname(p.cancellation.requestedBy))}</span> `;
        if(p.cancellation.requestedBy!==me.id) actions+=btn("Review Cancellation","reviewProjectCancellation",p.id,"danger");
        else actions+=btn("Withdraw Cancellation Request","withdrawProjectCancellation",p.id,"outline");
      } else {
        actions+=btn("Request Cancellation","requestProjectCancellation",p.id,"danger");
      }
    }
    if(p.status==="Cancelled") actions+=btn("Cancellation Details","viewProject",p.id,"outline");
    if(role("client")&&p.clientId===me.id&&
      p.reviewStatus==="Awaiting Client Acceptance"){
      actions+=btn("Accept Delivery","acceptProject",p.id,"success")+" ";
      actions+=btn("Request Corrections","rejectProject",p.id,"danger");
    }
    return `<div class="card">
      <div class="card-top"><div><h3>${esc(p.title)}</h3>
      <p>${esc(p.description)}</p></div>${badge(p.status)}</div>
      ${progress(p.progress)}
      <div class="meta"><span>Client: ${esc(uname(p.clientId))}</span>
             <span>Reference: ${esc(p.reference||"Pending payment")}</span>
       <span>Budget: ${money(p.budget)}</span><span>Project Deadline: ${esc(p.deadline||db.requests.find(r=>r.id===p.requestId)?.expectedCompletion||"Not set")}</span>
      <span>Supplier monthly allocation cap: ${money(p.supplierMonthlyBudget)}</span>
      <span>Delivery review: ${esc(p.reviewStatus)}</span></div>
      <div class="card-actions">${btn("View Full Project","viewProject",p.id,"outline")} ${actions}</div></div>`;
  });
  $("pageContent").innerHTML=cards.length?
    `<div class="cards">${cards.join("")}</div>`:
    panel("Projects",empty());
}
function editProject(id) {
  const p=project(id);
  if(!role("manager")||p?.managerId!==me.id||
    p.status!=="In Progress")return toast("Cannot edit project.");
  modal("Project Settings",
    field("Title","title","text",p.title)+
    optional("Deadline","deadline","date",p.deadline)+
    field("Approved Supplier Monthly Budget (RM)",
      "supplierMonthlyBudget","number",p.supplierMonthlyBudget,
      'min="0" step="0.01"')+
    area("Description","description",p.description),
    v=>{
      const budget=n(v.supplierMonthlyBudget);
      if(budget<allocatedMonthlyCost(p.id))
        return toast("Budget is below existing supplier commitments.");
      if(budget>p.budget)
        return toast("Supplier monthly budget exceeds approved project budget.");
      p.title=v.title.trim();p.deadline=v.deadline;
      p.description=v.description.trim();
      p.supplierMonthlyBudget=budget;
      finish("Project settings updated");
    });
}
function submitProject(id) {
  const p=project(id);
  if(!role("manager")||p?.managerId!==me.id||
    p.status!=="In Progress")return toast("Project cannot be submitted.");
  if(p.cancellation?.status==="Pending Approval")return toast("Resolve the pending cancellation request before final submission.");
  if(!projectReady(p))return toast("Final delivery requires all assigned tasks approved, all milestones completed, and all issues resolved. You can submit before the deadline once work is complete.");
  if(!confirm("All required work is complete. Submit final delivery to client for acceptance?"))return;
  p.earlySubmission=false;
  p.reviewStatus="Awaiting Client Acceptance";
  p.status="Awaiting Client Acceptance";
  notify(p.clientId,"Project ready for acceptance",
    `${p.title} has been completed and submitted for your final review.`,"projects");
  save("Completed project submitted for client acceptance");
}
function acceptProject(id) {
  const p=project(id);
  if(!role("client")||p?.clientId!==me.id||
    p.reviewStatus!=="Awaiting Client Acceptance")
    return toast("Project is not ready.");
  // Validate again: data may have changed after submission, or an older
  // version may have allowed incomplete projects into the review state.
  if(!projectReady(p))return toast("Final acceptance is blocked because some tasks, milestones or issues are unfinished. Ask the manager to complete them first.");
  if(!confirm("Accept the completed project delivery and generate the final payment invoice?"))return;
  p.earlySubmission=false;
  closeProject(p);save("Completed project accepted and closed");
}
function rejectProject(id) {
  const p=project(id);
  if(!role("client")||p?.clientId!==me.id||
    p.reviewStatus!=="Awaiting Client Acceptance")return;
  modal("Request Project Corrections",
    area("Reason for Corrections","reason"),
    v=>{
      p.status="In Progress";
      p.reviewStatus="Corrections Requested";p.earlySubmission=false;
      p.correctionsVersion=(p.correctionsVersion||0)+1;
      db.tasks.filter(t=>t.projectId===p.id&&t.status==="Completed").forEach(t=>{
        t.status="In Progress";t.progress=90;t.reviewReason=v.reason.trim();
        notify(t.assigneeId,"Client requested corrections",`${p.title}: ${v.reason}`,"tasks");
      });
      updateProjectProgress(p);
      p.reviewReason=v.reason.trim();
      notify(p.managerId,"Client requested corrections",
        `${p.title}: ${v.reason}`,"projects");
      finish("Corrections requested");
    },"Send Corrections");
}

/* PROJECT CANCELLATION — two-party approval, with financial audit trail. */
function requestProjectCancellation(id){
  const p=project(id);
  if(!p||p.status!=="In Progress"||!(role("client")&&p.clientId===me.id||role("manager")&&p.managerId===me.id))return toast("Only the client or assigned manager may request cancellation of an active project.");
  if(p.cancellation?.status==="Pending Approval")return toast("A cancellation request is already pending.");
  modal("Request Project Cancellation",`<div class="notice warning">This requests cancellation; it does not immediately close the project. The other party must approve. Payments and historical records are retained for Finance to reconcile.</div>`+area("Reason for Cancellation","reason"),v=>{
    if(!v.reason.trim())return toast("A cancellation reason is required.");
    p.cancellation={status:"Pending Approval",requestedBy:me.id,reason:v.reason.trim(),requestedDate:todayISO()};
    notify(me.id===p.clientId?p.managerId:p.clientId,"Project cancellation approval required",`${p.title}: ${v.reason.trim()}`,"projects");
    notifyRole("finance","Project cancellation requested",`${p.title}: pending approval and financial review.`,"payments");
    finish("Cancellation requested; awaiting other party's approval");
  },"Request Cancellation");
}
function withdrawProjectCancellation(id){
  const p=project(id),c=p?.cancellation;
  if(!p||p.status!=="In Progress"||c?.status!=="Pending Approval"||c.requestedBy!==me.id)return toast("Cannot withdraw cancellation request.");
  if(!confirm("Withdraw your pending cancellation request?"))return;
  c.status="Withdrawn";c.decisionDate=todayISO();
  notify(me.id===p.clientId?p.managerId:p.clientId,"Cancellation request withdrawn",p.title,"projects");
  save("Cancellation request withdrawn");
}
function reviewProjectCancellation(id){
  const p=project(id),c=p?.cancellation;
  if(!p||p.status!=="In Progress"||c?.status!=="Pending Approval"||c.requestedBy===me.id||!(role("client")&&p.clientId===me.id||role("manager")&&p.managerId===me.id))return toast("You cannot review this cancellation request.");
  const paid=db.payments.filter(x=>x.projectId===id&&x.status==="Paid").reduce((a,x)=>a+n(x.amount),0);
  modal("Review Project Cancellation",`<div class="notice warning">Cancellation requires the other party's approval. Existing client and supplier invoices are retained. Finance must review any refund or remaining charges manually; no automatic refund is made.</div><p><strong>Requested by:</strong> ${esc(uname(c.requestedBy))}</p><p><strong>Reason:</strong> ${esc(c.reason)}</p><p><strong>Approved budget:</strong> ${money(p.budget)} · <strong>Verified client payments:</strong> ${money(paid)}</p>`+area("Decision notes","notes")+select("Decision","decision",[["Approve","Approve cancellation"],["Reject","Reject cancellation"]]),v=>{
    if(!v.notes.trim())return toast("Decision notes are required.");
    c.decisionReason=v.notes.trim();c.decidedBy=me.id;c.decisionDate=todayISO();
    if(v.decision==="Reject"){
      c.status="Rejected";
      notify(c.requestedBy,"Project cancellation rejected",`${p.title}: ${c.decisionReason}`,"projects");
      finish("Cancellation rejected; project remains active");return;
    }
    c.status="Approved";p.status="Cancelled";p.reviewStatus="Cancelled";p.cancelledDate=todayISO();
    p.cancellationReason=c.reason;
    db.supplierAssignments.filter(a=>a.projectId===p.id&&activeAssignment(a)).forEach(a=>{
      const pending=a.status==="Pending Supplier Approval";
      a.status=pending?"Cancelled":"Closed";a.endDate=todayISO();a.closeReason="Project cancelled: "+c.reason;
      notify(supplier(a.supplierId)?.userId,"Supplier service ended due to project cancellation",`${p.title}: ${c.reason}`,"supplierAssignments");
    });
    db.meetings.filter(m=>m.projectId===p.id&&m.status==="Scheduled").forEach(m=>{
      m.status="Cancelled";m.cancelReason="Project cancelled: "+c.reason;
      db.meetingInvitations.filter(i=>i.meetingId===m.id).forEach(i=>notify(i.userId,"Meeting cancelled",`${m.title}: project cancelled`,"meetings"));
    });
    notify(p.clientId,"Project cancellation approved",`${p.title}: ${c.reason}`,"projects");
    notify(p.managerId,"Project cancellation approved",`${p.title}: ${c.reason}`,"projects");
    notifyRole("finance","Cancelled project requires financial reconciliation",`${p.title}: retain invoices, review payments and supplier charges; no automatic refunds.`,"payments");
    db.tasks.filter(t=>t.projectId===p.id&&t.status!=="Completed").forEach(t=>notify(t.assigneeId,"Project cancelled",`${p.title}: stop work on this project.`,"tasks"));
    finish("Project cancelled with history retained; Finance notified");
  },"Submit Decision");
}

/* TASKS AND MANAGER REVIEW */

function renderTasks() {
  heading(role("manager")?"Team Tasks":"My Tasks",
    "Developer completion requires manager approval.",
    role("manager")?btn("+ Assign Task","newTask"):"");
  const tasks=db.tasks.filter(t=>
    role("manager")?canProject(t.projectId):
    role("developer")?t.assigneeId===me.id:false);
  const rows=tasks.map(t=>{
    const p=project(t.projectId);
    let action="—";
    if(role("developer")&&t.assigneeId===me.id&&
      p?.status==="In Progress"&&
      !["Completed","Awaiting Manager Review"].includes(t.status))
      action=btn("Update / Submit","editTask",t.id);
    if(role("manager")&&p?.managerId===me.id&&p.status==="In Progress")action=btn("Edit Dates","editTaskDates",t.id,"outline");
    if(role("manager")&&p?.managerId===me.id&&
      t.status==="Awaiting Manager Review")
      action=`<div class="actions">
        ${btn("Approve","approveTask",t.id,"success")}
        ${btn("Request Fix","rejectTask",t.id,"danger")}</div>`;
    return [
      `<strong>${esc(t.title)}</strong><span class="subtext">
      ${esc(pname(t.projectId))}</span>`,
      esc(uname(t.assigneeId)),badge(t.status),
      `${n(t.progress)}%`,esc(t.due||"—"),t.reviewReason?`<span class="subtext">${esc(t.reviewReason)}</span>`:"—",btn("View","viewTask",t.id,"outline")+" "+action
    ];
  });
  $("pageContent").innerHTML=panel("Task Register",
    table(["Task","Developer","Status","Progress","Due","Manager Advice","Action"],rows));
}
function newTask() {
  if(!role("manager"))return;
  const projects=ownProjects().filter(p=>p.status==="In Progress");
  const developers=db.users.filter(u=>u.role==="developer"&&u.active!==false);
  if(!projects.length||!developers.length)
    return toast("Active project and developer required.");
  modal("Assign Task",
    select("Project","projectId",projects.map(p=>[p.id,p.title]))+
    field("Task Title","title")+
    select("Developer","assigneeId",developers.map(u=>[u.id,`${u.name} | ${u.skills||"Skills not recorded"} | ${db.tasks.filter(t=>t.assigneeId===u.id&&!['Completed','Closed'].includes(t.status)).length} open tasks`]))+
    field("Required Skill","requiredSkill")+
    select("Priority","priority",[["Low","Low"],["Medium","Medium"],["High","High"]])+
    field("Start Date","start","date",todayISO())+field("Due Date","due","date")+select("Predecessor task (optional)","predecessor",[["0","None"],...db.tasks.filter(t=>canProject(t.projectId)).map(t=>[t.id,pname(t.projectId)+" / "+t.title])])+select("Change request (if applicable)","changeId",[["0","Original scope"],...db.changes.filter(c=>canProject(c.projectId)).map(c=>[c.id,pname(c.projectId)+" / "+c.title+" / "+c.status])]),
    v=>{
      const p=project(v.projectId);
      if(!p||p.managerId!==me.id||p.status!=="In Progress")
        return toast("Invalid project.");
             const dev=user(v.assigneeId);
       if(!dev||dev.role!=="developer"||dev.active===false)return toast("Invalid developer.");
       if(!String(dev.skills||"").toLowerCase().split(",").map(x=>x.trim()).includes(v.requiredSkill.trim().toLowerCase()))
         return toast("Developer does not have the required skill. Update Staff Skills first.");
       if(db.tasks.filter(t=>t.assigneeId===dev.id&&!['Completed','Closed'].includes(t.status)).length>=n(dev.maxTasks||3))
         return toast("Developer has reached their maximum number of open tasks. Tasks may share dates; increase capacity in Staff Skills or complete another task.");
       if(v.start>v.due || (p.deadline&&v.due>p.deadline))return toast("Invalid task dates or project deadline exceeded.");
       if((dev.availableFrom&&v.start<dev.availableFrom)||(dev.availableUntil&&v.due>dev.availableUntil))return toast("Employee unavailable for selected dates.");
       const pred=db.tasks.find(t=>t.id===n(v.predecessor)),change=db.changes.find(c=>c.id===n(v.changeId));
       if(n(v.predecessor)&&(!pred||pred.projectId!==p.id))return toast("Invalid predecessor or start date.");
       if(n(v.changeId)&&(!change||change.projectId!==p.id||change.status!=="Approved"))return toast("Change must be approved first.");
       const t={start:v.start,predecessor:n(v.predecessor),changeId:n(v.changeId),
         requiredSkill:v.requiredSkill.trim(),id:nextId(db.tasks),projectId:p.id,assigneeId:Number(v.assigneeId),
        title:v.title.trim(),priority:v.priority,due:v.due,
        status:"Pending",progress:0
      };
      db.tasks.push(t);updateProjectProgress(p);
      notify(t.assigneeId,"New task assigned",
        `${t.title} — ${p.title}`,"tasks");
      finish("Task assigned");
    });
}
function editTaskDates(id){const t=db.tasks.find(x=>x.id===id),p=project(t?.projectId);if(!role('manager')||p?.managerId!==me.id||p.status!=='In Progress'||t.status==='Completed')return toast('Cannot change task dates.');
 modal('Edit task schedule',field('Start Date','start','date',t.start||todayISO())+field('Due Date','due','date',t.due),v=>{
 const dev=user(t.assigneeId),pred=db.tasks.find(x=>x.id===t.predecessor);
 if(v.start>v.due||(p.deadline&&v.due>p.deadline))return toast('Invalid dates or beyond project deadline.');
 if((dev?.availableFrom&&v.start<dev.availableFrom)||(dev?.availableUntil&&v.due>dev.availableUntil))return toast('Outside developer availability.');
 // Task dates may overlap; the developer must still finish the predecessor before starting work.
 // Overlapping task windows are permitted.
 t.start=v.start;t.due=v.due;notify(t.assigneeId,'Task schedule updated',`${t.title}: ${v.start} to ${v.due}`,'tasks');finish('Task dates updated');});}
function editTask(id) {
  const t=db.tasks.find(x=>x.id===id);
  const p=project(t?.projectId);
  if(!role("developer")||t?.assigneeId!==me.id||
    p?.status!=="In Progress"||
    ["Completed","Awaiting Manager Review"].includes(t.status))
    return toast("Task cannot be updated.");
  // Early progress is allowed; dependency and change-approval gates remain enforced.
  if(t.predecessor&&!db.tasks.some(x=>x.id===t.predecessor&&x.status==="Completed"))return toast("Complete predecessor first.");
  if(t.changeId&&!db.changes.some(x=>x.id===t.changeId&&x.status==="Approved"))return toast("Change approval required.");
  modal("Update Task",
    `<div class="notice">${esc(t.title)}${t.reviewReason?`<p><strong>Manager correction advice:</strong> ${esc(t.reviewReason)}</p>`:""}</div>`+
    field("Progress (%)","progress","number",t.progress,
      'min="0" max="100"')+
    select("Action","action",[
      ["save","Save Progress"],
      ["submit","Submit for Manager Review"]
    ]),
    v=>{
      const value=n(v.progress);
      if(value<0||value>100)return toast("Progress must be 0–100.");
      if(v.action==="submit"&&value!==100)
        return toast("Set progress to 100% before submitting.");
      t.progress=value;
      t.status=v.action==="submit"?
        "Awaiting Manager Review":"In Progress";
      if(v.action==="submit")
        notify(p.managerId,"Task awaiting approval",
          `${me.name} submitted ${t.title}.`,"tasks");
      finish(v.action==="submit"?"Task submitted for review":"Progress saved");
    });
}
function approveTask(id) {
  const t=db.tasks.find(x=>x.id===id);
  const p=project(t?.projectId);
  if(!role("manager")||p?.managerId!==me.id||
    t?.status!=="Awaiting Manager Review")return toast("Unavailable.");
  if(!confirm(`Approve completed task: ${t.title}?`))return;
  t.status="Completed";t.progress=100;
  t.approvedBy=me.id;t.approvedDate=todayISO();
  updateProjectProgress(p);
  notify(t.assigneeId,"Task approved",
    `${t.title} was approved by the Project Manager.`,"tasks");
  if(projectReady(p))notify(p.managerId,"All tasks approved",
    `${p.title} can now be submitted to the client.`,"projects");
  save("Task approved");
}
function rejectTask(id) {
  const t=db.tasks.find(x=>x.id===id);
  const p=project(t?.projectId);
  if(!role("manager")||p?.managerId!==me.id||
    t?.status!=="Awaiting Manager Review")return;
  modal("Request Task Corrections",
    area("Reason","reason"),v=>{
      t.status="In Progress";t.progress=90;
      t.reviewReason=v.reason.trim();t.reviewDate=todayISO();
      notify(t.assigneeId,"Task corrections required",
        `${t.title}: ${v.reason}`,"tasks");
      finish("Task returned for corrections");
    },"Send Corrections");
}

/* SUPPLIER ASSIGNMENTS AND CAPACITY */

function renderSupplierAssignments() {
  heading(role("supplier")?"Service Requests":"Supplier Assignments",
    "Supplier acceptance, unit rates, available capacity and project budgets.",
    role("manager")?btn("+ Request Supplier","newSupplierAssignment"):"");

  const rows=ownAssignments().map(a=>{
    const s=supplier(a.supplierId);
    let action="—";
    if(role("supplier")&&s?.userId===me.id&&a.status==="Active")action=btn("Stop Supplying","supplierStopService",a.id,"danger");
    if(role("supplier")&&s?.userId===me.id&&
      a.status==="Pending Supplier Approval")
      action=`<div class="actions">
        ${btn("Accept","acceptAssignment",a.id,"success")}
        ${btn("Reject","rejectAssignment",a.id,"danger")}</div>`;
    if(role("manager")&&project(a.projectId)?.managerId===me.id){
      if(a.status==="Active")action=btn("End Assignment","endAssignment",a.id,"danger");
      if(a.status==="Pending Supplier Approval")action=btn("Cancel Request","cancelSupplierRequest",a.id,"danger");
    }
    return [
      `<strong>${esc(pname(a.projectId))}</strong><span class="subtext">
      ${esc(s?.company)}</span>`,
      esc(a.service),`${n(a.quantity)} ${esc(a.unit)}`,
      money(a.rate),money(a.monthlyCost),
      badge(a.status),btn("View Costs","viewSupplierAssignment",a.id,"outline")+" "+action
    ];
  });

  $("pageContent").innerHTML=panel("Supplier Service Register",
    table(["Project / Supplier","Service","Quantity","Unit Rate",
      "Monthly Cost","Status","Action"],rows));
}
function newSupplierAssignment() {
  if(!role("manager"))return;
  const projects=ownProjects().filter(p=>p.status==="In Progress");
  const suppliers=db.suppliers.filter(s=>s.status==="Approved"&&
    user(s.userId)?.active!==false);
  if(!projects.length)return toast("An active project is required.");
  if(!suppliers.length)return toast("No approved suppliers available.");

  const supplierInfo=suppliers.map(s=>[
    s.id,`${s.company} | ${s.service} | ${money(s.rate)}/${s.unit} |
    Available: ${availableCapacity(s)} ${s.unit}`
  ]);

  modal("Request Supplier Service",
    select("Project","projectId",projects.map(p=>[
      p.id,`${p.title} | Approved project budget: ${money(p.budget)} | Supplier monthly cap: ${money(p.supplierMonthlyBudget)}/month`
    ]))+
    select("Supplier (rate and capacity shown)","supplierId",supplierInfo)+
    field("Required Quantity","quantity","number",1,
      'min="1" step="1"')+
    field("Start Date","startDate","date",todayISO())+
    `<div class="notice"><strong>Agreed monthly unit rate is fixed by the approved supplier profile.</strong> Monthly cost is calculated automatically as unit rate × quantity. The selected supplier dropdown shows the rate and available capacity. Monthly cost = supplier unit rate × quantity.
    The system checks remaining capacity and the project's available
    supplier budget. The supplier must accept before work begins.</div>`,
    v=>{
      const p=project(v.projectId);
      const s=supplier(v.supplierId);
      const qty=n(v.quantity);
      if(!p||p.managerId!==me.id||p.status!=="In Progress"||
        !s||s.status!=="Approved")return toast("Invalid selection.");
      if(!Number.isInteger(qty)||qty<1)return toast("Invalid quantity.");
      if(qty>availableCapacity(s))
        return toast(`Insufficient capacity. Available: ${availableCapacity(s)} ${s.unit}.`);
      const cost=qty*n(s.rate);
      const remaining=n(p.supplierMonthlyBudget)-allocatedMonthlyCost(p.id);
      if(cost>remaining)
        return toast(`Over budget. Available: ${money(remaining)}, required: ${money(cost)}.`);
      if(cost<=0)return toast("Supplier unit rate must be greater than zero.");

      const a={
        id:nextId(db.supplierAssignments),projectId:p.id,
        supplierId:s.id,assignedBy:me.id,
        service:s.service,unit:s.unit,quantity:qty,rate:n(s.rate),
        monthlyCost:cost,monthlyBudget:remaining,
        startDate:v.startDate,status:"Pending Supplier Approval",
        date:todayISO()
      };
      db.supplierAssignments.push(a);
      notify(s.userId,"New supplier service request",
        `${p.title}: ${qty} ${s.unit} at ${money(cost)}/month.`,"supplierAssignments");
      finish("Supplier request sent");
    },"Send Request");
}
function cancelSupplierRequest(id){const a=assignment(id),p=project(a?.projectId);if(!role('manager')||p?.managerId!==me.id||a?.status!=='Pending Supplier Approval')return toast('Only pending requests can be cancelled.');modal('Cancel supplier request',area('Cancellation Reason','reason'),v=>{if(!v.reason.trim())return toast('Enter cancellation reason.');a.status='Cancelled';a.cancelReason=v.reason.trim();notify(supplier(a.supplierId)?.userId,'Supplier request cancelled',`${p.title}: ${a.cancelReason}`,'supplierAssignments');finish('Supplier request cancelled');},'Cancel Request');}
function acceptAssignment(id) {
  const a=assignment(id);
  const s=supplier(a?.supplierId);
  if(!role("supplier")||s?.userId!==me.id||
    a?.status!=="Pending Supplier Approval")return toast("Unavailable.");
  const p=project(a.projectId);
  if(!p||p.status!=="In Progress")
    return toast("Project is no longer active.");
  if(!confirm(`Accept ${a.quantity} ${a.unit} for ${money(a.monthlyCost)}/month?`))
    return;
  a.status="Active";a.acceptedDate=todayISO();
  notify(p.managerId,"Supplier accepted assignment",
    `${s.company} accepted ${p.title}.`,"supplierAssignments");
  notifyRole("finance","Supplier service activated",
    `${s.company} — ${p.title}: ${money(a.monthlyCost)}/month.`,
    "supplierAssignments");
  save("Supplier assignment accepted");
}
function rejectAssignment(id) {
  const a=assignment(id);
  const s=supplier(a?.supplierId);
  if(!role("supplier")||s?.userId!==me.id||
    a?.status!=="Pending Supplier Approval")return;
  modal("Reject Supplier Assignment",
    area("Reason for Rejection","reason"),
    v=>{
      a.status="Rejected";a.rejectionReason=v.reason.trim();
      notify(project(a.projectId)?.managerId,"Supplier rejected request",
        `${s.company}: ${v.reason}`,"supplierAssignments");
      finish("Supplier request rejected");
    },"Reject Request");
}
function endAssignment(id) {
  const a=assignment(id),p=project(a?.projectId);
  if(!role("manager")||p?.managerId!==me.id||
    a?.status!=="Active")return toast("Unavailable.");
  if(!confirm("End supplier service and release capacity?"))return;
  a.status="Closed";a.endDate=todayISO();
  notify(supplier(a.supplierId)?.userId,"Assignment ended",
    `${p.title}: ${a.service} service ended.`,"supplierAssignments");
  notifyRole("finance","Supplier assignment ended",
    `${p.title}: review any outstanding statements.`,"supplierPayments");
  save("Supplier assignment ended");
}

function supplierStopService(id) {
  const a=assignment(id),s=supplier(a?.supplierId),p=project(a?.projectId);
  if(!role("supplier")||s?.userId!==me.id||a?.status!=="Active")return toast("Only active services can be ended.");
  modal("Stop supplying service",`<div class="notice">This ends future service. Finance can still settle any accrued monthly charges.</div>`+area("Reason for stopping service","reason"),v=>{
    if(!v.reason.trim())return toast("A reason is required.");
    a.status="Closed";a.endDate=todayISO();a.closeReason=v.reason.trim();a.endedBy=me.id;
    notify(p?.managerId,"Supplier stopped service",`${s.company} ended ${a.service}: ${a.closeReason}`,"supplierAssignments");
    notifyRole("finance","Supplier service ended",`${s.company}: calculate outstanding charges through ${a.endDate}.`,"supplierPayments");
    finish("Supplier service ended");
  },"Confirm End Service");
}

/* MEETINGS */

// Meeting reminders use browser-local time, and persist per recipient and window.
function meetingReminderScan(now = Date.now()) {
  let changed = false;
  const alerts = [];
  for (const m of db.meetings) {
    if (m.status !== 'Scheduled') continue;
    const start = new Date(`${m.date}T${m.time}`).getTime();
    const remaining = start - now;
    if (!Number.isFinite(start) || remaining <= 0 || remaining > 86400000) continue;
    const window = remaining <= 1800000 ? '30m' : '24h';
    const recipients = new Set([m.createdBy, ...db.meetingInvitations.filter(i=>i.meetingId===m.id && ['Pending','Accepted'].includes(i.status)).map(i=>i.userId)]);
    m.reminderLog ||= {};
    for (const uid of recipients) {
      if (!user(uid) || user(uid).active===false) continue;
      const key = `${uid}:${m.date}:${m.time}:${window}`;
      if (m.reminderLog[key]) continue;
      m.reminderLog[key] = true;
      if (window === '30m') m.reminderLog[`${uid}:${m.date}:${m.time}:24h`] = true;
      const message = `${m.title} starts in ${window==='30m'?'30 minutes or less':'24 hours or less'} (${m.date} at ${m.time}).`;
      notify(uid,'Meeting reminder',message,'meetings');
      if (uid===me?.id) alerts.push(message);
      changed = true;
    }
  }
  if (changed) saveData(db);
  if (alerts.length) toast(alerts.length===1?alerts[0]:`You have ${alerts.length} upcoming meeting reminders. Check Notifications.`);
  return changed;
}
function upcomingMeetingNotice() {
  const now=Date.now();
  const upcoming=db.meetings.filter(m=>m.status==='Scheduled' && (m.createdBy===me.id || db.meetingInvitations.some(i=>i.meetingId===m.id && i.userId===me.id && ['Accepted','Pending'].includes(i.status))))
    .filter(m=>{const t=new Date(`${m.date}T${m.time}`).getTime();return t>now && t-now<=86400000;})
    .sort((a,b)=>`${a.date}T${a.time}`.localeCompare(`${b.date}T${b.time}`));
  return upcoming.length?`<div class="notice warning"><strong>Upcoming meetings in the next 24 hours</strong>${upcoming.map(m=>`<div>${esc(m.title)} · ${esc(m.date)} at ${esc(m.time)} ${btn('View','viewMeeting',m.id,'outline')}</div>`).join('')}</div>`:'';
}
let meetingMonth = null;
function meetingCalendar() {
  const today = todayISO();
  if (!meetingMonth) meetingMonth = today.slice(0,7);
  const [year,month] = meetingMonth.split('-').map(Number);
  const first = new Date(year,month-1,1);
  const offset = (first.getDay()+6)%7;
  const days = new Date(year,month,0).getDate();
  const meetings = db.meetings.filter(canMeeting).filter(m=>m.date?.startsWith(meetingMonth)).sort((a,b)=>String(a.time).localeCompare(String(b.time)));
  const cells = Array.from({length:Math.ceil((offset+days)/7)*7},(_,i)=>{
    const day=i-offset+1;
    if(day<1||day>days)return '<div class="mc-day mc-blank" aria-hidden="true"></div>';
    const date=meetingMonth+'-'+String(day).padStart(2,'0');
    return `<div class="mc-day ${date===today?'mc-today':''}"><span class="mc-number">${day}</span>${meetings.filter(m=>m.date===date).map(m=>{
      const kind=m.status==='Scheduled'?'scheduled':m.status==='Completed'?'completed':'closed';
      return `<button type="button" class="mc-event ${kind}" data-action="viewMeeting" data-id="${Number(m.id)}" title="${esc(m.title+' · '+m.status)}"><small>${esc(m.time||'')} · ${esc(m.status)}</small><strong>${esc(m.title)}</strong></button>`;
    }).join('')}</div>`;
  }).join('');
  return `<div class="mc-toolbar"><div><h3>${first.toLocaleDateString('en-MY',{month:'long',year:'numeric'})}</h3><span class="muted">${meetings.length} meeting(s) this month</span></div><div class="mc-controls"><button type="button" class="btn outline small" id="mcPrev" aria-label="Previous month">‹</button><button type="button" class="btn outline small" id="mcToday">Today</button><button type="button" class="btn outline small" id="mcNext" aria-label="Next month">›</button></div></div><div class="mc-legend"><span>Scheduled</span><span>Completed</span><span>Cancelled / closed</span></div><div class="mc-scroll"><div class="mc-grid">${['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d=>`<div class="mc-weekday">${d}</div>`).join('')}${cells}</div></div><p class="muted mc-help">Select a meeting to view its details. On small screens, scroll horizontally.</p>`;
}
function bindMeetingCalendar(){
  const move=delta=>{const [y,m]=meetingMonth.split('-').map(Number);const d=new Date(y,m-1+delta,1);meetingMonth=d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0');renderMeetings();};
  $('mcPrev').onclick=()=>move(-1);
  $('mcNext').onclick=()=>move(1);
  $('mcToday').onclick=()=>{meetingMonth=todayISO().slice(0,7);renderMeetings();};
}

function renderMeetings() {
  heading("Meetings","Invitations, attendance and rejection reasons.",
    role("client","manager")?btn("+ Schedule Meeting","newMeeting"):"");

  const rows=db.meetings.filter(canMeeting).map(m=>{
    const inv=db.meetingInvitations.find(i=>
      i.meetingId===m.id&&i.userId===me.id);
    const attendees=db.meetingInvitations.filter(i=>i.meetingId===m.id)
      .map(i=>`${uname(i.userId)}: ${i.status}`+
        (i.reason?` (${i.reason})`:"")).join("; ");
    let action="—";
    if(inv?.status==="Pending"&&m.status==="Scheduled")
      action=`<div class="actions">
        ${btn("Accept","acceptMeeting",inv.id,"success")}
        ${btn("Decline","declineMeeting",inv.id,"danger")}</div>`;
    if(m.status==="Scheduled"&&m.createdBy===me.id&&role("client","manager"))
      action=`<div class="actions">${btn("Edit","editMeeting",m.id,"outline")}${btn("Cancel Meeting","cancelMeeting",m.id,"danger")}</div>`;
    return [
      `<strong>${esc(m.title)}</strong><span class="subtext">
      ${esc(m.notes)}</span><span class="subtext">${m.url?`<a href="${esc(safeMeetingURL(m.url))}" target="_blank" rel="noopener noreferrer">Join online meeting</a>`:""} ${esc(m.outcomes||"")}</span>`,
      esc(pname(m.projectId)),esc(uname(m.createdBy)),
      `${esc(m.date)} ${esc(m.time)}`,
      `<span class="subtext">${esc(attendees)}</span>`,
      badge(inv?.status|| (m.createdBy===me.id?"Organizer":"—")),esc(inv?.reason||"—"),esc(m.cancelReason||"—"),badge(m.status),btn("View","viewMeeting",m.id,"outline")+" "+action
    ];
  });
  $("pageContent").innerHTML=upcomingMeetingNotice()+panel("Meeting Calendar",meetingCalendar())+panel("Meeting Schedule",
    table(["Meeting","Project","Scheduled By","When",
      "Participant Responses","My RSVP","My Decline Reason","Cancellation Reason","Status","Action"],rows));
  bindMeetingCalendar();
}
function newMeeting() {
  if(!role("client","manager"))return;
  const projects=ownProjects().filter(p=>p.status==="In Progress");
  if(!projects.length)return toast("No active projects.");
  modal("Schedule Meeting",
    select("Project","projectId",projects.map(p=>[p.id,p.title]))+
    field("Meeting Title","title")+
    field("Date","date","date")+
    field("Time","time","time")+
    area("Agenda","notes")+optional("Online meeting URL","url","url"),
    v=>{
      const p=project(v.projectId);
      if(!p||!canProject(p.id)||p.status!=="In Progress")
        return toast("Invalid project.");
      const m={
        id:nextId(db.meetings),projectId:p.id,
        createdBy:me.id,title:v.title.trim(),
        date:v.date,time:v.time,notes:v.notes.trim(),
        url:safeMeetingURL(v.url),outcomes:"",status:"Scheduled"
      };
      db.meetings.push(m);
      participants(p.id).forEach(u=>{
        db.meetingInvitations.push({
          id:nextId(db.meetingInvitations),meetingId:m.id,
          userId:u.id,status:u.id===me.id?"Accepted":"Pending",
          reason:""
        });
        if(u.id!==me.id)notify(u.id,"Meeting invitation",
          `${m.title}, ${m.date} at ${m.time}.`,"meetings");
      });
      finish("Meeting scheduled");
    });
}
function acceptMeeting(id) {
  const i=db.meetingInvitations.find(x=>x.id===id);
  const m=db.meetings.find(x=>x.id===i?.meetingId);
  if(!i||i.userId!==me.id||i.status!=="Pending"||
    m?.status!=="Scheduled")return toast("Unavailable.");
  i.status="Accepted";i.responseDate=todayISO();
  notify(m.createdBy,"Meeting invitation accepted",
    `${me.name} accepted ${m.title}.`,"meetings");
  save("Meeting accepted");
}
function declineMeeting(id) {
  const i=db.meetingInvitations.find(x=>x.id===id);
  const m=db.meetings.find(x=>x.id===i?.meetingId);
  if(!i||i.userId!==me.id||i.status!=="Pending"||
    m?.status!=="Scheduled")return toast("Unavailable.");
  modal("Decline Meeting Invitation",
    area("Reason for Declining","reason"),
    v=>{
      i.status="Declined";i.reason=v.reason.trim();
      i.responseDate=todayISO();
      notify(m.createdBy,"Meeting invitation declined",
        `${me.name} declined ${m.title}. Reason: ${v.reason}`,"meetings");
      finish("Meeting declined");
    },"Decline Invitation");
}
function editMeeting(id) {
  const m=db.meetings.find(x=>x.id===id);
  if(!m||m.createdBy!==me.id||!role("client","manager")||
    m.status!=="Scheduled")return toast("Cannot edit meeting.");
  modal("Update Meeting",
    field("Title","title","text",m.title)+
    area("Agenda","notes",m.notes)+
    optional("Meeting Outcomes","outcomes","text",m.outcomes)+optional("Online meeting URL","url","url",m.url||"")+
    select("Status","status",[
      ["Scheduled","Scheduled"],["Completed","Completed"]
    ],m.status),
    v=>{
      m.title=v.title.trim();m.notes=v.notes.trim();
      m.url=safeMeetingURL(v.url);m.outcomes=v.outcomes.trim();m.status=v.status;
      if(m.status!=="Scheduled")
        db.meetingInvitations.filter(i=>i.meetingId===m.id)
          .forEach(i=>notify(i.userId,"Meeting updated",
            `${m.title}: ${m.status}.`,"meetings"));
      finish("Meeting updated");
    });
}

/* CHANGE REQUESTS */

function renderChanges() {
  heading("Change Requests","Client approval of project changes.",
    role("client","manager","developer")?btn("+ Request Change","newChange"):"");
  const rows=db.changes.filter(c=>canProject(c.projectId)).map(c=>{
    const p=project(c.projectId);
    return [
      `<strong>${esc(c.title)}</strong><span class="subtext">
      ${esc(c.description)}</span>`,
      esc(pname(c.projectId)),money(c.cost),badge(c.status),
      role("manager")&&p?.managerId===me.id&&c.status==="Pending Manager Evaluation"?
        btn("Evaluate","evaluateChange",c.id):
      role("client")&&p?.clientId===me.id&&
        c.status==="Pending Client Approval"?
        `<div class="actions">
        ${btn("Approve","approveChange",c.id,"success")}
        ${btn("Reject","rejectChange",c.id,"danger")}</div>`:"—"
    ];
  });
  rows.forEach((row,i)=>{row[4]=btn("View Details","viewChange",db.changes.filter(c=>canProject(c.projectId))[i].id,"outline")+" "+row[4];});
  $("pageContent").innerHTML=panel("Changes",
    table(["Change","Project","Cost","Status","Action"],rows));
}
function newChange() {
  if(!role("client","manager","developer"))return;
  const projects=ownProjects().filter(p=>p.status==="In Progress");
  if(!projects.length)return toast("No active projects.");
  modal("Request Change",
    select("Project","projectId",projects.map(p=>[p.id,p.title]))+
    field("Title","title")+area("Description","description")+
    `<div class="notice">The project manager will estimate cost, resources and schedule impact.</div>`,
    v=>{
      const p=project(v.projectId);
      if(!p||!canProject(p.id)||p.status!=="In Progress")return;
      db.changes.push({
        id:nextId(db.changes),projectId:p.id,createdBy:me.id,
        title:v.title.trim(),description:v.description.trim(),
        cost:n(v.cost),delayDays:n(v.delayDays),resourceImpact:"",
        status:"Pending Manager Evaluation",date:todayISO()
      });
      notify(p.managerId,"Change evaluation required",`${p.title}: ${v.title}.`,"changes");
      finish("Change submitted");
    });
}
function decideChange(id,approve) {
  const c=db.changes.find(x=>x.id===id);
  const p=project(c?.projectId);
  if(!role("client")||p?.clientId!==me.id||
    c?.status!=="Pending Client Approval")return;
  if(!confirm(`${approve?"Approve":"Reject"} change?`))return;
  c.status=approve?"Approved":"Rejected";
  if(approve&&n(c.cost)>0){
    p.budget+=n(c.cost);

    db.payments.push({
      id:nextId(db.payments),projectId:p.id,clientId:me.id,
      title:`Change: ${c.title}`,paymentType:"change",
      amount:n(c.cost),status:"Pending",date:todayISO()
    });
    notifyRole("finance","Change payment created",
      `${p.title}: ${money(c.cost)}.`,"payments");
  }
  if(approve&&p.deadline&&n(c.delayDays)>0){const d=new Date(p.deadline+"T12:00:00");d.setDate(d.getDate()+n(c.delayDays));p.deadline=d.toISOString().slice(0,10);}
  notify(p.managerId,"Change request reviewed",
    `${c.title}: ${c.status}.`,"changes");
  save(`Change ${c.status.toLowerCase()}`);
}

/* DOCUMENTS */

function renderDocuments() {
  heading("Project Documents","Project files stored in this browser (demo only).",
    role("manager","developer")?btn("+ Add Document","newDocument"):"");
  const rows=db.documents.filter(d=>canProject(d.projectId)).map(d=>[
    `<strong>${esc(d.title)}</strong><span class="subtext">
    ${esc(d.filename)}</span>`,
    esc(pname(d.projectId)),esc(uname(d.uploadedBy)),esc(d.date),
    (d.dataUrl?btn("Download","downloadDocument",d.id,"outline"):"Reference only")+
    ((role("manager")&&project(d.projectId)?.managerId===me.id||role("developer")&&d.uploadedBy===me.id)?" "+btn("Remove Document","removeDocument",d.id,"danger"):"")
  ]);
  $("pageContent").innerHTML=panel("Documents",
    table(["Document","Project","Added By","Date","File"],rows));
}
function newDocument() {
  if(!role("manager","developer"))return;
  const projects=ownProjects();
  if(!projects.length)return toast("No projects.");
  modal("Upload Project Document",
    select("Project","projectId",projects.map(p=>[p.id,p.title]))+
    field("Title","title")+
    `<label>File (maximum 1 MB)<input type="file" name="upload" required></label>`,
    async v=>{
      if(!canProject(v.projectId))return toast("Invalid project.");
      const file=$("modalForm").querySelector('input[name="upload"]')?.files?.[0];
      if(!file||file.size>1024*1024)return toast("Select a file smaller than 1 MB.");
      const dataUrl=await fileData(file);
      db.documents.push({
        id:nextId(db.documents),projectId:Number(v.projectId),
        uploadedBy:me.id,title:v.title.trim(),
        filename:file.name,dataUrl,mime:file.type,date:todayISO()
      });
      const pr=project(v.projectId);
      for(const uid of new Set([pr?.managerId,pr?.clientId]))if(uid&&uid!==me.id)notify(uid,'New project document',`${pr.title}: ${v.title} uploaded by ${me.name}`,'documents');
      finish("Document uploaded");
    });
}

function removeDocument(id) {
  const d=db.documents.find(x=>x.id===id);
  if(!d||!canProject(d.projectId))return toast("Document unavailable.");
  const p=project(d.projectId);
  const authorized=(role("manager")&&p?.managerId===me.id)||
    (role("developer")&&d.uploadedBy===me.id);
  if(!authorized)return toast("You cannot remove this document.");
  if(!confirm(`Remove document "${d.title}" (${d.filename})? This cannot be undone.`))return;
  db.documents=db.documents.filter(x=>x.id!==id);
  for(const uid of new Set([p?.managerId,p?.clientId,d.uploadedBy])){
    if(uid&&uid!==me.id)notify(uid,"Project document removed",`${p.title}: ${d.title} removed by ${me.name}.`,"documents");
  }
  save("Document removed");
}

/* CLIENT PAYMENTS */

function renderPayments() {
  heading("Client Payments","Contract balances, project summaries and Finance verification.");
  const visibleProjects=role("finance")?db.projects:
    db.projects.filter(p=>p.clientId===me.id);
  const visibleIds=new Set(visibleProjects.map(p=>p.id));
  const records=db.payments.filter(x=>visibleIds.has(x.projectId) &&
    (role("finance")||x.clientId===me.id));
  const sum=items=>items.reduce((total,x)=>total+n(x.amount),0);
  const invoiceRows=items=>items.map(p=>[
    `<strong>${esc(p.title)}</strong>`,money(p.amount),badge(p.status),esc(p.date),
    role("client")&&p.status==="Pending"?
      btn(p.paymentType==="final"?"Pay Final Balance":"Submit Payment","payClient",p.id):
    role("finance")&&p.status==="Awaiting Verification"?
      btn("Confirm Receipt","markPayment",p.id,"success"):"—"
  ]);
  const summaryBox=(label,value)=>`<div><small>${esc(label)}</small><strong>${money(value)}</strong></div>`;
  const contractTotal=visibleProjects.reduce((total,p)=>total+n(p.budget),0);
  const paidTotal=sum(records.filter(x=>x.status==="Paid"));
  const unpaidInvoices=sum(records.filter(x=>x.status!=="Paid"));
  const remainingTotal=visibleProjects.reduce((total,p)=>{
    const verified=sum(records.filter(x=>x.projectId===p.id&&x.status==="Paid"));
    return total+Math.max(0,n(p.budget)-verified);
  },0);
  let html=panel("All Projects — Payment Overview",
    `<div class="finance-summary finance-summary-four">`+
    summaryBox("Total Contract Value",contractTotal)+
    summaryBox("Verified Received",paidTotal)+
    summaryBox("Remaining Contract Balance",remainingTotal)+
    summaryBox("Outstanding / Unverified Invoices",unpaidInvoices)+
    `</div><p class="finance-note">Remaining contract balance includes amounts not yet invoiced. Outstanding / Unverified counts only generated invoices awaiting verified payment. Cancelled projects require separate financial reconciliation.</p>`);
  if(!visibleProjects.length){
    html+=panel("Project Payment Summaries",empty("No projects yet","Approve a proposal and verify its deposit to create a project."));
  }
  visibleProjects.forEach(p=>{
    const invoices=records.filter(x=>x.projectId===p.id);
    const verified=sum(invoices.filter(x=>x.status==="Paid"));
    const outstanding=sum(invoices.filter(x=>x.status!=="Paid"));
    const balance=Math.max(0,n(p.budget)-verified);
    const cancelled=p.status==="Cancelled";
    const note=cancelled?`<p class="finance-note"><strong>Cancelled project:</strong> Remaining contract balance is historical only, not an automatically collectible amount. Finance must reconcile refunds and charges manually.</p>`:"";
    html+=panel(`Project Payment Summary — ${p.title}`,
      `<div class="project-finance-meta"><span><strong>Reference:</strong> ${esc(p.reference||"Not assigned")}</span><span><strong>Client:</strong> ${esc(uname(p.clientId))}</span><span><strong>Status:</strong> ${badge(p.status)}</span></div>`+
      `<div class="finance-summary finance-summary-four">`+
      summaryBox("Total Contract Value",p.budget)+
      summaryBox("Verified Received",verified)+
      summaryBox("Remaining Contract Balance",balance)+
      summaryBox("Outstanding / Unverified Invoices",outstanding)+
      `</div>${note}<h4 class="project-invoice-title">Payment Register — ${esc(p.title)}</h4>`+
      table(["Invoice","Amount","Status","Date","Action"],invoiceRows(invoices)));
  });
  $("pageContent").innerHTML=html;
}
function payClient(id) {
  const p=db.payments.find(x=>x.id===id);
  if(!role("client")||p?.clientId!==me.id||p.status!=="Pending")return;
  if(!confirm(`Submit simulated ${p.paymentType==="final"?"FINAL ":""}payment of ${money(p.amount)}?`))return;
  p.status="Awaiting Verification";
  p.submittedDate=todayISO();
  notifyRole("finance","Payment needs verification",
    `${pname(p.projectId)}: ${money(p.amount)}.`,"payments");
  save("Payment submitted");
}
function markPayment(id) {
  const p=db.payments.find(x=>x.id===id);
  if(!role("finance")||p?.status!=="Awaiting Verification")return;
  if(!confirm("Confirm payment receipt?"))return;
  p.status="Paid";p.verifiedBy=me.id;p.verifiedDate=todayISO();
  const pr=project(p.projectId);
  if(pr&&p.paymentType==="initial"&&pr.status==="Awaiting Payment"){
    pr.status="In Progress";pr.reference=`NVT-${new Date().getFullYear()}-${String(pr.id).padStart(4,"0")}`;pr.startDate=todayISO();if(!pr.deadline)pr.deadline=db.requests.find(r=>r.id===pr.requestId)?.expectedCompletion||"";
    const r=db.requests.find(x=>x.id===pr.requestId);
    if(r)r.status="Project Confirmed";
    notify(pr.managerId,"Project activated",
      `${pr.title}: initial deposit verified.`,"projects");
  }
  notify(p.clientId,"Payment verified",
    `${p.title}: ${money(p.amount)} received.`,"payments");
  save("Payment verified");
}

/* SUPPLIER REGISTRATION */

function renderRegistration() {
  const s=ownSupplier();
  heading("Company Registration", "Manage your company profile, service pricing and availability.",
    !s||s.status==="Rejected"||(s.status==="Pending Approval"&&!s.agreementFile) ? btn(s?"Resubmit Registration":"Register Company","registerSupplier") : "");
  if(!s){
    $("pageContent").innerHTML=`<section class="supplier-profile-empty">${empty("Your company profile starts here","Register your company to offer services to NovaTech projects.")}</section>`;
    return;
  }
  const cap=n(s.capacity), available=availableCapacity(s), used=Math.max(0,cap-available);
  const pct=cap>0?Math.min(100,Math.round(used/cap*100)):0;
  const initials=String(s.company||"NT").split(/\s+/).slice(0,2).map(x=>x[0]||"").join("").toUpperCase();
  const statusText=s.status==="Approved"?"Your company is approved for project assignments.":s.status==="Rejected"?"Your application needs changes before it can be approved.":"Your company registration is awaiting management review.";
  $("pageContent").innerHTML=`
    <section class="supplier-hero">
      <div class="supplier-hero-main">
        <div class="supplier-logo">${esc(initials)}</div>
        <div><div class="supplier-kicker">SUPPLIER PROFILE <span class="supplier-dot">●</span> NOVATECH PARTNER NETWORK</div>
          <h2>${esc(s.company)}</h2>
          <p>${esc(s.service)} <span class="supplier-separator">/</span> ${esc(s.unit)}</p>
        </div>
      </div>
      <div class="supplier-hero-status">${badge(s.status)}<small>${esc(statusText)}</small></div>
    </section>
    ${s.status==="Rejected"&&s.rejectionReason?`<section class="panel" style="padding:18px;margin:16px 0"><h3>Registration rejected — reason</h3><p>${esc(s.rejectionReason)}</p><p>Correct the details and select Resubmit Registration.</p></section>`:""}
    <div class="supplier-metrics">
      <article class="supplier-metric"><div class="supplier-metric-top"><span>Monthly unit rate</span><span class="supplier-metric-icon">RM</span></div><strong>${money(s.rate)}</strong><small>Per ${esc(s.unit).toLowerCase()} / month</small></article>
      <article class="supplier-metric"><div class="supplier-metric-top"><span>Total capacity</span><span class="supplier-metric-icon">▦</span></div><strong>${esc(cap)}</strong><small>${esc(s.unit)} available for allocation</small></article>
      <article class="supplier-metric"><div class="supplier-metric-top"><span>Available capacity</span><span class="supplier-metric-icon">◈</span></div><strong>${esc(available)}</strong><small>Unreserved service units</small></article>
    </div>
    <div class="supplier-details-grid">
      <section class="supplier-section"><div class="supplier-section-heading"><div><span class="supplier-section-eyebrow">BUSINESS INFORMATION</span><h3>Company details</h3></div><span class="supplier-section-symbol">⌘</span></div>
        <dl class="supplier-detail-list">
          <div><dt>Company name</dt><dd>${esc(s.company)}</dd></div>
          <div><dt>Service category</dt><dd>${esc(s.service)}</dd></div>
          <div><dt>Measurement unit</dt><dd>${esc(s.unit)}</dd></div>
          <div><dt>Agreement reference</dt><dd class="supplier-mono">${esc(s.agreement||"Not provided")}</dd></div>
          <div><dt>Partnership service charge</dt><dd>${s.chargeConfirmed?esc(n(s.serviceChargePercent).toFixed(2))+"% of monthly gross service fees":"Not confirmed"}</dd></div>
          <div><dt>Registration status</dt><dd>${badge(s.status)}</dd></div>
        </dl>
      </section>
      <section class="supplier-section"><div class="supplier-section-heading"><div><span class="supplier-section-eyebrow">RESOURCE OVERVIEW</span><h3>Capacity allocation</h3></div><span class="supplier-section-symbol">◉</span></div>
        <div class="supplier-capacity-summary"><strong>${esc(available)} <span>/ ${esc(cap)}</span></strong><small>units available</small></div>
        <div class="supplier-capacity-bar" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100" aria-label="Allocated capacity"><span style="width:${pct}%"></span></div>
        <div class="supplier-capacity-legend"><span><i class="supplier-legend-dot used"></i>Allocated: ${esc(used)}</span><span><i class="supplier-legend-dot free"></i>Available: ${esc(available)}</span></div>
        <div class="supplier-status-note"><span class="supplier-note-icon">ⓘ</span><p>${esc(statusText)}</p></div>
      </section>
    </div>`;
}
// NovaTech owns the internal agreement identifier. Existing supplier references are immutable.
function nextSupplierAgreementReference() {
  const year = todayISO().slice(0,4);
  const prefix = `AGR-${year}-`;
  const used = new Set(db.suppliers.map(s => String(s.agreement || '').trim().toUpperCase()));
  let highest = 0;
  for (const reference of used) {
    if (!reference.startsWith(prefix)) continue;
    const suffix = reference.slice(prefix.length);
    if (/^\d+$/.test(suffix)) highest = Math.max(highest, Number(suffix));
  }
  let serial = highest + 1;
  let reference = `${prefix}${String(serial).padStart(4,'0')}`;
  while (used.has(reference.toUpperCase())) {
    serial++;
    reference = `${prefix}${String(serial).padStart(4,'0')}`;
  }
  return reference;
}
function registerSupplier() {
  if(!role("supplier"))return;
  const old=ownSupplier();
  if(old&&old.status!=="Rejected"&&!(old.status==="Pending Approval"&&!old.agreementFile))
    return toast("Registration is already submitted.");
  modal("Supplier Registration",
    field("Company Name","company","text",old?.company||"")+
    select("Service","service",[
      ["Cloud Hosting","Cloud Hosting"],
      ["Software Licensing","Software Licensing"],
      ["Cybersecurity","Cybersecurity"],
      ["IT Infrastructure","IT Infrastructure"],
      ["Consulting","Consulting"],
      ["Other","Other"]
    ],old?.service)+
    select("Measurement Unit","unit",[
      ["Hosting Instance","Hosting Instance"],
      ["Software Licence","Software Licence"],
      ["Service Hour","Service Hour"],
      ["Device","Device"],
      ["Subscription","Subscription"],
      ["Service Unit","Service Unit"]
    ],old?.unit)+
    field("Price per Unit / Month (RM)","rate","number",old?.rate||"",
      'min="0.01" step="0.01"')+
    field("Total Capacity","capacity","number",old?.capacity||10,
      'min="1" step="1"')+
    `<label>Agreement Reference (automatically generated by NovaTech)
       <input type="text" value="${esc(old?.agreement || nextSupplierAgreementReference())}" readonly aria-readonly="true">
       <small>Assigned automatically on submission; existing references are preserved.</small></label>`+`<label>Service agreement (PDF, max 500 KB)<input type="file" name="agreementFile" accept="application/pdf" required></label><label>Supporting document (PDF, max 500 KB)<input type="file" name="supportFile" accept="application/pdf" required></label>`,
    async v=>{
      const capacity=n(v.capacity);
      if(!Number.isInteger(capacity)||capacity<1||n(v.rate)<=0)
        return toast("Invalid rate or capacity.");
      let agreementFile,supportFile;try{agreementFile=await supplierFile(v.agreementFile);supportFile=await supplierFile(v.supportFile);}catch(e){return toast(e.message);}
      const data={agreementFile,supportFile,reviewedFiles:false,chargeConfirmed:false,serviceChargePercent:null,rejectionReason:"",
        userId:me.id,company:v.company.trim(),service:v.service,
        unit:v.unit,rate:n(v.rate),capacity,
        agreement:old?.agreement || nextSupplierAgreementReference(),
        status:"Pending Approval",date:todayISO()
      };
      if(old)Object.assign(old,data);
      else db.suppliers.push({id:nextId(db.suppliers),...data});
      notifyRole("admin","Supplier registration pending",
        `${v.company} requires approval.`,"suppliers");
      finish("Registration submitted");
    });
}
function renderSuppliers() {
  heading(role("admin")?"Supplier Approvals":"Supplier Directory",
    "Approved services, rates and capacity.");
  const records=role("admin")?db.suppliers:
    db.suppliers.filter(s=>s.status==="Approved");
  const rows=records.map(s=>[
    `<strong>${esc(s.company)}</strong><span class="subtext">
    ${esc(uname(s.userId))}</span>`,
    esc(s.service),esc(s.unit),money(s.rate),
    `${availableCapacity(s)} / ${n(s.capacity)}`,
    s.chargeConfirmed?`${n(s.serviceChargePercent).toFixed(2)}%`:"Not confirmed",
    badge(s.status),
    role("admin")&&s.status==="Pending Approval"?
      `<div class="actions">
      ${btn("Review documents","reviewSupplier",s.id,"outline")} ${btn("Approve","approveSupplier",s.id,"success")}
      ${btn("Reject","rejectSupplier",s.id,"danger")}</div>`:
      role("admin")&&s.status==="Rejected"?`<span title="${esc(s.rejectionReason||"No reason recorded")}">${esc(s.rejectionReason||"No reason recorded")}</span>`:"—"
  ]);
  $("pageContent").innerHTML=panel("Suppliers",
    table(["Company","Service","Unit","Rate","Available / Total",
      "Partnership Charge","Status","Action"],rows));
}
function decideSupplier(id,approve) {
  if(!role("admin"))return;
  const s=supplier(id);
  if(!s||s.status!=="Pending Approval")return;
  if(approve){
    if(!s.agreementFile||!s.supportFile||!s.reviewedFiles||!s.chargeConfirmed)
      return toast("Review agreement, supporting documents and partnership charge first.");
    if(!confirm("Approve supplier?"))return;
    s.status="Approved";s.rejectionReason="";s.reviewedBy=me.id;
    notify(s.userId,"Supplier registration approved",`${s.company}: Approved.`,"registration");
    return save("Supplier approved");
  }
  modal("Reject supplier registration",`<p>Supplier: <strong>${esc(s.company)}</strong></p><p>Explain exactly what must be corrected. The supplier will see this reason and can resubmit.</p>${area("Reason for rejection","reason")}`,v=>{
    const reason=String(v.reason||"").trim();
    if(reason.length<10)return toast("Provide a specific rejection reason (at least 10 characters).");
    s.status="Rejected";s.rejectionReason=reason;s.reviewedBy=me.id;
    notify(s.userId,"Supplier registration rejected",`${s.company}: ${reason}`,"registration");
    finish("Supplier rejected with reason");
  },"Reject registration");
}

/* FINANCE: SUPPLIER BILLING */

function renderSupplierPayments() {
  heading("Supplier Payments","Project-linked monthly service statements.",
    role("finance")?btn("Generate Due Statements","autoStatements")+" "+btn("+ Manual Statement","newSupplierStatement","","outline"):"");
  const records=role("finance")?db.supplierPayments:ownStatements();
  const rows=records.map(p=>[
    `<strong>${esc(pname(p.projectId))}</strong><span class="subtext">
    ${esc(supplier(p.supplierId)?.company)}</span>`,
    esc(p.month),esc(p.description),money(p.grossAmount??p.amount),
    money(p.serviceCharge??0),money(p.amount),badge(p.status),
    role("finance")&&p.status==="Pending"?
      btn("Mark Paid","markSupplierPaid",p.id,"success"):"—"
  ]);
  $("pageContent").innerHTML=panel("Supplier Statements",
    table(["Project / Supplier","Month","Service","Gross Service Fee",
      "Partnership Charge","Net Payable","Status","Action"],rows));
}
function newSupplierStatement() {
  if(!role("finance"))return;
  const list=db.supplierAssignments.filter(a=>
    ["Active","Closed"].includes(a.status)&&a.acceptedDate);
  if(!list.length)return toast("No accepted supplier assignments.");

  modal("Generate Monthly Supplier Statement",
    select("Assignment","assignmentId",list.map(a=>[
      a.id,`${pname(a.projectId)} — ${supplier(a.supplierId)?.company} —
      ${money(a.monthlyCost)}/month`
    ]))+
    field("Billing Month","month","month",previousMonth()),
    v=>{
      const a=assignment(v.assignmentId);
      if(!a||!["Active","Closed"].includes(a.status))
        return toast("Invalid assignment.");
      const first=a.startDate.slice(0,7);
      const last=a.endDate?.slice(0,7);
      if(v.month<first||(last&&v.month>last))
        return toast("Month is outside the service period.");
      if(db.supplierPayments.some(p=>
        p.assignmentId===a.id&&p.month===v.month))
        return toast("Statement already exists for that month.");

      if(v.month>previousMonth())return toast("Only completed months can be billed.");
      const amount=proratedCost(a,v.month);if(amount<=0)return toast("No billable services in that month.");
      const bill=supplierBill(a,amount);if(!bill)return toast("Supplier partnership charge must be confirmed by Admin before billing.");
      db.supplierPayments.push({
        id:nextId(db.supplierPayments),
        assignmentId:a.id,projectId:a.projectId,
        supplierId:a.supplierId,month:v.month,
        description:`${a.quantity} ${a.unit} — ${a.service}`,
        ...bill,status:"Pending",date:todayISO()
      });
      notify(supplier(a.supplierId)?.userId,"Supplier statement generated",
        `${pname(a.projectId)}: gross ${money(bill.grossAmount)}, partnership charge ${money(bill.serviceCharge)}, net payable ${money(bill.amount)} for ${v.month}.`,
        "supplierPayments");
      finish("Supplier statement generated");
    },"Generate Statement");
}
function markSupplierPaid(id) {
  if(!role("finance"))return;
  const p=db.supplierPayments.find(x=>x.id===id);
  if(!p||p.status!=="Pending")return;
  if(!confirm(`Confirm supplier payment of ${money(p.amount)}?`))return;
  p.status="Paid";p.paidBy=me.id;p.paidDate=todayISO();
  notify(supplier(p.supplierId)?.userId,"Supplier payment completed",
    `${pname(p.projectId)}: ${money(p.amount)} marked paid.`,
    "supplierPayments");
  save("Supplier payment recorded");
}

/* FEEDBACK */

function renderFeedback() {
  const eligible=role("client")?ownProjects().filter(p=>
    p.status==="Accepted"&&!db.feedback.some(f=>
      f.projectId===p.id&&f.clientId===me.id)):[];
  heading(role("management")?"Client Feedback":"Project Feedback",
    "Client satisfaction and project evaluation.",
    eligible.length?btn("+ Submit Feedback","newFeedback"):"");
  const records=role("management")?db.feedback:
    db.feedback.filter(f=>f.clientId===me.id);
  const average=records.length?
    (records.reduce((sum,f)=>sum+n(f.rating),0)/records.length).toFixed(1):
    "—";
  const rows=records.map(f=>[
    esc(pname(f.projectId)),esc(uname(f.clientId)),
    `${"★".repeat(n(f.rating))} (${n(f.rating)}/5)`,
    esc(f.quality||"—"),esc(f.communication||"—"),esc(f.delivery||"—"),esc(f.comment),esc(f.date)
  ]);
  $("pageContent").innerHTML=`
    <div class="stats">
      ${stat("Total Reviews",records.length,"☆")}
      ${stat("Average Rating",average==="—"?"—":average+"/5","★")}
    </div>
    ${panel("Feedback Register",
      table(["Project","Client","Overall","Quality","Communication","Delivery","Comments","Date"],rows))}`;
}
function newFeedback() {
  if(!role("client"))return;
  const projects=ownProjects().filter(p=>
    p.status==="Accepted"&&!db.feedback.some(f=>
      f.projectId===p.id&&f.clientId===me.id));
  if(!projects.length)return toast("No eligible projects.");
  modal("Submit Feedback",
    select("Project","projectId",projects.map(p=>[p.id,p.title]))+
    ratingField("Service quality","quality")+ratingField("Communication","communication")+ratingField("Project delivery","delivery")+select("Overall experience","rating",[
      [5,"5 - Excellent"],[4,"4 - Good"],[3,"3 - Average"],
      [2,"2 - Poor"],[1,"1 - Very Poor"]
    ])+
    area("Comments","comment"),
    v=>{
      const p=project(v.projectId);
      if(!p||p.clientId!==me.id||p.status!=="Accepted"||
        db.feedback.some(f=>f.projectId===p.id&&f.clientId===me.id))
        return toast("Feedback unavailable.");
      db.feedback.push({
        id:nextId(db.feedback),projectId:p.id,clientId:me.id,
        quality:n(v.quality),communication:n(v.communication),delivery:n(v.delivery),rating:n(v.rating),comment:v.comment.trim(),date:todayISO()
      });
      notifyRole("management","New client feedback",
        `${p.title}: ${v.rating}/5 stars.`,"feedback");
      finish("Feedback submitted");
    });
}

/* USER MANAGEMENT */

function renderUsers() {
  heading("User Management","Manage staff accounts.",
    btn("+ Create Staff","newUser"));
  const rows=db.users.map(u=>[
    `<strong>${esc(u.name)}</strong><span class="subtext">
    ${esc(u.email)}</span>`,
    esc(ROLES[u.role]),badge(u.active===false?"Inactive":"Active"),
    u.id===me.id?btn("Edit","editUser",u.id,"outline"):
      btn("Edit","editUser",u.id,"outline")+" "+btn(u.active===false?"Enable":"Disable","toggleUser",u.id,"outline")
  ]);
  $("pageContent").innerHTML=panel("Accounts",
    table(["User","Role","Status","Action"],rows));
}
function newUser() {
  if(!role("admin"))return;
  const roles=["manager","developer","finance","management","admin"];
  modal("Create Staff",
    field("Name","name")+field("Email","email","email")+
    select("Role","role",roles.map(r=>[r,ROLES[r]]))+
    field("Password","password","text","",'minlength="8"'),
    v=>{
      const email=v.email.trim().toLowerCase();
      if(!roles.includes(v.role)||v.password.length<8||
        db.users.some(u=>u.email.toLowerCase()===email))
        return toast("Invalid role, password or duplicate email.");
      db.users.push({
        id:nextId(db.users),name:v.name.trim(),email,
        password:v.password,role:v.role,active:true
      });
      finish("Staff account created");
    });
}
function renderAccount(){
  heading("Account Settings","Manage your own account details and password.",btn("Edit profile","editAccount"));
$("pageContent").innerHTML=panel("My account",`<p><strong>Name:</strong> ${esc(me.name)}</p><p><strong>Email:</strong> ${esc(me.email)}</p><p><strong>Role:</strong> ${esc(ROLES[me.role])}</p>${btn("Edit profile / password","editAccount")}`);
}
function editAccount(){
  if(!me)return;
  modal("Edit my account",field("Full name","name","text",me.name)+field("Email","email","email",me.email)+
    optional("Current password (required to change password)","currentPassword","password")+
    optional("New password (leave blank to keep existing)","newPassword","password")+
    optional("Confirm new password","confirmPassword","password"),v=>{
      const name=String(v.name||"").trim(),email=String(v.email||"").trim().toLowerCase();
      if(name.length<2||!email.includes("@"))return toast("Enter a valid name and email.");
      if(db.users.some(u=>u.id!==me.id&&u.email.toLowerCase()===email))return toast("Email is already in use.");
      if(v.newPassword||v.currentPassword||v.confirmPassword){
        if(v.currentPassword!==me.password)return toast("Current password is incorrect.");
        if(String(v.newPassword||"").length<8||v.newPassword!==v.confirmPassword)return toast("New password must be at least 8 characters and match confirmation.");
        me.password=v.newPassword;
      }
      me.name=name;me.email=email;
      finish("Account updated");
    },"Save account");
}
function editUser(id){
  if(!role("admin"))return;
  const u=user(id);if(!u)return;
  modal("Edit user — "+u.name,field("Full name","name","text",u.name)+field("Email","email","email",u.email)+
    select("Role","role",Object.entries(ROLES),u.role)+
    optional("New password (leave blank to keep existing)","password","password"),v=>{
      const name=String(v.name||"").trim(),email=String(v.email||"").trim().toLowerCase();
      if(name.length<2||!email.includes("@")||!ROLES[v.role])return toast("Invalid user details.");
      if(db.users.some(x=>x.id!==u.id&&x.email.toLowerCase()===email))return toast("Email is already in use.");
      if(v.password&&v.password.length<8)return toast("New password must be at least 8 characters.");
      if(u.id===me.id&&v.role!==u.role)return toast("You cannot change your own administrator role.");
      u.name=name;u.email=email;u.role=v.role;
      if(v.password)u.password=v.password;
      notify(u.id,"Account updated","An administrator updated your account details.","notifications");
      finish("User account updated");
    },"Save user");
}
function toggleUser(id) {
  if(!role("admin")||id===me.id)return;
  const u=user(id);if(!u)return;
  if(!confirm(`${u.active===false?"Enable":"Disable"} ${u.name}?`))return;
  u.active=u.active===false;save("User access updated");
}

/* REPORTS */

function renderReports() {
  const projects=role("manager")?ownProjects():db.projects;
  const received=db.payments.filter(p=>p.status==="Paid")
    .reduce((sum,p)=>sum+n(p.amount),0);
  const paid=db.supplierPayments.filter(p=>p.status==="Paid")
    .reduce((sum,p)=>sum+n(p.amount),0);
  const due=db.payments.filter(p=>p.status!=="Paid")
    .reduce((sum,p)=>sum+n(p.amount),0);
  heading("Reports & Analytics","Project and financial overview.",
    btn("Export CSV","exportProjects","","outline"));
  const rows=projects.map(p=>[
    esc(p.reference||`NVT-${p.id}`),esc(p.title),esc(uname(p.clientId)),money(p.budget),
    `${n(p.progress)}%`,badge(p.status),esc(p.deadline||"—")
  ]);
  $("pageContent").innerHTML=`
    <div class="stats">
      ${stat("Client Payments Received",money(received),"▥")}
      ${stat("Client Payments Outstanding",money(due),"◷")}
      ${stat("Supplier Payments Made",money(paid),"▤")}
      ${stat("Cash Movement",money(received-paid),"◇")}
    </div>
    <div class="stats" style="margin-top:20px">
      ${stat("Total Clients",db.users.filter(u=>u.role==="client").length,"♙")}
      ${stat("Employees",db.users.filter(u=>["manager","developer","finance"].includes(u.role)).length,"☑")}
      ${stat("Approved Suppliers",db.suppliers.filter(x=>x.status==="Approved").length,"▤")}
      ${stat("Completed Projects",projects.filter(x=>x.status==="Accepted").length,"▣")}
    </div>
    ${panel("Project Register",
      table(["Reference","Project","Client","Budget","Progress","Status","Deadline"],rows))}`;
}
function exportProjects() {
  if(!role("manager","finance","management","admin"))return;
  const rows=[
    ["ID","Project","Client","Budget","Progress","Status"],
    ...(role("manager")?ownProjects():db.projects).map(p=>[
      p.id,p.title,uname(p.clientId),p.budget,p.progress,p.status
    ])
  ];
  const quote=v=>{
    let s=String(v??"");
    if(/^[=+\-@\t\r]/.test(s))s="'"+s;
    return `"${s.replace(/"/g,'""')}"`;
  };
  const csv=rows.map(r=>r.map(quote).join(",")).join("\r\n");
  const url=URL.createObjectURL(new Blob(["\uFEFF"+csv],{
    type:"text/csv;charset=utf-8"
  }));
  const a=document.createElement("a");
  a.href=url;a.download="novatech-projects.csv";
  document.body.appendChild(a);a.click();a.remove();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
}

/* NOTIFICATION ACTIONS */

function readNotification(id) {
  const x=db.notifications.find(x=>x.id===id&&x.userId===me.id);
  if(!x)return;
  x.read=true;saveData(db);render();
}
function openNotification(id) {
  const x=db.notifications.find(x=>x.id===id&&x.userId===me.id);
  if(!x)return;
  x.read=true;saveData(db);
  navigate(allowed(x.target)?x.target:"notifications");
}
function readAll() {
  db.notifications.filter(x=>x.userId===me.id)
    .forEach(x=>x.read=true);
  saveData(db);render();toast("All notifications marked read");
}
function finishWithoutModal(s) {save(s);}

/* NovaTech prototype extensions: integrated into app.js at build time. */
function dateAfter(days){const d=new Date(todayISO()+"T12:00:00");d.setDate(d.getDate()+days);return new Date(d.getTime()-d.getTimezoneOffset()*60000).toISOString().slice(0,10);}
function previousMonth(){const d=new Date(todayISO()+"T12:00:00");d.setDate(1);d.setMonth(d.getMonth()-1);return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;}
function expireProposals(){
 let changed=false;
 db.proposals.forEach(p=>{
  if(p.status==='Pending Client Approval'&&p.expiryDate&&p.expiryDate<todayISO()){
   p.status='Expired';const r=db.requests.find(x=>x.id===p.requestId);
   if(r)r.status='Cancelled (Proposal Expired)';
   const client=r?.clientId;
   if(client)notify(client,'Proposal expired',`${p.title} was not approved by ${p.expiryDate}.`,'proposals');
   notify(p.managerId,'Proposal expired',`${p.title}: client approval deadline passed.`,'proposals');changed=true;
  }
 });return changed;
}
function cancelMeeting(id){
 const m=db.meetings.find(x=>x.id===id);
 if(!m||m.status!=='Scheduled'||m.createdBy!==me.id||!role('client','manager'))return toast('Only the meeting organizer can cancel this meeting.');
 modal('Cancel Meeting',`<div class="notice warning">The meeting will be cancelled for every invited participant.</div>`+area('Cancellation Reason','reason'),v=>{
  if(!v.reason.trim())return toast('A cancellation reason is required.');
  m.status='Cancelled';m.cancelledBy=me.id;m.cancelReason=v.reason.trim();m.cancelledDate=todayISO();
  db.meetingInvitations.filter(i=>i.meetingId===m.id).forEach(i=>{
   if(i.userId!==me.id)notify(i.userId,'Meeting cancelled',`${m.title} was cancelled by ${me.name}. Reason: ${m.cancelReason}`,'meetings');
  });finish('Meeting cancelled and participants notified');
 },'Confirm Cancellation');
}
function renderMilestones(){
 heading('Project Milestones','Project schedule, target dates and delivery checkpoints.',role('manager')?btn('+ Add Milestone','newMilestone'):'');
 const rows=db.milestones.filter(m=>canProject(m.projectId)).map(m=>[
  `<strong>${esc(m.title)}</strong><span class="subtext">${esc(m.description)}</span>`,esc(pname(m.projectId)),esc(m.startDate||'—'),esc(m.dueDate),badge(m.status),
  role('manager')&&project(m.projectId)?.managerId===me.id&&m.status!=='Completed'&&project(m.projectId)?.status==='In Progress'?btn('Mark Complete','completeMilestone',m.id,'success'):'—'
 ]);
 $('pageContent').innerHTML=panel('Milestone Schedule',table(['Milestone','Project','Start','Due','Status','Action'],rows));
}
function newMilestone(){
 if(!role('manager'))return;
 const ps=ownProjects().filter(p=>p.status==='In Progress');if(!ps.length)return toast('No active project.');
 modal('Create Milestone',select('Project','projectId',ps.map(p=>[p.id,p.title]))+field('Milestone','title')+area('Deliverable / Description','description')+field('Start Date','startDate','date',todayISO())+field('Target Completion','dueDate','date'),v=>{
  const p=project(v.projectId);if(p?.managerId!==me.id||p.status!=='In Progress'||v.dueDate<v.startDate)return toast('Invalid project or date range.');
  db.milestones.push({id:nextId(db.milestones),projectId:p.id,title:v.title.trim(),description:v.description.trim(),startDate:v.startDate,dueDate:v.dueDate,status:'Scheduled',createdBy:me.id});
  notify(p.clientId,'Project milestone planned',`${p.title}: ${v.title} due ${v.dueDate}`,'milestones');finish('Milestone created');
 });
}
function completeMilestone(id){const m=db.milestones.find(x=>x.id===id),p=project(m?.projectId);if(!role('manager')||p?.managerId!==me.id||p.status!=='In Progress'||m?.status==='Completed')return;
 m.status='Completed';m.completedDate=todayISO();notify(p.clientId,'Milestone completed',`${p.title}: ${m.title}`,'milestones');save('Milestone completed');}
function renderIssues(){
 heading('Issue Tracker','Report defects, blockers and corrective actions.',role('manager','developer')?btn('+ Report Issue','newIssue'):'');
 const rows=db.issues.filter(i=>canProject(i.projectId)).map(i=>[
  `<strong>${esc(i.title)}</strong><span class="subtext">${esc(i.description)}</span>`,esc(pname(i.projectId)),esc(uname(i.reportedBy)),badge(i.severity),badge(i.status),
  btn("View Resolution","viewIssue",i.id,"outline")+" "+(role('manager')&&project(i.projectId)?.managerId===me.id&&i.status!=='Resolved'?btn('Resolve','resolveIssue',i.id,'success'):'')
 ]);
 $('pageContent').innerHTML=panel('Issues',table(['Issue','Project','Reported By','Severity','Status','Action'],rows));
}
function newIssue(){
 if(!role('manager','developer'))return;const ps=ownProjects().filter(p=>p.status==='In Progress');if(!ps.length)return toast('No active projects.');
 modal('Report Issue',select('Project','projectId',ps.map(p=>[p.id,p.title]))+field('Issue Title','title')+area('Description','description')+select('Severity','severity',[['Low','Low'],['Medium','Medium'],['High','High'],['Critical','Critical']]),v=>{
  const p=project(v.projectId);if(!p||!canProject(p.id)||p.status!=='In Progress')return toast('Invalid project.');
  db.issues.push({id:nextId(db.issues),projectId:p.id,title:v.title.trim(),description:v.description.trim(),severity:v.severity,status:'Open',reportedBy:me.id,date:todayISO()});
  notify(p.managerId,'Project issue reported',`${p.title}: ${v.title}`,'issues');finish('Issue reported');
 });
}
function resolveIssue(id){
 const i=db.issues.find(x=>x.id===id),p=project(i?.projectId);
 if(!role('manager')||p?.managerId!==me.id||i?.status!=='Open')return toast('Unavailable.');
 modal('Resolve Issue',area('Resolution Notes','resolution'),v=>{
  i.status='Resolved';i.resolution=v.resolution.trim();i.resolvedBy=me.id;i.resolvedDate=todayISO();notify(i.reportedBy,'Issue resolved',`${i.title}: ${i.resolution}`,'issues');finish('Issue resolved');
 });
}
function renderMessages(){
 heading('Project Communication','Project discussion and client requirements.',btn('+ New Message','newMessage'));
 const rows=db.messages.filter(m=>canProject(m.projectId)&&(m.from===me.id||m.to===me.id)).map(m=>[
  `<strong>${esc(pname(m.projectId))}</strong>`,esc(uname(m.from)),esc(uname(m.to)),`<strong>${esc(m.subject)}</strong><span class="subtext">${esc(m.body)}</span>`,esc(m.date.slice(0,16).replace('T',' ')),btn("Read","viewMessage",m.id,"outline")+" "+btn("Reply","replyMessage",m.id)
 ]);
 $('pageContent').innerHTML=panel('Messages',table(['Project','From','To','Message','Sent','Actions'],rows));
}
function newMessage(){
 const ps=ownProjects().filter(p=>['In Progress','Awaiting Client Acceptance'].includes(p.status));if(!ps.length)return toast('No active project.');
 const people=[...new Set(ps.flatMap(p=>participants(p.id).map(u=>u.id)))].filter(id=>id!==me.id).map(id=>[id,uname(id)]);
 if(!people.length)return toast('No project participants available.');
 modal('Send Project Message',select('Project','projectId',ps.map(p=>[p.id,p.title]))+select('Recipient','to',people)+field('Subject','subject')+area('Message / Additional Requirements','body'),v=>{
  const p=project(v.projectId),to=Number(v.to);if(!p||!canProject(p.id)||!participants(p.id).some(u=>u.id===to)||to===me.id)return toast('Recipient is not part of this project.');
  db.messages.unshift({id:nextId(db.messages),projectId:p.id,from:me.id,to,subject:v.subject.trim(),body:v.body.trim(),date:dateNow()});
  notify(to,'New project message',`${p.title}: ${v.subject}`,'messages');finish('Message sent');
 });
}
function renderStaff(){
 heading('Employee Skills & Availability','Maintain employee skills and workload limits.');
 const rows=db.users.filter(u=>u.role==='developer').map(u=>[
  esc(u.name),esc(u.position||"Project Team Member"),esc(u.skills||'Not configured'),esc((u.availableFrom||"Any date")+" – "+(u.availableUntil||"Open")),`${db.tasks.filter(t=>t.assigneeId===u.id&&!['Completed','Closed'].includes(t.status)).length} / ${n(u.maxTasks||3)} tasks`,badge(u.active===false?'Inactive':'Active'),
  role('admin','manager')?btn('Edit Skills','editStaff',u.id,'outline'):'—'
 ]);
 $('pageContent').innerHTML=panel('Development Team',table(['Employee','Position','Skills','Availability','Workload','Status','Action'],rows));
}
function editStaff(id){
 const u=user(id);if(!role('admin','manager')||u?.role!=='developer')return;
 modal('Employee Skills & Capacity',`<div class="notice">Skills must be comma-separated. Capacity is the maximum number of open tasks.</div>`+select('Position','position',['Software Engineer','Business Analyst','UI/UX Designer','Software Tester','Other'].map(x=>[x,x]),u.position)+optional('Available from','availableFrom','date',u.availableFrom||'')+optional('Available until','availableUntil','date',u.availableUntil||'')+field('Skills','skills','text',u.skills||'')+field('Maximum Open Tasks','maxTasks','number',u.maxTasks||3,'min="1" max="20"'),v=>{
  if(!Number.isInteger(Number(v.maxTasks))||Number(v.maxTasks)<1||Number(v.maxTasks)>20)return toast('Invalid capacity.');
  if(v.availableFrom&&v.availableUntil&&v.availableFrom>v.availableUntil)return toast("Invalid availability dates.");u.position=v.position;u.availableFrom=v.availableFrom;u.availableUntil=v.availableUntil;u.skills=v.skills.trim();u.maxTasks=Number(v.maxTasks);finish('Employee skills updated');
 });
}
function evaluateChange(id){
 const c=db.changes.find(x=>x.id===id),p=project(c?.projectId);
 if(!role('manager')||p?.managerId!==me.id||c?.status!=='Pending Manager Evaluation')return toast('Unavailable.');
 modal('Evaluate Change Impact',field('Additional Cost (RM)','cost','number',c.cost,'min="0" step="0.01"')+field('Schedule Delay (days)','delayDays','number',c.delayDays||0,'min="0" step="1"')+area('Resource Impact','resourceImpact',c.resourceImpact||'')+area('Evaluation / Justification','evaluation'),v=>{
  if(n(v.cost)<0||n(v.delayDays)<0)return toast('Invalid impact.');
  c.cost=n(v.cost);c.delayDays=n(v.delayDays);c.resourceImpact=v.resourceImpact.trim();c.evaluation=v.evaluation.trim();c.evaluatedBy=me.id;c.status='Pending Client Approval';
  notify(p.clientId,'Change impact awaiting approval',`${p.title}: ${c.title}; cost ${money(c.cost)}, delay ${c.delayDays} days.`,'changes');finish('Change evaluated');
 });
}
function fileData(file){return new Promise((resolve,reject)=>{const r=new FileReader();r.onload=()=>resolve(r.result);r.onerror=()=>reject(new Error('File read failed'));r.readAsDataURL(file);});}
function downloadDocument(id){
 const d=db.documents.find(x=>x.id===id);if(!d||!canProject(d.projectId)||!d.dataUrl)return toast('File unavailable.');
 const a=document.createElement('a');a.href=d.dataUrl;a.download=d.filename||'document';document.body.appendChild(a);a.click();a.remove();
}
function proratedCost(a,month){
 if(!/^\d{4}-\d{2}$/.test(month))return 0;
 const [year,mon]=month.split('-').map(Number),days=new Date(year,mon,0).getDate();
 const first=month+'-01',last=month+'-'+String(days).padStart(2,'0');
 const start=(a.acceptedDate&&a.startDate)?(a.acceptedDate>a.startDate?a.acceptedDate:a.startDate):(a.acceptedDate||a.startDate||first);
 const end=a.endDate||last;
 if(start>last||end<first)return 0;
 const s=Math.max(1,Number((start>first?start:first).slice(8,10)));
 const e=Math.min(days,Number((end<last?end:last).slice(8,10)));
 return Math.round(n(a.monthlyCost)*Math.max(0,e-s+1)/days*100)/100;
}
function supplierBill(a,gross){
 const s=supplier(a.supplierId);
 // A confirmed rate is required; zero is a valid explicitly agreed rate.
 if(!s||!s.chargeConfirmed||!Number.isFinite(Number(s.serviceChargePercent))||Number(s.serviceChargePercent)<0||Number(s.serviceChargePercent)>100)return null;
 const percent=Number(s.serviceChargePercent);
 const charge=Math.round(gross*percent)/100;
 return {grossAmount:gross,serviceCharge:Math.round(charge*100)/100,amount:Math.round((gross-charge)*100)/100,serviceChargePercent:percent};
}
function generateDueStatements(){
 const lastMonth=previousMonth(),list=db.supplierAssignments.filter(a=>a.acceptedDate&&['Active','Closed'].includes(a.status));let count=0;
 list.forEach(a=>{
  for(let month=a.acceptedDate.slice(0,7);month<=lastMonth;month=nextMonth(month)){
  if(db.supplierPayments.some(p=>p.assignmentId===a.id&&p.month===month))continue;
  const amount=proratedCost(a,month);if(amount<=0)continue;
  const bill=supplierBill(a,amount);if(!bill)continue;
  db.supplierPayments.push({id:nextId(db.supplierPayments),assignmentId:a.id,projectId:a.projectId,supplierId:a.supplierId,month,description:`${a.quantity} ${a.unit} — ${a.service} (${month}, prorated)`,...bill,status:'Pending',date:todayISO()});
  notify(supplier(a.supplierId)?.userId,'Monthly statement ready',`${pname(a.projectId)}: gross ${money(bill.grossAmount)}, charge ${money(bill.serviceCharge)}, net ${money(bill.amount)} for ${month}.`,'supplierPayments');count++;
 } });
 return count;
}
function autoStatements(){if(!role('finance'))return;const count=generateDueStatements();save(`${count} new supplier statement(s) generated`);}

/* ACTION ROUTER */

function handleAction(e) {
  const b=e.target.closest("[data-action]");
  if(!b)return;
  const id=Number(b.dataset.id);
  if(!allowed(page))return;
  const actions={
    goNotifications:()=>navigate("notifications"),
    readNotification:()=>readNotification(id),
    openNotification:()=>openNotification(id),
    readAll,
    newRequest,
    acceptRequest:()=>decideRequest(id,true),
    rejectRequest:()=>decideRequest(id,false),
    newProposal:()=>newProposal(id),chooseProposalRequest,viewRequest:()=>viewRequest(id),viewProposal:()=>viewProposal(id),
    approveProposal:()=>decideProposal(id,true),
    rejectProposal:()=>decideProposal(id,false),
    editProject:()=>editProject(id),viewProject:()=>viewProject(id),
    submitProject:()=>submitProject(id),
    requestProjectCancellation:()=>requestProjectCancellation(id),
    withdrawProjectCancellation:()=>withdrawProjectCancellation(id),
    reviewProjectCancellation:()=>reviewProjectCancellation(id),
    acceptProject:()=>acceptProject(id),
    rejectProject:()=>rejectProject(id),
    newTask,
    editTask:()=>editTask(id),editTaskDates:()=>editTaskDates(id),viewTask:()=>viewTask(id),
    approveTask:()=>approveTask(id),
    rejectTask:()=>rejectTask(id),
    newSupplierAssignment,
    acceptAssignment:()=>acceptAssignment(id),
    rejectAssignment:()=>rejectAssignment(id),
    endAssignment:()=>endAssignment(id),supplierStopService:()=>supplierStopService(id),cancelSupplierRequest:()=>cancelSupplierRequest(id),viewSupplierAssignment:()=>viewSupplierAssignment(id),
    newMeeting,
    cancelMeeting:()=>cancelMeeting(id),
    newMilestone,completeMilestone:()=>completeMilestone(id),
    newIssue,resolveIssue:()=>resolveIssue(id),viewIssue:()=>viewIssue(id),
    newMessage,viewMessage:()=>viewMessage(id),replyMessage:()=>replyMessage(id),
    editStaff:()=>editStaff(id),
    downloadDocument:()=>downloadDocument(id),
    removeDocument:()=>removeDocument(id),
    autoStatements,
    acceptMeeting:()=>acceptMeeting(id),
    declineMeeting:()=>declineMeeting(id),
    editMeeting:()=>editMeeting(id),viewMeeting:()=>viewMeeting(id),
    newChange,viewChange:()=>viewChange(id),
    evaluateChange:()=>evaluateChange(id),
    approveChange:()=>decideChange(id,true),
    rejectChange:()=>decideChange(id,false),
    newDocument,
    payClient:()=>payClient(id),
    markPayment:()=>markPayment(id),
    registerSupplier,
    approveSupplier:()=>decideSupplier(id,true),
    rejectSupplier:()=>decideSupplier(id,false),
    newSupplierStatement,
    markSupplierPaid:()=>markSupplierPaid(id),
    newFeedback,newUser,editAccount,editUser:()=>editUser(id),
    toggleUser:()=>toggleUser(id),
    exportProjects, completionRecord:()=>completionRecord(id),reviewSupplier:()=>reviewSupplier(id),settingsEdit, downloadSupplierAgreement:()=>downloadSupplierFile(id,"agreementFile"),downloadSupplierSupport:()=>downloadSupplierFile(id,"supportFile")
  };
  actions[b.dataset.action]?.();
}

function safeMeetingURL(v){try{const u=new URL(v);return u.protocol==='https:'||u.protocol==='http:'?u.href:'';}catch{return '';}}
function ratingField(label,key){return select(label,key,[5,4,3,2,1].map(x=>[x,x+' / 5']));}
function nextMonth(month){const [y,m]=month.split('-').map(Number);return `${y+(m===12?1:0)}-${String(m===12?1:m+1).padStart(2,'0')}`;}
async function supplierFile(f){if(!f||f.type!=='application/pdf'||!f.size||f.size>500000)throw Error('Choose a PDF under 500 KB.');return {name:f.name,data:await fileData(f)};}
function downloadSupplierFile(id,key){const s=supplier(id);if(!s||!role('admin')&&s.userId!==me.id)return;const f=s[key];if(!f)return toast('No file uploaded');const a=document.createElement('a');a.href=f.data;a.download=f.name;a.click();}
function reviewSupplier(id){const s=supplier(id);if(!role('admin')||!s||s.status!=='Pending Approval')return;modal('Review supplier agreement',`<p>${esc(s.company)} — ${esc(s.agreement)}</p><p>${esc(s.agreementFile?.name||'Missing agreement')} ${btn('Download agreement','downloadSupplierAgreement',id,'outline')}</p><p>${esc(s.supportFile?.name||'Missing supporting document')} ${btn('Download supporting document','downloadSupplierSupport',id,'outline')}</p><p>Enter the partnership service charge percentage stated in the signed agreement. Enter 0 only when the agreement explicitly specifies no charge. This percentage is deducted from gross supplier service fees when new monthly statements are generated.</p>${field('Agreed partnership charge (%)','charge','number',s.serviceChargePercent??'','min="0" max="100" step="0.01"')}<label><input type="checkbox" name="reviewed" required> I verified both documents, the service rate, and the partnership charge against the agreement.</label>`,v=>{if(!s.agreementFile||!s.supportFile||!v.reviewed)return toast('Both documents and confirmation are required.');const pct=Number(v.charge);if(!Number.isFinite(pct)||pct<0||pct>100||v.charge==='')return toast('Enter a valid agreed percentage from 0 to 100.');s.serviceChargePercent=pct;s.chargeConfirmed=true;s.reviewedFiles=true;finish('Documents and partnership charge reviewed');},'Confirm review');}
function completionRecord(id){const p=project(id);if(!p||!canProject(id)||p.status!=='Accepted')return;const invoices=db.payments.filter(x=>x.projectId===id),paid=invoices.filter(x=>x.status==='Paid').reduce((s,x)=>s+n(x.amount),0);modal('Final project completion record',`<h3>${esc(p.title)}</h3><p>Reference: ${esc(p.reference)}</p><p>Client: ${esc(uname(p.clientId))}</p><p>Accepted: ${esc(p.acceptedDate)}</p><p>Approved budget: ${money(p.budget)}</p><p>Verified payments: ${money(paid)}</p><p>Outstanding: ${money(Math.max(0,p.budget-paid))}</p><p>Completed tasks: ${db.tasks.filter(t=>t.projectId===id&&t.status==='Completed').length}</p><button type="button" class="btn" onclick="window.print()">Print record</button>`,()=>closeModal(),'Close');}
let ganttProject = '';
function ganttChart(projectId) {
 const day=86400000, parse=s=>/^\d{4}-\d{2}-\d{2}$/.test(s||'')?Date.parse(s):NaN;
 const items=[...db.tasks.filter(t=>canProject(t.projectId)&&(!projectId||String(t.projectId)===projectId)).map(t=>({title:t.title,projectId:t.projectId,start:t.start,end:t.due,status:t.status,progress:t.progress,detail:uname(t.assigneeId)})),...db.milestones.filter(m=>canProject(m.projectId)&&(!projectId||String(m.projectId)===projectId)).map(m=>({title:m.title,projectId:m.projectId,start:m.dueDate,end:m.dueDate,status:m.status,milestone:true,detail:'Milestone'}))].map(t=>({...t,a:parse(t.start),b:parse(t.end)})).filter(t=>Number.isFinite(t.a)&&Number.isFinite(t.b)&&t.b>=t.a).sort((a,b)=>a.a-b.a);
 if(!items.length)return empty('No scheduled items','Add tasks with start and due dates or create milestones to populate the Gantt chart.');
 const min=Math.min(...items.map(t=>t.a)),max=Math.max(...items.map(t=>t.b))+day,span=(max-min)/day,step=span<=21?1:span<=120?7:Math.ceil(span/12),cols=Math.ceil(span/step),width=Math.max(650,cols*65),today=parse(todayISO());
 const pct=d=>(d-min)/(max-min)*100,fmt=d=>new Date(d).toISOString().slice(0,10),marker=today>=min&&today<max?`<i class="gantt-today" style="left:${pct(today)}%"></i>`:'';
 const ticks=Array.from({length:cols},(_,i)=>`<span style="left:${pct(min+i*step*day)}%">${fmt(min+i*step*day).slice(5)}</span>`).join('');
 const grid=Array.from({length:cols},(_,i)=>`<i class="gantt-gridline" style="left:${pct(min+i*step*day)}%"></i>`).join('');
 return `<div class="gantt-legend"><span>🟣 In progress</span><span>🟢 Completed</span><span>⚪ Pending / other</span><span>🔴 Overdue</span><span>◆ Milestone</span><span>│ Today (when in range)</span></div><p class="muted">${fmt(min)} to ${fmt(max-day)} · Dates in MM-DD · Scroll horizontally to view timeline.</p><div class="gantt-scroll"><div class="gantt-table" style="--timeline-width:${width}px"><div class="gantt-row gantt-head"><div>Task / Milestone</div><div class="gantt-axis">${ticks}${marker}</div></div>${items.map(t=>{const done=t.status==='Completed',overdue=!done&&!['Closed','Cancelled'].includes(t.status)&&t.b<today,kind=done?'done':overdue?'late':t.status==='In Progress'?'doing':'pending',p=done?100:Math.max(0,Math.min(100,Number(t.progress)||0)),label=esc(`${t.title} | ${fmt(t.a)} to ${fmt(t.b)} | ${t.status}${t.milestone?'':` | ${p}%`}`);return `<div class="gantt-row"><div class="gantt-name"><strong>${esc(t.title)}</strong><small>${esc(pname(t.projectId))} · ${esc(t.detail)} · ${esc(t.status)}${t.milestone?'':` · ${p}%`}</small></div><div class="gantt-axis">${grid}${t.milestone?`<span class="gantt-diamond ${kind}" style="left:${pct(t.a+day/2)}%" title="${label}" aria-label="${label}"></span>`:`<span class="gantt-bar ${kind}" style="left:${pct(t.a)}%;width:${pct(t.b+day)-pct(t.a)}%" title="${label}" aria-label="${label}"><i style="width:${p}%"></i></span>`}${marker}</div></div>`;}).join('')}</div></div>`;
}
function renderSchedule(){
 heading('Project Schedule','Task dates, dependencies and delivery timeline.',role('manager')?btn('+ Assign Task','newTask'):'');
 const ps=ownProjects();if(!ps.some(p=>String(p.id)===ganttProject))ganttProject='';
 const tasks=db.tasks.filter(t=>canProject(t.projectId)&&(!ganttProject||String(t.projectId)===ganttProject));
 $('pageContent').innerHTML=panel('Project Gantt Chart',`<label class="gantt-filter">Project<select id="ganttProject"><option value="">All projects</option>${ps.map(p=>`<option value="${p.id}" ${String(p.id)===ganttProject?'selected':''}>${esc(p.title)}</option>`).join('')}</select></label>${ganttChart(ganttProject)}`)+panel('Task Schedule',table(['Task / Project','Assigned to','Start','End','Predecessor','Status'],tasks.map(t=>[esc(t.title)+'<span class="subtext">'+esc(pname(t.projectId))+'</span>',esc(uname(t.assigneeId)),esc(t.start||'Not set'),esc(t.due),esc(db.tasks.find(x=>x.id===t.predecessor)?.title||'None'),badge(t.status)])));
 $('ganttProject').onchange=e=>{ganttProject=e.target.value;renderSchedule();};
}

function renderSettings(){if(!role('admin'))return;heading('System Settings','Configure workspace preferences and optional module access.',btn('Edit settings','settingsEdit'));$('pageContent').innerHTML=panel('Workspace',`<p>Company: ${esc(db.settings?.company||'NovaTech Solutions')}</p><p>Support contact: ${esc(db.settings?.support||'Not set')}</p><p>Testing clock: ${db.settings?.testMode?esc(db.settings.testDate)+' (SIMULATED)':'Real date'}</p>`)+panel('Role permissions',table(['Role','Disabled modules'],Object.entries(ROLES).map(([k,v])=>[esc(v),esc((db.settings?.disabled?.[k]||[]).join(', ')||'None')])));}
function settingsEdit(){if(!role('admin'))return;modal('System settings',field('Company name','company','text',db.settings?.company||'NovaTech Solutions')+optional('Support email','support','email',db.settings?.support||'')+`<fieldset><legend>Prototype testing clock (admin only)</legend><label><input type="checkbox" name="testMode" ${db.settings?.testMode?'checked':''}> Enable simulated date for testing</label>`+optional('Simulated date','testDate','date',db.settings?.testDate||todayISO())+`<p>For UAT only. Restore the real date when finished.</p></fieldset>`+Object.entries(MENUS).filter(([k])=>k!=='admin').map(([k,items])=>`<fieldset><legend>${esc(ROLES[k])}: disable optional pages</legend>${items.filter(([x])=>!['overview','notifications'].includes(x)).map(([x,l])=>`<label><input type="checkbox" name="${k}_${x}" ${(db.settings?.disabled?.[k]||[]).includes(x)?'checked':''}> ${esc(l)}</label>`).join('')}</fieldset>`).join(''),v=>{const disabled={};for(const [k,items] of Object.entries(MENUS))if(k!=='admin')disabled[k]=items.filter(([x])=>v[k+'_'+x]).map(([x])=>x);db.settings={company:v.company,support:v.support,disabled,testDate:v.testDate||'',testMode:!!v.testMode};finish('Settings saved');});}
setupAuth();
$('modalBody').addEventListener('click',handleAction);
setInterval(()=>{if(!me||modalAction)return;db=loadData();const changed=expireProposals(),billed=generateDueStatements();const reminded=meetingReminderScan();if(changed||billed||reminded){saveData(db);render();}},60000);

