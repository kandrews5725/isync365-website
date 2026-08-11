// Mobile nav toggle
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
      var expanded = links.classList.contains('open');
      toggle.setAttribute('aria-expanded', expanded);
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { links.classList.remove('open'); });
    });
  }

  // Contact form (submit as JSON to isync365-server /contact-form endpoint)
  var form = document.getElementById('demo-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var status = document.getElementById('form-status');
      var submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      var payload = Object.fromEntries(new FormData(form));

      fetch(form.action, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      }).then(function (response) {
        if (response.ok) {
          form.style.display = 'none';
          document.getElementById('form-success').style.display = 'block';
          if (typeof gtag === 'function') {
            gtag('event', 'conversion', {'send_to': 'AW-18380112375/h5DtCJujxd8cEPeDqbxE'});
          }
        } else {
          status.textContent = "Something went wrong — please try again, or email us directly.";
          status.style.display = 'block';
          submitBtn.disabled = false;
          submitBtn.textContent = 'Request Demo';
        }
      }).catch(function () {
        status.textContent = "Something went wrong — please try again, or email us directly.";
        status.style.display = 'block';
        submitBtn.disabled = false;
        submitBtn.textContent = 'Request Demo';
      });
    });
  }

  // Product screenshot scroll-reveal + shine effect
  var shots = document.querySelectorAll('.product-shot');
  if (shots.length && 'IntersectionObserver' in window) {
    var shotObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          shotObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });
    shots.forEach(function (shot) { shotObserver.observe(shot); });
  } else {
    shots.forEach(function (shot) { shot.classList.add('is-visible'); });
  }
});
