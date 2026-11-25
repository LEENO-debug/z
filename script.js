document.addEventListener('DOMContentLoaded', () => {
    // 1. تحديث السنة تلقائياً في التذييل
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. تأثير ظهور البطاقات بنعومة عند التمرير (Scroll Reveal)
    const cards = document.querySelectorAll('.project-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 150);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    cards.forEach(card => observer.observe(card));

    // 3. التحكم بنافذة المعاينة السريعة للمواقع (Live Preview Modal)
    const modal = document.getElementById('previewModal');
    const previewFrame = document.getElementById('previewFrame');
    const modalTitle = document.getElementById('modalTitle');
    const modalExternalLink = document.getElementById('modalExternalLink');
    const closeModalBtn = document.getElementById('closeModal');
    const previewButtons = document.querySelectorAll('.preview-btn');

    previewButtons.forEach(button => {
        button.addEventListener('click', () => {
            const url = button.getAttribute('data-url');
            const title = button.getAttribute('data-title');

            modalTitle.textContent = title;
            modalExternalLink.href = url;
            previewFrame.src = url;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // إيقاف تمرير الصفحة الخلفية
        });
    });

    // دالة إغلاق النافذة
    const closeModal = () => {
        modal.classList.remove('active');
        previewFrame.src = ''; // تفريغ الإطار لإيقاف التحميل
        document.body.style.overflow = 'auto';
    };

    closeModalBtn.addEventListener('click', closeModal);

    // إغلاق النافذة عند النقر خارج الإطار
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // إغلاق النافذة عند الضغط على زر Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
});
