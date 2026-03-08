// =================================================================
//  sidebar.js — Sidebar toggle logic, hover-reveal, state management
//  Attaches to window.SidebarController
// =================================================================
(function () {
    'use strict';

    var sidebarOpen = true;
    var sidebarButtonCollapsed = false;
    var hoverTimeout = null;
    var hoverRevealTimeout = null;

    var sidebar, main, topnav, toggleBtn, iconOpen, iconClose, hoverZone;

    function applySidebarState(open) {
        sidebarOpen = open;
        sidebar.classList.toggle('collapsed', !open);
        main.classList.toggle('expanded', !open);
        toggleBtn.classList.toggle('sidebar-collapsed', !open);
        topnav.style.marginLeft = open ? '270px' : '0';
        topnav.style.paddingLeft = open ? '28px' : '58px';
        if (open) {
            iconOpen.style.display = '';
            iconClose.style.display = 'none';
        } else {
            iconOpen.style.display = 'none';
            iconClose.style.display = '';
        }
    }

    function handleToggleClick() {
        sidebarButtonCollapsed = sidebarOpen;
        sidebar.classList.remove('hover-reveal');
        applySidebarState(!sidebarOpen);
        hoverZone.style.display = sidebarButtonCollapsed ? 'block' : 'none';
    }

    function startHoverReveal() {
        if (!sidebarButtonCollapsed) return;
        clearTimeout(hoverTimeout);
        clearTimeout(hoverRevealTimeout);
        hoverRevealTimeout = setTimeout(function () {
            sidebar.classList.add('hover-reveal');
        }, 400);
    }

    function endHoverReveal(checkSidebar) {
        if (!sidebarButtonCollapsed) return;
        clearTimeout(hoverRevealTimeout);
        hoverTimeout = setTimeout(function () {
            if (checkSidebar && sidebar.matches(':hover')) return;
            sidebar.classList.remove('hover-reveal');
        }, 300);
    }

    function init() {
        sidebar = document.getElementById('sidebar');
        main = document.getElementById('main');
        topnav = document.getElementById('topnav');
        toggleBtn = document.getElementById('sidebar-toggle');
        iconOpen = document.getElementById('toggle-icon-open');
        iconClose = document.getElementById('toggle-icon-close');
        hoverZone = document.getElementById('sidebar-hover-zone');

        toggleBtn.addEventListener('click', handleToggleClick);

        hoverZone.addEventListener('mouseenter', startHoverReveal);
        sidebar.addEventListener('mouseenter', startHoverReveal);
        sidebar.addEventListener('mouseleave', function () { endHoverReveal(false); });
        hoverZone.addEventListener('mouseleave', function () { endHoverReveal(true); });
    }

    window.SidebarController = {
        init: init,
        isOpen: function () { return sidebarOpen; }
    };
})();
