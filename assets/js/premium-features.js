function initPremiumFeatures() {
    // 2. Initialize AOS.js for scroll reveal animations
    AOS.init({
        duration: 800, // values from 0 to 3000, with step 50ms
        once: true, // whether animation should happen only once - while scrolling down
    });

    // 4. Floating Mini User Dashboard Logic
    const dashboard = document.getElementById('floating-user-dashboard');
    if (dashboard) {
        const toggle = dashboard.querySelector('.dashboard-toggle');
        toggle.addEventListener('click', () => {
            dashboard.classList.toggle('open');
        });

        // Example of fetching user data with jQuery AJAX
        // This is a placeholder - you would need to create a proper WordPress AJAX endpoint
        /*
        jQuery.ajax({
            url: '/wp-admin/admin-ajax.php', // WordPress AJAX URL
            type: 'POST',
            data: {
                action: 'get_user_dashboard_summary' // Custom action hook
            },
            success: function(response) {
                if(response.success) {
                    dashboard.querySelector('.dashboard-content').innerHTML = response.data.html;
                }
            }
        });
        */
    }

    // 6. Example of using GSAP for a simple animation
    // This will animate any element with the class 'gsap-fade-in'
    gsap.from(".gsap-fade-in", {
        duration: 1.5,
        opacity: 0,
        y: 50,
        stagger: 0.2,
        ease: "power3.out"
    });

    // 🎡 Animated Cards Logic
    const animatedCards = document.querySelectorAll('.animated-card');
    animatedCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20; // Adjust divisor for sensitivity
            const rotateY = (centerX - x) / 20;

            card.style.setProperty('--rotateX', `${rotateX}deg`);
            card.style.setProperty('--rotateY', `${rotateY}deg`);
        });

        card.addEventListener('mouseleave', () => {
            card.style.setProperty('--rotateX', '0deg');
            card.style.setProperty('--rotateY', '0deg');
        });
    });

    // 🧭 Sticky Quick Actions FAB Logic
    const fab = document.querySelector('.quick-actions-fab');
    if (fab) {
        fab.querySelector('.fab-toggle').addEventListener('click', () => fab.classList.toggle('open'));
    }
}