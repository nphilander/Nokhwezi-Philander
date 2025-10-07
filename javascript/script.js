//toggle icon navbar
let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

// scroll sections active link
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((links) => {
        links.classList.remove("active");
        let matchingLink = document.querySelector(
          `header nav a[href*="${id}"]`
        );
        if (matchingLink) {
          matchingLink.classList.add("active");
        }
      });
    }
  });
  //   sticky navbar
  let header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 100);

  //remove toggle icon & navbar when clicking navbar link - scroll

  menuIcon.classList.remove("bx-x");
  navbar.classList.remove("active");
};

// Flip cards
document.addEventListener("DOMContentLoaded", function () {
  // Get all flip cards
  const flipCards = document.querySelectorAll(".flip-card");

  // Add click event to all flip cards
  flipCards.forEach((card) => {
    // Find the read more/less buttons inside this card
    const readMoreBtn = card.querySelector(".read-more-btn");
    const readLessBtn = card.querySelector(".read-less-btn");

    // Toggle flip when clicking read more/less buttons
    if (readMoreBtn) {
      readMoreBtn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        card.classList.add("flipped");
      });
    }

    if (readLessBtn) {
      readLessBtn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        card.classList.remove("flipped");
      });
    }

    // Also allow clicking anywhere on the card to flip it
    card.addEventListener("click", function (e) {
      if (!e.target.closest("button")) {
        this.classList.toggle("flipped");
      }
    });
  });

  // Close card when clicking outside
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".flip-card")) {
      flipCards.forEach((card) => {
        card.classList.remove("flipped");
      });
    }
  });

  // Add keyboard accessibility
  flipCards.forEach((card) => {
    card.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && this.classList.contains("flipped")) {
        this.classList.remove("flipped");
      }
    });
  });

  // Typed.js initialization
  if (typeof Typed !== "undefined") {
    let typed = new Typed(".multiple-text", {
      strings: [
        "Fullstack Developer",
        "Frontend Developer",
        "Backend Developer",
      ],
      typeSpeed: 100,
      backSpeed: 100,
      backDelay: 1000,
      loop: true,
    });
  }

  // ScrollReveal initialization
  if (typeof ScrollReveal !== "undefined") {
    ScrollReveal({
      reset: true,
      distance: "80px",
      duration: 2000,
      delay: 200,
    });

    ScrollReveal().reveal(".home-content, .heading", { origin: "top" });
    ScrollReveal().reveal(
      ".home-img, .services-container, .projects-box, .contact form",
      { origin: "bottom" }
    );
    ScrollReveal().reveal(".home-content h1, .about-img", { origin: "left" });
    ScrollReveal().reveal(".home-content p, .about-content", {
      origin: "right",
    });
  }
});

function validateForm(event) {
  // Prevent the form from submitting normally
  event.preventDefault();

  // Get the submit button and show loading state
  const submitBtn = document.querySelector('input[type="submit"]');
  const originalValue = submitBtn.value;
  submitBtn.value = "Sending...";
  submitBtn.disabled = true;

  // Prepare the parameters
  let params = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value,
  };

  console.log("Sending email with params:", params);

  // Send email with detailed error handling
  emailjs
    .send("service_xdmvdgg", "template_pxp1c4e", params)
    .then(
      function (response) {
        console.log("SUCCESS!", response);
        alert("Email sent successfully!");
        document.getElementById("contact-form").reset();
      },
      function (error) {
        console.log("FAILED with error details:", error);

        // More specific error messages
        if (error.text && error.text.includes("Invalid public key")) {
          alert("Email configuration error. Please check your EmailJS setup.");
        } else if (error.text && error.text.includes("Service not found")) {
          alert("Email service not found. Please check your Service ID.");
        } else if (error.text && error.text.includes("Template not found")) {
          alert("Email template not found. Please check your Template ID.");
        } else {
          alert("Failed to send email. Error: " + (error.text || error));
        }
      }
    )
    .finally(function () {
      // Reset button state
      submitBtn.value = originalValue;
      submitBtn.disabled = false;
    });
}
