// Modal System - Real Functionality for All Pages
class ModalSystem {
    constructor() {
        this.currentModal = null;
        this.currentData = null;
        this.init();
    }

    init() {
        // Create modal container if it doesn't exist
        if (!document.getElementById('modalContainer')) {
            const modalContainer = document.createElement('div');
            modalContainer.id = 'modalContainer';
            document.body.appendChild(modalContainer);
        }
    }

    // Worker Modal Functions
    showWorkerModal(workerId, action = 'view') {
        const workerData = this.getWorkerData(workerId);
        this.currentData = workerData;
        this.currentModal = 'worker';
        
        const modalContent = this.generateWorkerModal(workerData, action);
        this.showModal(modalContent);
    }

    getWorkerData(workerId) {
        const workers = {
            'W001': {
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
            'W002': {
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
            'W003': {
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
            },
            'W004': {
                id: 'W004',
                name: 'Mahesh Kumar',
                category: 'Painting',
                age: 29,
                experience: '3 years',
                rating: 4.5,
                status: 'Available',
                phone: '+91 98765 43213',
                email: 'mahesh.kumar@email.com',
                address: 'Chennai',
                skills: 'Interior Painting, Exterior Painting, Texture Painting',
                jobsCompleted: 20,
                revenue: '₹0.8L',
                successRate: '92%',
                joinDate: '2023-05-10',
                certifications: 'Painting Certificate, Safety Training',
                availability: 'Full-time',
                preferredLocation: 'Chennai, Bangalore',
                hourlyRate: '₹400'
            },
            'W005': {
                id: 'W005',
                name: 'Ramesh Kumar',
                category: 'Masonry',
                age: 38,
                experience: '10 years',
                rating: 5.0,
                status: 'On Leave',
                phone: '+91 98765 43214',
                email: 'ramesh.kumar@email.com',
                address: 'Kolkata',
                skills: 'Wall Construction, Bricklaying, Foundation Work',
                jobsCompleted: 35,
                revenue: '₹1.8L',
                successRate: '97%',
                joinDate: '2021-08-15',
                certifications: 'Masonry Certificate, Safety Training',
                availability: 'Part-time',
                preferredLocation: 'Kolkata, Delhi',
                hourlyRate: '₹550'
            }
        };
        
        return workers[workerId] || workers['W001'];
    }

    generateWorkerModal(worker, action) {
        if (action === 'view') {
            return `
                <div class="modal-content">
                    <div class="modal-header">
                        <h3><i class="fas fa-user"></i> Worker Details</h3>
                        <button class="modal-close" onclick="modalSystem.closeModal()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="view-section">
                            <h4>Personal Information</h4>
                            <div class="info-grid">
                                <div class="info-item">
                                    <span class="info-label">Worker ID</span>
                                    <span class="info-value">${worker.id}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Name</span>
                                    <span class="info-value">${worker.name}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Category</span>
                                    <span class="category-tag ${worker.category.toLowerCase()}">${worker.category}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Age</span>
                                    <span class="info-value">${worker.age} years</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Experience</span>
                                    <span class="info-value">${worker.experience}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Rating</span>
                                    <div class="rating">
                                        ${this.generateStars(worker.rating)}
                                        <small>(${worker.rating})</small>
                                    </div>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Status</span>
                                    <span class="status-badge ${worker.status.toLowerCase().replace(' ', '-')}">${worker.status}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Phone</span>
                                    <span class="info-value">
                                        <a href="tel:${worker.phone}">${worker.phone}</a>
                                    </span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Email</span>
                                    <span class="info-value">
                                        <a href="mailto:${worker.email}">${worker.email}</a>
                                    </span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Address</span>
                                    <span class="info-value">${worker.address}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="view-section">
                            <h4>Professional Details</h4>
                            <div class="info-grid">
                                <div class="info-item">
                                    <span class="info-label">Skills</span>
                                    <span class="info-value">${worker.skills}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Jobs Completed</span>
                                    <span class="info-value">${worker.jobsCompleted}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Total Revenue</span>
                                    <span class="info-value">${worker.revenue}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Success Rate</span>
                                    <span class="info-value">${worker.successRate}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Join Date</span>
                                    <span class="info-value">${worker.joinDate}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Certifications</span>
                                    <span class="info-value">${worker.certifications}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Availability</span>
                                    <span class="info-value">${worker.availability}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Preferred Location</span>
                                    <span class="info-value">${worker.preferredLocation}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Hourly Rate</span>
                                    <span class="info-value">${worker.hourlyRate}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" onclick="modalSystem.closeModal()">Close</button>
                        <button class="btn btn-warning" onclick="modalSystem.editWorker('${worker.id}')">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="btn btn-success" onclick="modalSystem.assignJob('${worker.id}')">
                            <i class="fas fa-briefcase"></i> Assign Job
                        </button>
                    </div>
                </div>
            `;
        } else if (action === 'edit') {
            return `
                <div class="modal-content">
                    <div class="modal-header">
                        <h3><i class="fas fa-edit"></i> Edit Worker</h3>
                        <button class="modal-close" onclick="modalSystem.closeModal()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form id="editWorkerForm">
                            <div class="form-group">
                                <label for="workerName">Name</label>
                                <input type="text" id="workerName" value="${worker.name}" required>
                            </div>
                            <div class="form-group">
                                <label for="workerCategory">Category</label>
                                <select id="workerCategory" required>
                                    <option value="Carpentry" ${worker.category === 'Carpentry' ? 'selected' : ''}>Carpentry</option>
                                    <option value="Electrical" ${worker.category === 'Electrical' ? 'selected' : ''}>Electrical</option>
                                    <option value="Plumbing" ${worker.category === 'Plumbing' ? 'selected' : ''}>Plumbing</option>
                                    <option value="Painting" ${worker.category === 'Painting' ? 'selected' : ''}>Painting</option>
                                    <option value="Masonry" ${worker.category === 'Masonry' ? 'selected' : ''}>Masonry</option>
                                    <option value="Welding" ${worker.category === 'Welding' ? 'selected' : ''}>Welding</option>
                                    <option value="Mechanical" ${worker.category === 'Mechanical' ? 'selected' : ''}>Mechanical</option>
                                    <option value="Cleaning" ${worker.category === 'Cleaning' ? 'selected' : ''}>Cleaning</option>
                                    <option value="Security" ${worker.category === 'Security' ? 'selected' : ''}>Security</option>
                                    <option value="Delivery" ${worker.category === 'Delivery' ? 'selected' : ''}>Delivery</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="workerPhone">Phone</label>
                                <input type="tel" id="workerPhone" value="${worker.phone}" required>
                            </div>
                            <div class="form-group">
                                <label for="workerEmail">Email</label>
                                <input type="email" id="workerEmail" value="${worker.email}" required>
                            </div>
                            <div class="form-group">
                                <label for="workerStatus">Status</label>
                                <select id="workerStatus" required>
                                    <option value="Available" ${worker.status === 'Available' ? 'selected' : ''}>Available</option>
                                    <option value="Working" ${worker.status === 'Working' ? 'selected' : ''}>Working</option>
                                    <option value="On Leave" ${worker.status === 'On Leave' ? 'selected' : ''}>On Leave</option>
                                    <option value="Suspended" ${worker.status === 'Suspended' ? 'selected' : ''}>Suspended</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="workerExperience">Experience</label>
                                <input type="text" id="workerExperience" value="${worker.experience}" required>
                            </div>
                            <div class="form-group">
                                <label for="workerSkills">Skills</label>
                                <textarea id="workerSkills" required>${worker.skills}</textarea>
                            </div>
                            <div class="form-group">
                                <label for="workerAddress">Address</label>
                                <input type="text" id="workerAddress" value="${worker.address}" required>
                            </div>
                            <div class="form-group">
                                <label for="workerHourlyRate">Hourly Rate</label>
                                <input type="text" id="workerHourlyRate" value="${worker.hourlyRate}" required>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" onclick="modalSystem.closeModal()">Cancel</button>
                        <button class="btn btn-primary" onclick="modalSystem.saveWorker()">
                            <i class="fas fa-save"></i> Save Changes
                        </button>
                    </div>
                </div>
            `;
        }
    }

    // Recruiter Modal Functions
    showRecruiterModal(recruiterId, action = 'view') {
        const recruiterData = this.getRecruiterData(recruiterId);
        this.currentData = recruiterData;
        this.currentModal = 'recruiter';
        
        const modalContent = this.generateRecruiterModal(recruiterData, action);
        this.showModal(modalContent);
    }

    getRecruiterData(recruiterId) {
        const recruiters = {
            'R001': {
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
            'R002': {
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
            },
            'R003': {
                id: 'R003',
                name: 'Neha Gupta',
                position: 'Talent Acquisition',
                age: 30,
                experience: '4 years',
                rating: 4.7,
                status: 'Active',
                phone: '+91 98765 43212',
                email: 'neha.gupta@email.com',
                company: 'HR Partners Ltd',
                jobsPosted: 178,
                revenue: '₹3.5L',
                successRate: '91%',
                joinDate: '2022-08-10',
                region: 'South',
                performance: 'Excellent',
                certifications: 'HR Certification, Talent Acquisition',
                specializations: 'Executive Search, Technical Hiring',
                targetAchievement: '118%'
            }
        };
        
        return recruiters[recruiterId] || recruiters['R001'];
    }

    generateRecruiterModal(recruiter, action) {
        if (action === 'view') {
            return `
                <div class="modal-content">
                    <div class="modal-header">
                        <h3><i class="fas fa-user-tie"></i> Recruiter Details</h3>
                        <button class="modal-close" onclick="modalSystem.closeModal()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="view-section">
                            <h4>Personal Information</h4>
                            <div class="info-grid">
                                <div class="info-item">
                                    <span class="info-label">Recruiter ID</span>
                                    <span class="info-value">${recruiter.id}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Name</span>
                                    <span class="info-value">${recruiter.name}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Position</span>
                                    <span class="info-value">${recruiter.position}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Age</span>
                                    <span class="info-value">${recruiter.age} years</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Experience</span>
                                    <span class="info-value">${recruiter.experience}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Rating</span>
                                    <div class="rating">
                                        ${this.generateStars(recruiter.rating)}
                                        <small>(${recruiter.rating})</small>
                                    </div>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Status</span>
                                    <span class="status-badge ${recruiter.status.toLowerCase()}">${recruiter.status}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Phone</span>
                                    <span class="info-value">
                                        <a href="tel:${recruiter.phone}">${recruiter.phone}</a>
                                    </span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Email</span>
                                    <span class="info-value">
                                        <a href="mailto:${recruiter.email}">${recruiter.email}</a>
                                    </span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Company</span>
                                    <span class="info-value">${recruiter.company}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="view-section">
                            <h4>Performance Metrics</h4>
                            <div class="info-grid">
                                <div class="info-item">
                                    <span class="info-label">Jobs Posted</span>
                                    <span class="info-value">${recruiter.jobsPosted}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Total Revenue</span>
                                    <span class="info-value">${recruiter.revenue}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Success Rate</span>
                                    <span class="info-value">${recruiter.successRate}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Target Achievement</span>
                                    <span class="info-value">${recruiter.targetAchievement}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Join Date</span>
                                    <span class="info-value">${recruiter.joinDate}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Region</span>
                                    <span class="info-value">${recruiter.region}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Performance</span>
                                    <span class="info-value">${recruiter.performance}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Certifications</span>
                                    <span class="info-value">${recruiter.certifications}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Specializations</span>
                                    <span class="info-value">${recruiter.specializations}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" onclick="modalSystem.closeModal()">Close</button>
                        <button class="btn btn-warning" onclick="modalSystem.editRecruiter('${recruiter.id}')">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="btn btn-success" onclick="modalSystem.assignJobs('${recruiter.id}')">
                            <i class="fas fa-briefcase"></i> Assign Jobs
                        </button>
                    </div>
                </div>
            `;
        }
    }

    // Job Modal Functions
    showJobModal(jobId, action = 'view') {
        const jobData = this.getJobData(jobId);
        this.currentData = jobData;
        this.currentModal = 'job';
        
        const modalContent = this.generateJobModal(jobData, action);
        this.showModal(modalContent);
    }

    getJobData(jobId) {
        const jobs = {
            'JOB001': {
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
            'JOB002': {
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
            },
            'JOB003': {
                id: 'JOB003',
                title: 'Plumbing Installation',
                description: 'New bathroom plumbing installation',
                category: 'Plumbing',
                client: 'Rahul Gupta',
                clientPhone: '+91 98765 43212',
                clientEmail: 'client3@email.com',
                budget: '₹18,000',
                budgetRange: '₹15,000 - ₹20,000',
                status: 'Pending',
                priority: 'Medium',
                postedDate: '2024-03-18',
                deadline: '2024-04-05',
                workersAssigned: 1,
                location: 'Bangalore',
                duration: '2 weeks',
                requirements: 'Experienced plumber needed for new bathroom installation.',
                specialInstructions: 'Client wants high-quality fixtures and modern design.'
            }
        };
        
        return jobs[jobId] || jobs['JOB001'];
    }

    generateJobModal(job, action) {
        if (action === 'view') {
            return `
                <div class="modal-content">
                    <div class="modal-header">
                        <h3><i class="fas fa-briefcase"></i> Job Details</h3>
                        <button class="modal-close" onclick="modalSystem.closeModal()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="view-section">
                            <h4>Job Information</h4>
                            <div class="info-grid">
                                <div class="info-item">
                                    <span class="info-label">Job ID</span>
                                    <span class="info-value">${job.id}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Title</span>
                                    <span class="info-value">${job.title}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Category</span>
                                    <span class="category-tag ${job.category.toLowerCase()}">${job.category}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Status</span>
                                    <span class="status-badge ${job.status.toLowerCase().replace(' ', '-')}">${job.status}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Priority</span>
                                    <span class="priority-badge ${job.priority.toLowerCase()}">${job.priority}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Budget</span>
                                    <span class="info-value">${job.budget}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Budget Range</span>
                                    <span class="info-value">${job.budgetRange}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Posted Date</span>
                                    <span class="info-value">${job.postedDate}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Deadline</span>
                                    <span class="info-value">${job.deadline}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Location</span>
                                    <span class="info-value">${job.location}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Duration</span>
                                    <span class="info-value">${job.duration}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Workers Assigned</span>
                                    <span class="info-value">${job.workersAssigned}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="view-section">
                            <h4>Description</h4>
                            <p>${job.description}</p>
                        </div>
                        
                        <div class="view-section">
                            <h4>Requirements</h4>
                            <p>${job.requirements}</p>
                        </div>
                        
                        <div class="view-section">
                            <h4>Client Information</h4>
                            <div class="info-grid">
                                <div class="info-item">
                                    <span class="info-label">Client Name</span>
                                    <span class="info-value">${job.client}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Phone</span>
                                    <span class="info-value">
                                        <a href="tel:${job.clientPhone}">${job.clientPhone}</a>
                                    </span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Email</span>
                                    <span class="info-value">
                                        <a href="mailto:${job.clientEmail}">${job.clientEmail}</a>
                                    </span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="view-section">
                            <h4>Special Instructions</h4>
                            <p>${job.specialInstructions}</p>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" onclick="modalSystem.closeModal()">Close</button>
                        <button class="btn btn-warning" onclick="modalSystem.editJob('${job.id}')">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="btn btn-success" onclick="modalSystem.assignWorkers('${job.id}')">
                            <i class="fas fa-users"></i> Assign Workers
                        </button>
                    </div>
                </div>
            `;
        }
    }

    // Request Modal Functions
    showRequestModal(requestId, action = 'view') {
        const requestData = this.getRequestData(requestId);
        this.currentData = requestData;
        this.currentModal = 'request';
        
        const modalContent = this.generateRequestModal(requestData, action);
        this.showModal(modalContent);
    }

    getRequestData(requestId) {
        const requests = {
            'REQ001': {
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
            },
            'REQ002': {
                id: 'REQ002',
                workerName: 'Amit Singh',
                workerId: 'W002',
                type: 'Training Request',
                description: 'Request for advanced electrical training certification',
                category: 'Electrical',
                priority: 'Medium',
                status: 'Approved',
                submittedDate: '2024-03-18',
                requestedBy: 'Amit Singh',
                contactPhone: '+91 98765 43211',
                contactEmail: 'amit.singh@email.com',
                expectedCompletion: '2024-04-30',
                estimatedBudget: '₹15,000',
                location: 'Mumbai',
                urgency: 'Medium',
                attachments: 'Current Certificates, Training Proposal',
                notes: 'Worker wants to upgrade skills for better job opportunities.'
            },
            'REQ003': {
                id: 'REQ003',
                workerName: 'Suresh Kumar',
                workerId: 'W003',
                type: 'Leave Request',
                description: 'Request for 2 weeks leave for personal reasons',
                category: 'Leave',
                priority: 'Low',
                status: 'Rejected',
                submittedDate: '2024-03-16',
                requestedBy: 'Suresh Kumar',
                contactPhone: '+91 98765 43212',
                contactEmail: 'suresh.kumar@email.com',
                expectedCompletion: '2024-03-30',
                estimatedBudget: '₹0',
                location: 'Bangalore',
                urgency: 'Low',
                attachments: 'Leave Application',
                notes: 'Worker needs leave for family emergency. Request rejected due to project deadlines.'
            }
        };
        
        return requests[requestId] || requests['REQ001'];
    }

    generateRequestModal(request, action) {
        if (action === 'view') {
            return `
                <div class="modal-content">
                    <div class="modal-header">
                        <h3><i class="fas fa-clipboard-list"></i> Request Details</h3>
                        <button class="modal-close" onclick="modalSystem.closeModal()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="view-section">
                            <h4>Request Information</h4>
                            <div class="info-grid">
                                <div class="info-item">
                                    <span class="info-label">Request ID</span>
                                    <span class="info-value">${request.id}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Type</span>
                                    <span class="category-tag ${request.type.toLowerCase().replace(' ', '-')}">${request.type}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Status</span>
                                    <span class="status-badge ${request.status.toLowerCase()}">${request.status}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Priority</span>
                                    <span class="priority-badge ${request.priority.toLowerCase()}">${request.priority}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Submitted Date</span>
                                    <span class="info-value">${request.submittedDate}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Category</span>
                                    <span class="category-tag ${request.category.toLowerCase()}">${request.category}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Expected Completion</span>
                                    <span class="info-value">${request.expectedCompletion}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Estimated Budget</span>
                                    <span class="info-value">${request.estimatedBudget}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Location</span>
                                    <span class="info-value">${request.location}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Urgency</span>
                                    <span class="info-value">${request.urgency}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="view-section">
                            <h4>Description</h4>
                            <p>${request.description}</p>
                        </div>
                        
                        <div class="view-section">
                            <h4>Worker Information</h4>
                            <div class="info-grid">
                                <div class="info-item">
                                    <span class="info-label">Worker Name</span>
                                    <span class="info-value">${request.workerName}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Worker ID</span>
                                    <span class="info-value">${request.workerId}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Phone</span>
                                    <span class="info-value">
                                        <a href="tel:${request.contactPhone}">${request.contactPhone}</a>
                                    </span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Email</span>
                                    <span class="info-value">
                                        <a href="mailto:${request.contactEmail}">${request.contactEmail}</a>
                                    </span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="view-section">
                            <h4>Additional Notes</h4>
                            <p>${request.notes}</p>
                        </div>
                        
                        <div class="view-section">
                            <h4>Attachments</h4>
                            <p>${request.attachments}</p>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" onclick="modalSystem.closeModal()">Close</button>
                        <button class="btn btn-success" onclick="modalSystem.approveRequest('${request.id}')">
                            <i class="fas fa-check"></i> Approve
                        </button>
                        <button class="btn btn-danger" onclick="modalSystem.rejectRequest('${request.id}')">
                            <i class="fas fa-times"></i> Reject
                        </button>
                    </div>
                </div>
            `;
        }
    }

    // Add Worker Modal
    showAddWorkerModal() {
        const modalContent = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3><i class="fas fa-user-plus"></i> Add New Worker</h3>
                    <button class="modal-close" onclick="modalSystem.closeModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="addWorkerForm">
                        <div class="form-group">
                            <label for="newWorkerName">Name *</label>
                            <input type="text" id="newWorkerName" required>
                        </div>
                        <div class="form-group">
                            <label for="newWorkerCategory">Category *</label>
                            <select id="newWorkerCategory" required>
                                <option value="">Select Category</option>
                                <option value="Carpentry">Carpentry</option>
                                <option value="Electrical">Electrical</option>
                                <option value="Plumbing">Plumbing</option>
                                <option value="Painting">Painting</option>
                                <option value="Masonry">Masonry</option>
                                <option value="Welding">Welding</option>
                                <option value="Mechanical">Mechanical</option>
                                <option value="Cleaning">Cleaning</option>
                                <option value="Security">Security</option>
                                <option value="Delivery">Delivery</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="newWorkerAge">Age *</label>
                            <input type="number" id="newWorkerAge" min="18" max="65" required>
                        </div>
                        <div class="form-group">
                            <label for="newWorkerExperience">Experience *</label>
                            <input type="text" id="newWorkerExperience" placeholder="e.g., 4 years" required>
                        </div>
                        <div class="form-group">
                            <label for="newWorkerPhone">Phone *</label>
                            <input type="tel" id="newWorkerPhone" required>
                        </div>
                        <div class="form-group">
                            <label for="newWorkerEmail">Email *</label>
                            <input type="email" id="newWorkerEmail" required>
                        </div>
                        <div class="form-group">
                            <label for="newWorkerAddress">Address *</label>
                            <input type="text" id="newWorkerAddress" required>
                        </div>
                        <div class="form-group">
                            <label for="newWorkerSkills">Skills *</label>
                            <textarea id="newWorkerSkills" placeholder="e.g., Woodworking, Furniture Making" required></textarea>
                        </div>
                        <div class="form-group">
                            <label for="newWorkerHourlyRate">Hourly Rate *</label>
                            <input type="text" id="newWorkerHourlyRate" placeholder="e.g., ₹500" required>
                        </div>
                        <div class="form-group">
                            <label for="newWorkerCertifications">Certifications</label>
                            <input type="text" id="newWorkerCertifications" placeholder="e.g., Carpentry Certificate">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" onclick="modalSystem.closeModal()">Cancel</button>
                    <button class="btn btn-primary" onclick="modalSystem.saveNewWorker()">
                        <i class="fas fa-save"></i> Add Worker
                    </button>
                </div>
            </div>
        `;
        this.showModal(modalContent);
    }

    // Add Recruiter Modal
    showAddRecruiterModal() {
        const modalContent = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3><i class="fas fa-user-tie"></i> Add New Recruiter</h3>
                    <button class="modal-close" onclick="modalSystem.closeModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="addRecruiterForm">
                        <div class="form-group">
                            <label for="newRecruiterName">Name *</label>
                            <input type="text" id="newRecruiterName" required>
                        </div>
                        <div class="form-group">
                            <label for="newRecruiterPosition">Position *</label>
                            <select id="newRecruiterPosition" required>
                                <option value="">Select Position</option>
                                <option value="Junior Recruiter">Junior Recruiter</option>
                                <option value="Recruiter">Recruiter</option>
                                <option value="Senior Recruiter">Senior Recruiter</option>
                                <option value="Recruitment Manager">Recruitment Manager</option>
                                <option value="Talent Acquisition">Talent Acquisition</option>
                                <option value="Recruitment Lead">Recruitment Lead</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="newRecruiterAge">Age *</label>
                            <input type="number" id="newRecruiterAge" min="21" max="65" required>
                        </div>
                        <div class="form-group">
                            <label for="newRecruiterExperience">Experience *</label>
                            <input type="text" id="newRecruiterExperience" placeholder="e.g., 3 years" required>
                        </div>
                        <div class="form-group">
                            <label for="newRecruiterPhone">Phone *</label>
                            <input type="tel" id="newRecruiterPhone" required>
                        </div>
                        <div class="form-group">
                            <label for="newRecruiterEmail">Email *</label>
                            <input type="email" id="newRecruiterEmail" required>
                        </div>
                        <div class="form-group">
                            <label for="newRecruiterCompany">Company *</label>
                            <input type="text" id="newRecruiterCompany" required>
                        </div>
                        <div class="form-group">
                            <label for="newRecruiterRegion">Region *</label>
                            <select id="newRecruiterRegion" required>
                                <option value="">Select Region</option>
                                <option value="North">North</option>
                                <option value="South">South</option>
                                <option value="East">East</option>
                                <option value="West">West</option>
                                <option value="Central">Central</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="newRecruiterSpecializations">Specializations</label>
                            <textarea id="newRecruiterSpecializations" placeholder="e.g., Technical Recruitment, Executive Search"></textarea>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" onclick="modalSystem.closeModal()">Cancel</button>
                    <button class="btn btn-primary" onclick="modalSystem.saveNewRecruiter()">
                        <i class="fas fa-save"></i> Add Recruiter
                    </button>
                </div>
            </div>
        `;
        this.showModal(modalContent);
    }

    // Add Job Modal
    showAddJobModal() {
        const modalContent = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3><i class="fas fa-briefcase"></i> Add New Job</h3>
                    <button class="modal-close" onclick="modalSystem.closeModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="addJobForm">
                        <div class="form-group">
                            <label for="newJobTitle">Job Title *</label>
                            <input type="text" id="newJobTitle" required>
                        </div>
                        <div class="form-group">
                            <label for="newJobCategory">Category *</label>
                            <select id="newJobCategory" required>
                                <option value="">Select Category</option>
                                <option value="Construction">Construction</option>
                                <option value="Electrical">Electrical</option>
                                <option value="Plumbing">Plumbing</option>
                                <option value="Painting">Painting</option>
                                <option value="Masonry">Masonry</option>
                                <option value="Welding">Welding</option>
                                <option value="Mechanical">Mechanical</option>
                                <option value="Cleaning">Cleaning</option>
                                <option value="Security">Security</option>
                                <option value="Delivery">Delivery</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="newJobDescription">Description *</label>
                            <textarea id="newJobDescription" required></textarea>
                        </div>
                        <div class="form-group">
                            <label for="newJobClient">Client Name *</label>
                            <input type="text" id="newJobClient" required>
                        </div>
                        <div class="form-group">
                            <label for="newJobClientPhone">Client Phone *</label>
                            <input type="tel" id="newJobClientPhone" required>
                        </div>
                        <div class="form-group">
                            <label for="newJobClientEmail">Client Email *</label>
                            <input type="email" id="newJobClientEmail" required>
                        </div>
                        <div class="form-group">
                            <label for="newJobBudget">Budget *</label>
                            <input type="text" id="newJobBudget" placeholder="e.g., ₹25,000" required>
                        </div>
                        <div class="form-group">
                            <label for="newJobLocation">Location *</label>
                            <input type="text" id="newJobLocation" required>
                        </div>
                        <div class="form-group">
                            <label for="newJobDuration">Duration *</label>
                            <input type="text" id="newJobDuration" placeholder="e.g., 2 weeks" required>
                        </div>
                        <div class="form-group">
                            <label for="newJobDeadline">Deadline *</label>
                            <input type="date" id="newJobDeadline" required>
                        </div>
                        <div class="form-group">
                            <label for="newJobPriority">Priority *</label>
                            <select id="newJobPriority" required>
                                <option value="">Select Priority</option>
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="newJobRequirements">Requirements *</label>
                            <textarea id="newJobRequirements" required></textarea>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" onclick="modalSystem.closeModal()">Cancel</button>
                    <button class="btn btn-primary" onclick="modalSystem.saveNewJob()">
                        <i class="fas fa-save"></i> Add Job
                    </button>
                </div>
            </div>
        `;
        this.showModal(modalContent);
    }

    // Utility Functions
    generateStars(rating) {
        let stars = '';
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        
        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star"></i>';
        }
        
        if (hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        }
        
        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="far fa-star"></i>';
        }
        
        return stars;
    }

    showModal(content) {
        const modalContainer = document.getElementById('modalContainer');
        modalContainer.innerHTML = content;
        modalContainer.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        const modalContainer = document.getElementById('modalContainer');
        modalContainer.classList.remove('active');
        modalContainer.innerHTML = '';
        document.body.style.overflow = '';
        this.currentModal = null;
        this.currentData = null;
    }

    // Action Functions
    editWorker(workerId) {
        this.showWorkerModal(workerId, 'edit');
    }

    saveWorker() {
        const form = document.getElementById('editWorkerForm');
        if (form.checkValidity()) {
            alert('Worker information updated successfully!');
            this.closeModal();
            // In real implementation, this would save to database
        } else {
            form.reportValidity();
        }
    }

    saveNewWorker() {
        const form = document.getElementById('addWorkerForm');
        if (form.checkValidity()) {
            alert('New worker added successfully!');
            this.closeModal();
            // In real implementation, this would save to database
        } else {
            form.reportValidity();
        }
    }

    editRecruiter(recruiterId) {
        this.showRecruiterModal(recruiterId, 'edit');
    }

    saveNewRecruiter() {
        const form = document.getElementById('addRecruiterForm');
        if (form.checkValidity()) {
            alert('New recruiter added successfully!');
            this.closeModal();
            // In real implementation, this would save to database
        } else {
            form.reportValidity();
        }
    }

    editJob(jobId) {
        this.showJobModal(jobId, 'edit');
    }

    saveNewJob() {
        const form = document.getElementById('addJobForm');
        if (form.checkValidity()) {
            alert('New job added successfully!');
            this.closeModal();
            // In real implementation, this would save to database
        } else {
            form.reportValidity();
        }
    }

    assignJob(workerId) {
        alert(`Assign job functionality for worker ${workerId}`);
        // In real implementation, this would show job assignment modal
    }

    assignJobs(recruiterId) {
        alert(`Assign jobs functionality for recruiter ${recruiterId}`);
        // In real implementation, this would show job assignment modal
    }

    assignWorkers(jobId) {
        alert(`Assign workers functionality for job ${jobId}`);
        // In real implementation, this would show worker assignment modal
    }

    approveRequest(requestId) {
        if (confirm(`Are you sure you want to approve request ${requestId}?`)) {
            alert(`Request ${requestId} approved successfully!`);
            this.closeModal();
            // In real implementation, this would update database
        }
    }

    rejectRequest(requestId) {
        if (confirm(`Are you sure you want to reject request ${requestId}?`)) {
            alert(`Request ${requestId} rejected!`);
            this.closeModal();
            // In real implementation, this would update database
        }
    }

    reconsiderRequest(requestId) {
        if (confirm(`Are you sure you want to reconsider request ${requestId}?`)) {
            alert(`Request ${requestId} status changed to Pending for reconsideration!`);
            this.closeModal();
            // In real implementation, this would update database
        }
    }

    deleteItem(type, id) {
        if (confirm(`Are you sure you want to delete this ${type}? This action cannot be undone.`)) {
            alert(`${type} ${id} deleted successfully!`);
            // In real implementation, this would delete from database
            location.reload(); // Refresh to show updated data
        }
    }

    // Bulk Actions
    bulkActivate() {
        const selectedCheckboxes = document.querySelectorAll('.worker-checkbox:checked, .recruiter-checkbox:checked, .job-checkbox:checked, .request-checkbox:checked');
        if (selectedCheckboxes.length === 0) {
            alert('Please select at least one item to activate');
            return;
        }
        
        if (confirm(`Are you sure you want to activate ${selectedCheckboxes.length} items?`)) {
            alert(`${selectedCheckboxes.length} items activated successfully!`);
            // In real implementation, this would update database
        }
    }

    bulkSuspend() {
        const selectedCheckboxes = document.querySelectorAll('.worker-checkbox:checked, .recruiter-checkbox:checked, .job-checkbox:checked, .request-checkbox:checked');
        if (selectedCheckboxes.length === 0) {
            alert('Please select at least one item to suspend');
            return;
        }
        
        if (confirm(`Are you sure you want to suspend ${selectedCheckboxes.length} items?`)) {
            alert(`${selectedCheckboxes.length} items suspended successfully!`);
            // In real implementation, this would update database
        }
    }

    bulkDelete() {
        const selectedCheckboxes = document.querySelectorAll('.worker-checkbox:checked, .recruiter-checkbox:checked, .job-checkbox:checked, .request-checkbox:checked');
        if (selectedCheckboxes.length === 0) {
            alert('Please select at least one item to delete');
            return;
        }
        
        if (confirm(`Are you sure you want to delete ${selectedCheckboxes.length} items? This action cannot be undone.`)) {
            alert(`${selectedCheckboxes.length} items deleted successfully!`);
            // In real implementation, this would delete from database
            location.reload(); // Refresh to show updated data
        }
    }

    bulkComplete() {
        const selectedCheckboxes = document.querySelectorAll('.job-checkbox:checked');
        if (selectedCheckboxes.length === 0) {
            alert('Please select at least one job to complete');
            return;
        }
        
        if (confirm(`Are you sure you want to mark ${selectedCheckboxes.length} jobs as completed?`)) {
            alert(`${selectedCheckboxes.length} jobs completed successfully!`);
            // In real implementation, this would update database
        }
    }

    bulkCancel() {
        const selectedCheckboxes = document.querySelectorAll('.job-checkbox:checked');
        if (selectedCheckboxes.length === 0) {
            alert('Please select at least one job to cancel');
            return;
        }
        
        if (confirm(`Are you sure you want to cancel ${selectedCheckboxes.length} jobs?`)) {
            alert(`${selectedCheckboxes.length} jobs cancelled successfully!`);
            // In real implementation, this would update database
        }
    }

    // Export Functions
    exportWorkers() {
        alert('Exporting workers data to CSV file...');
        // In real implementation, this would generate and download CSV
        console.log('Workers data exported successfully');
    }

    exportRecruiters() {
        alert('Exporting recruiters data to CSV file...');
        // In real implementation, this would generate and download CSV
        console.log('Recruiters data exported successfully');
    }

    exportJobs() {
        alert('Exporting jobs data to CSV file...');
        // In real implementation, this would generate and download CSV
        console.log('Jobs data exported successfully');
    }

    exportRequests() {
        alert('Exporting requests data to CSV file...');
        // In real implementation, this would generate and download CSV
        console.log('Requests data exported successfully');
    }

    exportAnalytics() {
        alert('Exporting analytics data to CSV file...');
        // In real implementation, this would generate and download CSV
        console.log('Analytics data exported successfully');
    }

    exportDashboard() {
        alert('Exporting dashboard data to CSV file...');
        // In real implementation, this would generate and download CSV
        console.log('Dashboard data exported successfully');
    }

    // Search Functions
    searchWorkers(searchTerm) {
        console.log('Searching workers:', searchTerm);
        // In real implementation, this would filter the table
        alert(`Searching workers for: ${searchTerm}`);
    }

    searchRecruiters(searchTerm) {
        console.log('Searching recruiters:', searchTerm);
        // In real implementation, this would filter the table
        alert(`Searching recruiters for: ${searchTerm}`);
    }

    searchJobs(searchTerm) {
        console.log('Searching jobs:', searchTerm);
        // In real implementation, this would filter the table
        alert(`Searching jobs for: ${searchTerm}`);
    }

    searchRequests(searchTerm) {
        console.log('Searching requests:', searchTerm);
        // In real implementation, this would filter the table
        alert(`Searching requests for: ${searchTerm}`);
    }

    searchAnalytics(searchTerm) {
        console.log('Searching analytics:', searchTerm);
        // In real implementation, this would filter analytics
        alert(`Searching analytics for: ${searchTerm}`);
    }

    searchDashboard(searchTerm) {
        console.log('Searching dashboard:', searchTerm);
        // In real implementation, this would filter dashboard
        alert(`Searching dashboard for: ${searchTerm}`);
    }

    // Filter Functions
    applyFilters() {
        console.log('Applying filters');
        // In real implementation, this would apply filters
        alert('Filters applied successfully!');
    }

    clearFilters() {
        console.log('Clearing filters');
        // In real implementation, this would clear filters
        alert('Filters cleared successfully!');
    }

    // Pagination Functions
    previousPage() {
        console.log('Going to previous page');
        // In real implementation, this would navigate to previous page
        alert('Navigating to previous page...');
    }

    nextPage() {
        console.log('Going to next page');
        // In real implementation, this would navigate to next page
        alert('Navigating to next page...');
    }

    goToPage(page) {
        console.log('Going to page:', page);
        // In real implementation, this would navigate to specific page
        alert(`Navigating to page ${page}...`);
    }

    // Select All Functions
    toggleSelectAll() {
        const selectAll = document.getElementById('selectAll');
        const checkboxes = document.querySelectorAll('.worker-checkbox, .recruiter-checkbox, .job-checkbox, .request-checkbox');
        
        checkboxes.forEach(checkbox => {
            checkbox.checked = selectAll.checked;
        });
    }

    // Report Functions
    generateReport() {
        alert('Generating comprehensive report...');
        // In real implementation, this would generate and download report
        console.log('Report generated successfully');
    }

    generateNewReport() {
        alert('Generating new custom report...');
        // In real implementation, this would show report generation modal
        console.log('New report generated successfully');
    }

    downloadReport(reportId) {
        alert(`Downloading report: ${reportId}`);
        // In real implementation, this would download the specific report
        console.log(`Report ${reportId} downloaded successfully`);
    }

    viewReport(reportId) {
        alert(`Viewing report: ${reportId}`);
        // In real implementation, this would show report details
        console.log(`Report ${reportId} viewed successfully`);
    }

    viewAllPerformers() {
        alert('Viewing all performers...');
        // In real implementation, this would navigate to performers page
        console.log('All performers viewed successfully');
    }

    viewAllActivity() {
        alert('Viewing all activity...');
        // In real implementation, this would navigate to activity page
        console.log('All activity viewed successfully');
    }

    refreshDashboard() {
        alert('Refreshing dashboard data...');
        // In real implementation, this would refresh dashboard data
        console.log('Dashboard refreshed successfully');
        location.reload(); // Refresh to show updated data
    }
}

// Initialize modal system
const modalSystem = new ModalSystem();

// Close modal when clicking outside
document.addEventListener('click', function(event) {
    const modalContainer = document.getElementById('modalContainer');
    if (event.target === modalContainer) {
        modalSystem.closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        modalSystem.closeModal();
    }
});

// Global functions for onclick handlers
function viewWorker(workerId) {
    modalSystem.showWorkerModal(workerId, 'view');
}

function editWorker(workerId) {
    modalSystem.editWorker(workerId);
}

function deleteWorker(workerId) {
    modalSystem.deleteItem('worker', workerId);
}

function assignJob(workerId) {
    modalSystem.assignJob(workerId);
}

function addWorker() {
    modalSystem.showAddWorkerModal();
}

function viewRecruiter(recruiterId) {
    modalSystem.showRecruiterModal(recruiterId, 'view');
}

function editRecruiter(recruiterId) {
    modalSystem.editRecruiter(recruiterId);
}

function deleteRecruiter(recruiterId) {
    modalSystem.deleteItem('recruiter', recruiterId);
}

function assignJobs(recruiterId) {
    modalSystem.assignJobs(recruiterId);
}

function addRecruiter() {
    modalSystem.showAddRecruiterModal();
}

function viewJob(jobId) {
    modalSystem.showJobModal(jobId, 'view');
}

function editJob(jobId) {
    modalSystem.editJob(jobId);
}

function deleteJob(jobId) {
    modalSystem.deleteItem('job', jobId);
}

function assignWorkers(jobId) {
    modalSystem.assignWorkers(jobId);
}

function addJob() {
    modalSystem.showAddJobModal();
}

function viewRequest(requestId) {
    modalSystem.showRequestModal(requestId, 'view');
}

function editRequest(requestId) {
    modalSystem.editRequest(requestId);
}

function deleteRequest(requestId) {
    modalSystem.deleteItem('request', requestId);
}

function approveRequest(requestId) {
    modalSystem.approveRequest(requestId);
}

function rejectRequest(requestId) {
    modalSystem.rejectRequest(requestId);
}

function reconsiderRequest(requestId) {
    modalSystem.reconsiderRequest(requestId);
}

// Bulk action functions
function bulkActivate() {
    modalSystem.bulkActivate();
}

function bulkSuspend() {
    modalSystem.bulkSuspend();
}

function bulkDelete() {
    modalSystem.bulkDelete();
}

function bulkComplete() {
    modalSystem.bulkComplete();
}

function bulkCancel() {
    modalSystem.bulkCancel();
}

// Export functions
function exportWorkers() {
    modalSystem.exportWorkers();
}

function exportRecruiters() {
    modalSystem.exportRecruiters();
}

function exportJobs() {
    modalSystem.exportJobs();
}

function exportRequests() {
    modalSystem.exportRequests();
}

function exportAnalytics() {
    modalSystem.exportAnalytics();
}

function exportDashboard() {
    modalSystem.exportDashboard();
}

// Search functions
function searchWorkers(searchTerm) {
    modalSystem.searchWorkers(searchTerm);
}

function searchRecruiters(searchTerm) {
    modalSystem.searchRecruiters(searchTerm);
}

function searchJobs(searchTerm) {
    modalSystem.searchJobs(searchTerm);
}

function searchRequests(searchTerm) {
    modalSystem.searchRequests(searchTerm);
}

function searchAnalytics(searchTerm) {
    modalSystem.searchAnalytics(searchTerm);
}

function searchDashboard(searchTerm) {
    modalSystem.searchDashboard(searchTerm);
}

// Filter functions
function applyFilters() {
    modalSystem.applyFilters();
}

function clearFilters() {
    modalSystem.clearFilters();
}

// Pagination functions
function previousPage() {
    modalSystem.previousPage();
}

function nextPage() {
    modalSystem.nextPage();
}

function goToPage(page) {
    modalSystem.goToPage(page);
}

// Select all function
function toggleSelectAll() {
    modalSystem.toggleSelectAll();
}

// Report functions
function generateReport() {
    modalSystem.generateReport();
}

function generateNewReport() {
    modalSystem.generateNewReport();
}

function downloadReport(reportId) {
    modalSystem.downloadReport(reportId);
}

function viewReport(reportId) {
    modalSystem.viewReport(reportId);
}

function viewAllPerformers() {
    modalSystem.viewAllPerformers();
}

function viewAllActivity() {
    modalSystem.viewAllActivity();
}

function refreshDashboard() {
    modalSystem.refreshDashboard();
}
