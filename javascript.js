// ... código anterior de luces y escena ...

// Cargar el modelo 3D en lugar de generarlo
const loader = new THREE.GLTFLoader();
let burgerModel; // variable para guardar el modelo

loader.load(
  '3d/burger.gltf', // <-- Cambia esto por la ruta real de tu archivo
  (gltf) => {
    burgerModel = gltf.scene;
    
    // Ajustes de escala y posición (puedes modificarlos según necesites)
    burgerModel.scale.set(1, 1, 1);
    burgerModel.position.set(0, -0.3, 0);
    
    // Habilitar sombras en todos los hijos del modelo
    burgerModel.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    
    scene.add(burgerModel);
    console.log('✅ Modelo 3D cargado correctamente');
  },
  (progress) => {
    // Opcional: muestra progreso de carga del modelo
    console.log(`Cargando modelo: ${(progress.loaded / progress.total * 100).toFixed(0)}%`);
  },
  (error) => {
    console.error('❌ Error al cargar el modelo:', error);
    // Si falla, puedes dejar un cubo de respaldo o la hamburguesa procedural
  }
);

// La variable burgerGroup ya no existe, así que debemos actualizar las referencias
// en la animación. Usaremos la variable burgerModel en su lugar.

// ... (las partículas y el plano de sombra siguen igual) ...

// En la función animate(), reemplaza burgerGroup por burgerModel:
function animate() {
  requestAnimationFrame(animate);
  // ...
  if (burgerModel) {
    burgerModel.rotation.y = baseRotationY + interactionX;
    burgerModel.rotation.x = interactionY;
    burgerModel.position.y = Math.sin(time * 1.3) * 0.12;
  }
  // ...
}