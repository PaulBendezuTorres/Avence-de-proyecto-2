// Multi-step form logic for reservations
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('formReserva');
  const steps = document.querySelectorAll('.form-step');
  const stepIndicators = document.querySelectorAll('.step-indicator');
  const progressBar = document.getElementById('progressBar');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const submitBtn = document.getElementById('submitBtn');

  let currentStep = 1;
  const totalSteps = steps.length;

  // Set minimum date to today
  const fechaInput = document.getElementById('fecha');
  const today = new Date().toISOString().split('T')[0];
  fechaInput.setAttribute('min', today);

  // Show current step
  function showStep(step) {
    steps.forEach((stepEl, index) => {
      stepEl.classList.remove('active');
      stepIndicators[index].classList.remove('active', 'completed');

      if (index + 1 === step) {
        stepEl.classList.add('active');
        stepIndicators[index].classList.add('active');
      } else if (index + 1 < step) {
        stepIndicators[index].classList.add('completed');
      }
    });

    // Update progress bar
    const progress = (step / totalSteps) * 100;
    progressBar.style.width = progress + '%';
    progressBar.setAttribute('aria-valuenow', progress);

    // Update buttons
    prevBtn.style.display = step === 1 ? 'none' : 'inline-block';
    nextBtn.style.display = step === totalSteps ? 'none' : 'inline-block';
    submitBtn.style.display = step === totalSteps ? 'inline-block' : 'none';

    // Scroll to top of form
    document.querySelector('.reservas').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Validate current step
  function validateStep(step) {
    const currentStepEl = document.querySelector(`.form-step[data-step="${step}"]`);
    const inputs = currentStepEl.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
      if (!input.checkValidity()) {
        isValid = false;
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
      } else {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
      }
    });

    return isValid;
  }

  // Next button
  nextBtn.addEventListener('click', function () {
    if (validateStep(currentStep)) {
      currentStep++;
      showStep(currentStep);
    } else {
      // Show validation feedback
      const currentStepEl = document.querySelector(`.form-step[data-step="${currentStep}"]`);
      const firstInvalid = currentStepEl.querySelector('.is-invalid');
      if (firstInvalid) {
        firstInvalid.focus();
      }
    }
  });

  // Previous button
  prevBtn.addEventListener('click', function () {
    currentStep--;
    showStep(currentStep);
  });

  // Form submission
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!validateStep(currentStep)) {
      return;
    }

    // Validate entire form
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }

    // Get form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procesando...';

    // Update progress to 100% and mark all steps as completed
    progressBar.style.width = '100%';
    progressBar.setAttribute('aria-valuenow', 100);

    // Colorear todos los pasos (1, 2, 3) como completados
    stepIndicators.forEach(indicator => {
      indicator.classList.remove('active');
      indicator.classList.add('completed');
    });

    // Simulate API call - Show modal after 1 second
    setTimeout(() => {
      // Set email in modal
      document.getElementById('confirmEmail').textContent = data.email;

      // Show Bootstrap modal
      const confirmationModal = new bootstrap.Modal(document.getElementById('confirmationModal'));
      confirmationModal.show();

      // Log data (in production, send to server)
      console.log('Reservation data:', data);

      // Reset button state
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> Confirmar Reserva';

      // Reset form when modal is closed
      document.getElementById('confirmationModal').addEventListener('hidden.bs.modal', function () {
        form.reset();
        form.classList.remove('was-validated');
        currentStep = 1;
        showStep(currentStep);
      }, { once: true }); // Only execute once
    }, 1000); // 1 segundo
  });

  // Real-time validation
  const allInputs = form.querySelectorAll('input, select, textarea');
  allInputs.forEach(input => {
    input.addEventListener('blur', function () {
      if (this.hasAttribute('required')) {
        if (this.checkValidity()) {
          this.classList.remove('is-invalid');
          this.classList.add('is-valid');
        } else {
          this.classList.add('is-invalid');
          this.classList.remove('is-valid');
        }
      }
    });

    input.addEventListener('input', function () {
      if (this.classList.contains('is-invalid') || this.classList.contains('is-valid')) {
        if (this.checkValidity()) {
          this.classList.remove('is-invalid');
          this.classList.add('is-valid');
        } else {
          this.classList.add('is-invalid');
          this.classList.remove('is-valid');
        }
      }
    });
  });

  // Initialize
  showStep(currentStep);
});
