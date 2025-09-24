// ====================================
// MRA NATAÇÃO - SCRIPT PRINCIPAL
// ====================================

// Inicialização quando o DOM está carregado
document.addEventListener('DOMContentLoaded', initializeWebsite);

function initializeWebsite() {
    removePreloader();
    createBubbles();
    initializeParallax();
    addHoverEffects();
    initializeVideoAutoplay();
    setupEventListeners();
    console.log('🌊 MRA Natação - Website otimizado carregado!');
}

// ====================================
// PRELOADER
// ====================================
function removePreloader() {
    setTimeout(() => {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.classList.add('hidden');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }
    }, 2000);
}

// ====================================
// SISTEMA DE BOLHAS ANIMADAS
// ====================================
function createBubbles() {
    const container = document.getElementById('bubbles');
    if (!container) return;

    // Criar bolhas iniciais
    for (let i = 0; i < 10; i++) {
        createSingleBubble(container);
    }

    // Continuar criando bolhas periodicamente
    setInterval(() => {
        if (container.children.length < 8) {
            createSingleBubble(container);
        }
    }, 4000);
}

function createSingleBubble(container) {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';

    // Propriedades aleatórias
    bubble.style.left = Math.random() * 100 + '%';
    bubble.style.width = bubble.style.height = Math.random() * 12 + 6 + 'px';
    bubble.style.animationDelay = Math.random() * 2 + 's';
    bubble.style.animationDuration = (Math.random() * 3 + 7) + 's';

    container.appendChild(bubble);

    // Remover bolha após animação
    setTimeout(() => {
        if (bubble.parentNode) {
            bubble.parentNode.removeChild(bubble);
        }
    }, 10000);
}

// ====================================
// EFEITOS DE PARALLAX
// ====================================
function initializeParallax() {
    let ticking = false;

    function updateWaves() {
        const scrolled = window.pageYOffset;
        const waves = document.querySelectorAll('.water-wave');

        waves.forEach((wave, index) => {
            const speed = 0.15 + (index * 0.05);
            const rotation = scrolled * 0.01;
            wave.style.transform = `translateX(-50%) translateY(${scrolled * speed}px) rotate(${rotation}deg)`;
        });

        ticking = false;
    }

    function requestWaveUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateWaves);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestWaveUpdate);
}

// ====================================
// NAVEGAÇÃO ENTRE SEÇÕES
// ====================================
function showSection(sectionName) {
    // Esconder todas as seções
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });

    // Mostrar seção alvo
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.classList.add('active');

        // Se for seção filmagem, reproduzir vídeo
        if (sectionName === 'filmagem') {
            setTimeout(() => {
                const video = document.getElementById('instagramVideo');
                if (video) {
                    video.play().catch(e => {
                        console.log('Autoplay impedido pelo navegador:', e);
                    });
                }
            }, 300);
        }
    }

    // Atualizar navegação ativa
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });

    const activeLink = document.querySelector(`[onclick="showSection('${sectionName}')"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }

    // Scroll suave para o topo
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ====================================
// AUTOPLAY DE VÍDEO
// ====================================
function initializeVideoAutoplay() {
    const video = document.getElementById('instagramVideo');
    if (!video) return;

    // Observer para detectar quando a seção de filmagem fica visível
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.target.id === 'filmagem') {
                setTimeout(() => {
                    video.play().catch(e => {
                        console.log('Autoplay impedido pelo navegador:', e);
                    });
                }, 500);
            }
        });
    }, { threshold: 0.3 });

    // Observar seção filmagem
    const filmagemSection = document.getElementById('filmagem');
    if (filmagemSection) {
        observer.observe(filmagemSection);
    }
}

// ====================================
// ABRIR INSTAGRAM
// ====================================
function openInstagram() {
    window.open('https://www.instagram.com/p/DN-gIytkW-D/', '_blank');
}

// ====================================
// SISTEMA DE MODAL/FORMULÁRIO
// ====================================
function openForm(serviceType) {
    const overlay = document.getElementById('formOverlay');
    const title = document.getElementById('formTitle');
    const serviceInput = document.getElementById('servicoInput');

    // Títulos para cada serviço
    const titles = {
        'curso1': 'Agendar Curso 1 - AMA',
        'curso2': 'Agendar Curso 2 - Nados',
        'curso3': 'Agendar Curso 3 - Filmagem',
        'filmagem1': 'Solicitar Filmagem Aérea',
        'veltest': 'Solicitar Análise Veltest',
        'idc': 'Solicitar Análise IdC',
        'idr': 'Solicitar Análise IdR',
        'formativa': 'Agendar Aulas Formativas',
        'competitiva': 'Agendar Treinos Competitivos'
    };

    if (title) title.textContent = titles[serviceType] || 'Entre em Contato';
    if (serviceInput) serviceInput.value = serviceType || 'contato-geral';

    if (overlay) {
        overlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeForm() {
    const overlay = document.getElementById('formOverlay');
    if (overlay) {
        overlay.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// ====================================
// EFEITOS DE HOVER
// ====================================
function addHoverEffects() {
    // Efeitos para items diferenciais
    document.querySelectorAll('.differential-item').forEach(item => {
        item.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-8px)';
            this.style.backgroundColor = 'rgba(0, 255, 255, 0.1)';
        });

        item.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
            this.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        });
    });

    // Efeito para cards de serviço
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-8px) rotateX(3deg)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) rotateX(0deg)';
        });
    });

    // Efeito para cards de conteúdo
    document.querySelectorAll('.content-card').forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-6px)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });
}

// ====================================
// EVENT LISTENERS
// ====================================
function setupEventListeners() {
    // Fechar modal clicando no overlay
    const formOverlay = document.getElementById('formOverlay');
    if (formOverlay) {
        formOverlay.addEventListener('click', (e) => {
            if (e.target.id === 'formOverlay') {
                closeForm();
            }
        });
    }

    // Fechar modal com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeForm();
        }
    });

    // Smooth scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Otimizar performance de scroll
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(() => {
            // Ações pós-scroll se necessário
        }, 100);
    });
}

// ====================================
// UTILITÁRIOS
// ====================================

// Função para detectar dispositivo móvel
function isMobile() {
    return window.innerWidth <= 768;
}

// Função para detectar tablet
function isTablet() {
    return window.innerWidth > 768 && window.innerWidth <= 1024;
}

// Função para otimizar performance em dispositivos móveis
function optimizeForMobile() {
    if (isMobile()) {
        // Reduzir animações em dispositivos móveis
        document.body.classList.add('mobile-optimized');

        // Reduzir número de bolhas
        const bubbles = document.querySelectorAll('.bubble');
        bubbles.forEach((bubble, index) => {
            if (index > 5) {
                bubble.remove();
            }
        });
    }
}

// ====================================
// FUNÇÕES EXPOSTAS GLOBALMENTE
// ====================================

// Expor funções necessárias para o HTML
window.showSection = showSection;
window.openForm = openForm;
window.closeForm = closeForm;
window.openInstagram = openInstagram;

// ====================================
// OTIMIZAÇÕES DE PERFORMANCE
// ====================================

// Lazy loading para imagens
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Debounce function para otimizar eventos
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function para scroll
function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ====================================
// INICIALIZAÇÃO FINAL
// ====================================

// Verificar e otimizar para diferentes dispositivos
window.addEventListener('load', () => {
    optimizeForMobile();
    initializeLazyLoading();
});

// Redimensionamento da janela
window.addEventListener('resize', debounce(() => {
    optimizeForMobile();
}, 250));

// Service Worker para cache (opcional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registrado: ', registration);
            })
            .catch(registrationError => {
                console.log('SW falhou: ', registrationError);
            });
    });
}