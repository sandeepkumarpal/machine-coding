console.log("hello");

(async function (params) {
  const data = await fetch("./data.json");

  let res = await data.json();

  let employees = res;
  let selectedEmployee = employees[0];
  let selectedEmployeeId = employees[0].id;

  let employeeList = document.querySelector(".employees__names--list");

  let employeeInfo = document.querySelector(".employees__single--info");

  // Add Employee Logic
  const createEmployee = document.querySelector(".createEmployee");
  const addEmployeeModal = document.querySelector(".addEmployee");
  const addEmployeeForm = document.querySelector(".addEmployee__create");
  createEmployee.addEventListener("click", () => {
    addEmployeeModal.style.display = "flex";
  });

  addEmployeeModal.addEventListener("click", (e) => {
    if (e.target.className === "addEmployee") {
      addEmployeeModal.style.display = "none";
    }
  });

  const dobInput = document.querySelector(".addEmployee__create--dob");
  dobInput.max = `${new Date().getFullYear() - 18}-${new Date()
    .toISOString()
    .slice(5, 10)}`;

  addEmployeeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(addEmployeeForm);
    const values = [...formData.entries()];
    let empData = {};
    values.forEach((val) => {
      empData[val[0]] = val[1];
    });
    console.log("empData :>> ", empData);
    empData.id = employees[employees.length - 1].id + 1;
    empData.age =
      new Date().getFullYear() - parseInt(empData.dob.slice(0, 4), 10);

    empData.imageUrl =
      empData.imageUrl || "https://cdn-icons-png.flaticon.com/512/0/93.png";

    employees.push(empData);

    renderEmployees();
    addEmployeeForm.reset();
    addEmployeeModal.style.display = "none";

    console.log("empData :>> ", empData);
  });
  //   Select Employee Logic
  employeeList.addEventListener("click", (e) => {
    if (e.target.tagName === "SPAN" && selectedEmployeeId !== e.target.id) {
      selectedEmployeeId = e.target.id;
      renderEmployees();
      renderSingleEmployee();
    }
    // delete
    if (e.target.tagName === "I") {
      employees = employees.filter(
        (emp) => String(emp.id) !== e.target.parentNode.id
      );
      if (String(selectedEmployeeId) === e.target.parentNode.id) {
        selectedEmployeeId = employees[0]?.id || -1;
        selectedEmployee = employees[0] || {};
        renderSingleEmployee();
      }
      renderEmployees();
    }
  });

  function renderEmployees() {
    if (selectedEmployeeId === -1) {
      employeeInfo.innerHTML = "";
      return;
    }
    employeeList.innerHTML = "";
    employees.forEach((emp) => {
      const employee = document.createElement("span");
      employee.classList.add("employees__names--item");
      if (parseInt(selectedEmployeeId, 10) === emp.id) {
        employee.classList.add("selected");
        selectedEmployee = emp;
      }
      employee.setAttribute("id", emp.id);
      employee.innerHTML = `${emp.firstName} ${emp.lastName} <i class="employeeDelete">X</i>`;
      employeeList.append(employee);
    });
  }

  function renderSingleEmployee() {
    employeeInfo.innerHTML = `<img src="${selectedEmployee.imageUrl}"/>    
    <span class="employee__single--heading">${selectedEmployee.firstName}  ${selectedEmployee.lastName}</span>
    <span>${selectedEmployee.email}</span>
    <span>${selectedEmployee.contactNumber}</span>
    <span>${selectedEmployee.age}</span>
    <span>${selectedEmployee.address}</span>
    <span>${selectedEmployee.dob}</span>
    <span>${selectedEmployee.salary}</span>
   
    
    `;
  }

  if (selectedEmployee) renderSingleEmployee();

  renderEmployees();
})();
