// Get references
const generateBtn = document.getElementById("generateBtn");
const loading = document.getElementById("loading");
const resumePreview = document.getElementById("resumePreview");

// Main generate resume function
generateBtn.addEventListener("click", function () {
  generateBtn.disabled = true;
  loading.classList.add("active");

  // Collect form data
  const personalInfo = parseCSV(getFieldValue("personalInfo"), ["Name", "Email", "Phone", "LinkedIn", "GitHub", "Location"]);
  const educationList = parseMultiline(getFieldValue("education"));
  const experienceList = parseMultiline(getFieldValue("experience"));
  const projectsList = parseMultiline(getFieldValue("projects"));
  const skillsList = getFieldValue("skills").split(",").map(s => s.trim());
  const extracurricularList = parseMultiline(getFieldValue("extracurricular"));

  const resumeType = document.getElementById("resumeType").value.replace("-", " ");

  // Build HTML resume
  const resumeHTML = `
  <div class="resume-header">
    <div class="resume-name">${personalInfo.Name || "John Doe"}</div>
    <div class="resume-contact">
      ${personalInfo.Email || "email@example.com"} | ${personalInfo.Phone || "+91 9876543210"} |
      <a href="https://${personalInfo.LinkedIn}" target="_blank">${personalInfo.LinkedIn || "linkedin.com/in/johndoe"}</a> |
      <a href="https://${personalInfo.GitHub}" target="_blank">${personalInfo.GitHub || "github.com/johndoe"}</a> |
      ${personalInfo.Location || "City, Country"}
    </div>
  </div>

  <div class="resume-section">
    <div class="resume-section-title">Objective</div>
    <div class="resume-item">
      Motivated ${resumeType} seeking opportunities to apply technical expertise and contribute to impactful projects. Strong skills in problem-solving, teamwork, and delivering high-quality results.
    </div>
  </div>

  <div class="resume-section">
    <div class="resume-section-title">Education</div>
    ${educationList.map(edu => `<div class="resume-item"><strong>${edu}</strong></div>`).join("")}
  </div>

  <div class="resume-section">
    <div class="resume-section-title">Experience</div>
    ${experienceList.map(exp => `<div class="resume-item"><ul class="resume-list"><li>${exp}</li></ul></div>`).join("")}
  </div>

  <div class="resume-section">
    <div class="resume-section-title">Projects</div>
    ${projectsList.map(proj => `<div class="resume-item"><ul class="resume-list"><li>${proj}</li></ul></div>`).join("")}
  </div>

  <div class="resume-section">
    <div class="resume-section-title">Technical Skills</div>
    <ul class="resume-list">
      ${skillsList.map(skill => `<li>${skill}</li>`).join("")}
    </ul>
  </div>

  ${extracurricularList.length ? `
  <div class="resume-section">
    <div class="resume-section-title">Leadership & Extracurricular</div>
    <ul class="resume-list">
      ${extracurricularList.map(item => `<li>${item}</li>`).join("")}
    </ul>
  </div>` : ""}
  `;

  // Display resume
  resumePreview.innerHTML = resumeHTML;

  // --------------------------
  // AI Prediction Call (added)
  // --------------------------
  const resumeText = personalInfo.Name + " " +
                     educationList.join(" ") + " " +
                     experienceList.join(" ") + " " +
                     projectsList.join(" ") + " " +
                     skillsList.join(" ");

  fetch("/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resume_text: resumeText })
  })
  .then(res => res.json())
  .then(data => {
      if (data.prediction) {
          const aiDiv = document.createElement("div");
          aiDiv.style.textAlign = "center";
          aiDiv.style.fontWeight = "bold";
          aiDiv.style.fontSize = "18px";
          aiDiv.style.marginTop = "15px";
          aiDiv.innerText = "Predicted Career Domain: " + data.prediction;
          resumePreview.appendChild(aiDiv);
      }
  })
  .catch(err => console.error("AI error:", err));

  loading.classList.remove("active");
  generateBtn.disabled = false;
});

// Helper functions
function parseCSV(str, keys) {
  const parts = str.split(",");
  let obj = {};
  keys.forEach((key, i) => obj[key] = (parts[i] || "").trim());
  return obj;
}

function parseMultiline(str) {
  return str.split("\n").map(line => line.trim()).filter(line => line);
}

function getFieldValue(id) {
  const el = document.getElementById(id);
  return el ? el.value.trim() : "";
}

// Download PDF Button
document.getElementById("downloadBtn").addEventListener("click", function () {
  window.print();
});

// Copy HTML Button
document.getElementById("copyBtn").addEventListener("click", function () {
  const resumeContent = resumePreview.innerHTML;
  if (!resumeContent || resumeContent.includes("Fill out the form")) {
    alert("Please generate a resume first!");
    return;
  }

  const fullHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Resume</title>
  <link rel="stylesheet" href="resume.css">
</head>
<body>
${resumeContent}
</body>
</html>
  `;

  const resumeCSS = `body {
  font-family: 'Computer Modern', 'Times New Roman', serif;
  line-height: 1.4;
  font-size: 11pt;
  max-width: 800px;
  margin: 20px auto;
  padding: 40px;
}
.resume-header { text-align: center; margin-bottom: 15px; border-bottom: 1px solid #000; padding-bottom: 10px; }
.resume-name { font-size: 28pt; letter-spacing: 2px; font-variant: small-caps; margin-bottom: 5px; }
.resume-contact { font-size: 10pt; margin: 5px 0; }
.resume-contact a { color: #000; text-decoration: none; margin: 0 5px; }
.resume-section { margin: 15px 0; }
.resume-section-title { font-size: 14pt; font-weight: bold; border-bottom: 1px solid #000; margin: 12px 0 8px 0; padding-bottom: 2px; }
.resume-item { margin: 10px 0; }
.resume-list { margin-left: 20px; list-style: none; margin-top: 5px; }
.resume-list li { margin: 3px 0; text-indent: -20px; padding-left: 20px; }
.resume-list li:before { content: "• "; }
`;

  const blob = new Blob(
    [
      "=== RESUME HTML (save as resume.html) ===\n\n",
      fullHTML,
      "\n\n=== RESUME CSS (save as resume.css) ===\n\n",
      resumeCSS,
    ],
    { type: "text/plain" }
  );

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "CareerGenie-resume-files.txt";
  a.click();
  URL.revokeObjectURL(url);

  alert("Resume files downloaded! Copy HTML and CSS into separate files.");
});
