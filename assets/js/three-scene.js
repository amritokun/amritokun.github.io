/**
 * Lumipuchi Three.js 3D Scene
 * Premium 3D keychain visualization and cosmic effects
 */

class Lumipuchi3D {
  constructor() {
    this.scenes = {};
    this.animationFrameId = null;
    this.init();
  }

  init() {
    this.initCosmicCanvas();
    this.initHero3D();
    this.initProductViewer();
    this.animate();
  }

  // Cosmic particle background
  initCosmicCanvas() {
    const canvas = document.getElementById('cosmic-canvas');
    if (!canvas) return;

    this.cosmicCtx = canvas.getContext('2d');
    this.particles = [];
    this.resizeCosmicCanvas();

    // Create particles
    for (let i = 0; i < 100; i++) {
      this.particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.5 + 0.2,
        pulse: Math.random() * Math.PI * 2
      });
    }

    window.addEventListener('resize', () => this.resizeCosmicCanvas());
    this.animateCosmicCanvas();
  }

  resizeCosmicCanvas() {
    const canvas = document.getElementById('cosmic-canvas');
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  animateCosmicCanvas() {
    if (!this.cosmicCtx) return;

    const canvas = this.cosmicCtx.canvas;
    this.cosmicCtx.clearRect(0, 0, canvas.width, canvas.height);

    const isDark = document.documentElement.classList.contains('dark');
    
    this.particles.forEach(particle => {
      // Update position
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      particle.pulse += 0.02;

      // Wrap around
      if (particle.x < 0) particle.x = canvas.width;
      if (particle.x > canvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = canvas.height;
      if (particle.y > canvas.height) particle.y = 0;

      // Pulsing opacity
      const pulseOpacity = particle.opacity + Math.sin(particle.pulse) * 0.2;

      // Draw particle
      this.cosmicCtx.beginPath();
      this.cosmicCtx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      
      const color = isDark ? `rgba(255, 127, 179, ${pulseOpacity})` : `rgba(192, 81, 138, ${pulseOpacity})`;
      this.cosmicCtx.fillStyle = color;
      this.cosmicCtx.fill();

      // Glow effect
      this.cosmicCtx.beginPath();
      this.cosmicCtx.arc(particle.x, particle.y, particle.radius * 3, 0, Math.PI * 2);
      const glowColor = isDark ? `rgba(255, 127, 179, ${pulseOpacity * 0.15})` : `rgba(192, 81, 138, ${pulseOpacity * 0.1})`;
      this.cosmicCtx.fillStyle = glowColor;
      this.cosmicCtx.fill();
    });

    requestAnimationFrame(() => this.animateCosmicCanvas());
  }

  // Hero 3D Scene with Three.js
  initHero3D() {
    const container = document.getElementById('hero-3d-container');
    if (!container || typeof THREE === 'undefined') {
      this.createFallbackHero(container);
      return;
    }

    try {
      // Scene setup
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      container.appendChild(renderer.domElement);

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
      scene.add(ambientLight);

      const pointLight1 = new THREE.PointLight(0xff7fb3, 1, 100);
      pointLight1.position.set(5, 5, 5);
      scene.add(pointLight1);

      const pointLight2 = new THREE.PointLight(0xc0518a, 0.8, 100);
      pointLight2.position.set(-5, -5, 5);
      scene.add(pointLight2);

      // Create keychain group
      const keychainGroup = new THREE.Group();

      // Keychain ring (torus)
      const ringGeometry = new THREE.TorusGeometry(1.5, 0.15, 16, 100);
      const ringMaterial = new THREE.MeshStandardMaterial({
        color: 0xffd700,
        metalness: 0.9,
        roughness: 0.1
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.rotation.x = Math.PI / 2;
      ring.position.y = 2.5;
      keychainGroup.add(ring);

      // Chain links
      for (let i = 0; i < 4; i++) {
        const linkGeometry = new THREE.TorusGeometry(0.2, 0.05, 8, 16);
        const linkMaterial = new THREE.MeshStandardMaterial({
          color: 0xffd700,
          metalness: 0.8,
          roughness: 0.2
        });
        const link = new THREE.Mesh(linkGeometry, linkMaterial);
        link.position.y = 2 - i * 0.4;
        link.rotation.x = i % 2 === 0 ? 0 : Math.PI / 2;
        keychainGroup.add(link);
      }

      // Main pendant (icosahedron for crystal look)
      const pendantGeometry = new THREE.IcosahedronGeometry(1.5, 0);
      const pendantMaterial = new THREE.MeshStandardMaterial({
        color: 0xff7fb3,
        metalness: 0.3,
        roughness: 0.1,
        transparent: true,
        opacity: 0.9
      });
      const pendant = new THREE.Mesh(pendantGeometry, pendantMaterial);
      pendant.position.y = -0.5;
      keychainGroup.add(pendant);

      // Inner glow sphere
      const glowGeometry = new THREE.SphereGeometry(0.8, 32, 32);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.3
      });
      const glow = new THREE.Mesh(glowGeometry, glowMaterial);
      glow.position.y = -0.5;
      keychainGroup.add(glow);

      // Add small decorative spheres
      const colors = [0xff7fb3, 0xffd700, 0xc0518a, 0xffb8db];
      for (let i = 0; i < 8; i++) {
        const sphereGeometry = new THREE.SphereGeometry(0.15, 16, 16);
        const sphereMaterial = new THREE.MeshStandardMaterial({
          color: colors[i % colors.length],
          metalness: 0.5,
          roughness: 0.3
        });
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        const angle = (i / 8) * Math.PI * 2;
        const radius = 2.5;
        sphere.position.set(
          Math.cos(angle) * radius,
          Math.sin(angle) * 1.5 - 0.5,
          Math.sin(angle) * radius
        );
        keychainGroup.add(sphere);
      }

      scene.add(keychainGroup);
      camera.position.z = 7;

      // Store for animation
      this.scenes.hero = { scene, camera, renderer, keychainGroup, pendant, glow };

      // Mouse interaction
      let mouseX = 0, mouseY = 0;
      container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      });

      this.heroMouseX = mouseX;
      this.heroMouseY = mouseY;

      // Handle resize
      window.addEventListener('resize', () => {
        if (!container.clientWidth) return;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      });

    } catch (error) {
      console.warn('Three.js initialization failed, using fallback:', error);
      this.createFallbackHero(container);
    }
  }

  createFallbackHero(container) {
    if (!container) return;
    
    container.innerHTML = `
      <div class="fallback-hero-3d">
        <div class="fallback-keychain">
          <div class="keychain-ring"></div>
          <div class="keychain-chain"></div>
          <div class="keychain-pendant">
            <span>🔑</span>
          </div>
        </div>
      </div>
    `;

    // Add fallback styles
    const style = document.createElement('style');
    style.textContent = `
      .fallback-hero-3d {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        perspective: 1000px;
      }
      .fallback-keychain {
        display: flex;
        flex-direction: column;
        align-items: center;
        animation: floatKeychain 4s ease-in-out infinite;
        transform-style: preserve-3d;
      }
      .keychain-ring {
        width: 80px;
        height: 80px;
        border: 8px solid #ffd700;
        border-radius: 50%;
        box-shadow: 0 0 30px rgba(255, 215, 0, 0.5);
      }
      .keychain-chain {
        width: 4px;
        height: 60px;
        background: linear-gradient(to bottom, #ffd700, #ffd700 10px, transparent 10px, transparent 20px);
        background-size: 4px 20px;
      }
      .keychain-pendant {
        width: 150px;
        height: 150px;
        background: linear-gradient(135deg, #ff7fb3, #c0518a);
        border-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 20px 60px rgba(192, 81, 138, 0.5);
        transform: rotateY(0deg);
        animation: rotatePendant 8s ease-in-out infinite;
      }
      .keychain-pendant span {
        font-size: 4rem;
      }
      @keyframes floatKeychain {
        0%, 100% { transform: translateY(0) rotateX(5deg); }
        50% { transform: translateY(-20px) rotateX(-5deg); }
      }
      @keyframes rotatePendant {
        0%, 100% { transform: rotateY(-15deg) rotateX(5deg); }
        50% { transform: rotateY(15deg) rotateX(-5deg); }
      }
    `;
    document.head.appendChild(style);
  }

  // Product viewer for quick view modal
  initProductViewer() {
    const container = document.getElementById('product-3d-viewer');
    if (!container || typeof THREE === 'undefined') return;

    // Will be initialized when quick view opens
    this.productViewerContainer = container;
  }

  createProductViewer(productId) {
    const container = this.productViewerContainer;
    if (!container || typeof THREE === 'undefined') return;

    // Clear previous
    container.innerHTML = '';

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Create keychain based on productId
    const colors = {
      1: 0x9333ea, // Nebula - purple
      2: 0xffc0cb, // Cherry Blossom - pink
      3: 0xffd700, // Golden Hour - gold
      4: 0x00ff88, // Aurora - green
      5: 0x0088ff, // Ocean Wave - blue
      6: 0xffffff  // Diamond Dust - white
    };

    const color = colors[productId] || 0xff7fb3;

    // Create keychain
    const group = new THREE.Group();

    // Ring
    const ringGeometry = new THREE.TorusGeometry(0.8, 0.08, 16, 50);
    const ringMaterial = new THREE.MeshStandardMaterial({
      color: 0xffd700,
      metalness: 0.9,
      roughness: 0.1
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 1.5;
    group.add(ring);

    // Pendant
    const pendantGeometry = new THREE.DodecahedronGeometry(1, 0);
    const pendantMaterial = new THREE.MeshStandardMaterial({
      color: color,
      metalness: 0.4,
      roughness: 0.2,
      transparent: true,
      opacity: 0.85
    });
    const pendant = new THREE.Mesh(pendantGeometry, pendantMaterial);
    group.add(pendant);

    scene.add(group);
    camera.position.z = 4;

    // Mouse drag rotation
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    container.addEventListener('mousedown', () => isDragging = true);
    container.addEventListener('mouseup', () => isDragging = false);
    container.addEventListener('mouseleave', () => isDragging = false);
    container.addEventListener('mousemove', (e) => {
      if (isDragging) {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;
        group.rotation.y += deltaX * 0.01;
        group.rotation.x += deltaY * 0.01;
      }
      previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    // Touch support
    container.addEventListener('touchstart', (e) => {
      isDragging = true;
      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    });
    container.addEventListener('touchend', () => isDragging = false);
    container.addEventListener('touchmove', (e) => {
      if (isDragging) {
        const deltaX = e.touches[0].clientX - previousMousePosition.x;
        const deltaY = e.touches[0].clientY - previousMousePosition.y;
        group.rotation.y += deltaX * 0.01;
        group.rotation.x += deltaY * 0.01;
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    });

    this.scenes.product = { scene, camera, renderer, group };
  }

  // Animation loop
  animate() {
    this.animationFrameId = requestAnimationFrame(() => this.animate());

    // Animate hero scene
    if (this.scenes.hero) {
      const { scene, camera, renderer, keychainGroup, pendant, glow } = this.scenes.hero;
      
      // Gentle rotation
      keychainGroup.rotation.y += 0.005;
      
      // Floating motion
      const time = Date.now() * 0.001;
      keychainGroup.position.y = Math.sin(time) * 0.3;
      
      // Pulse glow
      if (glow) {
        glow.scale.setScalar(1 + Math.sin(time * 2) * 0.1);
      }

      renderer.render(scene, camera);
    }

    // Animate product viewer
    if (this.scenes.product) {
      const { scene, camera, renderer, group } = this.scenes.product;
      
      // Auto rotation when not dragging
      group.rotation.y += 0.003;
      
      renderer.render(scene, camera);
    }
  }

  // Cleanup
  destroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    
    Object.values(this.scenes).forEach(sceneData => {
      if (sceneData.renderer) {
        sceneData.renderer.dispose();
      }
    });
  }
}

// Initialize when DOM is ready
let lumipuchi3D;

document.addEventListener('DOMContentLoaded', () => {
  lumipuchi3D = new Lumipuchi3D();
});

// Export for use in other scripts
window.Lumipuchi3D = Lumipuchi3D;
window.lumipuchi3D = lumipuchi3D;
