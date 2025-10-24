// 3D Room Implementation with Three.js
class Room3D {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.room = null;
        this.switches = [];
        this.lights = [];
        this.lightStates = {
            main: false,
            bedside: false,
            desk: false
        };
        this.isInitialized = false;
        
        this.init();
    }

    init() {
        if (!window.THREE) {
            console.error('Three.js not loaded');
            return;
        }
        
        this.setupScene();
        this.createRoom();
        this.createSwitches();
        this.createLights();
        this.setupControls();
        this.animate();
        this.isInitialized = true;
        
        console.log('3D Room initialized');
    }

    setupScene() {
        const canvas = document.getElementById('room3d-canvas');
        if (!canvas) return;

        // Scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x0f172a);

        // Camera
        this.camera = new THREE.PerspectiveCamera(
            75,
            canvas.offsetWidth / canvas.offsetHeight,
            0.1,
            1000
        );
        this.camera.position.set(0, 2, 5);

        // Renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        canvas.appendChild(this.renderer.domElement);

        // Handle resize
        window.addEventListener('resize', () => this.onWindowResize());
    }

    createRoom() {
        const roomGroup = new THREE.Group();

        // Room dimensions
        const width = 8;
        const height = 3;
        const depth = 6;

        // Floor
        const floorGeometry = new THREE.PlaneGeometry(width, depth);
        const floorMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x8b7355,
            side: THREE.DoubleSide
        });
        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.rotation.x = -Math.PI / 2;
        floor.receiveShadow = true;
        roomGroup.add(floor);

        // Ceiling
        const ceilingGeometry = new THREE.PlaneGeometry(width, depth);
        const ceilingMaterial = new THREE.MeshLambertMaterial({ 
            color: 0xf5f5f5,
            side: THREE.DoubleSide
        });
        const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
        ceiling.rotation.x = Math.PI / 2;
        ceiling.position.y = height;
        roomGroup.add(ceiling);

        // Walls
        const wallMaterial = new THREE.MeshLambertMaterial({ color: 0xe8e8e8 });

        // Back wall
        const backWallGeometry = new THREE.PlaneGeometry(width, height);
        const backWall = new THREE.Mesh(backWallGeometry, wallMaterial);
        backWall.position.set(0, height / 2, -depth / 2);
        roomGroup.add(backWall);

        // Left wall
        const leftWallGeometry = new THREE.PlaneGeometry(depth, height);
        const leftWall = new THREE.Mesh(leftWallGeometry, wallMaterial);
        leftWall.rotation.y = Math.PI / 2;
        leftWall.position.set(-width / 2, height / 2, 0);
        roomGroup.add(leftWall);

        // Right wall
        const rightWallGeometry = new THREE.PlaneGeometry(depth, height);
        const rightWall = new THREE.Mesh(rightWallGeometry, wallMaterial);
        rightWall.rotation.y = -Math.PI / 2;
        rightWall.position.set(width / 2, height / 2, 0);
        roomGroup.add(rightWall);

        // Add furniture
        this.addFurniture(roomGroup);

        this.room = roomGroup;
        this.scene.add(roomGroup);
    }

    addFurniture(roomGroup) {
        // Bed
        const bedGeometry = new THREE.BoxGeometry(2, 0.5, 3);
        const bedMaterial = new THREE.MeshLambertMaterial({ color: 0x4a5568 });
        const bed = new THREE.Mesh(bedGeometry, bedMaterial);
        bed.position.set(-2, 0.25, 1);
        bed.castShadow = true;
        roomGroup.add(bed);

        // Desk
        const deskGeometry = new THREE.BoxGeometry(1.5, 0.8, 0.8);
        const deskMaterial = new THREE.MeshLambertMaterial({ color: 0x8b4513 });
        const desk = new THREE.Mesh(deskGeometry, deskMaterial);
        desk.position.set(2, 0.4, -1);
        desk.castShadow = true;
        roomGroup.add(desk);

        // Nightstand
        const nightstandGeometry = new THREE.BoxGeometry(0.6, 0.6, 0.6);
        const nightstandMaterial = new THREE.MeshLambertMaterial({ color: 0x8b4513 });
        const nightstand = new THREE.Mesh(nightstandGeometry, nightstandMaterial);
        nightstand.position.set(-2.8, 0.3, 2.2);
        nightstand.castShadow = true;
        roomGroup.add(nightstand);

        // Lamp on nightstand
        const lampBaseGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.3);
        const lampBaseMaterial = new THREE.MeshLambertMaterial({ color: 0x2d3748 });
        const lampBase = new THREE.Mesh(lampBaseGeometry, lampBaseMaterial);
        lampBase.position.set(-2.8, 0.6, 2.2);
        lampBase.castShadow = true;
        roomGroup.add(lampBase);

        const lampShadeGeometry = new THREE.ConeGeometry(0.2, 0.3);
        const lampShadeMaterial = new THREE.MeshLambertMaterial({ color: 0xf7fafc });
        const lampShade = new THREE.Mesh(lampShadeGeometry, lampShadeMaterial);
        lampShade.position.set(-2.8, 0.9, 2.2);
        lampShade.castShadow = true;
        roomGroup.add(lampShade);
    }

    createSwitches() {
        const switchMaterial = new THREE.MeshLambertMaterial({ color: 0x2d3748 });
        const switchGeometry = new THREE.BoxGeometry(0.1, 0.2, 0.05);

        // Main light switch (back wall)
        const mainSwitch = new THREE.Mesh(switchGeometry, switchMaterial);
        mainSwitch.position.set(0, 1.5, -2.95);
        mainSwitch.userData = { type: 'main', id: 'main' };
        mainSwitch.castShadow = true;
        this.scene.add(mainSwitch);
        this.switches.push(mainSwitch);

        // Bedside lamp switch (left wall)
        const bedsideSwitch = new THREE.Mesh(switchGeometry, switchMaterial);
        bedsideSwitch.position.set(-3.95, 1.2, 0);
        bedsideSwitch.userData = { type: 'bedside', id: 'bedside' };
        bedsideSwitch.castShadow = true;
        this.scene.add(bedsideSwitch);
        this.switches.push(bedsideSwitch);

        // Desk lamp switch (right wall)
        const deskSwitch = new THREE.Mesh(switchGeometry, switchMaterial);
        deskSwitch.position.set(3.95, 1.2, 0);
        deskSwitch.userData = { type: 'desk', id: 'desk' };
        deskSwitch.castShadow = true;
        this.scene.add(deskSwitch);
        this.switches.push(deskSwitch);
    }

    createLights() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
        this.scene.add(ambientLight);
        this.lights.push(ambientLight);

        // Main ceiling light
        const mainLight = new THREE.PointLight(0xffffff, 0, 100);
        mainLight.position.set(0, 2.8, 0);
        mainLight.castShadow = true;
        mainLight.shadow.mapSize.width = 1024;
        mainLight.shadow.mapSize.height = 1024;
        this.scene.add(mainLight);
        this.lights.push(mainLight);

        // Bedside lamp light
        const bedsideLight = new THREE.PointLight(0xfff8dc, 0, 50);
        bedsideLight.position.set(-2.8, 1.2, 2.2);
        bedsideLight.castShadow = true;
        this.scene.add(bedsideLight);
        this.lights.push(bedsideLight);

        // Desk lamp light
        const deskLight = new THREE.PointLight(0xffffff, 0, 50);
        deskLight.position.set(2, 1.2, -1);
        deskLight.castShadow = true;
        this.scene.add(deskLight);
        this.lights.push(deskLight);
    }

    setupControls() {
        const canvas = this.renderer.domElement;
        let isMouseDown = false;
        let mouseX = 0;
        let mouseY = 0;
        let targetRotationX = 0;
        let targetRotationY = 0;
        let rotationX = 0;
        let rotationY = 0;

        // Mouse controls
        canvas.addEventListener('mousedown', (event) => {
            isMouseDown = true;
            mouseX = event.clientX;
            mouseY = event.clientY;
        });

        canvas.addEventListener('mousemove', (event) => {
            if (!isMouseDown) return;

            const deltaX = event.clientX - mouseX;
            const deltaY = event.clientY - mouseY;

            targetRotationY += deltaX * 0.01;
            targetRotationX += deltaY * 0.01;

            mouseX = event.clientX;
            mouseY = event.clientY;
        });

        canvas.addEventListener('mouseup', () => {
            isMouseDown = false;
        });

        // Touch controls for mobile
        canvas.addEventListener('touchstart', (event) => {
            event.preventDefault();
            isMouseDown = true;
            mouseX = event.touches[0].clientX;
            mouseY = event.touches[0].clientY;
        });

        canvas.addEventListener('touchmove', (event) => {
            event.preventDefault();
            if (!isMouseDown) return;

            const deltaX = event.touches[0].clientX - mouseX;
            const deltaY = event.touches[0].clientY - mouseY;

            targetRotationY += deltaX * 0.01;
            targetRotationX += deltaY * 0.01;

            mouseX = event.touches[0].clientX;
            mouseY = event.touches[0].clientY;
        });

        canvas.addEventListener('touchend', () => {
            isMouseDown = false;
        });

        // Zoom controls
        canvas.addEventListener('wheel', (event) => {
            event.preventDefault();
            this.camera.position.z += event.deltaY * 0.01;
            this.camera.position.z = Math.max(2, Math.min(10, this.camera.position.z));
        });

        // Click detection for switches
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        canvas.addEventListener('click', (event) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

            raycaster.setFromCamera(mouse, this.camera);
            const intersects = raycaster.intersectObjects(this.switches);

            if (intersects.length > 0) {
                const switchObj = intersects[0].object;
                this.toggleSwitch(switchObj.userData.id);
            }
        });

        // Smooth camera rotation
        const animateCamera = () => {
            rotationX += (targetRotationX - rotationX) * 0.1;
            rotationY += (targetRotationY - rotationY) * 0.1;

            this.camera.position.x = Math.sin(rotationY) * 5;
            this.camera.position.z = Math.cos(rotationY) * 5;
            this.camera.position.y = 2 + Math.sin(rotationX) * 2;
            this.camera.lookAt(0, 0, 0);

            requestAnimationFrame(animateCamera);
        };
        animateCamera();
    }

    toggleSwitch(switchId) {
        this.lightStates[switchId] = !this.lightStates[switchId];
        
        // Update lights
        if (switchId === 'main') {
            this.lights[1].intensity = this.lightStates[switchId] ? 1 : 0;
        } else if (switchId === 'bedside') {
            this.lights[2].intensity = this.lightStates[switchId] ? 0.8 : 0;
        } else if (switchId === 'desk') {
            this.lights[3].intensity = this.lightStates[switchId] ? 0.8 : 0;
        }

        // Update UI
        this.updateLightUI(switchId, this.lightStates[switchId]);
        
        // Update stats
        this.updateRoomStats();

        // Send to backend
        this.sendSwitchState(switchId, this.lightStates[switchId]);
    }

    updateLightUI(switchId, isOn) {
        const lightItem = document.getElementById(`light-${switchId}`);
        if (lightItem) {
            const indicator = lightItem.querySelector('.light-indicator');
            indicator.className = `light-indicator ${isOn ? 'on' : 'off'}`;
        }
    }

    updateRoomStats() {
        const lightsOnCount = Object.values(this.lightStates).filter(state => state).length;
        const powerUsage = lightsOnCount * 60; // 60W per light

        document.getElementById('lights-on-count').textContent = lightsOnCount;
        document.getElementById('power-usage').textContent = `${powerUsage}W`;
    }

    async sendSwitchState(switchId, state) {
        try {
            const response = await fetch('/api/room/toggle', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    switch_id: switchId,
                    state: state
                })
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Switch state updated:', data);
            }
        } catch (error) {
            console.error('Failed to update switch state:', error);
        }
    }

    onWindowResize() {
        const canvas = document.getElementById('room3d-canvas');
        if (!canvas) return;

        this.camera.aspect = canvas.offsetWidth / canvas.offsetHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.renderer.render(this.scene, this.camera);
    }

    destroy() {
        if (this.renderer) {
            this.renderer.dispose();
        }
        this.isInitialized = false;
    }
}

// Initialize 3D room when the section comes into view
let room3DInstance = null;

function initRoom3D() {
    if (room3DInstance) return;
    
    const roomSection = document.getElementById('room3d');
    if (!roomSection) return;

    // Check if Three.js is loaded
    if (typeof THREE === 'undefined') {
        console.error('Three.js not loaded');
        return;
    }

    room3DInstance = new Room3D();
}

// Intersection Observer to initialize 3D room when visible
const roomObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !room3DInstance) {
            initRoom3D();
        }
    });
}, { threshold: 0.1 });

// Start observing when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const roomSection = document.getElementById('room3d');
    if (roomSection) {
        roomObserver.observe(roomSection);
    }
});

// Export for global access
window.Room3D = Room3D;
window.room3DInstance = room3DInstance;
