fetch("profile.json")
  .then(response => response.json())
  .then(data => {
    const profile = data.profile[0];
    const { name, position, address, phone, email, github } = profile;
    document.getElementById("name").innerText = name;
    document.getElementById("position").innerText = position;
    document.getElementById("address").innerText = address;
    document.getElementById("phone").innerText = phone;
    document.getElementById("email").innerText = email;
    document.getElementById("github-link").href = github.url;
    document.getElementById("github-link").innerText = github.username;

    // Hiển thị mục tiêu nghề nghiệp
    const objectiveContainer = document.getElementById("objective-list");
    data.objective.forEach(objective => {
      const objectiveItem = document.createElement("div");
      objectiveItem.className = "mb-1";
      objectiveItem.innerHTML = `
        <p>${objective.goal}</p>
      `;
      objectiveContainer.appendChild(objectiveItem);
    });

    // Hiển thị thông tin giáo dục
    const educationContainer = document.getElementById("education-list");
    data.education.forEach(education => {
      const educationItem = document.createElement("div");
      educationItem.className = "mb-1";
      educationItem.innerHTML = `
        <div class="d-flex justify-content-between mb-1">
          <div><strong> ${education.university}</strong></div>
          <div><strong> ${education.location}</strong></div>
        </div>
        <div class="d-flex justify-content-between mb-1">
          <div><i>${education.program}</i></div>
          <div><i>${education.start_year} – ${education.expected_graduation_year}</i></div>
        </div>
      `;
      educationContainer.appendChild(educationItem);
    });

    // Hiển thị kỹ năng kỹ thuật
    const skillsContainer = document.getElementById("technical-skills-list");
    const technicalSkills = data.technical_skills[0];
    const skillsItem = document.createElement("div");
    skillsItem.className = "mb-1";
    skillsItem.innerHTML = `
    <div><strong>Markup & Styling:</strong> ${technicalSkills.markup_and_styling.join(", ")}</div>
    <div><strong>Programming Languages:</strong> ${technicalSkills.programming_languages.join(", ")}</div>
    <div><strong>Frameworks:</strong> ${technicalSkills.frameworks.join(", ")}</div>
    <div><strong>Database Management Systems:</strong> ${technicalSkills.database_management_systems.join(", ")}</div>
  `;
    skillsContainer.appendChild(skillsItem);
  })
  .catch(error => {
    console.error("Không thể tải file JSON:", error);
  });
