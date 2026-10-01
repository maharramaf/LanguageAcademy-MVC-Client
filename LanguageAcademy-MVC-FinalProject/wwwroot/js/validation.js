// 09. Forms
function initForms() {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  function fieldOf(form, name) {
    return form.querySelector('[name="' + name + '"]');
  }

  function setError(form, name, message) {
    const input = fieldOf(form, name);
    const error = form.querySelector('[data-error-for="' + name + '"]');
    const field = input ? input.closest(".field") : null;
    if (field) field.classList.toggle("has-error", Boolean(message));
    if (error) error.textContent = message || "";
    return !message;
  }

  function msg(key, fallback) {
    return window.mfT ? window.mfT(key, fallback) : fallback;
  }

  function required(form, name, key, fallback) {
    const value = (fieldOf(form, name)?.value || "").trim();
    if (!value) return setError(form, name, msg(key, fallback));
    return setError(form, name, "");
  }

  function validateEmail(form, name) {
    const value = (fieldOf(form, name)?.value || "").trim();
    if (!value) return setError(form, name, msg("err_email_required", "Email is required."));
    if (!emailPattern.test(value)) return setError(form, name, msg("err_email_invalid", "Enter a valid email address."));
    return setError(form, name, "");
  }

  function validatePhone(form, name) {
    const value = (fieldOf(form, name)?.value || "").trim();
    const digits = value.replace(/\D/g, "");
    if (!value) return setError(form, name, msg("err_phone_required", "Phone is required."));
    if (digits.length < 7) return setError(form, name, msg("err_phone_invalid", "Enter a valid phone number."));
    return setError(form, name, "");
  }

  function validatePassword(form, name) {
    const value = fieldOf(form, name)?.value || "";
    if (!value) return setError(form, name, msg("err_password_required", "Password is required."));
    if (value.length < 8) return setError(form, name, msg("err_password_short", "Use at least 8 characters."));
    return setError(form, name, "");
  }

  function showSuccess(form) {
    const success = form.querySelector(".form-success");
    form.querySelectorAll(".field, .form-row, .form-row-between, .btn, .form-note").forEach(function (node) {
      if (success && success.contains(node)) return;
      node.hidden = true;
    });
    if (success) success.hidden = false;
  }

  document.querySelectorAll("[data-password-toggle]").forEach(function (button) {
    if (button.dataset.pwBound === "1") return;
    button.dataset.pwBound = "1";
    button.addEventListener("click", function () {
      const input = button.parentElement.querySelector("input");
      const icon = button.querySelector("i");
      const show = input.type === "password";
      input.type = show ? "text" : "password";
      icon.className = show ? "bi bi-eye-slash" : "bi bi-eye";
      button.setAttribute("aria-label", show ? msg("hide_password", "Hide password") : msg("show_password", "Show password"));
    });
  });

  const loginForm = document.querySelector('[data-form="login"]');
  if (loginForm) {
    if (loginForm.dataset.formBound !== "1") {
    loginForm.dataset.formBound = "1";
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const emailOk = validateEmail(loginForm, "email");
      const passwordOk = validatePassword(loginForm, "password");
      if (!emailOk || !passwordOk) return;
      showSuccess(loginForm);
    });
    }
  }

  const registerForm = document.querySelector('[data-form="register"]');
  if (registerForm && registerForm.dataset.formBound !== "1") {
  registerForm.dataset.formBound = "1";
  document.querySelectorAll("[data-reg-role]").forEach(function (button) {
    if (button.dataset.roleBound === "1") return;
    button.dataset.roleBound = "1";
    button.addEventListener("click", function () {
      document.querySelectorAll("[data-reg-role]").forEach(function (item) {
        item.classList.toggle("is-active", item === button);
      });
      const show = button.getAttribute("data-reg-role") === "instructor";
      document.querySelectorAll("[data-instructor-field]").forEach(function (field) {
        field.hidden = !show;
      });
      document.querySelectorAll("[data-student-field]").forEach(function (field) {
        field.hidden = show;
      });
    });
  });
  registerForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const instructorOn = document.querySelector('[data-reg-role="instructor"].is-active');
    if (instructorOn && typeof window.submitTeacherApplication === "function") {
      window.submitTeacherApplication(registerForm);
      return;
    }
    const checks = [
      required(registerForm, "firstName", "err_first_required", "First name is required."),
      required(registerForm, "lastName", "err_last_required", "Last name is required."),
      validateEmail(registerForm, "email"),
      validatePhone(registerForm, "phone"),
      validatePassword(registerForm, "password")
    ];
    const password = fieldOf(registerForm, "password")?.value || "";
    const confirm = fieldOf(registerForm, "confirm")?.value || "";
    if (!confirm) checks.push(setError(registerForm, "confirm", msg("err_confirm_required", "Confirm your password.")));
    else if (confirm !== password) checks.push(setError(registerForm, "confirm", msg("err_confirm_mismatch", "Passwords do not match.")));
    else checks.push(setError(registerForm, "confirm", ""));
    if (checks.every(Boolean)) {
      showSuccess(registerForm);
      const email = (fieldOf(registerForm, "email")?.value || "").trim();
      if (typeof window.showAssessmentNotification === "function") window.showAssessmentNotification(email);
      window.location.href = "index.html";
    }
  });
  }

  document.querySelectorAll('[data-form="newsletter"]').forEach(function (form) {
    if (form.dataset.formBound === "1") return;
    form.dataset.formBound = "1";
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (validateEmail(form, "email")) showSuccess(form);
    });
  });

  document.querySelectorAll('[data-form="contact"]').forEach(function (form) {
    if (form.dataset.formBound === "1") return;
    form.dataset.formBound = "1";
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const checks = [
        required(form, "name", "err_name_required", "Name is required."),
        validateEmail(form, "email"),
        validatePhone(form, "phone"),
        required(form, "subject", "err_subject_required", "Subject is required."),
        required(form, "message", "err_message_required", "Message is required.")
      ];
      const message = (fieldOf(form, "message")?.value || "").trim();
      if (message && message.length < 10) {
        checks[4] = setError(form, "message", msg("err_message_short", "Please write at least 10 characters."));
      }
      if (checks.every(Boolean)) showSuccess(form);
    });
  });

  document.querySelectorAll('[data-form="enroll"], [data-form="forgot"], [data-form="profile"]').forEach(function (form) {
    if (form.dataset.formBound === "1") return;
    form.dataset.formBound = "1";
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const checks = [];
      if (fieldOf(form, "name")) checks.push(required(form, "name", "err_name_required", "Name is required."));
      if (fieldOf(form, "email")) checks.push(validateEmail(form, "email"));
      if (fieldOf(form, "phone")) checks.push(validatePhone(form, "phone"));
      if (fieldOf(form, "bio")) checks.push(required(form, "bio", "err_bio_required", "Bio is required."));
      if (checks.every(Boolean)) showSuccess(form);
    });
  });
}
