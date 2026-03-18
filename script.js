let validation = {
  "full-name": true,
  email: true,
  "order-no": true,
  "product-code": true,
  quantity: true,
  complaintsGroup: true,
  complaintDescription: true,
  solutionsGroup: true,
  solutionDescription: true,
};

const form = document.querySelector("form");
const fullName = document.querySelector("#full-name");
const email = document.querySelector("#email");
const order_No = document.querySelector("#order-no");
const product_Code = document.querySelector("#product-code");
const quantity = document.querySelector("#quantity");
const complaint_description = document.querySelector("#complaint-description");
const solution_descrption = document.querySelector("#solution-description");
const complaints_group_fieldset = document.querySelector("#complaints-group");
const solutions_group_fieldset = document.querySelector("#solutions-group");

const productCodeRegex =
  /^[a-zA-Z]{2}[0-9]{2}-[a-zA-Z][0-9]{3}-[a-zA-Z]{2}[0-9]$/;
const orderNoRegex = /^2024[0-9]{6}$/;

function validateForm() {
  validation["full-name"] = fullName.value.trim() !== "";
  fullName.style.borderColor = validation["full-name"] ? "green" : "red";

  validation.email = email.value.includes("@") && email.value.trim() !== "";
  email.style.borderColor = validation.email ? "green" : "red";

  validation["order-no"] = orderNoRegex.test(order_No.value);
  order_No.style.borderColor = validation["order-no"] ? "green" : "red";

  validation["product-code"] = productCodeRegex.test(product_Code.value);
  product_Code.style.borderColor = validation["product-code"] ? "green" : "red";

  validation.quantity = Number(quantity.value) > 0;
  quantity.style.borderColor = validation.quantity ? "green" : "red";

  const checkedComplaints = Array.from(
    document.querySelectorAll(
      '#complaints-group input[name="complaint"]:checked',
    ),
  );
  validation["complaints-group"] = checkedComplaints.length > 0;
  complaints_group_fieldset.style.borderColor =
    checkedComplaints.length > 0 ? "green" : "red";
  const values = checkedComplaints.map((box) => box.value);

  if (values.includes("other")) {
    const text = complaint_description.value.replace(/\s+/g, "");
    validation["complaint-description"] = text.length >= 20;
    complaint_description.style.borderColor = validation[
      "complaint-description"
    ]
      ? "green"
      : "red";
  } else {
    validation["complaint-description"] = true;
    complaint_description.style.borderColor = "";
  }

  const checkedSolutions = Array.from(
    document.querySelectorAll(
      '#solutions-group input[name="solutions"]:checked',
    ),
  );
  validation["solutions-group"] = checkedSolutions.length > 0;
  solutions_group_fieldset.style.borderColor = validation["solutions-group"]
    ? "green"
    : "red";

  const checked = checkedSolutions.map((b) => b.value);
  if (checked.includes("other")) {
    const text = solution_descrption.value.replace(/\s+/g, "");
    validation["solution-description"] = text.length >= 20;
    solution_descrption.style.borderColor = validation["solution-description"]
      ? "green"
      : "red";
  } else {
    validation["solution-description"] = true;
    solution_descrption.style.borderColor = "";
  }

  return validation;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const result = validateForm();
  console.log(result);
  isValid(result);
});

fullName.addEventListener("change", validateForm);
email.addEventListener("change", validateForm);
order_No.addEventListener("change", validateForm);
product_Code.addEventListener("change", validateForm);
quantity.addEventListener("change", validateForm);
complaints_group_fieldset.addEventListener("input", validateForm);
solutions_group_fieldset.addEventListener("input", validateForm);
complaint_description.addEventListener("change", validateForm);
solution_descrption.addEventListener("change", validateForm);

function isValid(object) {
  if (Object.values(object).some((b) => !b)) {
    return false;
  }
  return true;
}
