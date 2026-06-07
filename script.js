// Sample Articles Data
const articles = [
  {
    id: 1,
    title: "The Art of Mindful Living",
    category: "Wellness",
    excerpt: "Discover how incorporating mindfulness into your daily routine can transform your life and bring peace to your mind.",
    author: "Sarah Johnson",
    date: "Mar 15, 2024",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop"
  },
  {
    id: 2,
    title: "Exploring the Hidden Gems of Southeast Asia",
    category: "Travel",
    excerpt: "From ancient temples to pristine beaches, discover the most breathtaking destinations in Southeast Asia that most tourists miss.",
    author: "James Chen",
    date: "Mar 12, 2024",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop"
  },
  {
    id: 3,
    title: "Finding Your Creative Voice",
    category: "Creativity",
    excerpt: "Learn practical techniques to unlock your creativity and develop a unique artistic voice that resonates with your audience.",
    author: "Emma Wilson",
    date: "Mar 10, 2024",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop"
  },
  {
    id: 4,
    title: "Personal Growth Through Reading",
    category: "Growth",
    excerpt: "Explore how reading can accelerate your personal development and introduce you to new perspectives and ideas.",
    author: "Michael Torres",
    date: "Mar 8, 2024",
    image: "https://images.unsplash.com/photo-1507842217343-583f20270319?w=400&h=300&fit=crop"
  },
  {
    id: 5,
    title: "Nutrition Tips for Optimal Health",
    category: "Wellness",
    excerpt: "Science-backed nutrition advice to help you make better dietary choices and improve your overall health and vitality.",
    author: "Dr. Lisa Anderson",
    date: "Mar 5, 2024",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop"
  },
  {
    id: 6,
    title: "Adventure Awaits: Hiking the World's Best Trails",
    category: "Travel",
    excerpt: "Challenge yourself with these stunning hiking trails from around the world that offer breathtaking views and unforgettable experiences.",
    author: "Robert Kim",
    date: "Mar 1, 2024",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
  }
];

// DOM Elements
const articlesGrid = document.getElementById('articlesGrid');
const newsletterForm = document.getElementById('newsletterForm');
const themeToggle = document.getElementById('themeToggle');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  loadArticles();
  setupThemeToggle();
  setupNewsletterForm();
  setupNavigation();
});

// Load and display articles
function loadArticles() {
  articlesGrid.innerHTML = articles.map(article => `
    <article class="article-card">
      <img src="${article.image}" alt="${article.title}" class="article-image" loading="lazy">
      <div class="article-content">
        <span class="article-category">${article.category}</span>
        <h3 class="article-title">
          <a href="#article-${article.id}">${article.title}</a>
        </h3>
        <p class="article-excerpt">${article.excerpt}</p>
        <div class="article-meta">
          <div class="article-author">
            <div class="article-avatar"></div>
            <span>${article.author}</span>
          </div>
          <time>${article.date}</time>
        </div>
      </div>
    </article>
  `).join('');

  // Add click handlers to article cards
  document.querySelectorAll('.article-card').forEach(card => {
    card.addEventListener('click', function() {
      const title = this.querySelector('.article-title').textContent;
      showNotification(`Opening: ${title}`);
    });
  });
}

// Setup theme toggle
function setupThemeToggle() {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme === 'dark' || (prefersDark && !savedTheme)) {
    document.body.classList.add('dark-mode');
    themeToggle.querySelector('.theme-icon').textContent = '☀️';
  }

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    themeToggle.querySelector('.theme-icon').textContent = isDarkMode ? '☀️' : '🌙';
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  });
}

// Setup newsletter form
function setupNewsletterForm() {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input[type="email"]').value;
    
    if (email) {
      showNotification(`✓ Thank you for subscribing with ${email}!`);
      newsletterForm.reset();
    }
  });
}

// Setup navigation active state
function setupNavigation() {
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (href === '/' && currentPath === '/')) {
      link.classList.add('active');
    }
  });

  // Handle navigation clicks
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      // For SPA-like behavior, you can add route handling here
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });
}

// Notification system
function showNotification(message) {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background-color: #667eea;
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    animation: slideIn 0.3s ease;
    max-width: 300px;
  `;
  
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Add animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;
document.head.appendChild(style);

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// Lazy loading images
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// Accessibility: Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    // Close any open modals or dropdowns if needed
  }
});

// Performance: Prefetch key resources
function prefetchResource(url) {
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = url;
  document.head.appendChild(link);
}

// Prefetch category pages
prefetchResource('/wellness');
prefetchResource('/travel');
prefetchResource('/creativity');
prefetchResource('/growth');
