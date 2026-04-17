    const container = document.querySelector('.js-progress-container');
    const fill = document.getElementById('progress-fill');
    const text = document.getElementById('percent-text');

    let isDragging = false;

    function updateProgress(e) {
        const rect = container.getBoundingClientRect();

        let x = (e.clientX || e.touches[0].clientX) - rect.left;

        let percent = Math.round((x / rect.width) * 100);
        percent = Math.max(0, Math.min(100, percent));

        fill.style.width = percent + "%";
        text.innerText = percent + "% aniqlik";

        fill.style.background = `linear-gradient(to right, #006d44 0%, #006d44 70%)`;
    }

    container.addEventListener('mousedown', (e) => {
        isDragging = true;
        updateProgress(e);
    });

    window.addEventListener('mousemove', (e) => {
        if (isDragging) {
            updateProgress(e);
        }
    });

    window.addEventListener('mouseup', () => {
        isDragging = false;
    });

    container.addEventListener('touchstart', (e) => {
        isDragging = true;
        updateProgress(e);
    });

    window.addEventListener('touchmove', (e) => {
        if (isDragging) updateProgress(e);
    });

    window.addEventListener('touchend', () => {
        isDragging = false;
    });


    const steps = document.querySelectorAll('.step');
    const circleFill = document.getElementById('circle-progress');
    const percentText = document.getElementById('percent-val');
    const statsText = document.getElementById('stats-text');

    const totalSteps = steps.length;
    const circleFullOffset = 219.9;

    steps.forEach((step, index) => {
        step.addEventListener('click', () => {
            const currentStep = index + 1;
            updateUI(currentStep);
        });
    });

    function updateUI(currentStep) {
        const percentage = (currentStep / totalSteps) * 100;

        steps.forEach((s, idx) => {
            if (idx < currentStep) {
                s.classList.add('active');
            } else {
                s.classList.remove('active');
            }
        });

        const offset = circleFullOffset - (circleFullOffset * percentage) / 100;
        circleFill.style.strokeDashoffset = offset;

        percentText.innerText = Math.round(percentage) + "%";
        statsText.innerText = `${currentStep * 4} / 20 so'z o'zlashtirildi`; // Misol uchun 20 ta so'z
    }