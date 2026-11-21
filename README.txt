NovaTech Solutions — SDM Prototype Upgrade
===========================================

FILES:
  index.html — your original uploaded HTML
  data.js    — upgraded data model and migrations
  app.js     — upgraded application

KEEP YOUR EXISTING style.css FILE in the same folder. Its content was pasted
into the chat, not supplied as a separate downloadable CSS file.

INSTALLATION:
1. Back up your existing project folder.
2. Open the old prototype and export/save the localStorage key 'novatech_v3'
   in DevTools before switching, if you have important test records.
3. Replace index.html, data.js and app.js with these files.
4. Keep style.css unchanged.
5. Open index.html through VS Code Live Server.
6. Hard refresh Ctrl+Shift+R.

DEMO ACCOUNTS: client, manager, developer, finance, supplier, management,
admin at <role>@demo.com with password 123456.

NEW WORKFLOWS:
- Project request: objectives, expected completion, features, requirements.
- Proposal: scope, schedule, deliverables, terms, expiry date. Expiry is
  evaluated when the app renders; no background server runs while closed.
- Unique reference number NVT-YYYY-NNNN.
- Project milestone schedule and completion; issues reported and resolved.
- Staff skills and open-task capacity; manager assigns only matching skills.
- Client/team messaging and notifications.
- Organizer-only meeting cancellation with mandatory reason; on project
  completion remaining meetings become 'Project Closed'.
- Change cost/resource/schedule assessment; manager evaluation for developer
  changes; client approval; fixed final invoice double-counting.
- Small file uploads/downloads using browser localStorage (1 MB per file).
- Previous month's supplier statements generated automatically on app render,
  using active-service day proration. Finance marks statements paid.
- Management project and personnel reports.
- Final acceptance requires all tasks, milestones, issues completed/resolved.

LIMITATIONS:
This is a throw-away academic prototype. localStorage data and passwords are
not secure or multi-user synchronized; each browser/profile has its own data.
Browser storage has size limits. Do not use for real customer files or payments.
Automated monthly statements run on app opening/render, not in the background.
The project schedule is a dated milestone/task register, not a Gantt chart.
No production-grade authentication, backend permissions or server storage.

CHECKS:
Node syntax checks passed. End-to-end browser workflow tests have not been
completed. Test each role and financial path before submitting.
