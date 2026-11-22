
"use strict";

const STORAGE_KEY = "novatech_v3";
const SESSION_KEY = "novatech_v3_session";

const ROLES = {
  client:"Client",
  manager:"Project Manager",
  developer:"Project Team Member",
  finance:"Finance Officer",
  supplier:"External Supplier",
  management:"Company Management",
  admin:"System Administrator"
};

const MENUS = {
  client:[
    ["overview","Overview","◈"],
    ["notifications","Notifications","♧"],
    ["requests","Project Requests","▤"],
    ["proposals","Proposals","◇"],
    ["projects","My Projects","▣"],
    ["milestones","Milestones","▦"],
    ["messages","Messages","✉"],
    ["changes","Change Requests","↗"],
    ["meetings","Meetings","▦"],
    ["documents","Documents","▧"],
    ["payments","Payments","▥"],
    ["feedback","Feedback","☆"]
  ],
  manager:[
    ["overview","Overview","◈"],
    ["notifications","Notifications","♧"],
    ["requests","Client Requests","▤"],
    ["proposals","Proposals","◇"],
    ["projects","Projects","▣"],
    ["tasks","Team Tasks","☑"],
    ["schedule","Project Schedule","▦"],
    ["milestones","Milestones","▦"],
    ["issues","Issue Tracker","⚑"],
    ["messages","Messages","✉"],
    ["staff","Staff Skills","♙"],
    ["supplierAssignments","Supplier Assignments","♧"],
    ["changes","Change Requests","↗"],
    ["meetings","Meetings","▦"],
    ["documents","Documents","▧"],
    ["reports","Reports","▥"]
  ],
  developer:[
    ["overview","Overview","◈"],
    ["notifications","Notifications","♧"],
    ["projects","Assigned Projects","▣"],
    ["tasks","My Tasks","☑"],
    ["schedule","Project Schedule","▦"],
    ["milestones","Milestones","▦"],
    ["issues","Issue Tracker","⚑"],
    ["messages","Messages","✉"],
    ["changes","Change Requests","↗"],
    ["meetings","Meetings","▦"],
    ["documents","Documents","▧"]
  ],
  finance:[
    ["overview","Overview","◈"],
    ["notifications","Notifications","♧"],
    ["payments","Client Payments","▥"],
    ["supplierAssignments","Supplier Services","♧"],
    ["supplierPayments","Supplier Payments","▤"],
    ["reports","Financial Reports","▣"]
  ],
  supplier:[
    ["overview","Overview","◈"],
    ["notifications","Notifications","♧"],
    ["registration","Company Registration","▤"],
    ["supplierAssignments","Service Requests","♧"],
    ["supplierPayments","Payment Statements","▥"]
  ],
  management:[
    ["overview","Overview","◈"],
    ["notifications","Notifications","♧"],
    ["projects","Project Portfolio","▣"],
    ["supplierAssignments","Supplier Services","♧"],
    ["suppliers","Supplier Directory","▤"],
    ["feedback","Client Feedback","☆"],
    ["reports","Management Reports","▥"]
  ],
  admin:[
    ["overview","Overview","◈"],
    ["notifications","Notifications","♧"],
    ["users","User Management","♙"],
    ["settings","System Settings","⚙"],
    ["staff","Staff Skills","☑"],
    ["suppliers","Supplier Approvals","▤"],
    ["reports","System Reports","▥"]
  ]
};
for(const entries of Object.values(MENUS))entries.push(["account","Account Settings","⚙"]);

const INITIAL_DATA = {
  users:[
    {id:1,name:"Sarah Lim",email:"client@demo.com",password:"123456",role:"client",active:true},
    {id:2,name:"Daniel Tan",email:"manager@demo.com",password:"123456",role:"manager",active:true},
    {id:3,name:"Alex Wong",email:"developer@demo.com",password:"123456",role:"developer",skills:"Java, JavaScript, Testing",maxTasks:3,active:true},
    {id:4,name:"Michelle Lee",email:"finance@demo.com",password:"123456",role:"finance",active:true},
    {id:5,name:"Jason Ng",email:"supplier@demo.com",password:"123456",role:"supplier",active:true},
    {id:6,name:"Rachel Goh",email:"management@demo.com",password:"123456",role:"management",active:true},
    {id:7,name:"System Admin",email:"admin@demo.com",password:"123456",role:"admin",active:true}
  ],
  milestones:[],
  issues:[],
  messages:[],
  milestones:[],
  issues:[],
  messages:[],
  requests:[],
  proposals:[],
  projects:[],
  tasks:[],
  changes:[],
  meetings:[],
  meetingInvitations:[],
  documents:[],
  payments:[],
  suppliers:[
    {
      id:1,userId:5,company:"CloudSphere Ltd",
      service:"Cloud Hosting",
      unit:"Hosting Instance",
      rate:400,
      capacity:10,
      agreement:"AGR-2026-001",
      status:"Pending Approval",
      date:"2026-11-20"
    }
  ],
  supplierAssignments:[],
  supplierPayments:[],
  feedback:[],
  notifications:[],
  activity:[]
};

const cloneData = value => JSON.parse(JSON.stringify(value));

function saveData(data) {
  localStorage.setItem(STORAGE_KEY,JSON.stringify(data));
}

function loadData() {
  let data;
  try {
    data = JSON.parse(localStorage.getItem(STORAGE_KEY));
  } catch {
    data = null;
  }

  if (!data || typeof data !== "object" || Array.isArray(data)) {
    data = cloneData(INITIAL_DATA);
  }

  for (const [key,value] of Object.entries(INITIAL_DATA)) {
    if (!Array.isArray(data[key])) data[key] = cloneData(value);
  }

  // Migrate old records without deleting existing projects.
  for (const s of data.suppliers) {
    s.unit ||= "Service Unit";
    s.rate = Number(s.rate) || 0;
    if (s.capacity === undefined) s.capacity = 10;
    s.capacity = Math.max(0,Number(s.capacity) || 0);
  }

  for (const a of data.supplierAssignments) {
    a.quantity = Number(a.quantity) || 1;
    a.rate = Number(a.rate) || 0;
    a.monthlyCost ??= a.quantity * a.rate;
    a.unit ||= "Service Unit";
    a.status ||= "Active";
    a.monthlyBudget ??= a.monthlyCost;
  }

  for (const p of data.projects) {
    p.progress = Number(p.progress) || 0;
    p.budget = Number(p.budget) || 0;
    p.supplierMonthlyBudget ??= p.budget;
    p.reviewStatus ||= "Not Submitted";
    if(p.status==="Awaiting Payment")p.reference="";else p.reference ||= `NVT-${new Date().getFullYear()}-${String(p.id).padStart(4,"0")}`;
    p.baseBudget ??= p.budget - data.changes.filter(c=>c.projectId===p.id&&c.status==="Approved").reduce((sum,c)=>sum+(Number(c.cost)||0),0);
    if(p.status==="Awaiting Payment")p.reference="";else p.reference ||= `NVT-${new Date().getFullYear()}-${String(p.id).padStart(4,"0")}`;
    p.baseBudget ??= p.budget - data.changes.filter(c=>c.projectId===p.id&&c.status==="Approved").reduce((sum,c)=>sum+(Number(c.cost)||0),0);
  }

  for (const t of data.tasks) {
    t.progress = Number(t.progress) || 0;
    t.status ||= "Pending";
  }

  for (const m of data.meetings) {
    m.status ||= "Scheduled";
    m.outcomes ||= "";
  }

  for (const i of data.meetingInvitations) {
    i.reason ||= "";
  }

  saveData(data);
  return data;
}

function nextId(items) {
  return items.reduce((max,x) =>
    Math.max(max,Number(x.id) || 0),0) + 1;
}

function todayISO() {
  // Coursework-only simulated date, enabled through Administrator > System Settings.
  try {const settings=JSON.parse(localStorage.getItem("novatech_v3"))?.settings;
    if(settings?.testMode && /^\d{4}-\d{2}-\d{2}$/.test(settings.testDate))return settings.testDate;
  } catch(e) {}
  const d = new Date();
  const local = new Date(d.getTime() - d.getTimezoneOffset()*60000);
  return local.toISOString().slice(0,10);
}

function recordActivity(data,userId,message) {
  data.activity.unshift({
    id:nextId(data.activity),
    userId:Number(userId),
    message:String(message),
    date:todayISO()
  });
}
