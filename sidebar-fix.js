// Fix for all HTML pages - Add this to each page before closing </body> tag
<script>
    // Enhanced sidebar toggle functionality
    document.addEventListener('DOMContentLoaded', function() {
        console.log('Enhanced sidebar toggle loaded');
        
        const sidebar = document.getElementById('sidebar');
        const dashboardContainer = document.querySelector('.dashboard-container');
        const sidebarToggle = document.getElementById('sidebarToggle');
        
        // Initialize sidebar state
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
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Toggle button clicked');
                
                if (sidebar) {
                    const isCollapsed = sidebar.classList.contains('collapsed');
                    
                    if (isCollapsed) {
                        // Open sidebar
                        sidebar.classList.remove('collapsed');
                        if (dashboardContainer) {
                            dashboardContainer.classList.remove('expanded');
                        }
                        const toggleIcon = sidebarToggle.querySelector('i');
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
                        const toggleIcon = sidebarToggle.querySelector('i');
                        if (toggleIcon) {
                            toggleIcon.classList.remove('fa-bars');
                            toggleIcon.classList.add('fa-times');
                        }
                        console.log('Sidebar closed');
                    }
                }
            });
            
            // Add keyboard support
            sidebarToggle.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    console.log('Toggle key pressed');
                    if (sidebar) {
                        const isCollapsed = sidebar.classList.contains('collapsed');
                        
                        if (isCollapsed) {
                            sidebar.classList.remove('collapsed');
                            if (dashboardContainer) {
                                dashboardContainer.classList.remove('expanded');
                            }
                            const toggleIcon = sidebarToggle.querySelector('i');
                            if (toggleIcon) {
                                toggleIcon.classList.remove('fa-times');
                                toggleIcon.classList.add('fa-bars');
                            }
                        } else {
                            sidebar.classList.add('collapsed');
                            if (dashboardContainer) {
                                dashboardContainer.classList.add('expanded');
                            }
                            const toggleIcon = sidebarToggle.querySelector('i');
                            if (toggleIcon) {
                                toggleIcon.classList.remove('fa-bars');
                                toggleIcon.classList.add('fa-times');
                            }
                        }
                    }
                }
            });
        }
    });
</script>
