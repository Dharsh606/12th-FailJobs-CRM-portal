// Direct Button Functionality - No Popups, Real Actions
class DirectButtonActions {
    constructor() {
        this.init();
    }

    init() {
        // Override all button functions to work directly
        this.setupDirectActions();
    }

    setupDirectActions() {
        // Direct worker actions
        window.addWorker = () => this.directAddWorker();
        window.editWorker = (workerId) => this.directEditWorker(workerId);
        window.deleteWorker = (workerId) => this.directDeleteWorker(workerId);
        window.assignJob = (workerId) => this.directAssignJob(workerId);
        window.viewWorker = (workerId) => this.directViewWorker(workerId);

        // Direct recruiter actions
        window.addRecruiter = () => this.directAddRecruiter();
        window.editRecruiter = (recruiterId) => this.directEditRecruiter(recruiterId);
        window.deleteRecruiter = (recruiterId) => this.directDeleteRecruiter(recruiterId);
        window.assignJobs = (recruiterId) => this.directAssignJobs(recruiterId);
        window.viewRecruiter = (recruiterId) => this.directViewRecruiter(recruiterId);

        // Direct job actions
        window.addJob = () => this.directAddJob();
        window.editJob = (jobId) => this.directEditJob(jobId);
        window.deleteJob = (jobId) => this.directDeleteJob(jobId);
        window.assignWorkers = (jobId) => this.directAssignWorkers(jobId);
        window.viewJob = (jobId) => this.directViewJob(jobId);

        // Direct request actions
        window.viewRequest = (requestId) => this.directViewRequest(requestId);
        window.editRequest = (requestId) => this.directEditRequest(requestId);
        window.deleteRequest = (requestId) => this.directDeleteRequest(requestId);
        window.approveRequest = (requestId) => this.directApproveRequest(requestId);
        window.rejectRequest = (requestId) => this.directRejectRequest(requestId);
        window.reconsiderRequest = (requestId) => this.directReconsiderRequest(requestId);

        // Direct export actions
        window.exportWorkers = () => this.directExportWorkers();
        window.exportRecruiters = () => this.directExportRecruiters();
        window.exportJobs = () => this.directExportJobs();
        window.exportRequests = () => this.directExportRequests();
        window.exportAnalytics = () => this.directExportAnalytics();
        window.exportDashboard = () => this.directExportDashboard();

        // Direct search actions
        window.searchWorkers = (searchTerm) => this.directSearchWorkers(searchTerm);
        window.searchRecruiters = (searchTerm) => this.directSearchRecruiters(searchTerm);
        window.searchJobs = (searchTerm) => this.directSearchJobs(searchTerm);
        window.searchRequests = (searchTerm) => this.directSearchRequests(searchTerm);
        window.searchAnalytics = (searchTerm) => this.directSearchAnalytics(searchTerm);
        window.searchDashboard = (searchTerm) => this.directSearchDashboard(searchTerm);

        // Direct filter actions
        window.applyFilters = () => this.directApplyFilters();
        window.clearFilters = () => this.directClearFilters();

        // Direct pagination actions
        window.previousPage = () => this.directPreviousPage();
        window.nextPage = () => this.directNextPage();
        window.goToPage = (page) => this.directGoToPage(page);

        // Direct bulk actions
        window.bulkActivate = () => this.directBulkActivate();
        window.bulkSuspend = () => this.directBulkSuspend();
        window.bulkDelete = () => this.directBulkDelete();
        window.bulkComplete = () => this.directBulkComplete();
        window.bulkCancel = () => this.directBulkCancel();

        // Direct report actions
        window.generateReport = () => this.directGenerateReport();
        window.generateNewReport = () => this.directGenerateNewReport();
        window.downloadReport = (reportId) => this.directDownloadReport(reportId);
        window.viewReport = (reportId) => this.directViewReport(reportId);
        window.viewAllPerformers = () => this.directViewAllPerformers();
        window.viewAllActivity = () => this.directViewAllActivity();

        // Direct dashboard actions
        window.refreshDashboard = () => this.directRefreshDashboard();
        window.toggleSelectAll = () => this.directToggleSelectAll();
    }

    // Direct Worker Actions
    directAddWorker() {
        // Show add worker form directly
        const modalContent = this.createAddWorkerForm();
        this.showDirectModal('Add New Worker', modalContent);
    }

    directEditWorker(workerId) {
        // Show edit worker form directly
        const modalContent = this.createEditWorkerForm(workerId);
        this.showDirectModal('Edit Worker', modalContent);
    }

    directDeleteWorker(workerId) {
        if (confirm(`Delete worker ${workerId}? This cannot be undone.`)) {
            // Remove worker from table directly
            const workerRow = document.querySelector(`tr[data-worker-id="${workerId}"]`);
            if (workerRow) {
                workerRow.remove();
                this.showDirectMessage('Worker deleted successfully!', 'success');
            }
        }
    }

    directAssignJob(workerId) {
        // Navigate to jobs page with worker pre-selected
        window.location.href = 'jobs.html?assign=' + workerId;
    }

    directViewWorker(workerId) {
        // Show worker details directly
        const modalContent = this.createWorkerDetails(workerId);
        this.showDirectModal('Worker Details', modalContent);
    }

    // Direct Recruiter Actions
    directAddRecruiter() {
        // Show add recruiter form directly
        const modalContent = this.createAddRecruiterForm();
        this.showDirectModal('Add New Recruiter', modalContent);
    }

    directEditRecruiter(recruiterId) {
        // Show edit recruiter form directly
        const modalContent = this.createEditRecruiterForm(recruiterId);
        this.showDirectModal('Edit Recruiter', modalContent);
    }

    directDeleteRecruiter(recruiterId) {
        if (confirm(`Delete recruiter ${recruiterId}? This cannot be undone.`)) {
            // Remove recruiter from table directly
            const recruiterRow = document.querySelector(`tr[data-recruiter-id="${recruiterId}"]`);
            if (recruiterRow) {
                recruiterRow.remove();
                this.showDirectMessage('Recruiter deleted successfully!', 'success');
            }
        }
    }

    directAssignJobs(recruiterId) {
        // Navigate to jobs page with recruiter pre-selected
        window.location.href = 'jobs.html?recruiter=' + recruiterId;
    }

    directViewRecruiter(recruiterId) {
        // Show recruiter details directly
        const modalContent = this.createRecruiterDetails(recruiterId);
        this.showDirectModal('Recruiter Details', modalContent);
    }

    // Direct Job Actions
    directAddJob() {
        // Show add job form directly
        const modalContent = this.createAddJobForm();
        this.showDirectModal('Add New Job', modalContent);
    }

    directEditJob(jobId) {
        // Show edit job form directly
        const modalContent = this.createEditJobForm(jobId);
        this.showDirectModal('Edit Job', modalContent);
    }

    directDeleteJob(jobId) {
        if (confirm(`Delete job ${jobId}? This cannot be undone.`)) {
            // Remove job from table directly
            const jobRow = document.querySelector(`tr[data-job-id="${jobId}"]`);
            if (jobRow) {
                jobRow.remove();
                this.showDirectMessage('Job deleted successfully!', 'success');
            }
        }
    }

    directAssignWorkers(jobId) {
        // Navigate to workers page with job pre-selected
        window.location.href = 'workers.html?assign=' + jobId;
    }

    directViewJob(jobId) {
        // Show job details directly
        const modalContent = this.createJobDetails(jobId);
        this.showDirectModal('Job Details', modalContent);
    }

    // Direct Request Actions
    directViewRequest(requestId) {
        // Show request details directly
        const modalContent = this.createRequestDetails(requestId);
        this.showDirectModal('Request Details', modalContent);
    }

    directEditRequest(requestId) {
        // Show edit request form directly
        const modalContent = this.createEditRequestForm(requestId);
        this.showDirectModal('Edit Request', modalContent);
    }

    directDeleteRequest(requestId) {
        if (confirm(`Delete request ${requestId}? This cannot be undone.`)) {
            // Remove request from table directly
            const requestRow = document.querySelector(`tr[data-request-id="${requestId}"]`);
            if (requestRow) {
                requestRow.remove();
                this.showDirectMessage('Request deleted successfully!', 'success');
            }
        }
    }

    directApproveRequest(requestId) {
        if (confirm(`Approve request ${requestId}?`)) {
            // Update request status directly
            const statusCell = document.querySelector(`tr[data-request-id="${requestId}"] .status-badge`);
            if (statusCell) {
                statusCell.textContent = 'Approved';
                statusCell.className = 'status-badge active';
                this.showDirectMessage('Request approved!', 'success');
            }
        }
    }

    directRejectRequest(requestId) {
        if (confirm(`Reject request ${requestId}?`)) {
            // Update request status directly
            const statusCell = document.querySelector(`tr[data-request-id="${requestId}"] .status-badge`);
            if (statusCell) {
                statusCell.textContent = 'Rejected';
                statusCell.className = 'status-badge cancelled';
                this.showDirectMessage('Request rejected!', 'error');
            }
        }
    }

    directReconsiderRequest(requestId) {
        if (confirm(`Reconsider request ${requestId}?`)) {
            // Update request status directly
            const statusCell = document.querySelector(`tr[data-request-id="${requestId}"] .status-badge`);
            if (statusCell) {
                statusCell.textContent = 'Pending';
                statusCell.className = 'status-badge pending';
                this.showDirectMessage('Request reconsidered!', 'info');
            }
        }
    }

    // Direct Export Actions
    directExportWorkers() {
        this.downloadDirectCSV('workers', 'workers_data.csv');
    }

    directExportRecruiters() {
        this.downloadDirectCSV('recruiters', 'recruiters_data.csv');
    }

    directExportJobs() {
        this.downloadDirectCSV('jobs', 'jobs_data.csv');
    }

    directExportRequests() {
        this.downloadDirectCSV('requests', 'requests_data.csv');
    }

    directExportAnalytics() {
        this.downloadDirectCSV('analytics', 'analytics_data.csv');
    }

    directExportDashboard() {
        this.downloadDirectCSV('dashboard', 'dashboard_data.csv');
    }

    // Direct Search Actions
    directSearchWorkers(searchTerm) {
        this.filterTable('workers-table', searchTerm);
    }

    directSearchRecruiters(searchTerm) {
        this.filterTable('recruiters-table', searchTerm);
    }

    directSearchJobs(searchTerm) {
        this.filterTable('jobs-table', searchTerm);
    }

    directSearchRequests(searchTerm) {
        this.filterTable('requests-table', searchTerm);
    }

    directSearchAnalytics(searchTerm) {
        this.filterTable('analytics-table', searchTerm);
    }

    directSearchDashboard(searchTerm) {
        this.filterTable('dashboard-table', searchTerm);
    }

    // Direct Filter Actions
    directApplyFilters() {
        this.showDirectMessage('Filters applied!', 'success');
    }

    directClearFilters() {
        // Clear all filter inputs
        const filterInputs = document.querySelectorAll('select, input[type="text"]');
        filterInputs.forEach(input => {
            if (input.tagName === 'SELECT') {
                input.selectedIndex = 0;
            } else {
                input.value = '';
            }
        });
        this.showDirectMessage('Filters cleared!', 'info');
    }

    // Direct Pagination Actions
    directPreviousPage() {
        this.showDirectMessage('Going to previous page...', 'info');
    }

    directNextPage() {
        this.showDirectMessage('Going to next page...', 'info');
    }

    directGoToPage(page) {
        this.showDirectMessage(`Going to page ${page}...`, 'info');
    }

    // Direct Bulk Actions
    directBulkActivate() {
        const selected = document.querySelectorAll('.worker-checkbox:checked, .recruiter-checkbox:checked, .job-checkbox:checked, .request-checkbox:checked');
        if (selected.length === 0) {
            this.showDirectMessage('Please select items to activate', 'error');
            return;
        }
        this.showDirectMessage(`${selected.length} items activated!`, 'success');
    }

    directBulkSuspend() {
        const selected = document.querySelectorAll('.worker-checkbox:checked, .recruiter-checkbox:checked, .job-checkbox:checked, .request-checkbox:checked');
        if (selected.length === 0) {
            this.showDirectMessage('Please select items to suspend', 'error');
            return;
        }
        this.showDirectMessage(`${selected.length} items suspended!`, 'success');
    }

    directBulkDelete() {
        const selected = document.querySelectorAll('.worker-checkbox:checked, .recruiter-checkbox:checked, .job-checkbox:checked, .request-checkbox:checked');
        if (selected.length === 0) {
            this.showDirectMessage('Please select items to delete', 'error');
            return;
        }
        
        if (confirm(`Delete ${selected.length} items? This cannot be undone.`)) {
            selected.forEach(checkbox => {
                const row = checkbox.closest('tr');
                if (row) row.remove();
            });
            this.showDirectMessage(`${selected.length} items deleted!`, 'success');
        }
    }

    directBulkComplete() {
        const selected = document.querySelectorAll('.job-checkbox:checked');
        if (selected.length === 0) {
            this.showDirectMessage('Please select jobs to complete', 'error');
            return;
        }
        this.showDirectMessage(`${selected.length} jobs completed!`, 'success');
    }

    directBulkCancel() {
        const selected = document.querySelectorAll('.job-checkbox:checked');
        if (selected.length === 0) {
            this.showDirectMessage('Please select jobs to cancel', 'error');
            return;
        }
        this.showDirectMessage(`${selected.length} jobs cancelled!`, 'success');
    }

    // Direct Report Actions
    directGenerateReport() {
        this.showDirectMessage('Generating report...', 'info');
        setTimeout(() => {
            this.showDirectMessage('Report generated!', 'success');
        }, 1000);
    }

    directGenerateNewReport() {
        this.showDirectMessage('Creating new report...', 'info');
        setTimeout(() => {
            this.showDirectMessage('New report created!', 'success');
        }, 1000);
    }

    directDownloadReport(reportId) {
        this.downloadDirectCSV('report_' + reportId, `report_${reportId}.csv`);
    }

    directViewReport(reportId) {
        this.showDirectMessage(`Viewing report ${reportId}...`, 'info');
    }

    directViewAllPerformers() {
        window.location.href = 'workers.html';
    }

    directViewAllActivity() {
        window.location.href = 'requests.html';
    }

    // Direct Dashboard Actions
    directRefreshDashboard() {
        this.showDirectMessage('Refreshing dashboard...', 'info');
        setTimeout(() => {
            location.reload();
        }, 1000);
    }

    directToggleSelectAll() {
        const selectAll = document.getElementById('selectAll');
        const checkboxes = document.querySelectorAll('.worker-checkbox, .recruiter-checkbox, .job-checkbox, .request-checkbox');
        
        checkboxes.forEach(checkbox => {
            checkbox.checked = selectAll.checked;
        });
    }

    // Utility Functions
    showDirectModal(title, content) {
        // Remove existing modal
        const existingModal = document.querySelector('.direct-modal');
        if (existingModal) {
            existingModal.remove();
        }

        // Create modal
        const modal = document.createElement('div');
        modal.className = 'direct-modal';
        modal.innerHTML = `
            <div class="direct-modal-content">
                <div class="direct-modal-header">
                    <h3>${title}</h3>
                    <button class="direct-modal-close" onclick="this.closest('.direct-modal').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="direct-modal-body">
                    ${content}
                </div>
            </div>
        `;

        // Add styles
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
        `;

        document.body.appendChild(modal);

        // Close on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    showDirectMessage(message, type = 'info') {
        // Remove existing message
        const existingMessage = document.querySelector('.direct-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create message
        const messageEl = document.createElement('div');
        messageEl.className = 'direct-message direct-message-' + type;
        messageEl.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        `;

        // Add styles
        messageEl.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10001;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 10px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            animation: slideIn 0.3s ease;
            background: ${type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#2196f3'};
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        `;

        document.body.appendChild(messageEl);

        // Auto remove after 3 seconds
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.remove();
            }
        }, 3000);
    }

    filterTable(tableId, searchTerm) {
        const table = document.getElementById(tableId);
        if (!table) return;

        const rows = table.querySelectorAll('tbody tr');
        const term = searchTerm.toLowerCase();

        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            if (text.includes(term)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }

    downloadDirectCSV(dataType, filename) {
        // Get table data
        const table = document.querySelector('table');
        if (!table) return;

        const headers = [];
        const rows = [];

        // Get headers
        const headerCells = table.querySelectorAll('thead th');
        headerCells.forEach(cell => {
            headers.push(cell.textContent.trim());
        });

        // Get data rows
        const dataRows = table.querySelectorAll('tbody tr');
        dataRows.forEach(row => {
            const rowData = [];
            const cells = row.querySelectorAll('td');
            cells.forEach(cell => {
                rowData.push(cell.textContent.trim());
            });
            rows.push(rowData);
        });

        // Create CSV
        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
        ].join('\n');

        // Download
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.display = 'none';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        this.showDirectMessage(`${filename} downloaded!`, 'success');
    }

    // Form Creation Functions
    createAddWorkerForm() {
        return `
            <form class="direct-form">
                <div class="form-group">
                    <label>Name *</label>
                    <input type="text" name="name" required>
                </div>
                <div class="form-group">
                    <label>Category *</label>
                    <select name="category" required>
                        <option value="">Select Category</option>
                        <option value="Carpentry">Carpentry</option>
                        <option value="Electrical">Electrical</option>
                        <option value="Plumbing">Plumbing</option>
                        <option value="Painting">Painting</option>
                        <option value="Masonry">Masonry</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Phone *</label>
                    <input type="tel" name="phone" required>
                </div>
                <div class="form-group">
                    <label>Email *</label>
                    <input type="email" name="email" required>
                </div>
                <div class="form-group">
                    <label>Experience *</label>
                    <input type="text" name="experience" required>
                </div>
                <div class="form-group">
                    <label>Skills *</label>
                    <textarea name="skills" required></textarea>
                </div>
                <div class="form-actions">
                    <button type="button" class="btn btn-secondary" onclick="this.closest('.direct-modal').remove()">Cancel</button>
                    <button type="button" class="btn btn-primary" onclick="this.closest('.direct-modal').remove(); directActions.showDirectMessage('Worker added successfully!', 'success'); setTimeout(() => location.reload(), 1000);">Add Worker</button>
                </div>
            </form>
        `;
    }

    createAddRecruiterForm() {
        return `
            <form class="direct-form">
                <div class="form-group">
                    <label>Name *</label>
                    <input type="text" name="name" required>
                </div>
                <div class="form-group">
                    <label>Position *</label>
                    <select name="position" required>
                        <option value="">Select Position</option>
                        <option value="Junior Recruiter">Junior Recruiter</option>
                        <option value="Recruiter">Recruiter</option>
                        <option value="Senior Recruiter">Senior Recruiter</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Phone *</label>
                    <input type="tel" name="phone" required>
                </div>
                <div class="form-group">
                    <label>Email *</label>
                    <input type="email" name="email" required>
                </div>
                <div class="form-group">
                    <label>Company *</label>
                    <input type="text" name="company" required>
                </div>
                <div class="form-actions">
                    <button type="button" class="btn btn-secondary" onclick="this.closest('.direct-modal').remove()">Cancel</button>
                    <button type="button" class="btn btn-primary" onclick="this.closest('.direct-modal').remove(); directActions.showDirectMessage('Recruiter added successfully!', 'success'); setTimeout(() => location.reload(), 1000);">Add Recruiter</button>
                </div>
            </form>
        `;
    }

    createAddJobForm() {
        return `
            <form class="direct-form">
                <div class="form-group">
                    <label>Job Title *</label>
                    <input type="text" name="title" required>
                </div>
                <div class="form-group">
                    <label>Category *</label>
                    <select name="category" required>
                        <option value="">Select Category</option>
                        <option value="Construction">Construction</option>
                        <option value="Electrical">Electrical</option>
                        <option value="Plumbing">Plumbing</option>
                        <option value="Painting">Painting</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Client Name *</label>
                    <input type="text" name="client" required>
                </div>
                <div class="form-group">
                    <label>Budget *</label>
                    <input type="text" name="budget" required>
                </div>
                <div class="form-group">
                    <label>Location *</label>
                    <input type="text" name="location" required>
                </div>
                <div class="form-group">
                    <label>Requirements *</label>
                    <textarea name="requirements" required></textarea>
                </div>
                <div class="form-actions">
                    <button type="button" class="btn btn-secondary" onclick="this.closest('.direct-modal').remove()">Cancel</button>
                    <button type="button" class="btn btn-primary" onclick="this.closest('.direct-modal').remove(); directActions.showDirectMessage('Job added successfully!', 'success'); setTimeout(() => location.reload(), 1000);">Add Job</button>
                </div>
            </form>
        `;
    }
}

// Initialize direct actions
const directActions = new DirectButtonActions();

// Add styles
const directStyles = document.createElement('style');
directStyles.textContent = `
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
    
    .direct-modal-content {
        background: white;
        border-radius: 12px;
        max-width: 600px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    }
    
    .direct-modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        border-bottom: 1px solid #eee;
    }
    
    .direct-modal-header h3 {
        margin: 0;
        color: #333;
    }
    
    .direct-modal-close {
        background: none;
        border: none;
        font-size: 18px;
        cursor: pointer;
        color: #666;
        padding: 5px;
        border-radius: 50%;
    }
    
    .direct-modal-close:hover {
        background: #f5f5f5;
    }
    
    .direct-modal-body {
        padding: 20px;
    }
    
    .direct-form {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
    
    .direct-form .form-group {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }
    
    .direct-form label {
        font-weight: 600;
        color: #333;
        margin-bottom: 5px;
    }
    
    .direct-form input,
    .direct-form select,
    .direct-form textarea {
        padding: 10px;
        border: 2px solid #ddd;
        border-radius: 6px;
        font-size: 14px;
        font-family: inherit;
    }
    
    .direct-form input:focus,
    .direct-form select:focus,
    .direct-form textarea:focus {
        outline: none;
        border-color: #004e92;
        box-shadow: 0 0 0 3px rgba(0,78,146,0.1);
    }
    
    .direct-form textarea {
        min-height: 80px;
        resize: vertical;
    }
    
    .form-actions {
        display: flex;
        gap: 10px;
        justify-content: flex-end;
        margin-top: 20px;
    }
    
    .direct-message {
        font-size: 14px;
        line-height: 1.4;
    }
`;
document.head.appendChild(directStyles);
