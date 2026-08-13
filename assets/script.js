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

  // FAQ video: click-to-load (privacy-enhanced, no iframe/cookies until clicked)
  document.querySelectorAll('.faq-video-wrap').forEach(function (wrap) {
    wrap.addEventListener('click', function () {
      var videoId = wrap.getAttribute('data-video-id');
      if (!videoId) return;
      var iframe = document.createElement('iframe');
      iframe.src = 'https://www.youtube-nocookie.com/embed/' + videoId + '?autoplay=1&rel=0&modestbranding=1&cc_load_policy=1';
      iframe.title = 'iSync365 FAQ video';
      iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
      iframe.setAttribute('allowfullscreen', '');
      wrap.innerHTML = '';
      wrap.appendChild(iframe);
      wrap.style.cursor = 'default';
    });
  });

  // FAQ text toggle (expand/collapse the written answer beneath a video)
  document.querySelectorAll('.faq-toggle-text').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var target = document.getElementById(btn.getAttribute('data-target'));
      var expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      if (target) target.classList.toggle('is-open');
      btn.querySelector('.label').textContent = expanded ? 'Read the answer' : 'Hide the answer';
    });
  });

  // FAQ video toggle (mobile-only: expand/collapse the video thumbnail itself)
  document.querySelectorAll('.faq-video-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var target = document.getElementById(btn.getAttribute('data-target'));
      var expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      if (target) target.classList.toggle('is-open');
      btn.querySelector('.label').textContent = expanded ? 'Watch the video' : 'Hide the video';
    });
  });

  // Pricing page video (separate, self-contained handler for troubleshooting)
  var pricingVideoBox = document.getElementById('pricing-video-box');
  if (pricingVideoBox) {
    pricingVideoBox.addEventListener('click', function () {
      var ytId = pricingVideoBox.getAttribute('data-yt-id');
      if (!ytId) return;
      var iframe = document.createElement('iframe');
      iframe.src = 'https://www.youtube-nocookie.com/embed/' + ytId + '?autoplay=1&rel=0&modestbranding=1&cc_load_policy=1';
      iframe.title = 'iSync365 pricing video';
      iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
      iframe.setAttribute('allowfullscreen', '');
      pricingVideoBox.innerHTML = '';
      pricingVideoBox.appendChild(iframe);
      pricingVideoBox.style.cursor = 'default';
    });
  }
});
