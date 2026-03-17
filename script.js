// 12th FailJobs CRM - Main JavaScript File

// Global Variables
let currentUser = null;
let workers = [];
let jobs = [];
let requests = [];
let recruiters = [];
let currentPage = 1;
let itemsPerPage = 10;

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Clear any existing data to start fresh
    if (localStorage.getItem('freshStart') !== 'true') {
        localStorage.clear();
        localStorage.setItem('freshStart', 'true');
    }
    
    // Check if user is logged in
    checkAuth();
    
    // Load data from localStorage
    loadDataFromStorage();
    
    // Initialize event listeners
    initializeEventListeners();
    
    // Load sample data (empty now)
    loadSampleData();
    
    // Initialize charts if on dashboard or analytics page
    if (window.location.pathname.includes('dashboard.html') || window.location.pathname.includes('analytics.html')) {
        setTimeout(initializeCharts, 100);
    }
}

// Authentication Functions
function checkAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const currentPage = window.location.pathname;
    
    if (!isLoggedIn && !currentPage.includes('login')) {
        window.location.href = '/login';
    } else if (isLoggedIn && currentPage.includes('login')) {
        // Redirect based on user role
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
        const redirectUrl = currentUser.role === 'recruiter' ? '/recruiter-dashboard' : '/dashboard';
        window.location.href = redirectUrl;
    }
    
    // Check if user is trying to access wrong role pages
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (isLoggedIn && currentUser.role === 'recruiter') {
        // Recruiters should not access admin pages
        const adminPages = ['/dashboard', '/recruiters', '/analytics', '/settings'];
        if (adminPages.includes(currentPage)) {
            window.location.href = '/recruiter-dashboard';
        }
    }
}

function loadDataFromStorage() {
    workers = loadFromLocalStorage('workers');
    jobs = loadFromLocalStorage('jobs');
    requests = loadFromLocalStorage('requests');
    recruiters = loadFromLocalStorage('recruiters');
    
    // Update dashboard statistics if on dashboard page
    if (window.location.pathname.includes('dashboard.html')) {
        updateDashboardStats();
    }
}

function updateDashboardStats() {
    // Update dashboard statistics with real-time data
    const statElements = {
        totalWorkers: document.getElementById('totalWorkers'),
        activeJobs: document.getElementById('activeJobs'), 
        completedJobs: document.getElementById('completedJobs'),
        totalRevenue: document.getElementById('totalRevenue'),
        totalRecruiters: document.getElementById('totalRecruiters'),
        pendingRequests: document.getElementById('pendingRequests')
    };
    
    if (statElements.totalWorkers) {
        statElements.totalWorkers.textContent = workers.length;
    }
    
    if (statElements.activeJobs) {
        statElements.activeJobs.textContent = jobs.filter(j => j.status === 'in-progress' || j.status === 'assigned').length;
    }
    
    if (statElements.completedJobs) {
        statElements.completedJobs.textContent = jobs.filter(j => j.status === 'completed').length;
    }
    
    if (statElements.totalRevenue) {
        const revenue = jobs.filter(j => j.status === 'completed').reduce((sum, job) => sum + parseFloat(job.payment || 0), 0);
        statElements.totalRevenue.textContent = revenue > 0 ? `₹${revenue.toLocaleString()}` : '₹0';
    }
    
    if (statElements.totalRecruiters) {
        statElements.totalRecruiters.textContent = recruiters.length;
    }
    
    if (statElements.pendingRequests) {
        statElements.pendingRequests.textContent = requests.filter(r => r.status === 'pending').length;
    }
}

function login(email, password, role) {
    // Simple authentication (in production, this would be an API call)
    const validCredentials = {
        admin: { email: 'admin@12thfailjobs.com', password: 'admin123' },
        recruiter: { email: 'recruiter@12thfailjobs.com', password: 'recruiter123' }
    };
    
    if (validCredentials[role] && validCredentials[role].email === email && validCredentials[role].password === password) {
        currentUser = {
            email: email,
            name: role === 'admin' ? 'Admin User' : 'John Recruiter',
            role: role
        };
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        // Redirect based on role
        const redirectUrl = role === 'recruiter' ? 'recruiter-dashboard.html' : 'dashboard.html';
        
        showMessage('Login successful! Redirecting...', 'success');
        setTimeout(() => {
            window.location.href = redirectUrl;
        }, 1500);
    } else {
        showMessage('Invalid email, password, or role', 'error');
    }
}

function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    window.location.href = '/login';
}

// Role-based navigation
function navigateToPage(page) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    
    if (currentUser.role === 'recruiter') {
        // Recruiters can only access certain pages
        const allowedPages = ['/recruiter-dashboard', '/workers', '/jobs', '/requests'];
        if (allowedPages.includes(page)) {
            window.location.href = page;
        } else {
            // Redirect recruiter-appropriate page
            if (page === '/dashboard') {
                window.location.href = '/recruiter-dashboard';
            } else if (page === '/recruiters' || page === '/analytics' || page === '/settings') {
                window.location.href = '/recruiter-dashboard';
            }
        }
    } else {
        // Admin can access all pages
        window.location.href = page;
    }
}

// Add event listeners for navigation
document.addEventListener('DOMContentLoaded', function() {
    // Update UI based on user role
    updateUserInterface();
    
    // Add click handlers to sidebar navigation
    const navLinks = document.querySelectorAll('.sidebar-nav a[href]');
    navLinks.forEach(link => {
        if (!link.onclick) { // Only add if no existing onclick
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const href = this.getAttribute('href');
                if (href !== '#') {
                    navigateToPage(href);
                }
            });
        }
    });
});

// Update UI based on user role
function updateUserInterface() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    
    // Update user profile in header
    const userName = document.getElementById('userName');
    const userAvatar = document.getElementById('userAvatar');
    const pageTitle = document.getElementById('pageTitle');
    
    if (userName) {
        userName.textContent = currentUser.name || (currentUser.role === 'recruiter' ? 'Recruiter' : 'Admin');
    }
    
    if (userAvatar) {
        userAvatar.alt = currentUser.name || 'User';
    }
    
    // Update page title based on role
    if (pageTitle && currentUser.role === 'recruiter') {
        if (window.location.pathname.includes('/workers')) {
            pageTitle.textContent = 'Available Workers';
        } else if (window.location.pathname.includes('/jobs')) {
            pageTitle.textContent = 'My Jobs';
        } else if (window.location.pathname.includes('/requests')) {
            pageTitle.textContent = 'Worker Requests';
        }
    }
    
    // Hide/show admin-only elements
    const adminElements = document.querySelectorAll('.admin-only');
    const recruiterElements = document.querySelectorAll('.recruiter-only');
    const adminTexts = document.querySelectorAll('.admin-text');
    const recruiterTexts = document.querySelectorAll('.recruiter-text');
    
    if (currentUser.role === 'recruiter') {
        adminElements.forEach(el => el.style.display = 'none');
        recruiterElements.forEach(el => el.style.display = 'block');
        adminTexts.forEach(el => el.style.display = 'none');
        recruiterTexts.forEach(el => el.style.display = 'inline');
    } else {
        adminElements.forEach(el => el.style.display = 'block');
        recruiterElements.forEach(el => el.style.display = 'none');
        adminTexts.forEach(el => el.style.display = 'inline');
        recruiterTexts.forEach(el => el.style.display = 'none');
    }
}

// Event Listeners
function initializeEventListeners() {
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const role = document.getElementById('role').value;
            login(email, password, role);
        });
    }
    
    // Password toggle
    const passwordToggle = document.querySelector('.password-toggle');
    if (passwordToggle) {
        passwordToggle.addEventListener('click', togglePassword);
    }
    
    // Sidebar toggle
    const sidebarToggle = document.getElementById('sidebarToggle');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleSidebar();
        });
        
        // Add keyboard support
        sidebarToggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleSidebar();
            }
        });
    }
    
    // Notification dropdown
    const notificationBtn = document.querySelector('.notification-btn');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', toggleNotifications);
    }
    
    // Search functionality
    initializeSearch();
    
    // Filter functionality
    initializeFilters();
    
    // Modal functionality
    initializeModals();
    
    // Form submissions
    initializeForms();
}

function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleIcon = document.querySelector('.password-toggle i');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye');
    }
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const dashboardContainer = document.querySelector('.dashboard-container');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const toggleIcon = sidebarToggle ? sidebarToggle.querySelector('i') : null;
    
    console.log('ToggleSidebar called');
    console.log('Sidebar element:', sidebar);
    
    if (sidebar) {
        const isOpen = sidebar.classList.contains('open');
        console.log('Current state - isOpen:', isOpen);
        
        if (isOpen) {
            sidebar.classList.remove('open');
            if (dashboardContainer) {
                dashboardContainer.classList.remove('sidebar-open');
            }
            if (toggleIcon) {
                toggleIcon.classList.remove('fa-times');
                toggleIcon.classList.add('fa-bars');
            }
            console.log('Sidebar closed');
        } else {
            sidebar.classList.add('open');
            if (dashboardContainer) {
                dashboardContainer.classList.add('sidebar-open');
            }
            if (toggleIcon) {
                toggleIcon.classList.remove('fa-bars');
                toggleIcon.classList.add('fa-times');
            }
            console.log('Sidebar opened');
        }
    } else {
        console.error('Sidebar not found!');
    }
}

// Ensure sidebar is closed on page load
document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar');
    const dashboardContainer = document.querySelector('.dashboard-container');
    
    if (sidebar) {
        sidebar.classList.remove('open');
    }
    if (dashboardContainer) {
        dashboardContainer.classList.remove('sidebar-open');
    }
    
    // Setup sidebar toggle button
    const sidebarToggle = document.getElementById('sidebarToggle');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleSidebar();
        });
        
        // Add keyboard support
        sidebarToggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleSidebar();
            }
        });
        
        console.log('Sidebar toggle button setup complete');
    } else {
        console.error('Sidebar toggle button not found!');
    }
});

function toggleNotifications() {
    const dropdown = document.getElementById('notificationDropdown');
    if (dropdown) {
        dropdown.classList.toggle('show');
    }
}

// Close dropdowns when clicking outside
document.addEventListener('click', function(e) {
    if (!e.target.closest('.notifications')) {
        const dropdown = document.getElementById('notificationDropdown');
        if (dropdown) {
            dropdown.classList.remove('show');
        }
    }
});

// Search Functionality
function initializeSearch() {
    const searchInputs = document.querySelectorAll('input[type="text"]');
    searchInputs.forEach(input => {
        if (input.id.includes('Search')) {
            input.addEventListener('input', function(e) {
                performSearch(e.target.value, e.target.id);
            });
        }
    });
}

function performSearch(query, searchId) {
    query = query.toLowerCase();
    
    if (searchId === 'workerSearch') {
        filterWorkers(query);
    } else if (searchId === 'jobSearch') {
        filterJobs(query);
    } else if (searchId === 'requestSearch') {
        filterRequests(query);
    }
}

// Filter Functionality
function initializeFilters() {
    const filterSelects = document.querySelectorAll('.filter-select');
    filterSelects.forEach(select => {
        select.addEventListener('change', function() {
            applyFilters();
        });
    });
}

function applyFilters() {
    const currentPath = window.location.pathname.split('/').pop();
    
    if (currentPath === 'workers.html') {
        filterWorkersData();
    } else if (currentPath === 'jobs.html') {
        filterJobsData();
    } else if (currentPath === 'requests.html') {
        filterRequestsData();
    }
}

// Modal Functions
function initializeModals() {
    // Close modals when clicking outside
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('show');
        }
    });
}

function openAddWorkerModal() {
    const modal = document.getElementById('workerModal');
    const modalTitle = document.getElementById('modalTitle');
    
    modalTitle.textContent = 'Add New Worker';
    document.getElementById('workerForm').reset();
    modal.classList.add('show');
}

function closeWorkerModal() {
    const modal = document.getElementById('workerModal');
    modal.classList.remove('show');
}

function openAddJobModal() {
    const modal = document.getElementById('jobModal');
    const modalTitle = document.getElementById('modalTitle');
    
    modalTitle.textContent = 'Create New Job';
    document.getElementById('jobForm').reset();
    populateWorkerSelect();
    modal.classList.add('show');
}

function closeJobModal() {
    const modal = document.getElementById('jobModal');
    modal.classList.remove('show');
}

function openRequestModal(requestId) {
    const modal = document.getElementById('requestModal');
    const request = requests.find(r => r.id === requestId);
    
    if (request) {
        displayRequestDetails(request);
        modal.classList.add('show');
    }
}

function closeRequestModal() {
    const modal = document.getElementById('requestModal');
    modal.classList.remove('show');
}

// Form Submissions
function initializeForms() {
    // Worker form
    const workerForm = document.getElementById('workerForm');
    if (workerForm) {
        workerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveWorker();
        });
    }
    
    // Job form
    const jobForm = document.getElementById('jobForm');
    if (jobForm) {
        jobForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveJob();
        });
    }
}

// Worker Management Functions
function saveWorker() {
    const formData = {
        id: document.getElementById('workerId').value || Date.now().toString(),
        name: document.getElementById('workerName').value,
        phone: document.getElementById('workerPhone').value,
        category: document.getElementById('workerCategory').value,
        location: document.getElementById('workerLocation').value,
        experience: document.getElementById('workerExperience').value,
        availability: document.getElementById('workerAvailability').value,
        rating: document.getElementById('workerRating').value,
        email: document.getElementById('workerEmail').value,
        registeredDate: new Date().toISOString()
    };
    
    if (document.getElementById('workerId').value) {
        // Update existing worker
        const index = workers.findIndex(w => w.id === formData.id);
        if (index !== -1) {
            workers[index] = formData;
            showMessage('Worker updated successfully!', 'success');
        }
    } else {
        // Add new worker
        workers.push(formData);
        showMessage('Worker added successfully!', 'success');
    }
    
    saveToLocalStorage('workers', workers);
    closeWorkerModal();
    
    if (window.location.pathname.includes('workers.html')) {
        displayWorkers();
    }
    
    // Update dashboard stats
    updateDashboardStats();
}

function displayWorkers() {
    const workersGrid = document.getElementById('workersGrid');
    if (!workersGrid) return;
    
    workersGrid.innerHTML = '';
    
    if (workers.length === 0) {
        // Show empty state
        workersGrid.innerHTML = `
            <div class="empty-state glassmorphism" style="grid-column: 1 / -1; text-align: center; padding: var(--spacing-4xl);">
                <div class="empty-icon" style="font-size: 4rem; color: var(--text-muted); margin-bottom: var(--spacing-lg);">
                    <i class="fas fa-users"></i>
                </div>
                <h3 style="color: var(--text-primary); margin-bottom: var(--spacing-md);">No Workers Yet</h3>
                <p style="color: var(--text-secondary); margin-bottom: var(--spacing-2xl);">Start by adding your first worker to the system.</p>
                <button class="btn btn-primary" onclick="openAddWorkerModal()">
                    <i class="fas fa-plus"></i>
                    Add Your First Worker
                </button>
            </div>
        `;
        return;
    }
    
    workers.forEach(worker => {
        const workerCard = createWorkerCard(worker);
        workersGrid.appendChild(workerCard);
    });
}

function createWorkerCard(worker) {
    const card = document.createElement('div');
    card.className = 'worker-card glassmorphism';
    card.innerHTML = `
        <div class="worker-header">
            <div class="worker-avatar">${worker.name.charAt(0).toUpperCase()}</div>
            <div class="worker-info">
                <h4>${worker.name}</h4>
                <p>${worker.category}</p>
            </div>
        </div>
        <div class="worker-details">
            <div class="worker-detail">
                <i class="fas fa-phone"></i>
                <span>${worker.phone}</span>
            </div>
            <div class="worker-detail">
                <i class="fas fa-map-marker-alt"></i>
                <span>${worker.location}</span>
            </div>
            <div class="worker-detail">
                <i class="fas fa-briefcase"></i>
                <span>${worker.experience} years experience</span>
            </div>
            <div class="worker-detail">
                <i class="fas fa-star"></i>
                <span>Rating: ${worker.rating}/5</span>
            </div>
        </div>
        <div class="worker-status">
            <span class="status-badge ${worker.availability}">${worker.availability}</span>
            <div class="worker-actions">
                <button onclick="editWorker('${worker.id}')"><i class="fas fa-edit"></i></button>
                <button onclick="deleteWorker('${worker.id}')"><i class="fas fa-trash"></i></button>
            </div>
        </div>
    `;
    return card;
}

function editWorker(workerId) {
    const worker = workers.find(w => w.id === workerId);
    if (worker) {
        document.getElementById('modalTitle').textContent = 'Edit Worker';
        document.getElementById('workerName').value = worker.name;
        document.getElementById('workerPhone').value = worker.phone;
        document.getElementById('workerCategory').value = worker.category;
        document.getElementById('workerLocation').value = worker.location;
        document.getElementById('workerExperience').value = worker.experience;
        document.getElementById('workerAvailability').value = worker.availability;
        document.getElementById('workerRating').value = worker.rating;
        document.getElementById('workerEmail').value = worker.email || '';
        
        document.getElementById('workerModal').classList.add('show');
    }
}

function deleteWorker(workerId) {
    if (confirm('Are you sure you want to delete this worker?')) {
        workers = workers.filter(w => w.id !== workerId);
        saveToLocalStorage('workers', workers);
        displayWorkers();
        showMessage('Worker deleted successfully', 'success');
    }
}

// Job Management Functions
function saveJob() {
    const formData = {
        id: Date.now().toString(),
        title: document.getElementById('jobTitle').value,
        type: document.getElementById('jobType').value,
        location: document.getElementById('jobLocation').value,
        workerId: document.getElementById('jobWorker').value,
        status: document.getElementById('jobStatus').value,
        payment: document.getElementById('jobPayment').value,
        description: document.getElementById('jobDescription').value,
        clientInfo: document.getElementById('jobClientInfo').value,
        createdDate: new Date().toISOString()
    };
    
    jobs.push(formData);
    saveToLocalStorage('jobs', jobs);
    
    showMessage('Job created successfully!', 'success');
    closeJobModal();
    
    if (window.location.pathname.includes('jobs.html')) {
        displayJobs();
    }
}

function displayJobs() {
    const jobsTable = document.getElementById('jobsTable');
    if (!jobsTable) return;
    
    const tbody = jobsTable.querySelector('tbody');
    tbody.innerHTML = '';
    
    if (jobs.length === 0) {
        // Show empty state
        tbody.innerHTML = `
            <tr>
                <td colspan="8">
                    <div class="empty-state glassmorphism" style="text-align: center; padding: var(--spacing-4xl);">
                        <div class="empty-icon" style="font-size: 4rem; color: var(--text-muted); margin-bottom: var(--spacing-lg);">
                            <i class="fas fa-briefcase"></i>
                        </div>
                        <h3 style="color: var(--text-primary); margin-bottom: var(--spacing-md);">No Jobs Created Yet</h3>
                        <p style="color: var(--text-secondary); margin-bottom: var(--spacing-2xl);">Start by creating your first job posting.</p>
                        <button class="btn btn-primary" onclick="openAddJobModal()">
                            <i class="fas fa-plus"></i>
                            Create Your First Job
                        </button>
                    </div>
                </td>
            </tr>
        `;
        return;
    }
    
    jobs.forEach(job => {
        const row = createJobRow(job);
        tbody.appendChild(row);
    });
}

function createJobRow(job) {
    const row = document.createElement('tr');
    row.className = 'glassmorphism';
    const worker = workers.find(w => w.id === job.workerId);
    const workerName = worker ? worker.name : 'Unassigned';
    
    row.innerHTML = `
        <td>#${job.id.slice(-6)}</td>
        <td>${job.title}</td>
        <td>${job.type}</td>
        <td>${job.location}</td>
        <td>${workerName}</td>
        <td><span class="job-status ${job.status}">${job.status}</span></td>
        <td>₹${job.payment}</td>
        <td>${new Date(job.createdDate).toLocaleDateString()}</td>
        <td>
            <button class="btn btn-sm btn-secondary glassmorphism" onclick="editJob('${job.id}')">
                <i class="fas fa-edit"></i>
            </button>
            <button class="btn btn-sm btn-danger glassmorphism" onclick="deleteJob('${job.id}')">
                <i class="fas fa-trash"></i>
            </button>
        </td>
    `;
    return row;
}

function editJob(jobId) {
    const job = jobs.find(j => j.id === jobId);
    if (job) {
        document.getElementById('modalTitle').textContent = 'Edit Job';
        document.getElementById('jobTitle').value = job.title;
        document.getElementById('jobType').value = job.type;
        document.getElementById('jobLocation').value = job.location;
        document.getElementById('jobWorker').value = job.workerId;
        document.getElementById('jobStatus').value = job.status;
        document.getElementById('jobPayment').value = job.payment;
        document.getElementById('jobDescription').value = job.description;
        document.getElementById('jobClientInfo').value = job.clientInfo;
        
        populateWorkerSelect();
        document.getElementById('jobModal').classList.add('show');
    }
}

function deleteJob(jobId) {
    if (confirm('Are you sure you want to delete this job?')) {
        jobs = jobs.filter(j => j.id !== jobId);
        saveToLocalStorage('jobs', jobs);
        displayJobs();
        showMessage('Job deleted successfully', 'success');
    }
}

function populateWorkerSelect() {
    const workerSelect = document.getElementById('jobWorker');
    if (!workerSelect) return;
    
    workerSelect.innerHTML = '<option value="">Select Worker (Optional)</option>';
    
    workers.forEach(worker => {
        if (worker.availability === 'available') {
            const option = document.createElement('option');
            option.value = worker.id;
            option.textContent = `${worker.name} - ${worker.category}`;
            workerSelect.appendChild(option);
        }
    });
}

// Request Management Functions
function displayRequests() {
    const requestsList = document.getElementById('requestsList');
    if (!requestsList) return;
    
    requestsList.innerHTML = '';
    
    if (requests.length === 0) {
        // Show empty state
        requestsList.innerHTML = `
            <div class="empty-state glassmorphism" style="text-align: center; padding: var(--spacing-4xl);">
                <div class="empty-icon" style="font-size: 4rem; color: var(--text-muted); margin-bottom: var(--spacing-lg);">
                    <i class="fas fa-clipboard-list"></i>
                </div>
                <h3 style="color: var(--text-primary); margin-bottom: var(--spacing-md);">No Worker Requests Yet</h3>
                <p style="color: var(--text-secondary); margin-bottom: var(--spacing-2xl);">Worker requests will appear here once workers submit them.</p>
                <div style="text-align: center;">
                    <i class="fas fa-info-circle" style="color: var(--text-muted); margin-right: var(--spacing-sm);"></i>
                    <span style="color: var(--text-muted); font-size: 0.9rem;">Requests are submitted by workers through the main website</span>
                </div>
            </div>
        `;
        return;
    }
    
    requests.forEach(request => {
        const requestCard = createRequestCard(request);
        requestsList.appendChild(requestCard);
    });
}

function createRequestCard(request) {
    const card = document.createElement('div');
    card.className = 'request-card glassmorphism';
    
    const statusClass = request.status === 'pending' ? 'pending' : 
                       request.status === 'approved' ? 'approved' : 'rejected';
    
    card.innerHTML = `
        <div class="request-info">
            <h4>${request.title}</h4>
            <div class="request-details">
                <div class="request-detail">
                    <i class="fas fa-user"></i>
                    <span>${request.workerName}</span>
                </div>
                <div class="request-detail">
                    <i class="fas fa-briefcase"></i>
                    <span>${request.category}</span>
                </div>
                <div class="request-detail">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${request.location}</span>
                </div>
                <div class="request-detail">
                    <i class="fas fa-rupee-sign"></i>
                    <span>₹${request.budget}</span>
                </div>
            </div>
            <div class="request-meta">
                Submitted on ${new Date(request.createdDate).toLocaleDateString()} • 
                Status: <span class="status-badge ${statusClass}">${request.status}</span>
            </div>
        </div>
        <div class="request-actions">
            <button class="btn btn-sm btn-primary" onclick="viewRequest('${request.id}')">
                <i class="fas fa-eye"></i> View
            </button>
            ${request.status === 'pending' ? `
                <button class="btn btn-sm btn-success" onclick="approveRequest('${request.id}')">
                    <i class="fas fa-check"></i> Approve
                </button>
                <button class="btn btn-sm btn-danger" onclick="rejectRequest('${request.id}')">
                    <i class="fas fa-times"></i> Reject
                </button>
            ` : ''}
        </div>
    `;
    return card;
}

function viewRequest(requestId) {
    openRequestModal(requestId);
}

function approveRequest(requestId) {
    const request = requests.find(r => r.id === requestId);
    if (request) {
        request.status = 'approved';
        saveToLocalStorage('requests', requests);
        displayRequests();
        showMessage('Request approved successfully', 'success');
    }
}

function rejectRequest(requestId) {
    const request = requests.find(r => r.id === requestId);
    if (request) {
        request.status = 'rejected';
        saveToLocalStorage('requests', requests);
        displayRequests();
        showMessage('Request rejected', 'warning');
    }
}

function displayRequestDetails(request) {
    const detailsContainer = document.getElementById('requestDetails');
    if (!detailsContainer) return;
    
    detailsContainer.innerHTML = `
        <div class="request-detail-section">
            <h4>Request Information</h4>
            <p><strong>Title:</strong> ${request.title}</p>
            <p><strong>Description:</strong> ${request.description}</p>
            <p><strong>Category:</strong> ${request.category}</p>
            <p><strong>Location:</strong> ${request.location}</p>
            <p><strong>Budget:</strong> ₹${request.budget}</p>
            <p><strong>Timeline:</strong> ${request.timeline}</p>
        </div>
        <div class="request-detail-section">
            <h4>Worker Information</h4>
            <p><strong>Name:</strong> ${request.workerName}</p>
            <p><strong>Phone:</strong> ${request.workerPhone}</p>
            <p><strong>Experience:</strong> ${request.experience} years</p>
        </div>
        <div class="request-detail-section">
            <h4>Status</h4>
            <p><strong>Current Status:</strong> <span class="status-badge ${request.status}">${request.status}</span></p>
            <p><strong>Submitted:</strong> ${new Date(request.createdDate).toLocaleString()}</p>
        </div>
    `;
}

// Filter Functions
function filterWorkers(query) {
    const workerCards = document.querySelectorAll('.worker-card');
    workerCards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (text.includes(query)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function filterJobs(query) {
    const jobRows = document.querySelectorAll('.jobs-table tbody tr');
    jobRows.forEach(row => {
        const text = row.textContent.toLowerCase();
        if (text.includes(query)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

function filterRequests(query) {
    const requestCards = document.querySelectorAll('.request-card');
    requestCards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (text.includes(query)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function filterWorkersData() {
    const categoryFilter = document.getElementById('categoryFilter').value;
    const locationFilter = document.getElementById('locationFilter').value;
    const availabilityFilter = document.getElementById('availabilityFilter').value;
    
    let filteredWorkers = workers;
    
    if (categoryFilter) {
        filteredWorkers = filteredWorkers.filter(w => w.category === categoryFilter);
    }
    
    if (locationFilter) {
        filteredWorkers = filteredWorkers.filter(w => w.location === locationFilter);
    }
    
    if (availabilityFilter) {
        filteredWorkers = filteredWorkers.filter(w => w.availability === availabilityFilter);
    }
    
    displayFilteredWorkers(filteredWorkers);
}

function filterJobsData() {
    const statusFilter = document.getElementById('statusFilter').value;
    const jobTypeFilter = document.getElementById('jobTypeFilter').value;
    const locationFilter = document.getElementById('locationFilter').value;
    
    let filteredJobs = jobs;
    
    if (statusFilter) {
        filteredJobs = filteredJobs.filter(j => j.status === statusFilter);
    }
    
    if (jobTypeFilter) {
        filteredJobs = filteredJobs.filter(j => j.type === jobTypeFilter);
    }
    
    if (locationFilter) {
        filteredJobs = filteredJobs.filter(j => j.location === locationFilter);
    }
    
    displayFilteredJobs(filteredJobs);
}

function filterRequestsData() {
    // This would filter requests based on active tab
    const activeTab = document.querySelector('.tab-btn.active');
    if (!activeTab) return;
    
    const status = activeTab.dataset.tab;
    let filteredRequests = requests;
    
    if (status !== 'all') {
        filteredRequests = filteredRequests.filter(r => r.status === status);
    }
    
    displayFilteredRequests(filteredRequests);
}

function displayFilteredWorkers(filteredWorkers) {
    const workersGrid = document.getElementById('workersGrid');
    if (!workersGrid) return;
    
    workersGrid.innerHTML = '';
    
    filteredWorkers.forEach(worker => {
        const workerCard = createWorkerCard(worker);
        workersGrid.appendChild(workerCard);
    });
}

function displayFilteredJobs(filteredJobs) {
    const jobsTableBody = document.getElementById('jobsTableBody');
    if (!jobsTableBody) return;
    
    jobsTableBody.innerHTML = '';
    
    filteredJobs.forEach(job => {
        const row = createJobRow(job);
        jobsTableBody.appendChild(row);
    });
}

function displayFilteredRequests(filteredRequests) {
    const requestsList = document.getElementById('requestsList');
    if (!requestsList) return;
    
    requestsList.innerHTML = '';
    
    filteredRequests.forEach(request => {
        const requestCard = createRequestCard(request);
        requestsList.appendChild(requestCard);
    });
}

// Tab Functions
function filterRequests(status) {
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => {
        tab.classList.remove('active');
        if (tab.dataset.tab === status) {
            tab.classList.add('active');
        }
    });
    
    filterRequestsData();
}

// Settings Functions
function showSettingsTab(tabName) {
    const tabs = document.querySelectorAll('.settings-tab');
    const panels = document.querySelectorAll('.settings-panel');
    
    tabs.forEach(tab => {
        tab.classList.remove('active');
        if (tab.dataset.tab === tabName) {
            tab.classList.add('active');
        }
    });
    
    panels.forEach(panel => {
        panel.classList.remove('active');
        if (panel.id === `${tabName}-panel`) {
            panel.classList.add('active');
        }
    });
}

function saveGeneralSettings() {
    showMessage('General settings saved successfully', 'success');
}

function saveProfileSettings() {
    showMessage('Profile settings updated successfully', 'success');
}

function saveNotificationSettings() {
    showMessage('Notification preferences saved', 'success');
}

function saveApiSettings() {
    showMessage('API settings saved successfully', 'success');
}

function changePassword() {
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (newPassword !== confirmPassword) {
        showMessage('New passwords do not match', 'error');
        return;
    }
    
    // In production, this would be an API call
    showMessage('Password changed successfully', 'success');
    
    // Clear form
    document.getElementById('currentPassword').value = '';
    document.getElementById('newPassword').value = '';
    document.getElementById('confirmPassword').value = '';
}

function regenerateApiKey(type) {
    if (confirm(`Are you sure you want to regenerate the ${type} API key?`)) {
        showMessage(`${type} API key regenerated successfully`, 'success');
    }
}

// Recruiter Management Functions
function saveRecruiter() {
    const formData = {
        id: Date.now().toString(),
        name: document.getElementById('recruiterName').value,
        company: document.getElementById('companyName').value,
        phone: document.getElementById('recruiterPhone').value,
        email: document.getElementById('recruiterEmail').value,
        location: document.getElementById('recruiterLocation').value,
        status: document.getElementById('recruiterStatus').value,
        address: document.getElementById('recruiterAddress').value,
        notes: document.getElementById('recruiterNotes').value,
        activeJobs: 0,
        joinedDate: new Date().toISOString()
    };
    
    recruiters.push(formData);
    saveToLocalStorage('recruiters', recruiters);
    
    showMessage('Recruiter added successfully!', 'success');
    closeRecruiterModal();
    
    if (window.location.pathname.includes('recruiters.html')) {
        displayRecruiters();
    }
}

function displayRecruiters() {
    const recruitersTableBody = document.getElementById('recruitersTableBody');
    if (!recruitersTableBody) return;
    
    recruitersTableBody.innerHTML = '';
    
    if (recruiters.length === 0) {
        // Show empty state
        recruitersTableBody.innerHTML = `
            <tr>
                <td colspan="10">
                    <div class="empty-state glassmorphism" style="text-align: center; padding: var(--spacing-4xl);">
                        <div class="empty-icon" style="font-size: 4rem; color: var(--text-muted); margin-bottom: var(--spacing-lg);">
                            <i class="fas fa-user-tie"></i>
                        </div>
                        <h3 style="color: var(--text-primary); margin-bottom: var(--spacing-md);">No Recruiters Added Yet</h3>
                        <p style="color: var(--text-secondary); margin-bottom: var(--spacing-2xl);">Start by adding your first recruiter to manage job postings.</p>
                        <button class="btn btn-primary" onclick="openAddRecruiterModal()">
                            <i class="fas fa-plus"></i>
                            Add Your First Recruiter
                        </button>
                    </div>
                </td>
            </tr>
        `;
        return;
    }
    
    recruiters.forEach(recruiter => {
        const row = createRecruiterRow(recruiter);
        recruitersTableBody.appendChild(row);
    });
}

function createRecruiterRow(recruiter) {
    const row = document.createElement('tr');
    row.className = 'glassmorphism';
    row.innerHTML = `
        <td>#${recruiter.id.slice(-6)}</td>
        <td>${recruiter.name}</td>
        <td>${recruiter.company}</td>
        <td>${recruiter.phone}</td>
        <td>${recruiter.email}</td>
        <td>${recruiter.location}</td>
        <td>${recruiter.activeJobs}</td>
        <td><span class="recruiter-status ${recruiter.status}">${recruiter.status}</span></td>
        <td>${new Date(recruiter.joinedDate).toLocaleDateString()}</td>
        <td>
            <button class="btn btn-sm btn-secondary glassmorphism" onclick="editRecruiter('${recruiter.id}')">
                <i class="fas fa-edit"></i>
            </button>
            <button class="btn btn-sm btn-${recruiter.status === 'active' ? 'warning' : 'success'} glassmorphism" onclick="toggleRecruiterStatus('${recruiter.id}')">
                <i class="fas fa-${recruiter.status === 'active' ? 'pause' : 'play'}"></i>
            </button>
            <button class="btn btn-sm btn-danger glassmorphism" onclick="deleteRecruiter('${recruiter.id}')">
                <i class="fas fa-trash"></i>
            </button>
        </td>
    `;
    return row;
}

function editRecruiter(recruiterId) {
    const recruiter = recruiters.find(r => r.id === recruiterId);
    if (recruiter) {
        document.getElementById('modalTitle').textContent = 'Edit Recruiter';
        document.getElementById('recruiterName').value = recruiter.name;
        document.getElementById('companyName').value = recruiter.company;
        document.getElementById('recruiterPhone').value = recruiter.phone;
        document.getElementById('recruiterEmail').value = recruiter.email;
        document.getElementById('recruiterLocation').value = recruiter.location;
        document.getElementById('recruiterStatus').value = recruiter.status;
        document.getElementById('recruiterAddress').value = recruiter.address || '';
        document.getElementById('recruiterNotes').value = recruiter.notes || '';
        
        document.getElementById('recruiterModal').classList.add('show');
    }
}

function deleteRecruiter(recruiterId) {
    if (confirm('Are you sure you want to delete this recruiter?')) {
        recruiters = recruiters.filter(r => r.id !== recruiterId);
        saveToLocalStorage('recruiters', recruiters);
        displayRecruiters();
        showMessage('Recruiter deleted successfully', 'success');
    }
}

function toggleRecruiterStatus(recruiterId) {
    const recruiter = recruiters.find(r => r.id === recruiterId);
    if (recruiter) {
        recruiter.status = recruiter.status === 'active' ? 'inactive' : 'active';
        saveToLocalStorage('recruiters', recruiters);
        displayRecruiters();
        showMessage(`Recruiter ${recruiter.status === 'active' ? 'activated' : 'deactivated'} successfully`, 'success');
    }
}

function openAddRecruiterModal() {
    const modal = document.getElementById('recruiterModal');
    const modalTitle = document.getElementById('modalTitle');
    
    modalTitle.textContent = 'Add New Recruiter';
    document.getElementById('recruiterForm').reset();
    modal.classList.add('show');
}

function closeRecruiterModal() {
    const modal = document.getElementById('recruiterModal');
    modal.classList.remove('show');
}

function exportRecruiters() {
    const dataStr = JSON.stringify(recruiters, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'recruiters_export.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    showMessage('Recruiters data exported successfully', 'success');
}

// Recruiter Dashboard Functions
function openPostJobModal() {
    const modal = document.getElementById('postJobModal');
    document.getElementById('postJobForm').reset();
    modal.classList.add('show');
}

function closePostJobModal() {
    const modal = document.getElementById('postJobModal');
    modal.classList.remove('show');
}

function goToWorkers() {
    navigateToPage('/workers');
}

function goToJobs() {
    navigateToPage('/jobs');
}

function goToRequests() {
    navigateToPage('/requests');
}

function contactWorkers() {
    // Function for recruiters to contact multiple workers
    showMessage('Contact feature coming soon! You can contact workers individually from their profiles.', 'info');
}

function approveRequest(requestId) {
    const request = requests.find(r => r.id === requestId);
    if (request) {
        request.status = 'approved';
        saveToLocalStorage('requests', requests);
        showMessage('Request approved successfully', 'success');
        
        // Refresh the pending requests display
        if (window.location.pathname.includes('recruiter-dashboard.html')) {
            displayPendingRequests();
        }
    }
}

function viewRequest(requestId) {
    // Open request details modal or navigate to request page
    showMessage(`Opening request details for ${requestId}`, 'info');
}

function displayPendingRequests() {
    // Display pending requests in the recruiter dashboard
    const pendingRequests = requests.filter(r => r.status === 'pending');
    // Implementation would update the UI with pending requests
}
function exportWorkers() {
    const dataStr = JSON.stringify(workers, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'workers_export.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    showMessage('Workers data exported successfully', 'success');
}

function exportJobs() {
    const dataStr = JSON.stringify(jobs, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'jobs_export.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    showMessage('Jobs data exported successfully', 'success');
}

function generateReport() {
    showMessage('Report generation started. Download will begin shortly...', 'info');
    
    setTimeout(() => {
        const reportData = {
            generatedDate: new Date().toISOString(),
            totalWorkers: workers.length,
            totalJobs: jobs.length,
            totalRequests: requests.length,
            activeWorkers: workers.filter(w => w.availability === 'available').length,
            completedJobs: jobs.filter(j => j.status === 'completed').length,
            pendingRequests: requests.filter(r => r.status === 'pending').length
        };
        
        const dataStr = JSON.stringify(reportData, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        
        const exportFileDefaultName = `crm_report_${new Date().toISOString().split('T')[0]}.json`;
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
        
        showMessage('Report generated successfully', 'success');
    }, 2000);
}

function downloadReport(reportType) {
    showMessage(`Downloading ${reportType} report...`, 'info');
}

function viewReport(reportType) {
    showMessage(`Opening ${reportType} report viewer...`, 'info');
}

// Chart Functions
function initializeDashboardCharts() {
    // Worker Registrations Chart
    const workerCtx = document.getElementById('workerChart');
    if (workerCtx) {
        new Chart(workerCtx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Worker Registrations',
                    data: [12, 19, 15, 25, 22, 30, 28],
                    borderColor: '#ff8c00',
                    backgroundColor: 'rgba(255, 140, 0, 0.1)',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        labels: {
                            color: '#ffffff'
                        }
                    }
                },
                scales: {
                    y: {
                        ticks: {
                            color: '#ffffff'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        }
                    }
                }
            }
        });
    }
    
    if (jobsCompletedChart) {
        new Chart(jobsCompletedChart, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Jobs Completed',
                    data: jobs.length > 0 ? [3, 7, 4, 9, 5, jobs.filter(j => j.status === 'completed').length] : [0, 0, 0, 0, 0, 0],
                    backgroundColor: '#ff8c00'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }
    
    // Initialize Analytics Charts
    const revenueChart = document.getElementById('revenueChart');
    const categoryChart = document.getElementById('categoryChart');
    const performanceChart = document.getElementById('performanceChart');
    const locationChart = document.getElementById('locationChart');
    
    if (revenueChart) {
        new Chart(revenueChart, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Revenue',
                    data: jobs.length > 0 ? [12000, 15000, 18000, 22000, 25000, jobs.filter(j => j.status === 'completed').reduce((sum, job) => sum + parseFloat(job.payment || 0), 0)] : [0, 0, 0, 0, 0, 0],
                    borderColor: '#004e92',
                    backgroundColor: 'rgba(0, 78, 146, 0.1)',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }
    
    if (categoryChart) {
        const categories = ['carpentry', 'electrical', 'plumbing', 'painting', 'construction'];
        const categoryData = categories.map(cat => jobs.filter(j => j.type === cat).length);
        
        new Chart(categoryChart, {
            type: 'doughnut',
            data: {
                labels: categories.map(cat => cat.charAt(0).toUpperCase() + cat.slice(1)),
                datasets: [{
                    data: categoryData,
                    backgroundColor: ['#004e92', '#ff8c00', '#28a745', '#ffc107', '#17a2b8']
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        labels: {
                            color: '#ffffff'
                        }
                    }
                }
            }
        });
    }
    
    // Worker Performance Chart
    const performanceCtx = document.getElementById('performanceChart');
    if (performanceCtx) {
        new Chart(performanceCtx, {
            type: 'radar',
            data: {
                labels: ['Quality', 'Speed', 'Reliability', 'Communication', 'Professionalism'],
                datasets: [{
                    label: 'Average Performance',
                    data: [4.5, 4.2, 4.8, 4.3, 4.6],
                    borderColor: '#ff8c00',
                    backgroundColor: 'rgba(255, 140, 0, 0.2)'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        labels: {
                            color: '#ffffff'
                        }
                    }
                },
                scales: {
                    r: {
                        ticks: {
                            color: '#ffffff'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        pointLabels: {
                            color: '#ffffff'
                        }
                    }
                }
            }
        });
    }
    
    // Location Analysis Chart
    const locationCtx = document.getElementById('locationChart');
    if (locationCtx) {
        new Chart(locationCtx, {
            type: 'bar',
            data: {
                labels: ['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata'],
                datasets: [{
                    label: 'Workers',
                    data: [45, 38, 32, 28, 25],
                    backgroundColor: '#004e92'
                }, {
                    label: 'Jobs',
                    data: [52, 41, 35, 30, 27],
                    backgroundColor: '#ff8c00'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        labels: {
                            color: '#ffffff'
                        }
                    }
                },
                scales: {
                    y: {
                        ticks: {
                            color: '#ffffff'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        }
                    },
                    x: {
                        ticks: {
                            color: '#ffffff'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        }
                    }
                }
            }
        });
    }
}

// Utility Functions
function showMessage(message, type = 'info') {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.message');
    existingMessages.forEach(msg => msg.remove());
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type} fade-in`;
    messageDiv.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

function saveToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function loadFromLocalStorage(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
}

function loadSampleData() {
    // Load sample recruiters if none exist
    recruiters = loadFromLocalStorage('recruiters');
    if (recruiters.length === 0) {
        // Start with empty data - no dummy recruiters
        recruiters = [];
        saveToLocalStorage('recruiters', recruiters);
    }
    
    // Load sample workers if none exist
    workers = loadFromLocalStorage('workers');
    if (workers.length === 0) {
        // Start with empty data - no dummy workers
        workers = [];
        saveToLocalStorage('workers', workers);
    }
    
    // Load sample jobs if none exist
    jobs = loadFromLocalStorage('jobs');
    if (jobs.length === 0) {
        // Start with empty data - no dummy jobs
        jobs = [];
        saveToLocalStorage('jobs', jobs);
    }
    
    // Load sample requests if none exist
    requests = loadFromLocalStorage('requests');
    if (requests.length === 0) {
        // Start with empty data - no dummy requests
        requests = [];
        saveToLocalStorage('requests', requests);
    }
    
    // Display data on respective pages
    if (window.location.pathname.includes('recruiters.html')) {
        displayRecruiters();
    } else if (window.location.pathname.includes('workers.html')) {
        displayWorkers();
    } else if (window.location.pathname.includes('jobs.html')) {
        displayJobs();
    } else if (window.location.pathname.includes('requests.html')) {
        displayRequests();
    }
}

// Pagination Functions
function previousPage() {
    if (currentPage > 1) {
        currentPage--;
        updatePagination();
    }
}

function nextPage() {
    currentPage++;
    updatePagination();
}

function updatePagination() {
    const pageInfo = document.querySelector('.page-info');
    if (pageInfo) {
        pageInfo.textContent = `Page ${currentPage} of 5`;
    }
    
    // Re-render current page data
    if (window.location.pathname.includes('workers.html')) {
        displayWorkers();
    } else if (window.location.pathname.includes('jobs.html')) {
        displayJobs();
    } else if (window.location.pathname.includes('requests.html')) {
        displayRequests();
    }
}

// Chart period buttons
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('chart-btn')) {
        const buttons = document.querySelectorAll('.chart-btn');
        buttons.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        
        // Update chart data based on period
        updateChartData(e.target.dataset.period);
    }
});

function updateChartData(period) {
    // This would update the chart data based on the selected period
    console.log(`Updating chart data for period: ${period}`);
}

// Initialize date range filter
const dateRange = document.getElementById('dateRange');
if (dateRange) {
    dateRange.addEventListener('change', function() {
        updateAnalyticsData(this.value);
    });
}

function updateAnalyticsData(days) {
    // This would update analytics data based on the selected date range
    console.log(`Updating analytics data for last ${days} days`);
}
