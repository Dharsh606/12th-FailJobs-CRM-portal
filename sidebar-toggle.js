// Universal Sidebar Toggle Script - Add to all pages
document.addEventListener('DOMContentLoaded', function() {
    console.log('Sidebar toggle script loaded');
    
    // Ensure toggleSidebar function exists
    if (typeof window.toggleSidebar === 'undefined') {
        window.toggleSidebar = function() {
            const sidebar = document.getElementById('sidebar');
            const dashboardContainer = document.querySelector('.dashboard-container');
            const sidebarToggle = document.getElementById('sidebarToggle');
            const toggleIcon = sidebarToggle ? sidebarToggle.querySelector('i') : null;
            
            console.log('Universal toggleSidebar called');
            console.log('Sidebar element:', sidebar);
            
            if (sidebar) {
                const isCollapsed = sidebar.classList.contains('collapsed');
                console.log('Current state - isCollapsed:', isCollapsed);
                
                if (isCollapsed) {
                    // Open sidebar
                    sidebar.classList.remove('collapsed');
                    if (dashboardContainer) {
                        dashboardContainer.classList.remove('expanded');
                    }
                    if (toggleIcon) {
                        toggleIcon.classList.remove('fa-times');
                        toggleIcon.classList.add('fa-bars');
                    }
                    console.log('Sidebar opened');
                } else {
                    // Close sidebar
                    sidebar.classList.add('collapsed');
                    if (dashboardContainer) {
                        dashboardContainer.classList.add('expanded');
                    }
                    if (toggleIcon) {
                        toggleIcon.classList.remove('fa-bars');
                        toggleIcon.classList.add('fa-times');
                    }
                    console.log('Sidebar closed');
                }
            } else {
                console.error('Sidebar not found!');
            }
        };
    }
    
    // Initialize sidebar state
    const sidebar = document.getElementById('sidebar');
    const dashboardContainer = document.querySelector('.dashboard-container');
    
    if (window.innerWidth > 768) {
        if (sidebar) {
            sidebar.classList.remove('collapsed');
        }
        if (dashboardContainer) {
            dashboardContainer.classList.remove('expanded');
        }
    } else {
        if (sidebar) {
            sidebar.classList.add('collapsed');
        }
        if (dashboardContainer) {
            dashboardContainer.classList.add('expanded');
        }
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            if (sidebar) {
                sidebar.classList.remove('collapsed');
            }
            if (dashboardContainer) {
                dashboardContainer.classList.remove('expanded');
            }
        } else {
            if (sidebar) {
                sidebar.classList.add('collapsed');
            }
            if (dashboardContainer) {
                dashboardContainer.classList.add('expanded');
            }
        }
    });
    
    // Setup event listener for sidebar toggle button
    const sidebarToggle = document.getElementById('sidebarToggle');
    if (sidebarToggle) {
        // Remove existing listeners to prevent duplicates
        sidebarToggle.replaceWith(sidebarToggle.cloneNode(true));
        
        const newToggle = document.getElementById('sidebarToggle');
        newToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Toggle button clicked');
            window.toggleSidebar();
        });
        
        // Add keyboard support
        newToggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                console.log('Toggle key pressed');
                window.toggleSidebar();
            }
        });
        
        console.log('Sidebar toggle button setup complete');
    } else {
        console.error('Sidebar toggle button not found!');
    }
});
