// Real Backend Functionality - No Localhost Popups
class RealBackendSystem {
    constructor() {
        this.data = {
            workers: [],
            recruiters: [],
            jobs: [],
            requests: []
        };
        this.init();
    }

    init() {
        // Load data from localStorage or use default data
        this.loadData();
        this.setupRealFunctionality();
    }

    loadData() {
        // Try to load from localStorage first
        const savedData = localStorage.getItem('crmData');
        if (savedData) {
            this.data = JSON.parse(savedData);
        } else {
            // Use default data
            this.data = this.getDefaultData();
            this.saveData();
        }
    }

    saveData() {
        localStorage.setItem('crmData', JSON.stringify(this.data));
    }

    getDefaultData() {
        return {
            workers: [
                {
                    id: 'W001',
                    name: 'Raj Kumar',
                    category: 'Carpentry',
                    age: 28,
                    experience: '4 years',
                    rating: 4.5,
                    status: 'Available',
                    phone: '+91 98765 43210',
                    email: 'raj.kumar@email.com',
                    address: 'Delhi NCR',
                    skills: 'Woodworking, Furniture Making, Installation',
                    jobsCompleted: 24,
                    revenue: '₹1.2L',
                    successRate: '98%',
                    joinDate: '2023-01-15',
                    certifications: 'Carpentry Certificate, Safety Training',
                    availability: 'Full-time',
                    preferredLocation: 'Delhi NCR',
                    hourlyRate: '₹500'
                },
                {
                    id: 'W002',
                    name: 'Amit Singh',
                    category: 'Electrical',
                    age: 32,
                    experience: '6 years',
                    rating: 5.0,
                    status: 'Working',
                    phone: '+91 98765 43211',
                    email: 'amit.singh@email.com',
                    address: 'Mumbai',
                    skills: 'Wiring, Installation, Maintenance, Troubleshooting',
                    jobsCompleted: 18,
                    revenue: '₹0.9L',
                    successRate: '100%',
                    joinDate: '2022-06-20',
                    certifications: 'Electrical License, Safety Certificate',
                    availability: 'Full-time',
                    preferredLocation: 'Mumbai, Pune',
                    hourlyRate: '₹600'
                },
                {
                    id: 'W003',
                    name: 'Suresh Kumar',
                    category: 'Plumbing',
                    age: 35,
                    experience: '8 years',
                    rating: 4.0,
                    status: 'Available',
                    phone: '+91 98765 43212',
                    email: 'suresh.kumar@email.com',
                    address: 'Bangalore',
                    skills: 'Installation, Repair, Maintenance, Pipe Fitting',
                    jobsCompleted: 22,
                    revenue: '₹1.0L',
                    successRate: '95%',
                    joinDate: '2022-03-10',
                    certifications: 'Plumbing License, Safety Training',
                    availability: 'Full-time',
                    preferredLocation: 'Bangalore, Chennai',
                    hourlyRate: '₹450'
                }
            ],
            recruiters: [
                {
                    id: 'R001',
                    name: 'Priya Sharma',
                    position: 'Senior Recruiter',
                    age: 32,
                    experience: '5 years',
                    rating: 4.8,
                    status: 'Active',
                    phone: '+91 98765 43210',
                    email: 'priya.sharma@email.com',
                    company: 'Staffing Solutions Pvt Ltd',
                    jobsPosted: 156,
                    revenue: '₹3.2L',
                    successRate: '89%',
                    joinDate: '2022-01-15',
                    region: 'North',
                    performance: 'Excellent',
                    certifications: 'HR Certification, Recruitment Training',
                    specializations: 'Technical Recruitment, Executive Search',
                    targetAchievement: '112%'
                },
                {
                    id: 'R002',
                    name: 'Amit Patel',
                    position: 'Recruiter',
                    age: 28,
                    experience: '3 years',
                    rating: 4.5,
                    status: 'Active',
                    phone: '+91 98765 43211',
                    email: 'amit.patel@email.com',
                    company: 'Talent Connect Ltd',
                    jobsPosted: 124,
                    revenue: '₹2.1L',
                    successRate: '82%',
                    joinDate: '2023-03-20',
                    region: 'West',
                    performance: 'Good',
                    certifications: 'Recruitment Certification',
                    specializations: 'IT Recruitment, Healthcare',
                    targetAchievement: '95%'
                }
            ],
            jobs: [
                {
                    id: 'JOB001',
                    title: 'Home Renovation Project',
                    description: 'Complete home renovation in Delhi NCR including interior and exterior work',
                    category: 'Construction',
                    client: 'Amit Sharma',
                    clientPhone: '+91 98765 43210',
                    clientEmail: 'client@email.com',
                    budget: '₹25,000',
                    budgetRange: '₹20,000 - ₹30,000',
                    status: 'In Progress',
                    priority: 'High',
                    postedDate: '2024-03-20',
                    deadline: '2024-04-15',
                    workersAssigned: 2,
                    location: 'Delhi NCR',
                    duration: '3 weeks',
                    requirements: 'Experienced carpenters and painters needed for complete home renovation project.',
                    specialInstructions: 'Client prefers quality work over speed. All materials to be provided by client.'
                },
                {
                    id: 'JOB002',
                    title: 'Office Wiring',
                    description: 'Complete electrical wiring for new office space',
                    category: 'Electrical',
                    client: 'Priya Patel',
                    clientPhone: '+91 98765 43211',
                    clientEmail: 'client2@email.com',
                    budget: '₹15,000',
                    budgetRange: '₹12,000 - ₹18,000',
                    status: 'Completed',
                    priority: 'Medium',
                    postedDate: '2024-03-15',
                    deadline: '2024-03-25',
                    workersAssigned: 1,
                    location: 'Mumbai',
                    duration: '1 week',
                    requirements: 'Licensed electrician needed for commercial office wiring.',
                    specialInstructions: 'Must follow all safety regulations and building codes.'
                }
            ],
            requests: [
                {
                    id: 'REQ001',
                    workerName: 'Raj Kumar',
                    workerId: 'W001',
                    type: 'Job Application',
                    description: 'Applied for Home Renovation Project',
                    category: 'Carpentry',
                    priority: 'High',
                    status: 'Pending',
                    submittedDate: '2024-03-20',
                    requestedBy: 'Raj Kumar',
                    contactPhone: '+91 98765 43210',
                    contactEmail: 'raj.kumar@email.com',
                    expectedCompletion: '2024-04-15',
                    estimatedBudget: '₹25,000',
                    location: 'Delhi NCR',
                    urgency: 'High',
                    attachments: 'Resume, Certifications',
                    notes: 'Worker has 4 years of experience in carpentry and has completed similar projects successfully.'
                }
            ]
        };
    }

    setupRealFunctionality() {
        // Override modal system functions to use real data
        window.realBackend = this;
    }

    // Real CRUD Operations
    addWorker(workerData) {
        const newWorker = {
            ...workerData,
            id: 'W' + String(this.data.workers.length + 1).padStart(3, '0'),
            jobsCompleted: 0,
            revenue: '₹0',
            successRate: '0%',
            joinDate: new Date().toISOString().split('T')[0]
        };
        
        this.data.workers.push(newWorker);
        this.saveData();
        this.showSuccessNotification('Worker added successfully!');
        return newWorker;
    }

    updateWorker(workerId, workerData) {
        const index = this.data.workers.findIndex(w => w.id === workerId);
        if (index !== -1) {
            this.data.workers[index] = { ...this.data.workers[index], ...workerData };
            this.saveData();
            this.showSuccessNotification('Worker updated successfully!');
            return true;
        }
        return false;
    }

    deleteWorker(workerId) {
        const index = this.data.workers.findIndex(w => w.id === workerId);
        if (index !== -1) {
            this.data.workers.splice(index, 1);
            this.saveData();
            this.showSuccessNotification('Worker deleted successfully!');
            return true;
        }
        return false;
    }

    addRecruiter(recruiterData) {
        const newRecruiter = {
            ...recruiterData,
            id: 'R' + String(this.data.recruiters.length + 1).padStart(3, '0'),
            jobsPosted: 0,
            revenue: '₹0',
            successRate: '0%',
            joinDate: new Date().toISOString().split('T')[0]
        };
        
        this.data.recruiters.push(newRecruiter);
        this.saveData();
        this.showSuccessNotification('Recruiter added successfully!');
        return newRecruiter;
    }

    updateRecruiter(recruiterId, recruiterData) {
        const index = this.data.recruiters.findIndex(r => r.id === recruiterId);
        if (index !== -1) {
            this.data.recruiters[index] = { ...this.data.recruiters[index], ...recruiterData };
            this.saveData();
            this.showSuccessNotification('Recruiter updated successfully!');
            return true;
        }
        return false;
    }

    deleteRecruiter(recruiterId) {
        const index = this.data.recruiters.findIndex(r => r.id === recruiterId);
        if (index !== -1) {
            this.data.recruiters.splice(index, 1);
            this.saveData();
            this.showSuccessNotification('Recruiter deleted successfully!');
            return true;
        }
        return false;
    }

    addJob(jobData) {
        const newJob = {
            ...jobData,
            id: 'JOB' + String(this.data.jobs.length + 1).padStart(3, '0'),
            postedDate: new Date().toISOString().split('T')[0],
            workersAssigned: 0
        };
        
        this.data.jobs.push(newJob);
        this.saveData();
        this.showSuccessNotification('Job added successfully!');
        return newJob;
    }

    updateJob(jobId, jobData) {
        const index = this.data.jobs.findIndex(j => j.id === jobId);
        if (index !== -1) {
            this.data.jobs[index] = { ...this.data.jobs[index], ...jobData };
            this.saveData();
            this.showSuccessNotification('Job updated successfully!');
            return true;
        }
        return false;
    }

    deleteJob(jobId) {
        const index = this.data.jobs.findIndex(j => j.id === jobId);
        if (index !== -1) {
            this.data.jobs.splice(index, 1);
            this.saveData();
            this.showSuccessNotification('Job deleted successfully!');
            return true;
        }
        return false;
    }

    updateRequest(requestId, status) {
        const index = this.data.requests.findIndex(r => r.id === requestId);
        if (index !== -1) {
            this.data.requests[index].status = status;
            this.saveData();
            this.showSuccessNotification(`Request ${status.toLowerCase()} successfully!`);
            return true;
        }
        return false;
    }

    // Real Export Functionality
    exportToCSV(data, filename) {
        // Create CSV content
        const headers = Object.keys(data[0]);
        const csvContent = [
            headers.join(','),
            ...data.map(row => headers.map(header => `"${row[header]}"`).join(','))
        ].join('\n');

        // Create blob and download
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        this.showSuccessNotification(`${filename} downloaded successfully!`);
    }

    // Real Search Functionality
    searchWorkers(searchTerm) {
        if (!searchTerm) return this.data.workers;
        
        const term = searchTerm.toLowerCase();
        return this.data.workers.filter(worker => 
            worker.name.toLowerCase().includes(term) ||
            worker.category.toLowerCase().includes(term) ||
            worker.email.toLowerCase().includes(term) ||
            worker.phone.includes(term) ||
            worker.status.toLowerCase().includes(term)
        );
    }

    searchRecruiters(searchTerm) {
        if (!searchTerm) return this.data.recruiters;
        
        const term = searchTerm.toLowerCase();
        return this.data.recruiters.filter(recruiter => 
            recruiter.name.toLowerCase().includes(term) ||
            recruiter.position.toLowerCase().includes(term) ||
            recruiter.email.toLowerCase().includes(term) ||
            recruiter.phone.includes(term) ||
            recruiter.status.toLowerCase().includes(term)
        );
    }

    searchJobs(searchTerm) {
        if (!searchTerm) return this.data.jobs;
        
        const term = searchTerm.toLowerCase();
        return this.data.jobs.filter(job => 
            job.title.toLowerCase().includes(term) ||
            job.category.toLowerCase().includes(term) ||
            job.client.toLowerCase().includes(term) ||
            job.location.toLowerCase().includes(term) ||
            job.status.toLowerCase().includes(term)
        );
    }

    searchRequests(searchTerm) {
        if (!searchTerm) return this.data.requests;
        
        const term = searchTerm.toLowerCase();
        return this.data.requests.filter(request => 
            request.workerName.toLowerCase().includes(term) ||
            request.type.toLowerCase().includes(term) ||
            request.category.toLowerCase().includes(term) ||
            request.status.toLowerCase().includes(term)
        );
    }

    // Notification System
    showSuccessNotification(message) {
        this.showNotification(message, 'success');
    }

    showErrorNotification(message) {
        this.showNotification(message, 'error');
    }

    showNotification(message, type = 'info') {
        // Remove existing notification
        const existingNotification = document.querySelector('.real-notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `real-notification real-notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${this.getNotificationIcon(type)}"></i>
                <span>${message}</span>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            min-width: 300px;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            animation: slideIn 0.3s ease;
            background: ${type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#2196f3'};
            color: white;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        `;

        // Add to page
        document.body.appendChild(notification);

        // Auto remove after 3 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 3000);
    }

    getNotificationIcon(type) {
        switch(type) {
            case 'success': return 'fa-check-circle';
            case 'error': return 'fa-exclamation-circle';
            default: return 'fa-info-circle';
        }
    }

    // Get data for modals
    getWorker(workerId) {
        return this.data.workers.find(w => w.id === workerId);
    }

    getRecruiter(recruiterId) {
        return this.data.recruiters.find(r => r.id === recruiterId);
    }

    getJob(jobId) {
        return this.data.jobs.find(j => j.id === jobId);
    }

    getRequest(requestId) {
        return this.data.requests.find(r => r.id === requestId);
    }

    // Refresh page data
    refreshPage() {
        this.showSuccessNotification('Data refreshed successfully!');
        setTimeout(() => {
            location.reload();
        }, 1000);
    }
}

// Initialize real backend system
const realBackend = new RealBackendSystem();

// Add notification styles to head
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .real-notification {
        font-size: 14px;
        line-height: 1.4;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 4px;
        border-radius: 4px;
        margin-left: auto;
    }
    
    .notification-close:hover {
        background: rgba(255,255,255,0.2);
    }
`;
document.head.appendChild(notificationStyles);

// Override modal system functions to use real backend
const originalModalSystem = window.modalSystem;
if (originalModalSystem) {
    // Override save functions
    originalModalSystem.saveNewWorker = function() {
        const form = document.getElementById('addWorkerForm');
        if (form.checkValidity()) {
            const formData = new FormData(form);
            const workerData = {
                name: formData.get('newWorkerName'),
                category: formData.get('newWorkerCategory'),
                age: parseInt(formData.get('newWorkerAge')),
                experience: formData.get('newWorkerExperience'),
                phone: formData.get('newWorkerPhone'),
                email: formData.get('newWorkerEmail'),
                address: formData.get('newWorkerAddress'),
                skills: formData.get('newWorkerSkills'),
                hourlyRate: formData.get('newWorkerHourlyRate'),
                certifications: formData.get('newWorkerCertifications'),
                status: 'Available'
            };
            
            realBackend.addWorker(workerData);
            this.closeModal();
            
            // Refresh page to show new data
            setTimeout(() => location.reload(), 1000);
        } else {
            form.reportValidity();
        }
    };

    originalModalSystem.saveWorker = function() {
        const form = document.getElementById('editWorkerForm');
        if (form.checkValidity()) {
            const formData = new FormData(form);
            const workerData = {
                name: formData.get('workerName'),
                category: formData.get('workerCategory'),
                phone: formData.get('workerPhone'),
                email: formData.get('workerEmail'),
                status: formData.get('workerStatus'),
                experience: formData.get('workerExperience'),
                skills: formData.get('workerSkills'),
                address: formData.get('workerAddress'),
                hourlyRate: formData.get('workerHourlyRate')
            };
            
            const workerId = this.currentData.id;
            realBackend.updateWorker(workerId, workerData);
            this.closeModal();
            
            // Refresh page to show updated data
            setTimeout(() => location.reload(), 1000);
        } else {
            form.reportValidity();
        }
    };

    originalModalSystem.saveNewRecruiter = function() {
        const form = document.getElementById('addRecruiterForm');
        if (form.checkValidity()) {
            const formData = new FormData(form);
            const recruiterData = {
                name: formData.get('newRecruiterName'),
                position: formData.get('newRecruiterPosition'),
                age: parseInt(formData.get('newRecruiterAge')),
                experience: formData.get('newRecruiterExperience'),
                phone: formData.get('newRecruiterPhone'),
                email: formData.get('newRecruiterEmail'),
                company: formData.get('newRecruiterCompany'),
                region: formData.get('newRecruiterRegion'),
                specializations: formData.get('newRecruiterSpecializations'),
                status: 'Active'
            };
            
            realBackend.addRecruiter(recruiterData);
            this.closeModal();
            
            // Refresh page to show new data
            setTimeout(() => location.reload(), 1000);
        } else {
            form.reportValidity();
        }
    };

    originalModalSystem.saveNewJob = function() {
        const form = document.getElementById('addJobForm');
        if (form.checkValidity()) {
            const formData = new FormData(form);
            const jobData = {
                title: formData.get('newJobTitle'),
                category: formData.get('newJobCategory'),
                description: formData.get('newJobDescription'),
                client: formData.get('newJobClient'),
                clientPhone: formData.get('newJobClientPhone'),
                clientEmail: formData.get('newJobClientEmail'),
                budget: formData.get('newJobBudget'),
                location: formData.get('newJobLocation'),
                duration: formData.get('newJobDuration'),
                deadline: formData.get('newJobDeadline'),
                priority: formData.get('newJobPriority'),
                requirements: formData.get('newJobRequirements'),
                status: 'Pending'
            };
            
            realBackend.addJob(jobData);
            this.closeModal();
            
            // Refresh page to show new data
            setTimeout(() => location.reload(), 1000);
        } else {
            form.reportValidity();
        }
    };

    // Override export functions
    originalModalSystem.exportWorkers = function() {
        realBackend.exportToCSV(realBackend.data.workers, 'workers_data.csv');
    };

    originalModalSystem.exportRecruiters = function() {
        realBackend.exportToCSV(realBackend.data.recruiters, 'recruiters_data.csv');
    };

    originalModalSystem.exportJobs = function() {
        realBackend.exportToCSV(realBackend.data.jobs, 'jobs_data.csv');
    };

    originalModalSystem.exportRequests = function() {
        realBackend.exportToCSV(realBackend.data.requests, 'requests_data.csv');
    };

    // Override delete functions
    originalModalSystem.deleteItem = function(type, id) {
        if (confirm(`Are you sure you want to delete this ${type}? This action cannot be undone.`)) {
            let success = false;
            switch(type) {
                case 'worker':
                    success = realBackend.deleteWorker(id);
                    break;
                case 'recruiter':
                    success = realBackend.deleteRecruiter(id);
                    break;
                case 'job':
                    success = realBackend.deleteJob(id);
                    break;
            }
            
            if (success) {
                setTimeout(() => location.reload(), 1000);
            }
        }
    };

    // Override approve/reject functions
    originalModalSystem.approveRequest = function(requestId) {
        if (confirm(`Are you sure you want to approve request ${requestId}?`)) {
            realBackend.updateRequest(requestId, 'Approved');
            this.closeModal();
            setTimeout(() => location.reload(), 1000);
        }
    };

    originalModalSystem.rejectRequest = function(requestId) {
        if (confirm(`Are you sure you want to reject request ${requestId}?`)) {
            realBackend.updateRequest(requestId, 'Rejected');
            this.closeModal();
            setTimeout(() => location.reload(), 1000);
        }
    };

    // Override refresh function
    originalModalSystem.refreshDashboard = function() {
        realBackend.refreshPage();
    };
}

// Make functions globally available
window.realBackend = realBackend;
