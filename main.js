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

    // Hiển thị kinh nghiệm chuyên môn
    const experienceContainer = document.getElementById("professional-experience-list");

    // Hàm chuyển tên dự án về title case
    function toTitleCase(str) {
      return str
        .toLowerCase() // Chuyển toàn bộ về chữ thường
        .split(' ') // Tách tên dự án thành các từ
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Viết hoa chữ cái đầu của mỗi từ
        .join(' '); // Ghép lại thành tên dự án
    }
    
    // Sắp xếp các dự án theo start_date từ mới đến cũ
    data.projects.sort((a, b) => {
      // Chuyển đổi ngày thành đối tượng Date để so sánh
      const dateA = new Date(a.start_date.split('/').reverse().join('-')); // Đổi từ MM/DD/YYYY thành YYYY-MM-DD
      const dateB = new Date(b.start_date.split('/').reverse().join('-')); // Đổi từ MM/DD/YYYY thành YYYY-MM-DD
      return dateB - dateA; // Sắp xếp từ mới đến cũ
    });
    
    // Hiển thị các dự án đã sắp xếp
    data.projects.forEach(project => {
      const projectItem = document.createElement("div");
      projectItem.className = "mb-4";
    
      // Chọn 'member' hoặc 'members' tùy theo số lượng
      const memberLabel = project.members === 1 ? "member" : "members";
    
      // Chuyển title về title case nếu nó viết hoa toàn bộ
      const projectTitle = toTitleCase(project.title);
    
      projectItem.innerHTML = `
        <div class="d-flex justify-content-between mb-1">
          <div>
            <strong>Project: </strong><i>${projectTitle}</i> <span class="text-muted small">( ${project.members} ${memberLabel} )</span>
          </div>
          <div><i>${project.start_date} - ${project.end_date}</i></div>
        </div>
        <div class="mb-2"><strong>Description: </strong>${project.description}</div>
        <div class="mb-2">
          <strong>Technologies:</strong> 
          ${project.technologies.frontend ? `Frontend: ${project.technologies.frontend}. ` : ""}
          ${project.technologies.backend ? `Backend: ${project.technologies.backend}. ` : ""}
          ${project.technologies.database ? `Database: ${project.technologies.database}. ` : ""}
          ${project.technologies.tools ? `Tools: ${project.technologies.tools}.` : ""}
        </div>
        <div><strong>Repository:</strong> <a href="${project.repository}" target="_blank">${project.repository}</a></div>
        <hr>
      `;
      experienceContainer.appendChild(projectItem);
    });
    

  })
  .catch(error => {
    console.error("Không thể tải file JSON:", error);
  });
