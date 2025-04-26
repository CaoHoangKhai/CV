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
      objectiveItem.innerHTML = `<p>${objective.goal}</p>`;
      objectiveContainer.appendChild(objectiveItem);
    });

    // Hiển thị thông tin giáo dục
    const educationContainer = document.getElementById("education-list");
    data.education.forEach(education => {
      const educationItem = document.createElement("div");
      educationItem.className = "mb-1";
      educationItem.innerHTML = `
        <div class="d-flex justify-content-between mb-1">
          <div><strong>${education.university}</strong></div>
          <div><strong>${education.location}</strong></div>
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

    // Hiển thị kinh nghiệm chuyên môn
    const experienceContainer = document.getElementById("professional-experience-list");

    // Hàm chuyển tên dự án về title case
    function toTitleCase(str) {
      const exceptions = ["API", "HTML", "CSS", "JS"];
      return str
        .toLowerCase()
        .split(' ')
        .map(word => exceptions.includes(word.toUpperCase())
          ? word.toUpperCase()
          : word.charAt(0).toUpperCase() + word.slice(1)
        )
        .join(' ');
    }

    // Sắp xếp các dự án theo start_date từ mới đến cũ
    data.projects.sort((a, b) => {
      const dateA = new Date(a.start_date.split('/').reverse().join('-'));
      const dateB = new Date(b.start_date.split('/').reverse().join('-'));
      return dateB - dateA;
    });

    data.projects.forEach(project => {
      const projectItem = document.createElement("div");
      projectItem.className = "mb-4";

      const memberLabel = project.members === 1 ? "member" : "members";
      const projectTitle = toTitleCase(project.title);

      // Kiểm tra độ rộng container
      const parentWidth = experienceContainer.offsetWidth;
      const isFullWidth = parentWidth >= 768; // Ngưỡng 768px (tablet trở lên)

      if (isFullWidth) {
        // Nếu container rộng, bố cục 2 bên: tên + member | thời gian
        projectItem.innerHTML = `
        <div class="row mb-2 align-items-center">
          <div class="col-12 col-md-8">
            <strong>${projectTitle}</strong> 
            <span class="text-muted small">( ${project.members} ${memberLabel} )</span>
          </div>
          <div class="col-12 col-md-4 text-md-end">
            <i>${project.start_date} - ${project.end_date}</i>
          </div>
        </div>
      
        <div class="mb-2"><strong>Description:</strong> ${project.description}</div>
      
        <div class="mb-2">
          <strong>Technologies:</strong> 
          <ul>
            ${project.technologies.frontend ? `<li><strong>Frontend:</strong> ${project.technologies.frontend}</li>` : ""}
            ${project.technologies.backend ? `<li><strong>Backend:</strong> ${project.technologies.backend}</li>` : ""}
            ${project.technologies.database ? `<li><strong>Database:</strong> ${project.technologies.database}</li>` : ""}
            ${project.technologies.tools ? `<li><strong>Tools:</strong> ${project.technologies.tools}</li>` : ""}
          </ul>
        </div>
      
        <div>
          <strong>Repository:</strong> <a href="${project.repository}" target="_blank">GitHub</a>
        </div>
        <hr>
      `;
      } else {
        // Nếu container hẹp, bố cục xuống dòng
        projectItem.innerHTML = `
        <div class="row mb-2 align-items-center">
          <div class="col-12 col-md-8">
            <strong>Project</strong>: <i>${projectTitle}</i> 
            <span class="text-muted small">( ${project.members} ${memberLabel} )</span>
          </div>
          <div class="col-12 col-md-4 text-md-end">
            <i>${project.start_date} - ${project.end_date}</i>
          </div>
        </div>
      
        <div class="mb-2"><strong>Description:</strong> ${project.description}</div>
      
        <div class="mb-2">
          <strong>Technologies:</strong> 
          <ul>
            ${project.technologies.frontend ? `<li><strong>Frontend:</strong> ${project.technologies.frontend}</li>` : ""}
            ${project.technologies.backend ? `<li><strong>Backend:</strong> ${project.technologies.backend}</li>` : ""}
            ${project.technologies.database ? `<li><strong>Database:</strong> ${project.technologies.database}</li>` : ""}
            ${project.technologies.tools ? `<li><strong>Tools:</strong> ${project.technologies.tools}</li>` : ""}
          </ul>
        </div>
      
        <div>
          <strong>Repository:</strong> <a href="${project.repository}" target="_blank">GitHub</a>
        </div>
        <hr>
      `;

      }

      experienceContainer.appendChild(projectItem);
    });

  })
  .catch(error => {
    console.error("Không thể tải file JSON:", error);
  });
