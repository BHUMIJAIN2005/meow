document.addEventListener('DOMContentLoaded', () => {
    const btnHome = document.getElementById('btn-home');
    const homeScreen = document.getElementById('home-screen');
    const viewsContainer = document.getElementById('views-container');
    const dashExplain = document.getElementById('dashboard-explain');
    const dashAnalyze = document.getElementById('dashboard-analyze');
    const dashOptimize = document.getElementById('dashboard-optimize');
    
    const cardExplain = document.getElementById('card-explain');
    const cardAnalyze = document.getElementById('card-analyze');
    const cardOptimize = document.getElementById('card-optimize');

    function resetEngine() {
        // Stop all animations safely if they exist
        if(typeof pause === 'function') pause(); 
        if(window.analyzeInterval) clearInterval(window.analyzeInterval);
        
        homeScreen.style.display = 'flex';
        viewsContainer.style.display = 'none';
        btnHome.style.display = 'none';
        
        dashExplain.style.display = 'none';
        dashAnalyze.style.display = 'none';
        dashOptimize.style.display = 'none';
        
        // Reset Analyze
        document.getElementById('alg-select-analyze').value = '';
        document.getElementById('analyze-visual-canvas').innerHTML = '';
        document.getElementById('analyze-code-lines').innerHTML = '<div style="padding: 2rem; color: var(--text-muted); font-style: italic; text-align: center;">Awaiting bug payload...</div>';
        
        // Reset Optimize
        document.getElementById('alg-select-optimize').value = '';
        document.getElementById('grid-brute').innerHTML = '';
        document.getElementById('grid-opt').innerHTML = '';
        document.getElementById('speedup-multiplier').textContent = '--';
        document.getElementById('op-counter-brute').textContent = '0';
        document.getElementById('op-counter-opt').textContent = '0';
    }

    btnHome.addEventListener('click', resetEngine);

    function showDash(dashboard) {
        homeScreen.style.display = 'none';
        viewsContainer.style.display = 'block';
        btnHome.style.display = 'flex';
        
        dashExplain.style.display = 'none';
        dashAnalyze.style.display = 'none';
        dashOptimize.style.display = 'none';
        
        dashboard.style.display = 'flex';
        
        // Resize charts if optimize is clicked
        if (dashboard.id === 'dashboard-optimize' && window.optimizeChart) {
            window.optimizeChart.resize();
        }
    }

    cardExplain.addEventListener('click', () => showDash(dashExplain));
    cardAnalyze.addEventListener('click', () => showDash(dashAnalyze));
    cardOptimize.addEventListener('click', () => showDash(dashOptimize));
    
    // Initial display handled by CSS, but enforcing rule
    resetEngine();
});
