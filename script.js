
function preventVerticalTouchScroll(element) {
    if (!element) return;
    let startY = 0;
    let startX = 0;
    let isScrolling = false;

    element.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        startY = touch.clientY;
        startX = touch.clientX;
        isScrolling = false;
    }, { passive: true });

    element.addEventListener('touchmove', (e) => {
        if (isScrolling) return; // a decision has been made, don't re-evaluate

        const touch = e.touches[0];
        const deltaY = Math.abs(touch.clientY - startY);
        const deltaX = Math.abs(touch.clientX - startX);

        // If the user has moved more than a few pixels, decide the scroll direction
        if (deltaY > 5 || deltaX > 5) {
            if (deltaY > deltaX) {
                // It's a vertical scroll, allow it to happen on the page
                isScrolling = true;
            } else {
                // It's a horizontal scroll, prevent the page from scrolling vertically
                e.preventDefault();
                isScrolling = true;
            }
        }
    }, { passive: false });
}
/* ═══════════════════════════════════════════
   GURI Portfolio — Pure JavaScript
   ═══════════════════════════════════════════ */

// ─── Data ───────────────────────────────
const projects = [
    { id: 1, title: "VE1", category: "Video Editing", description: "Professional video editing with cinematic pacing and seamless transitions.", thumbnail: "frames/1_0026 (Small).png", video: "Video Editing/VE1.mp4", tags: ["Premiere Pro", "DaVinci Resolve"] },
    { id: 2, title: "VE2", category: "Video Editing", description: "Dynamic video edit showcasing precision cuts and polished color grading.", thumbnail: "frames/1_0036 (Small).png", video: "Video Editing/VE2.mp4", tags: ["Premiere Pro", "After Effects"] },
    { id: 3, title: "VE3", category: "Video Editing", description: "Cinematic showreel capturing golden hour footage with precisely timed cuts and sound design.", thumbnail: "frames/1_0046 (Small).png", video: "Video Editing/VE3.mp4", tags: ["Premiere Pro", "After Effects"] },
    { id: 4, title: "Dark Fantasy", category: "CGI / VFX", description: "A jaw-dropping dark fantasy CGI ad with photorealistic environments and cinematic lighting.", thumbnail: "frames/1_0056 (Small).png", video: "CGI ADS/Dark Fantasy.mp4", tags: ["Cinema 4D", "After Effects", "Octane Render"] },
    { id: 5, title: "Mc D Burger", category: "CGI / VFX", description: "Mouthwatering CGI product visualization for a burger commercial with realistic textures.", thumbnail: "frames/1_0066 (Small).png", video: "CGI ADS/Mc D Burger.mp4", tags: ["Cinema 4D", "Octane Render"] },
    { id: 6, title: "Superdonuts Rakhi Special", category: "CGI / VFX", description: "Festive CGI advertisement for Superdonuts with vibrant visuals and celebration themes.", thumbnail: "frames/1_0070 (Small).png", video: "CGI ADS/Superdonuts Rakhi special.mp4", tags: ["Blender", "After Effects"] },
    { id: 7, title: "Superdonuts", category: "CGI / VFX", description: "Premium CGI product ad showcasing delicious donuts with photorealistic detail.", thumbnail: "frames/1_0076 (Small).png", video: "CGI ADS/superdonuts.mp4", tags: ["Cinema 4D", "Octane Render"] },
    { id: 8, title: "Villager Studio", category: "CGI / VFX", description: "Creative CGI ad production for Villager Studio with stunning visual effects.", thumbnail: "frames/1_0080 (Small).png", video: "CGI ADS/villager studio.mp4", tags: ["Houdini", "Nuke", "After Effects"] },
    { id: 9, title: "Aujla Reel", category: "3D Animation", description: "High-energy 3D VFX reel with dynamic camera movements and photorealistic rendering.", thumbnail: "frames/1_0086 (Small).png", video: "3D VFX/aujla reel.mp4", tags: ["Blender", "Cinema 4D"] },
    { id: 10, title: "Aujla", category: "3D Animation", description: "Cinematic 3D VFX project with immersive storytelling and stunning visuals.", thumbnail: "frames/1_0090 (Small).png", video: "3D VFX/aujla.mp4", tags: ["Blender", "Unreal Engine"] },
    { id: 11, title: "Jashan Dhanna", category: "3D Animation", description: "Spectacular 3D VFX production with advanced particle simulations and dynamic lighting.", thumbnail: "frames/1_0096 (Small).png", video: "3D VFX/jashan dhanna.MP4", tags: ["Cinema 4D", "After Effects"] },
    { id: 12, title: "War Tkay", category: "3D Animation", description: "Action-packed 3D VFX sequence with explosive effects and cinematic composition.", thumbnail: "frames/1_0100 (Small).png", video: "3D VFX/war tkay.mp4", tags: ["Houdini", "Nuke"] },
    { id: 13, title: "Video Project 4", category: "Motion Graphics", description: "Dynamic motion graphics with sleek typography, infographics, and animated brand storytelling.", thumbnail: "frames/1_0030 (Small).png", video: "Motion Graphics/Video Project 4.mp4", tags: ["After Effects", "Premiere Pro"] },
    { id: 14, title: "AI Generated Art", category: "AI Automation", description: "Cinematic, photorealistic AI-generated video featuring traditional Indian attire and stylized storytelling.", thumbnail: "frames/1_0040 (Small).png", video: "Video Editing/AI_Video_1.mp4", tags: ["Midjourney", "Runway Gen-2", "AI Video"] },
    { id: 15, title: "Priceless Joy", category: "AI Automation", description: "A heartwarming paper-cutout style AI animation conveying that happiness doesn't always need a price tag.", thumbnail: "frames/1_0050 (Small).png", video: "Video Editing/AI_Video_2.mp4", tags: ["AI Animation", "Storytelling", "ComfyUI"] },
    { id: 16, title: "Cinematic Ethereal Portrait", category: "AI Automation", description: "Stunning cinematic AI-generated montage featuring elegant traditional attire and photorealistic details.", thumbnail: "frames/1_0060 (Small).png", video: "Video Editing/AI_Video_3.mp4", tags: ["AI Portrait", "Cinematic", "Midjourney"] },
    { id: 17, title: "SynthEdit AI", category: "AI Automation", description: "AI-driven video editing assistant that auto-generates cuts, transitions, and color grades based on mood analysis.", thumbnail: "frames/1_0016 (Small).png", tags: ["Runway ML", "After Effects", "Python"] },
];

const testimonials = [
    { id: 1, name: "Pavitar Lasoi, T Kay", role: "Creative Director", company: "Nova Studios", feedback: "“Working with Gurrunation Studio was an amazing experience. They handled the 3D visuals and VFX for my song perfectly. The final result looked cinematic and really elevated the entire music video. Highly recommended for anyone looking for creative visual work.”", rating: 5 },
    { id: 2, name: "Sofia Martinez", role: "Brand Manager", company: "Villager Studio", feedback: "Gurrumation Studio did an incredible job creating 3D visuals for Villager Studio. The visuals looked modern, creative, and really helped showcase our clothing brand in a unique way. We loved the final result.", rating: 5 },
    { id: 3, name: "James Okafor", role: "Film Producer", company: "Prism Pictures", feedback: "Working with Guri was a game-changer for our project. The editing pace, color grading, and VFX integration were world-class. Highly recommended.", rating: 5 },
    { id: 4, name: "Elena Rossi", role: "Marketing Director", company: "Vertex Agency", feedback: "The 3D animations brought our product visualization to life in ways we never imagined. Incredible talent and professionalism throughout.", rating: 5 },
    { id: 5, name: "", role: "", company: "Starbucks.", feedback: "We collaborated with Gurrumation Studio for motion graphics, and the results were fantastic. The visuals were modern, smooth, and highly engaging. Their team showed great creativity and professionalism throughout the project.", rating: 5 },
];

const services = [
    {
        title: "Video Editing", description: "Precision editing with cinematic pacing, seamless transitions, and professional color grading that brings your story to life.",
        icon: `<svg viewBox="0 0 48 48" fill="none"><rect x="4" y="8" width="40" height="28" rx="3" stroke="currentColor" stroke-width="2"/><polygon points="20,15 20,29 32,22" fill="currentColor" opacity="0.6"/><line x1="4" y1="40" x2="44" y2="40" stroke="currentColor" stroke-width="2"/><circle cx="14" cy="40" r="2" fill="currentColor"/><circle cx="24" cy="40" r="2" fill="currentColor"/><circle cx="34" cy="40" r="2" fill="currentColor"/></svg>`
    },
    {
        title: "CGI / VFX Production", description: "Photorealistic visual effects and computer-generated imagery that seamlessly blends with live-action footage.",
        icon: `<svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="18" stroke="currentColor" stroke-width="2"/><circle cx="24" cy="24" r="8" stroke="currentColor" stroke-width="2"/><circle cx="24" cy="24" r="2" fill="currentColor"/><line x1="24" y1="6" x2="24" y2="14" stroke="currentColor" stroke-width="1.5"/><line x1="24" y1="34" x2="24" y2="42" stroke="currentColor" stroke-width="1.5"/><line x1="6" y1="24" x2="14" y2="24" stroke="currentColor" stroke-width="1.5"/><line x1="34" y1="24" x2="42" y2="24" stroke="currentColor" stroke-width="1.5"/></svg>`
    },
    {
        title: "AI Automation", description: "Intelligent automation pipelines powered by AI — from auto-editing and scene detection to smart rendering and content generation.",
        icon: `<svg viewBox="0 0 48 48" fill="none"><rect x="8" y="6" width="32" height="36" rx="3" stroke="currentColor" stroke-width="2"/><circle cx="24" cy="20" r="6" stroke="currentColor" stroke-width="2"/><circle cx="24" cy="20" r="2" fill="currentColor" opacity="0.6"/><path d="M14 32 L20 28 L28 34 L34 30" stroke="currentColor" stroke-width="2" fill="none"/><line x1="18" y1="10" x2="30" y2="10" stroke="currentColor" stroke-width="1.5" opacity="0.4"/></svg>`
    },
    {
        title: "3D Animation", description: "Stunning three-dimensional worlds, characters, and product visualizations with cinematic lighting and rendering.",
        icon: `<svg viewBox="0 0 48 48" fill="none"><path d="M24 4 L42 14 L42 34 L24 44 L6 34 L6 14 Z" stroke="currentColor" stroke-width="2"/><line x1="24" y1="4" x2="24" y2="44" stroke="currentColor" stroke-width="1.5" opacity="0.5"/><line x1="6" y1="14" x2="42" y2="34" stroke="currentColor" stroke-width="1.5" opacity="0.5"/><line x1="42" y1="14" x2="6" y2="34" stroke="currentColor" stroke-width="1.5" opacity="0.5"/></svg>`
    },
    {
        title: "Motion Graphics", description: "Dynamic typography, infographics, and animated visuals perfect for brand storytelling and social media content.",
        icon: `<svg viewBox="0 0 48 48" fill="none"><rect x="6" y="6" width="14" height="14" rx="2" stroke="currentColor" stroke-width="2"/><rect x="28" y="6" width="14" height="14" rx="7" stroke="currentColor" stroke-width="2"/><polygon points="13,28 20,42 6,42" stroke="currentColor" stroke-width="2" fill="none"/><path d="M28 28 L42 28 L42 42 L28 42 Z" stroke="currentColor" stroke-width="2" transform="rotate(15 35 35)"/></svg>`
    },

];
const galleryImages = [
    "gallery/photo-1.jpg",
    "gallery/photo-2.jpg",
    "gallery/photo-3.jpg",
    "gallery/photo-4.jpg",
    "gallery/photo-5.jpg",
    "gallery/photo-6.jpg",
    "gallery/photo-7.jpg",
    "gallery/photo-8.jpg"
];


const socialLinksData = [
    {
        name: "Email", href: "mailto:teamgurrmation@gmail.com", label: "teamgurrmation@gmail.com",
        icon: `<svg viewBox="0 0 24 24" fill="none"><rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M2 4L12 13L22 4" stroke="currentColor" stroke-width="1.5"/></svg>`
    },
    {
        name: "Instagram", href: "https://instagram.com", label: "gurrumationstudio",
        icon: `<svg viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="1.5"/><circle cx="18" cy="6" r="1.5" fill="currentColor"/></svg>`
    },
    
    {
        name: "Linkedin", href: "https://linkedin.com", label: "linkedin.com/in/gurrumation-studio-a03b17354",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-linkedin" viewBox="0 0 16 16">
  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
</svg>`
    },
    {
        name: "WhatsApp", href: "https://wa.me/6280374658", label: "+91 6280374658",
        icon: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 2C6.48 2 2 6.48 2 12C2 13.85 2.5 15.55 3.35 17L2 22L7.15 20.7C8.5 21.45 10.2 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" stroke="currentColor" stroke-width="1.5"/><path d="M8 10C8 10 8.5 13 10.5 15C12.5 17 15 17 15 17L16 15L14 13.5L13 14.5C13 14.5 11 13 10 11L11 10L9.5 8L8 10Z" fill="currentColor" opacity="0.6"/></svg>`
    },
];


// ─── DOM Ready ──────────────────────────
document.addEventListener("DOMContentLoaded", () => {
    initYear();
    initScrollProgress();
    initCustomCursor();
    initNavbar();
    initHeroFrames();
    initParticles();
    renderPortfolio("All");
    renderServices();
    renderGallery();

    renderTestimonials();
    renderSocialLinks();
    initServicesScroll();
    initGalleryScroll();
    initScrollReveal();
    initSmoothScroll();
    initModal();
    initFilterPopups();
});

// ─── Footer Year ────────────────────────
function initYear() {
    document.getElementById("year").textContent = new Date().getFullYear();
}

// ─── Scroll Progress ────────────────────
function initScrollProgress() {
    const bar = document.getElementById("scroll-progress");
    window.addEventListener("scroll", () => {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        const pct = total > 0 ? (window.scrollY / total) * 100 : 0;
        bar.style.width = pct + "%";
    }, { passive: true });
}

// ─── Custom Cursor ──────────────────────
function initCustomCursor() {
    const dot = document.getElementById("cursorDot");
    const ring = document.getElementById("cursorRing");
    if (!dot || !ring) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let mx = 0, my = 0, rx = 0, ry = 0;

    window.addEventListener("mousemove", e => {
        mx = e.clientX; my = e.clientY;
        dot.style.left = mx + "px";
        dot.style.top = my + "px";
    });

    // Smooth ring follow
    (function followRing() {
        rx += (mx - rx) * 0.15;
        ry += (my - ry) * 0.15;
        ring.style.left = rx + "px";
        ring.style.top = ry + "px";
        requestAnimationFrame(followRing);
    })();

    document.addEventListener("mouseenter", () => { dot.style.opacity = "1"; ring.style.opacity = "0.5"; });
    document.addEventListener("mouseleave", () => { dot.style.opacity = "0"; ring.style.opacity = "0"; });

    // Hover detection
    function addHoverListeners() {
        document.querySelectorAll('a, button, [role="button"], input, textarea, select, [data-cursor-hover]').forEach(el => {
            el.addEventListener("mouseenter", () => { dot.classList.add("hovering"); ring.classList.add("hovering"); });
            el.addEventListener("mouseleave", () => { dot.classList.remove("hovering"); ring.classList.remove("hovering"); });
        });
    }
    addHoverListeners();
    new MutationObserver(addHoverListeners).observe(document.body, { childList: true, subtree: true });
}

// ─── Navbar ─────────────────────────────
function initNavbar() {
    const navbar = document.getElementById("navbar");
    const hamburger = document.getElementById("hamburger");
    const mobileMenu = document.getElementById("mobileMenu");

    window.addEventListener("scroll", () => {
        navbar.classList.toggle("scrolled", window.scrollY > 50);
    }, { passive: true });

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        mobileMenu.classList.toggle("active");
    });

    mobileMenu.querySelectorAll("a").forEach(a => {
        a.addEventListener("click", () => {
            hamburger.classList.remove("active");
            mobileMenu.classList.remove("active");
        });
    });
}

// ─── Hero Frame Sequence ────────────────
function initHeroFrames() {
    const canvas = document.getElementById("heroCanvas");
    const ctx = canvas.getContext("2d");
    const heroSection = document.getElementById("hero");
    const heroSticky = document.querySelector(".hero-sticky");
    const loadingOverlay = document.getElementById("loadingOverlay");
    const loadingBar = document.getElementById("loadingBar");
    const heroContent = document.getElementById("heroContent");
    const scrollIndicator = document.getElementById("scrollIndicator");

    // Build list of frame filenames — use the (Small) versions for better performance
    const frameFiles = [];
    for (let i = 2; i <= 102; i += 2) {
        const num = String(i).padStart(4, "0");
        frameFiles.push(`frames/1_${num} (Small).png`);
    }
    const TOTAL_FRAMES = frameFiles.length;

    const images = [];
    let loadedCount = 0;

    frameFiles.forEach(filename => {
        const img = new Image();
        img.src = filename;
        img.onload = () => {
            loadedCount++;
            const pct = (loadedCount / TOTAL_FRAMES) * 100;
            loadingBar.style.width = pct + "%";
            if (loadedCount >= TOTAL_FRAMES) {
                loadingOverlay.classList.add("hidden");
                drawFrame(0);
            }
        };
        images.push(img);
    });

    // Cache canvas size — only update on resize
    let canvasW = window.innerWidth;
    let canvasH = window.innerHeight;
    canvas.width = canvasW;
    canvas.height = canvasH;

    window.addEventListener("resize", () => {
        canvasW = window.innerWidth;
        canvasH = window.innerHeight;
        canvas.width = canvasW;
        canvas.height = canvasH;
        drawFrame(lastProgress, true);
    });

    let lastFrameIndex = -1;
    let lastProgress = 0;

    function drawFrame(progress, forceRedraw) {
        const frameIndex = Math.min(Math.floor(progress * (TOTAL_FRAMES - 1)), TOTAL_FRAMES - 1);
        if (frameIndex === lastFrameIndex && !forceRedraw) return; // skip redundant draws
        lastFrameIndex = frameIndex;

        const img = images[frameIndex];
        if (!img || !img.complete) return;

        // Fill with website background green so PNG transparency matches
        ctx.fillStyle = "#071A14";
        ctx.fillRect(0, 0, canvasW, canvasH);

        const scale = Math.max(canvasW / img.width, canvasH / img.height);
        const x = (canvasW - img.width * scale) / 2;
        const y = (canvasH - img.height * scale) / 2;
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    }

    // Frames complete their full animation in ~70% of scroll progress.
    // The remaining 30% leaves the final frame + text visible while still sticky,
    // then everything naturally scrolls away when the hero section ends.
    const FRAME_END = 0.7;

    // 3D transform targets — canvas, overlay, and particles all move together
    const heroOverlay = document.querySelector(".hero-overlay");
    const particleCanvas = document.getElementById("particleCanvas");

    // ── 3D Animation Parameters ──
    const MAX_ROTATE_Y = 25;     // degrees — Y-axis rotation
    const MAX_ROTATE_X = -8;     // degrees — slight tilt for depth
    const MAX_TRANSLATE_Y = -400; // pixels — upward movement
    const MAX_SCALE = 0.88;       // subtle scale-down for depth feel

    // Smooth interpolation for buttery 3D transforms
    let currentRotY = 0, currentRotX = 0, currentTY = 0, currentScl = 1;
    let targetRotY = 0, targetRotX = 0, targetTY = 0, targetScl = 1;
    let animating = false;

    function lerpTransforms() {
        const ease = 0.08; // lower = smoother / more lag
        currentRotY += (targetRotY - currentRotY) * ease;
        currentRotX += (targetRotX - currentRotX) * ease;
        currentTY   += (targetTY   - currentTY)   * ease;
        currentScl  += (targetScl  - currentScl)  * ease;

        const transform = `translateY(${currentTY}px) rotateY(${currentRotY}deg) rotateX(${currentRotX}deg) scale(${currentScl})`;
        canvas.style.transform = transform;

        // Apply matching transforms to overlay & particles so they stick to the canvas
        if (heroOverlay) heroOverlay.style.transform = transform;
        if (particleCanvas) particleCanvas.style.transform = transform;

        // Keep animating until values settle
        const delta = Math.abs(targetRotY - currentRotY) + Math.abs(targetTY - currentTY);
        if (delta > 0.01) {
            requestAnimationFrame(lerpTransforms);
        } else {
            animating = false;
        }
    }

    function startLerp() {
        if (!animating) {
            animating = true;
            requestAnimationFrame(lerpTransforms);
        }
    }

    // Scroll-driven animation — throttled with rAF
    let scrollTicking = false;
    window.addEventListener("scroll", () => {
        if (!scrollTicking) {
            scrollTicking = true;
            requestAnimationFrame(() => {
                const rect = heroSection.getBoundingClientRect();
                const sectionHeight = heroSection.offsetHeight - window.innerHeight;
                const scrolled = -rect.top;
                const progress = Math.max(0, Math.min(1, scrolled / sectionHeight));
                lastProgress = progress;

                // Map progress 0→FRAME_END to frame progress 0→1
                const frameProgress = Math.min(1, progress / FRAME_END);
                drawFrame(frameProgress);

                // ── 3D Transforms ──
                // Smoothed ease-out curve for natural deceleration
                const t = Math.min(1, progress / 0.9); // use 90% of scroll for transforms
                const eased = 1 - Math.pow(1 - t, 3);  // cubic ease-out

                targetRotY = eased * MAX_ROTATE_Y;
                targetRotX = eased * MAX_ROTATE_X;
                targetTY   = eased * MAX_TRANSLATE_Y;
                targetScl  = 1 + eased * (MAX_SCALE - 1); // 1 → MAX_SCALE
                startLerp();

                // Fade scroll indicator early
                if (scrollIndicator) {
                    scrollIndicator.style.opacity = progress > 0.08 ? "0" : "1";
                }

                // Fade hero text slightly as the 3D rotation kicks in
                let textOpacity = 1;
                if (progress > 0.5) {
                    textOpacity = 1 - ((progress - 0.5) / 0.5) * 0.6;
                }
                heroContent.style.opacity = Math.max(0.4, textOpacity);

                scrollTicking = false;
            });
        }
    }, { passive: true });

    // Mouse parallax on hero content
    window.addEventListener("mousemove", e => {
        const mx = (e.clientX / window.innerWidth - 0.5) * 2;
        heroContent.style.marginLeft = (mx * -15) + "px";
    });
}

// ─── Particles & Shapes ────────────────
function initParticles() {
    const canvas = document.getElementById("particleCanvas");
    const ctx = canvas.getContext("2d");

    const particles = [];
    for (let i = 0; i < 60; i++) {
        particles.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            size: Math.random() * 3 + 1,
            speedY: -(Math.random() * 0.5 + 0.2),
            speedX: (Math.random() - 0.5) * 0.3,
            opacity: Math.random() * 0.5 + 0.2,
            wobble: Math.random() * Math.PI * 2,
        });
    }

    const shapeTypes = ["triangle", "diamond", "circle", "hexagon"];
    const shapes = [];
    for (let i = 0; i < 8; i++) {
        shapes.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            size: Math.random() * 20 + 10,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 0.5,
            speedY: -(Math.random() * 0.3 + 0.1),
            opacity: Math.random() * 0.15 + 0.05,
            type: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
            phase: Math.random() * Math.PI * 2,
        });
    }

    // Cache canvas size — only resize on window resize (not every frame)
    let cw = window.innerWidth;
    let ch = window.innerHeight;
    canvas.width = cw;
    canvas.height = ch;

    window.addEventListener('resize', () => {
        cw = window.innerWidth;
        ch = window.innerHeight;
        canvas.width = cw;
        canvas.height = ch;
    });

    function animate() {
        ctx.clearRect(0, 0, cw, ch);

        // Draw particles
        particles.forEach(p => {
            p.wobble += 0.02;
            p.x += p.speedX + Math.sin(p.wobble) * 0.3;
            p.y += p.speedY;
            if (p.y < -10) { p.y = ch + 10; p.x = Math.random() * cw; }
            if (p.x < -10) p.x = cw + 10;
            if (p.x > cw + 10) p.x = -10;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(212,175,55,${p.opacity})`;
            ctx.fill();
        });

        // Draw shapes
        shapes.forEach(s => {
            s.phase += 0.01;
            s.x += Math.sin(s.phase) * 0.5;
            s.y += s.speedY + Math.sin(s.phase * 0.5) * 0.2;
            s.rotation += s.rotationSpeed;
            if (s.y < -50) { s.y = ch + 50; s.x = Math.random() * cw; }

            ctx.save();
            ctx.translate(s.x, s.y);
            ctx.rotate(s.rotation * Math.PI / 180);
            ctx.strokeStyle = `rgba(212,175,55,${s.opacity})`;
            ctx.lineWidth = 1;

            switch (s.type) {
                case "triangle":
                    ctx.beginPath(); ctx.moveTo(0, -s.size); ctx.lineTo(s.size, s.size); ctx.lineTo(-s.size, s.size); ctx.closePath(); ctx.stroke(); break;
                case "diamond":
                    ctx.beginPath(); ctx.moveTo(0, -s.size); ctx.lineTo(s.size, 0); ctx.lineTo(0, s.size); ctx.lineTo(-s.size, 0); ctx.closePath(); ctx.stroke(); break;
                case "circle":
                    ctx.beginPath(); ctx.arc(0, 0, s.size, 0, Math.PI * 2); ctx.stroke(); break;
                case "hexagon":
                    ctx.beginPath();
                    for (let j = 0; j < 6; j++) {
                        const angle = (Math.PI / 3) * j - Math.PI / 2;
                        const hx = Math.cos(angle) * s.size;
                        const hy = Math.sin(angle) * s.size;
                        if (j === 0) ctx.moveTo(hx, hy); else ctx.lineTo(hx, hy);
                    }
                    ctx.closePath(); ctx.stroke(); break;
            }
            ctx.restore();
        });

        requestAnimationFrame(animate);
    }
    animate();
}

// ─── Portfolio Rendering ────────────────
let activeCategory = "All";

function renderPortfolio(category) {
    activeCategory = category;
    const grid = document.getElementById("projectGrid");
    const filtered = category === "All" ? projects : projects.filter(p => p.category === category);

    // Update filter buttons
    document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.category === category);
    });

    grid.innerHTML = "";
    filtered.forEach((project, i) => {
        const isTall = i % 3 === 0;
        const card = document.createElement("div");
        card.className = `project-card glass gold-border hover-lift ${isTall ? "tall" : ""}`;
        card.style.opacity = "0";
        card.style.transform = "scale(0.9) translateY(30px)";
        card.dataset.projectId = project.id;
        card.setAttribute("data-cursor-hover", "");

        card.innerHTML = `
            <div class="thumb-wrap ${isTall ? "aspect-tall" : "aspect-video"}">
                ${project.video 
                    ? `<video src="${project.video}" loop muted playsinline class="portfolio-video"></video>` 
                    : `<img src="${project.thumbnail}" alt="${project.title}" loading="lazy">`
                }
                <div class="card-overlay"></div>
                <div class="shimmer-effect"></div>
            </div>
            <div class="card-content">
                <span class="cat">${project.category}</span>
                <h3>${project.title}</h3>
                <p class="desc">${project.description}</p>
                <div class="tags">${project.tags.slice(0, 2).map(t => `<span class="tag">${t}</span>`).join("")}</div>
            </div>
        `;

        
        const vid = card.querySelector('video');
        if (vid) {
            card.addEventListener('mouseenter', () => vid.play().catch(() => {}));
            card.addEventListener('mouseleave', () => {
                vid.pause();
                vid.currentTime = 0;
            });

            card.addEventListener("click", () => {
                if (vid.requestFullscreen) {
                    vid.requestFullscreen();
                } else if (vid.webkitEnterFullscreen) {
                    vid.webkitEnterFullscreen();
                } else if (vid.webkitRequestFullscreen) {
                    vid.webkitRequestFullscreen();
                }
                vid.muted = false;
                vid.controls = true;
                vid.play().catch(() => {});

                const onExitFullscreen = () => {
                    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
                        vid.muted = true;
                        vid.controls = false;
                        vid.pause();
                    }
                };
                document.addEventListener('fullscreenchange', onExitFullscreen);
                document.addEventListener('webkitfullscreenchange', onExitFullscreen);
                vid.addEventListener('webkitendfullscreen', () => {
                    vid.muted = true;
                    vid.controls = false;
                    vid.pause();
                });
            });
        } else {
            card.addEventListener("click", () => openModal(project));
        }
        grid.appendChild(card);

        // Staggered entrance
        setTimeout(() => {
            card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
            card.style.opacity = "1";
            card.style.transform = "scale(1) translateY(0)";
        }, i * 80 + 50);
    });
}

// Filter button clicks
document.getElementById("filterBar").addEventListener("click", e => {
    const btn = e.target.closest(".filter-btn");
    if (btn) {
        renderPortfolio(btn.dataset.category);
        
        // On mobile, if we tap it, we want to see the GIF. 
        // We will remove the 'is-hovered' class from ALL other wrappers so only the tapped one stays open.
        const wrappers = document.querySelectorAll('.filter-btn-wrapper');
        wrappers.forEach(w => {
            if (w !== btn.closest('.filter-btn-wrapper')) {
                w.classList.remove('is-hovered');
            }
        });
        
        // Toggle the clicked one
        const wrapper = btn.closest(".filter-btn-wrapper");
        if (wrapper) {
            wrapper.classList.add('is-hovered');
        }
    }
});

// ─── Modal ──────────────────────────────
function initModal() {
    const backdrop = document.getElementById("projectModal");
    const closeBtn = document.getElementById("modalClose");

    backdrop.addEventListener("click", e => { if (e.target === backdrop) closeModal(); });
    closeBtn.addEventListener("click", closeModal);
    document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });
}

function openModal(project) {
    const backdrop = document.getElementById("projectModal");
    const modalImageContainer = document.querySelector(".modal-image");
    
    // Clear out the modal media
    let existingVideo = document.getElementById("modalVideo");
    let existingImg = document.getElementById("modalImg");
    if(existingVideo) existingVideo.remove();
    if(existingImg) existingImg.remove();
    
    // Insert either video or image
    if (project.video) {
        modalImageContainer.insertAdjacentHTML('afterbegin', `<video id="modalVideo" src="${project.video}" controls loop class="portfolio-video" style="border-radius:1rem 1rem 0 0; width:100%; height:100%; object-fit:cover; position:absolute; inset:0; z-index:0;"></video>`);
    } else {
        modalImageContainer.insertAdjacentHTML('afterbegin', `<img id="modalImg" src="${project.thumbnail}" alt="${project.title}" style="position:absolute; inset:0; width:100%; height:100%; object-fit:cover; z-index:0;">`);
    }
    document.getElementById("modalCat").textContent = project.category;
    document.getElementById("modalTitle").textContent = project.title;
    document.getElementById("modalDesc").textContent = project.description;
    document.getElementById("modalTags").innerHTML = project.tags.map(t => `<span class="tag">${t}</span>`).join("");
    backdrop.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeModal() {
    let existingVideo = document.getElementById("modalVideo");
    if(existingVideo) { existingVideo.pause(); }
    document.getElementById("projectModal").classList.remove("active");
    document.body.style.overflow = "";
}

// ─── Services Rendering ─────────────────
function renderServices() {
    const grid = document.getElementById("servicesGrid");

    // Create the scrolling track container
    const track = document.createElement("div");
    track.className = "services-track";

    // Helper: create a service card element
    function createCard(s) {
        const card = document.createElement("div");
        card.className = "service-card glass gold-border hover-lift";
        card.setAttribute("data-cursor-hover", "");
        card.innerHTML = `
            <div class="hover-glow"></div>
            <div class="corner-accent"></div>
            <div class="card-inner">
                <div class="icon-wrap">${s.icon}</div>
                <h3>${s.title}</h3>
                <p>${s.description}</p>
                <div class="bottom-line"></div>
            </div>
        `;
        return card;
    }

    // Render original + duplicate for seamless infinite loop
    services.forEach(s => track.appendChild(createCard(s)));
    services.forEach(s => track.appendChild(createCard(s)));

    grid.appendChild(track);
}

// ─── Services Auto-Scroll + Drag ────────
function initServicesScroll() {
    const grid = document.getElementById('servicesGrid');
    if (!grid) return;

    const AUTO_SPEED = 1; // px per frame — smooth auto-scroll
    let paused = false;
    let resumeTimer = null;

    // ── Auto-scroll loop ──
    function autoScroll() {
        if (!paused) {
            grid.scrollLeft += AUTO_SPEED;
            // Infinite loop: when we've scrolled past the first set, jump back
            const halfScroll = grid.scrollWidth / 2;
            if (grid.scrollLeft >= halfScroll) {
                grid.scrollLeft -= halfScroll;
            }
        }
        requestAnimationFrame(autoScroll);
    }
    requestAnimationFrame(autoScroll);

    function pauseAutoScroll() {
        paused = true;
        clearTimeout(resumeTimer);
        resumeTimer = setTimeout(() => { paused = false; }, 2000);
    }

    
    // Prevent vertical scroll on touch
    

    // ── Cursor drag to scroll (fast) ──
    let isDragging = false;
    let startX = 0;
    let scrollStart = 0;

    grid.addEventListener('mousedown', e => {
        isDragging = true;
        startX = e.pageX;
        scrollStart = grid.scrollLeft;
        grid.style.cursor = 'grabbing';
        grid.style.userSelect = 'none';
        paused = true;
        clearTimeout(resumeTimer);
    });

    window.addEventListener('mousemove', e => {
        if (!isDragging) return;
        const dx = e.pageX - startX;
        grid.scrollLeft = scrollStart - dx;
    });

    window.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            grid.style.cursor = 'grab';
            grid.style.userSelect = '';
            pauseAutoScroll();
        }
    });
}




// ─── Gallery Rendering ──────────────────
function renderGallery() {
    const grid = document.getElementById("galleryGrid");
    if (!grid) return;

    const track = document.createElement("div");
    track.className = "gallery-track";

    function createCard(src) {
        const card = document.createElement("div");
        card.className = "gallery-card glass gold-border hover-lift";
        card.setAttribute("data-cursor-hover", "");
        card.innerHTML = `
            <img src="${src}" alt="Gallery Image" loading="lazy">
            <div class="card-overlay"></div>
            <div class="shimmer-effect"></div>
        `;
        return card;
    }

    // Render original + duplicate for seamless loop
    galleryImages.forEach(src => track.appendChild(createCard(src)));
    galleryImages.forEach(src => track.appendChild(createCard(src)));

    grid.appendChild(track);
}

// ─── Gallery Auto-Scroll ────────────────
function initGalleryScroll() {
    const grid = document.getElementById('galleryGrid');
    if (!grid) return;

    const AUTO_SPEED = 1;
    let paused = false;
    let resumeTimer = null;
    let scrollLoopId = null;

    function autoScroll() {
        if (!paused) {
            grid.scrollLeft += AUTO_SPEED;
            const halfScroll = grid.scrollWidth / 2;
            if (grid.scrollLeft >= halfScroll) {
                grid.scrollLeft -= halfScroll;
            }
        }
        scrollLoopId = requestAnimationFrame(autoScroll);
    }
    scrollLoopId = requestAnimationFrame(autoScroll);

    function pauseAutoScroll() {
        paused = true;
        clearTimeout(resumeTimer);
        resumeTimer = setTimeout(() => { paused = false; }, 2000);
    }

   
    // Prevent vertical scroll on touch
    

    // Drag-to-scroll support
    let isDown = false;
    let startX;
    let scrollLeft;

    grid.addEventListener('mousedown', (e) => {
        isDown = true;
        grid.style.cursor = 'grabbing';
        startX = e.pageX - grid.offsetLeft;
        scrollLeft = grid.scrollLeft;
        pauseAutoScroll();
    }); 
    grid.addEventListener('mouseleave', () => {
        isDown = false;
        grid.style.cursor = 'grab';
    });
    grid.addEventListener('mouseup', () => {
        isDown = false;
        grid.style.cursor = 'grab';
    }); 
    grid.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - grid.offsetLeft;
        const walk = (x - startX) * 2; 
        grid.scrollLeft = scrollLeft - walk;
        pauseAutoScroll();
    }); 
    
    // Touch support
    grid.addEventListener('touchstart', () => pauseAutoScroll(), { passive: true });
    grid.addEventListener('touchmove', () => pauseAutoScroll(), { passive: true });
}

// ─── Testimonials Rendering ─────────────
let currentTestimonial = 0;
let testimonialTimer = null;

function renderTestimonials() {
    const viewport = document.getElementById("testimonialViewport");
    const dots = document.getElementById("testimonialDots");

    testimonials.forEach((t, i) => {
        const card = document.createElement("div");
        card.className = `testimonial-card glass-strong gold-border ${i === 0 ? "active" : ""}`;
        const starsHTML = Array.from({ length: 5 }, (_, si) =>
            `<span class="${si < t.rating ? "" : "empty"}">★</span>`
        ).join("");
        card.innerHTML = `
            <div class="quote-mark">&ldquo;</div>
            <p class="feedback">${t.feedback}</p>
            <div class="stars">${starsHTML}</div>
            <h4 class="client-name">${t.name}</h4>
            <p class="client-role">${t.role} — ${t.company}</p>
        `;
        viewport.appendChild(card);

        const dot = document.createElement("button");
        dot.className = i === 0 ? "active" : "";
        dot.setAttribute("data-cursor-hover", "");
        dot.addEventListener("click", () => goToTestimonial(i));
        dots.appendChild(dot);
    });

    // Auto-play
    startTestimonialAutoplay();
}

function goToTestimonial(index) {
    currentTestimonial = index;
    document.querySelectorAll(".testimonial-card").forEach((c, i) => c.classList.toggle("active", i === index));
    document.querySelectorAll(".testimonial-dots button").forEach((d, i) => d.classList.toggle("active", i === index));
    // Reset autoplay
    clearInterval(testimonialTimer);
    startTestimonialAutoplay();
}

function startTestimonialAutoplay() {
    testimonialTimer = setInterval(() => {
        goToTestimonial((currentTestimonial + 1) % testimonials.length);
    }, 5000);
}

// ─── Social Links Rendering ─────────────
function renderSocialLinks() {
    const container = document.getElementById("socialLinks");
    socialLinksData.forEach(s => {
        const link = document.createElement("a");
        link.href = s.href;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.className = "social-link glass gold-border";
        link.setAttribute("data-cursor-hover", "");
        link.innerHTML = `
            <div class="social-icon">${s.icon}</div>
            <div class="social-info">
                <p>${s.name}</p>
                <small>${s.label}</small>
            </div>
            <span class="arrow">→</span>
        `;
        container.appendChild(link);
    });
}

// ─── Scroll Reveal ──────────────────────
function initScrollReveal() {
    const revealElements = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");

                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "-100px" });

    revealElements.forEach(el => observer.observe(el));
}

// ─── Smooth Scroll ──────────────────────
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", e => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute("href"));
            if (target) target.scrollIntoView({ behavior: "smooth" });
        });
    });
}

// ─── Filter Button Hover — Cinematic Interaction ─────────
function initFilterPopups() {
    const wrappers = document.querySelectorAll('.filter-btn-wrapper');
    const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

    wrappers.forEach(wrapper => {
        const btn = wrapper.querySelector('.filter-btn');
        if (!btn) return;

        if (isTouch) {
            // Tapping outside closes
            document.addEventListener('touchstart', e => {
                if (!e.target.closest('.filter-btn-wrapper')) {
                    wrapper.classList.remove('is-hovered');
                    btn.style.transform = '';
                }
            }, { passive: true });
        } else {
            wrapper.addEventListener('mouseenter', () => wrapper.classList.add('is-hovered'));
            wrapper.addEventListener('mouseleave', () => {
                wrapper.classList.remove('is-hovered');
                btn.style.transform = '';
            });
            wrapper.addEventListener('mousemove', e => {
                const rect = wrapper.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const offsetX = (e.clientX - centerX) / (rect.width / 2);
                const offsetY = (e.clientY - centerY) / (rect.height / 2);

                const isHovered = wrapper.classList.contains('is-hovered');
                const maxShift = isHovered ? 3 : 4;
                const scaleVal = isHovered ? 1.1 : 1;
                btn.style.transform = `scale(${scaleVal}) translate(${offsetX * maxShift}px, ${offsetY * maxShift}px)`;
            });
        }
    });
}


// ─── Contact Form WhatsApp Integration ──
const contactForm = document.getElementById("contactForm");
if (contactForm) {
    contactForm.removeAttribute("onsubmit");
    contactForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const name = this.name.value.trim() || "Someone";
        const email = this.email.value.trim() || "Not provided";
        const subject = this.subject.value.trim() || "Inquiry from Website";
        const message = this.message.value.trim() || "I would like to discuss a project with you.";

        const text = `Hi GURRU, \n\nMy name is *${name}*.\n*Email:* ${email}\n*Subject:* ${subject}\n\n*Message:*\n${message}`;
        const encodedText = encodeURIComponent(text);
        
        // Target WhatsApp number: +91 6280 374 658
        const waUrl = `https://wa.me/916280374658?text=${encodedText}`;
        window.open(waUrl, '_blank');
    });
}
