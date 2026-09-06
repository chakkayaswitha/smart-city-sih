import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// ============================================================
// SMART CITY - PROFESSIONAL 3D ROOM PLANNER
// SIH PRESENTATION VERSION
// ============================================================

let scene;
let camera;
let renderer;
let controls;

let roomGroup;
let furnitureGroup;
let architectureGroup;

let floorMesh;
let backWall;
let leftWall;
let rightWall;
let ceilingMesh;

let designerInitialized = false;

let selectedFurniture = null;
let isDraggingFurniture = false;

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

const dragPlane = new THREE.Plane(
  new THREE.Vector3(0, 1, 0),
  0
);

const dragPoint = new THREE.Vector3();

let currentWallColor = "#F1EEE8";
let currentFloorColor = "#C8A77A";
let currentCeilingColor = "#FFFFFF";

let ambientLight;
let mainLight;
let fillLight;


// ============================================================
// OPEN DESIGNER
// ============================================================

export function openDesigner3D() {

  const designer =
    document.getElementById("designer3d");

  if (!designer) {
    console.error("3D Designer popup not found.");
    return;
  }

  designer.classList.add("active");

  if (!designerInitialized) {
    initDesigner();
  }

  setTimeout(() => {
    resizeDesigner();
  }, 150);
}


// ============================================================
// CLOSE DESIGNER
// ============================================================

export function closeDesigner3D() {

  const designer =
    document.getElementById("designer3d");

  if (designer) {
    designer.classList.remove("active");
  }

  selectedFurniture = null;
  isDraggingFurniture = false;

  if (controls) {
    controls.enabled = true;
  }
}


// ============================================================
// INITIALIZE
// ============================================================

function initDesigner() {

  const canvas =
    document.getElementById("designerCanvas");

  if (!canvas) {
    console.error("designerCanvas not found.");
    return;
  }

  designerInitialized = true;


  // ========================================================
  // SCENE
  // ========================================================

  scene =
    new THREE.Scene();

  scene.background =
    new THREE.Color("#E8EDF0");


  // ========================================================
  // CAMERA
  // ========================================================

  camera =
    new THREE.PerspectiveCamera(
      48,
      1,
      0.1,
      1000
    );

  camera.position.set(
    10,
    7.5,
    13
  );


  // ========================================================
  // RENDERER
  // ========================================================

  renderer =
    new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false
    });

  renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
  );

  renderer.shadowMap.enabled = true;

  renderer.shadowMap.type =
    THREE.PCFSoftShadowMap;

  renderer.outputColorSpace =
    THREE.SRGBColorSpace;

  renderer.toneMapping =
    THREE.ACESFilmicToneMapping;

  renderer.toneMappingExposure =
    1.15;


  // ========================================================
  // ORBIT CONTROLS
  // ========================================================

  controls =
    new OrbitControls(
      camera,
      renderer.domElement
    );

  controls.enableRotate = true;
  controls.enableZoom = true;
  controls.enablePan = true;

  controls.enableDamping = true;

  controls.dampingFactor = 0.07;

  controls.rotateSpeed = 0.7;
  controls.zoomSpeed = 0.9;
  controls.panSpeed = 0.7;

  controls.minDistance = 5;
  controls.maxDistance = 28;

  controls.minPolarAngle = 0.35;

  controls.maxPolarAngle =
    Math.PI / 2.02;

  controls.target.set(
    0,
    2.3,
    0
  );

  controls.update();


  // ========================================================
  // LIGHTING
  // ========================================================

  ambientLight =
    new THREE.HemisphereLight(
      0xffffff,
      0x8a8a8a,
      2.2
    );

  scene.add(
    ambientLight
  );


  mainLight =
    new THREE.DirectionalLight(
      0xffffff,
      3.5
    );

  mainLight.position.set(
    4,
    11,
    7
  );

  mainLight.castShadow = true;

  mainLight.shadow.mapSize.width =
    2048;

  mainLight.shadow.mapSize.height =
    2048;

  mainLight.shadow.camera.left = -10;
  mainLight.shadow.camera.right = 10;
  mainLight.shadow.camera.top = 10;
  mainLight.shadow.camera.bottom = -10;

  scene.add(
    mainLight
  );


  fillLight =
    new THREE.DirectionalLight(
      0xddeeff,
      1.2
    );

  fillLight.position.set(
    -7,
    6,
    5
  );

  scene.add(
    fillLight
  );


  // ========================================================
  // GROUPS
  // ========================================================

  roomGroup =
    new THREE.Group();

  architectureGroup =
    new THREE.Group();

  furnitureGroup =
    new THREE.Group();

  roomGroup.add(
    architectureGroup
  );

  roomGroup.add(
    furnitureGroup
  );

  scene.add(
    roomGroup
  );


  // ========================================================
  // CREATE ROOM
  // ========================================================

  createProfessionalRoom();


  // IMPORTANT
  // NO DEFAULT FURNITURE.
  //
  // The room starts EMPTY.
  // Furniture appears only after clicking
  // the corresponding button.
  // ========================================================


  // ========================================================
  // POINTER EVENTS
  // ========================================================

  canvas.addEventListener(
    "pointerdown",
    onPointerDown
  );

  canvas.addEventListener(
    "pointermove",
    onPointerMove
  );

  canvas.addEventListener(
    "pointerup",
    onPointerUp
  );

  canvas.addEventListener(
    "pointercancel",
    onPointerUp
  );


  // ========================================================
  // KEYBOARD
  // ========================================================

  window.addEventListener(
    "keydown",
    onKeyDown
  );


  // ========================================================
  // RESIZE
  // ========================================================

  window.addEventListener(
    "resize",
    resizeDesigner
  );

  resizeDesigner();


  // ========================================================
  // START RENDER LOOP
  // ========================================================

  animate();
}


// ============================================================
// PROFESSIONAL ROOM
// ============================================================

function createProfessionalRoom() {

  // ========================================================
  // FLOOR
  // ========================================================

  const floorGeometry =
    new THREE.BoxGeometry(
      14,
      0.25,
      12
    );

  const floorMaterial =
    new THREE.MeshStandardMaterial({

      color:
        currentFloorColor,

      roughness: 0.62,

      metalness: 0.05

    });

  floorMesh =
    new THREE.Mesh(
      floorGeometry,
      floorMaterial
    );

  floorMesh.position.y =
    -0.125;

  floorMesh.receiveShadow = true;

  architectureGroup.add(
    floorMesh
  );


  // ========================================================
  // FLOOR BORDER
  // ========================================================

  createFloorBorder();


  // ========================================================
  // WALL MATERIAL
  // ========================================================

  const wallMaterial =
    new THREE.MeshStandardMaterial({

      color:
        currentWallColor,

      roughness: 0.82,

      metalness: 0

    });


  // ========================================================
  // BACK WALL
  // ========================================================

  const backGeometry =
    new THREE.BoxGeometry(
      14,
      7,
      0.25
    );

  backWall =
    new THREE.Mesh(
      backGeometry,
      wallMaterial.clone()
    );

  backWall.position.set(
    0,
    3.5,
    -6
  );

  backWall.receiveShadow = true;

  architectureGroup.add(
    backWall
  );


  // ========================================================
  // LEFT WALL
  // ========================================================

  const sideGeometry =
    new THREE.BoxGeometry(
      0.25,
      7,
      12
    );

  leftWall =
    new THREE.Mesh(
      sideGeometry,
      wallMaterial.clone()
    );

  leftWall.position.set(
    -7,
    3.5,
    0
  );

  leftWall.receiveShadow = true;

  architectureGroup.add(
    leftWall
  );


  // ========================================================
  // RIGHT WALL
  // ========================================================

  rightWall =
    new THREE.Mesh(
      sideGeometry,
      wallMaterial.clone()
    );

  rightWall.position.set(
    7,
    3.5,
    0
  );

  rightWall.receiveShadow = true;

  architectureGroup.add(
    rightWall
  );


  // ========================================================
  // CEILING
  // ========================================================

  const ceilingGeometry =
    new THREE.BoxGeometry(
      14,
      0.2,
      12
    );

  const ceilingMaterial =
    new THREE.MeshStandardMaterial({

      color:
        currentCeilingColor,

      roughness: 1

    });

  ceilingMesh =
    new THREE.Mesh(
      ceilingGeometry,
      ceilingMaterial
    );

  ceilingMesh.position.y =
    7;

  architectureGroup.add(
    ceilingMesh
  );


  // ========================================================
  // WINDOW
  // ========================================================

  createWindow();


  // ========================================================
  // DOOR
  // ========================================================

  createDoor();


  // ========================================================
  // CEILING LIGHT
  // ========================================================

  createCeilingLight();
}


// ============================================================
// FLOOR BORDER
// ============================================================

function createFloorBorder() {

  const borderMaterial =
    new THREE.MeshStandardMaterial({

      color: "#8B7355",

      roughness: 0.6

    });


  const pieces = [

    {
      size: [14, 0.12, 0.12],
      pos: [0, 0.03, -5.85]
    },

    {
      size: [14, 0.12, 0.12],
      pos: [0, 0.03, 5.85]
    },

    {
      size: [0.12, 0.12, 11.7],
      pos: [-6.85, 0.03, 0]
    },

    {
      size: [0.12, 0.12, 11.7],
      pos: [6.85, 0.03, 0]
    }

  ];


  pieces.forEach(
    item => {

      const mesh =
        new THREE.Mesh(

          new THREE.BoxGeometry(
            item.size[0],
            item.size[1],
            item.size[2]
          ),

          borderMaterial

        );

      mesh.position.set(
        item.pos[0],
        item.pos[1],
        item.pos[2]
      );

      architectureGroup.add(
        mesh
      );

    }
  );
}


// ============================================================
// WINDOW
// ============================================================

function createWindow() {

  const frameMaterial =
    new THREE.MeshStandardMaterial({

      color: "#FFFFFF",

      roughness: 0.35,

      metalness: 0.15

    });


  const glassMaterial =
    new THREE.MeshPhysicalMaterial({

      color: "#8EC9E8",

      transparent: true,

      opacity: 0.48,

      roughness: 0.08,

      metalness: 0.05

    });


  // Outer frame

  const frame =
    new THREE.Group();


  const frameTop =
    new THREE.Mesh(

      new THREE.BoxGeometry(
        4.4,
        0.18,
        0.18
      ),

      frameMaterial

    );

  frameTop.position.y = 2.2;

  frame.add(frameTop);


  const frameBottom =
    frameTop.clone();

  frameBottom.position.y = -2.2;

  frame.add(frameBottom);


  const frameLeft =
    new THREE.Mesh(

      new THREE.BoxGeometry(
        0.18,
        4.5,
        0.18
      ),

      frameMaterial

    );

  frameLeft.position.x = -2.2;

  frame.add(frameLeft);


  const frameRight =
    frameLeft.clone();

  frameRight.position.x = 2.2;

  frame.add(frameRight);


  // Glass

  const glass =
    new THREE.Mesh(

      new THREE.BoxGeometry(
        4.2,
        4.2,
        0.06
      ),

      glassMaterial

    );

  glass.position.z =
    0.02;

  frame.add(glass);


  // Center bars

  const verticalBar =
    new THREE.Mesh(

      new THREE.BoxGeometry(
        0.1,
        4.2,
        0.12
      ),

      frameMaterial

    );

  frame.add(
    verticalBar
  );


  const horizontalBar =
    new THREE.Mesh(

      new THREE.BoxGeometry(
        4.2,
        0.1,
        0.12
      ),

      frameMaterial

    );

  frame.add(
    horizontalBar
  );


  frame.position.set(
    -2.5,
    3.7,
    -5.82
  );

  architectureGroup.add(
    frame
  );
}


// ============================================================
// DOOR
// ============================================================

function createDoor() {

  const doorGroup =
    new THREE.Group();


  const doorMaterial =
    new THREE.MeshStandardMaterial({

      color: "#6B4B36",

      roughness: 0.7

    });


  const door =
    new THREE.Mesh(

      new THREE.BoxGeometry(
        2.2,
        4.7,
        0.16
      ),

      doorMaterial

    );

  door.position.y =
    2.35;

  doorGroup.add(
    door
  );


  const handle =
    new THREE.Mesh(

      new THREE.SphereGeometry(
        0.09,
        16,
        16
      ),

      new THREE.MeshStandardMaterial({

        color: "#D6A84F",

        metalness: 0.75,

        roughness: 0.25

      })

    );

  handle.position.set(
    0.65,
    2.3,
    -0.15
  );

  doorGroup.add(
    handle
  );


  doorGroup.position.set(
    4.5,
    0,
    -5.8
  );

  architectureGroup.add(
    doorGroup
  );
}


// ============================================================
// CEILING LIGHT
// ============================================================

function createCeilingLight() {

  const lightFixture =
    new THREE.Mesh(

      new THREE.CylinderGeometry(
        0.5,
        0.5,
        0.12,
        32
      ),

      new THREE.MeshStandardMaterial({

        color: "#FFFFFF",

        roughness: 0.25,

        metalness: 0.1

      })

    );

  lightFixture.position.set(
    0,
    6.85,
    0
  );

  architectureGroup.add(
    lightFixture
  );


  const pointLight =
    new THREE.PointLight(
      0xfff3dc,
      1.8,
      15
    );

  pointLight.position.set(
    0,
    6.5,
    0
  );

  architectureGroup.add(
    pointLight
  );
}


// ============================================================
// MATERIAL HELPER
// ============================================================

function createMaterial(
  color,
  roughness = 0.7,
  metalness = 0
) {

  return new THREE.MeshStandardMaterial({

    color,

    roughness,

    metalness

  });
}


// ============================================================
// ADD SOFA
// ============================================================

export function addSofa() {

  const group =
    new THREE.Group();

  group.userData.isFurniture = true;

  group.userData.name =
    "Sofa";


  const sofaMaterial =
    createMaterial(
      "#4B5563",
      0.8
    );


  // Seat

  const seat =
    new THREE.Mesh(

      new THREE.BoxGeometry(
        3.4,
        0.55,
        1.45
      ),

      sofaMaterial

    );

  seat.position.y =
    0.7;

  seat.castShadow = true;

  group.add(
    seat
  );


  // Back

  const back =
    new THREE.Mesh(

      new THREE.BoxGeometry(
        3.4,
        1.5,
        0.35
      ),

      sofaMaterial

    );

  back.position.set(
    0,
    1.55,
    -0.55
  );

  back.castShadow = true;

  group.add(
    back
  );


  // Arms

  [-1.5, 1.5].forEach(
    x => {

      const arm =
        new THREE.Mesh(

          new THREE.BoxGeometry(
            0.4,
            1,
            1.45
          ),

          sofaMaterial

        );

      arm.position.set(
        x,
        1.05,
        0
      );

      arm.castShadow = true;

      group.add(
        arm
      );
    }
  );


  // Cushions

  const cushionMaterial =
    createMaterial(
      "#6B7280",
      0.9
    );


  [-0.85, 0, 0.85].forEach(
    x => {

      const cushion =
        new THREE.Mesh(

          new THREE.BoxGeometry(
            0.85,
            0.18,
            0.9
          ),

          cushionMaterial

        );

      cushion.position.set(
        x,
        1.02,
        -0.05
      );

      group.add(
        cushion
      );

    }
  );


  group.position.set(
    -3.5,
    0,
    2.5
  );


  furnitureGroup.add(
    group
  );

  selectFurniture(group);
}


// ============================================================
// ADD BED
// ============================================================

export function addBed() {

  const group =
    new THREE.Group();

  group.userData.isFurniture = true;

  group.userData.name =
    "Bed";


  const frameMaterial =
    createMaterial(
      "#6B4F3A",
      0.75
    );


  const mattressMaterial =
    createMaterial(
      "#F7F7F5",
      0.92
    );


  // Frame

  const frame =
    new THREE.Mesh(

      new THREE.BoxGeometry(
        4,
        0.4,
        5.3
      ),

      frameMaterial

    );

  frame.position.y =
    0.35;

  frame.castShadow = true;

  group.add(
    frame
  );


  // Mattress

  const mattress =
    new THREE.Mesh(

      new THREE.BoxGeometry(
        3.7,
        0.45,
        5
      ),

      mattressMaterial

    );

  mattress.position.y =
    0.78;

  mattress.castShadow = true;

  group.add(
    mattress
  );


  // Headboard

  const headboard =
    new THREE.Mesh(

      new THREE.BoxGeometry(
        4,
        2.5,
        0.3
      ),

      frameMaterial

    );

  headboard.position.set(
    0,
    1.65,
    -2.55
  );

  headboard.castShadow = true;

  group.add(
    headboard
  );


  // Pillows

  const pillowMaterial =
    createMaterial(
      "#FFFFFF",
      0.95
    );


  [-0.9, 0.9].forEach(
    x => {

      const pillow =
        new THREE.Mesh(

          new THREE.BoxGeometry(
            1.25,
            0.22,
            0.75
          ),

          pillowMaterial

        );

      pillow.position.set(
        x,
        1.1,
        -1.7
      );

      group.add(
        pillow
      );

    }
  );


  group.position.set(
    0,
    0,
    -1.5
  );


  furnitureGroup.add(
    group
  );

  selectFurniture(group);
}


// ============================================================
// ADD TABLE
// ============================================================

export function addTable() {

  const group =
    new THREE.Group();

  group.userData.isFurniture = true;

  group.userData.name =
    "Table";


  const woodMaterial =
    createMaterial(
      "#8B5E3C",
      0.65
    );


  const top =
    new THREE.Mesh(

      new THREE.BoxGeometry(
        2.6,
        0.22,
        1.5
      ),

      woodMaterial

    );

  top.position.y =
    1.2;

  top.castShadow = true;

  group.add(
    top
  );


  const legGeometry =
    new THREE.CylinderGeometry(
      0.1,
      0.1,
      1.15,
      16
    );


  [
    [-1, 0.58, -0.5],
    [1, 0.58, -0.5],
    [-1, 0.58, 0.5],
    [1, 0.58, 0.5]
  ].forEach(
    p => {

      const leg =
        new THREE.Mesh(
          legGeometry,
          woodMaterial
        );

      leg.position.set(
        p[0],
        p[1],
        p[2]
      );

      leg.castShadow = true;

      group.add(
        leg
      );

    }
  );


  group.position.set(
    3,
    0,
    2
  );


  furnitureGroup.add(
    group
  );

  selectFurniture(group);
}


// ============================================================
// ADD CHAIR
// ============================================================

export function addChair() {

  const group =
    new THREE.Group();

  group.userData.isFurniture = true;

  group.userData.name =
    "Chair";


  const material =
    createMaterial(
      "#64748B",
      0.8
    );


  const seat =
    new THREE.Mesh(

      new THREE.BoxGeometry(
        1.25,
        0.25,
        1.25
      ),

      material

    );

  seat.position.y =
    1;

  seat.castShadow = true;

  group.add(
    seat
  );


  const back =
    new THREE.Mesh(

      new THREE.BoxGeometry(
        1.25,
        1.5,
        0.25
      ),

      material

    );

  back.position.set(
    0,
    1.7,
    -0.5
  );

  back.castShadow = true;

  group.add(
    back
  );


  const legGeometry =
    new THREE.CylinderGeometry(
      0.08,
      0.08,
      1,
      12
    );


  [
    [-0.45, 0.5, -0.45],
    [0.45, 0.5, -0.45],
    [-0.45, 0.5, 0.45],
    [0.45, 0.5, 0.45]
  ].forEach(
    p => {

      const leg =
        new THREE.Mesh(
          legGeometry,
          material
        );

      leg.position.set(
        p[0],
        p[1],
        p[2]
      );

      group.add(
        leg
      );

    }
  );


  group.position.set(
    2,
    0,
    0
  );


  furnitureGroup.add(
    group
  );

  selectFurniture(group);
}


// ============================================================
// ADD WARDROBE
// ============================================================

export function addWardrobe() {

  const group =
    new THREE.Group();

  group.userData.isFurniture = true;

  group.userData.name =
    "Wardrobe";


  const bodyMaterial =
    createMaterial(
      "#70513B",
      0.7
    );


  const body =
    new THREE.Mesh(

      new THREE.BoxGeometry(
        2.5,
        4.6,
        0.9
      ),

      bodyMaterial

    );

  body.position.y =
    2.3;

  body.castShadow = true;

  group.add(
    body
  );


  const divider =
    new THREE.Mesh(

      new THREE.BoxGeometry(
        0.05,
        4.2,
        0.92
      ),

      createMaterial(
        "#3F3025",
        0.65
      )

    );

  divider.position.set(
    0,
    2.3,
    0.48
  );

  group.add(
    divider
  );


  group.position.set(
    4.5,
    0,
    -5
  );


  furnitureGroup.add(
    group
  );

  selectFurniture(group);
}


// ============================================================
// ADD BOOKSHELF
// ============================================================

export function addBookshelf() {

  const group =
    new THREE.Group();

  group.userData.isFurniture = true;

  group.userData.name =
    "Bookshelf";


  const wood =
    createMaterial(
      "#5A4030",
      0.75
    );


  // Side panels

  [-1.5, 1.5].forEach(
    x => {

      const side =
        new THREE.Mesh(

          new THREE.BoxGeometry(
            0.18,
            4.5,
            1
          ),

          wood

        );

      side.position.set(
        x,
        2.25,
        0
      );

      side.castShadow = true;

      group.add(
        side
      );

    }
  );


  // Shelves

  for (
    let i = 0;
    i < 5;
    i++
  ) {

    const shelf =
      new THREE.Mesh(

        new THREE.BoxGeometry(
          3,
          0.16,
          1
        ),

        wood

      );

    shelf.position.set(
      0,
      0.25 + i * 1,
      0
    );

    shelf.castShadow = true;

    group.add(
      shelf
    );
  }


  // Books

  const colors = [
    "#B91C1C",
    "#2563EB",
    "#15803D",
    "#CA8A04",
    "#7E22CE"
  ];


  for (
    let row = 0;
    row < 4;
    row++
  ) {

    for (
      let i = 0;
      i < 5;
      i++
    ) {

      const book =
        new THREE.Mesh(

          new THREE.BoxGeometry(
            0.35,
            0.72,
            0.7
          ),

          createMaterial(
            colors[i],
            0.8
          )

        );

      book.position.set(
        -1.05 + i * 0.48,
        0.62 + row * 1,
        0
      );

      group.add(
        book
      );
    }
  }


  group.position.set(
    -5,
    0,
    -5
  );


  furnitureGroup.add(
    group
  );

  selectFurniture(group);
}


// ============================================================
// ADD TV UNIT
// ============================================================

export function addTVUnit() {

  const group =
    new THREE.Group();

  group.userData.isFurniture = true;

  group.userData.name =
    "TV Unit";


  const cabinetMaterial =
    createMaterial(
      "#374151",
      0.65
    );


  const cabinet =
    new THREE.Mesh(

      new THREE.BoxGeometry(
        4,
        0.9,
        0.9
      ),

      cabinetMaterial

    );

  cabinet.position.y =
    0.45;

  cabinet.castShadow = true;

  group.add(
    cabinet
  );


  const screenMaterial =
    new THREE.MeshStandardMaterial({

      color: "#111827",

      roughness: 0.18,

      metalness: 0.35

    });


  const screen =
    new THREE.Mesh(

      new THREE.BoxGeometry(
        3.6,
        2.1,
        0.12
      ),

      screenMaterial

    );

  screen.position.set(
    0,
    2.05,
    -0.48
  );

  group.add(
    screen
  );


  group.position.set(
    0,
    0,
    -5.4
  );


  furnitureGroup.add(
    group
  );

  selectFurniture(group);
}


// ============================================================
// ADD LAMP
// ============================================================

export function addLamp() {

  const group =
    new THREE.Group();

  group.userData.isFurniture = true;

  group.userData.name =
    "Lamp";


  const metal =
    createMaterial(
      "#374151",
      0.3,
      0.65
    );


  const pole =
    new THREE.Mesh(

      new THREE.CylinderGeometry(
        0.07,
        0.07,
        2.5,
        24
      ),

      metal

    );

  pole.position.y =
    1.25;

  group.add(
    pole
  );


  const base =
    new THREE.Mesh(

      new THREE.CylinderGeometry(
        0.45,
        0.55,
        0.15,
        32
      ),

      metal

    );

  base.position.y =
    0.08;

  group.add(
    base
  );


  const shade =
    new THREE.Mesh(

      new THREE.ConeGeometry(
        0.55,
        0.75,
        32,
        1,
        true
      ),

      new THREE.MeshStandardMaterial({

        color: "#F4F1E8",

        side:
          THREE.DoubleSide,

        roughness: 0.75

      })

    );

  shade.position.y =
    2.65;

  group.add(
    shade
  );


  const light =
    new THREE.PointLight(
      0xFFE0A3,
      1.5,
      5
    );

  light.position.y =
    2.5;

  group.add(
    light
  );


  group.position.set(
    -5,
    0,
    2
  );


  furnitureGroup.add(
    group
  );

  selectFurniture(group);
}


// ============================================================
// ADD PLANT
// ============================================================

export function addPlant() {

  const group =
    new THREE.Group();

  group.userData.isFurniture = true;

  group.userData.name =
    "Plant";


  const pot =
    new THREE.Mesh(

      new THREE.CylinderGeometry(
        0.45,
        0.35,
        0.75,
        32
      ),

      createMaterial(
        "#B45309",
        0.8
      )

    );

  pot.position.y =
    0.38;

  pot.castShadow = true;

  group.add(
    pot
  );


  const stem =
    new THREE.Mesh(

      new THREE.CylinderGeometry(
        0.07,
        0.07,
        1.6,
        12
      ),

      createMaterial(
        "#166534",
        0.9
      )

    );

  stem.position.y =
    1.35;

  group.add(
    stem
  );


  const leafMaterial =
    createMaterial(
      "#22A447",
      0.8
    );


  for (
    let i = 0;
    i < 9;
    i++
  ) {

    const leaf =
      new THREE.Mesh(

        new THREE.SphereGeometry(
          0.32,
          18,
          18
        ),

        leafMaterial

      );

    const angle =
      (i / 9) *
      Math.PI *
      2;

    leaf.position.set(

      Math.cos(angle) * 0.5,

      1.7 +
        (i % 3) * 0.18,

      Math.sin(angle) * 0.5

    );

    leaf.scale.set(
      0.65,
      1.35,
      0.65
    );

    group.add(
      leaf
    );
  }


  group.position.set(
    5,
    0,
    -4
  );


  furnitureGroup.add(
    group
  );

  selectFurniture(group);
}


// ============================================================
// ADD DECOR
// ============================================================

export function addDecor() {

  const group =
    new THREE.Group();

  group.userData.isFurniture = true;

  group.userData.name =
    "Decor";


  const vase =
    new THREE.Mesh(

      new THREE.CylinderGeometry(
        0.32,
        0.42,
        0.8,
        32
      ),

      createMaterial(
        "#6366F1",
        0.5
      )

    );

  vase.position.y =
    0.4;

  group.add(
    vase
  );


  const flower =
    new THREE.Mesh(

      new THREE.SphereGeometry(
        0.28,
        20,
        20
      ),

      createMaterial(
        "#EC4899",
        0.55
      )

    );

  flower.position.y =
    1;

  group.add(
    flower
  );


  group.position.set(
    2,
    0,
    3
  );


  furnitureGroup.add(
    group
  );

  selectFurniture(group);
}


// ============================================================
// SELECT FURNITURE
// ============================================================

function selectFurniture(
  object
) {

  if (selectedFurniture) {

    removeSelectionEffect();

  }


  selectedFurniture =
    object;


  // Add subtle outline-like selection
  // using a transparent bounding box.

  const box =
    new THREE.Box3().setFromObject(
      object
    );


  const size =
    new THREE.Vector3();

  const center =
    new THREE.Vector3();

  box.getSize(size);

  box.getCenter(center);


  const geometry =
    new THREE.BoxGeometry(
      size.x + 0.12,
      size.y + 0.12,
      size.z + 0.12
    );


  const material =
    new THREE.MeshBasicMaterial({

      color: "#2F8F6B",

      wireframe: true,

      transparent: true,

      opacity: 0.55

    });


  const helper =
    new THREE.Mesh(
      geometry,
      material
    );


  helper.position.copy(
    center
  );


  helper.userData.selectionHelper =
    true;


  object.add(
    helper
  );
}


// ============================================================
// REMOVE SELECTION EFFECT
// ============================================================

function removeSelectionEffect() {

  if (!selectedFurniture) {
    return;
  }


  const helpers = [];


  selectedFurniture.traverse(
    child => {

      if (
        child.userData &&
        child.userData.selectionHelper
      ) {

        helpers.push(child);

      }

    }
  );


  helpers.forEach(
    helper => {

      selectedFurniture.remove(
        helper
      );

      helper.geometry.dispose();

      helper.material.dispose();

    }
  );
}


// ============================================================
// POINTER DOWN
// ============================================================

function onPointerDown(
  event
) {

  if (!renderer || !camera) {
    return;
  }


  const canvas =
    renderer.domElement;

  const rect =
    canvas.getBoundingClientRect();


  mouse.x =
    ((event.clientX - rect.left) /
      rect.width) *
      2 -
    1;


  mouse.y =
    -(
      (event.clientY - rect.top) /
      rect.height
    ) *
      2 +
    1;


  raycaster.setFromCamera(
    mouse,
    camera
  );


  const intersections =
    raycaster.intersectObjects(
      furnitureGroup.children,
      true
    );


  if (
    intersections.length === 0
  ) {

    if (selectedFurniture) {

      removeSelectionEffect();

      selectedFurniture =
        null;

    }

    return;
  }


  const furniture =
    findFurnitureParent(
      intersections[0].object
    );


  if (!furniture) {
    return;
  }


  selectFurniture(
    furniture
  );


  isDraggingFurniture =
    true;


  controls.enabled =
    false;


  try {

    canvas.setPointerCapture(
      event.pointerId
    );

  }
  catch (error) {}


  updateFurniturePosition(
    event
  );
}


// ============================================================
// FIND FURNITURE
// ============================================================

function findFurnitureParent(
  object
) {

  let current =
    object;


  while (
    current &&
    current !== furnitureGroup
  ) {

    if (
      current.userData &&
      current.userData.isFurniture
    ) {

      return current;

    }

    current =
      current.parent;
  }


  return null;
}


// ============================================================
// POINTER MOVE
// ============================================================

function onPointerMove(
  event
) {

  if (
    !isDraggingFurniture ||
    !selectedFurniture
  ) {

    return;
  }


  updateFurniturePosition(
    event
  );
}


// ============================================================
// MOVE FURNITURE
// ============================================================

function updateFurniturePosition(
  event
) {

  const canvas =
    renderer.domElement;

  const rect =
    canvas.getBoundingClientRect();


  mouse.x =
    ((event.clientX - rect.left) /
      rect.width) *
      2 -
    1;


  mouse.y =
    -(
      (event.clientY - rect.top) /
      rect.height
    ) *
      2 +
    1;


  raycaster.setFromCamera(
    mouse,
    camera
  );


  if (
    raycaster.ray.intersectPlane(
      dragPlane,
      dragPoint
    )
  ) {

    selectedFurniture.position.x =
      THREE.MathUtils.clamp(
        dragPoint.x,
        -5.5,
        5.5
      );


    selectedFurniture.position.z =
      THREE.MathUtils.clamp(
        dragPoint.z,
        -4.8,
        4.8
      );

  }
}


// ============================================================
// POINTER UP
// ============================================================

function onPointerUp(
  event
) {

  if (!isDraggingFurniture) {
    return;
  }


  const canvas =
    renderer.domElement;


  try {

    canvas.releasePointerCapture(
      event.pointerId
    );

  }
  catch (error) {}


  isDraggingFurniture =
    false;


  if (controls) {

    controls.enabled =
      true;

  }
}


// ============================================================
// KEYBOARD CONTROLS
// ============================================================

function onKeyDown(
  event
) {

  if (!selectedFurniture) {
    return;
  }


  // DELETE FURNITURE

  if (
    event.key === "Delete" ||
    event.key === "Backspace"
  ) {

    deleteSelectedFurniture();

    return;
  }


  // ROTATE LEFT

  if (
    event.key.toLowerCase() === "q"
  ) {

    selectedFurniture.rotation.y +=
      Math.PI / 12;

  }


  // ROTATE RIGHT

  if (
    event.key.toLowerCase() === "e"
  ) {

    selectedFurniture.rotation.y -=
      Math.PI / 12;

  }
}


// ============================================================
// DELETE SELECTED FURNITURE
// ============================================================

function deleteSelectedFurniture() {

  if (!selectedFurniture) {
    return;
  }


  const object =
    selectedFurniture;


  removeSelectionEffect();


  furnitureGroup.remove(
    object
  );


  disposeObject(
    object
  );


  selectedFurniture =
    null;
}


// ============================================================
// WALL COLOR
// ============================================================

export function changeWallColor(
  color
) {

  currentWallColor =
    color;


  if (backWall) {

    backWall.material.color.set(
      color
    );

  }


  if (leftWall) {

    leftWall.material.color.set(
      color
    );

  }


  if (rightWall) {

    rightWall.material.color.set(
      color
    );

  }
}


// ============================================================
// FLOOR COLOR
// ============================================================

export function changeFloorColor(
  color
) {

  currentFloorColor =
    color;


  if (floorMesh) {

    floorMesh.material.color.set(
      color
    );

  }
}


// ============================================================
// CEILING COLOR
// ============================================================

export function changeCeilingColor(
  color
) {

  currentCeilingColor =
    color;


  if (ceilingMesh) {

    ceilingMesh.material.color.set(
      color
    );

  }
}


// ============================================================
// LIGHTING
// ============================================================

export function setLighting(
  type
) {

  if (!ambientLight || !mainLight) {
    return;
  }


  if (
    type === "natural"
  ) {

    ambientLight.intensity =
      2.3;

    mainLight.intensity =
      3.6;

    mainLight.color.set(
      "#FFFFFF"
    );

  }


  if (
    type === "warm"
  ) {

    ambientLight.intensity =
      2;

    mainLight.intensity =
      3;

    mainLight.color.set(
      "#FFD59A"
    );

  }


  if (
    type === "white"
  ) {

    ambientLight.intensity =
      2.5;

    mainLight.intensity =
      3.8;

    mainLight.color.set(
      "#FFFFFF"
    );

  }


  if (
    type === "cool"
  ) {

    ambientLight.intensity =
      2.2;

    mainLight.intensity =
      3.4;

    mainLight.color.set(
      "#B9D8FF"
    );

  }
}


// ============================================================
// UPLOAD ROOM PHOTO
// ============================================================

export function uploadRoomPhoto(
  file
) {

  if (!file) {
    return;
  }


  const reader =
    new FileReader();


  reader.onload =
    function(event) {

      // IMPORTANT:
      //
      // The image is NOT inserted
      // into the 3D room.
      //
      // It is ONLY used as a reference
      // in the sidebar.

      const preview =
        document.getElementById(
          "uploadedPhotoPreview"
        );


      if (preview) {

        preview.src =
          event.target.result;

        preview.style.display =
          "block";

      }

    };


  reader.readAsDataURL(
    file
  );
}


// ============================================================
// RESET DESIGN
// ============================================================

export function resetDesigner() {

  if (!scene) {
    return;
  }


  // Remove every furniture object

  while (
    furnitureGroup.children.length > 0
  ) {

    const object =
      furnitureGroup.children[0];

    furnitureGroup.remove(
      object
    );

    disposeObject(
      object
    );
  }


  selectedFurniture =
    null;

  isDraggingFurniture =
    false;


  // Reset colors

  changeWallColor(
    "#F1EEE8"
  );

  changeFloorColor(
    "#C8A77A"
  );

  changeCeilingColor(
    "#FFFFFF"
  );


  // Reset camera

  camera.position.set(
    10,
    7.5,
    13
  );


  controls.target.set(
    0,
    2.3,
    0
  );


  controls.update();


  // Remove uploaded preview

  const preview =
    document.getElementById(
      "uploadedPhotoPreview"
    );


  if (preview) {

    preview.src =
      "";

    preview.style.display =
      "none";

  }


  console.log(
    "Smart City 3D Designer reset."
  );
}


// ============================================================
// SAVE DESIGN
// ============================================================

export function saveDesign() {

  if (
    !renderer ||
    !scene ||
    !camera
  ) {

    alert(
      "3D Designer is not ready."
    );

    return;
  }


  renderer.render(
    scene,
    camera
  );


  const image =
    renderer.domElement.toDataURL(
      "image/png"
    );


  const link =
    document.createElement(
      "a"
    );


  link.download =
    "Smart-City-3D-Room-Design.png";


  link.href =
    image;


  link.click();
}


// ============================================================
// DISPOSE OBJECT
// ============================================================

function disposeObject(
  object
) {

  object.traverse(
    child => {

      if (child.geometry) {

        child.geometry.dispose();

      }


      if (child.material) {

        if (
          Array.isArray(
            child.material
          )
        ) {

          child.material.forEach(
            material => {

              disposeMaterial(
                material
              );

            }
          );

        }
        else {

          disposeMaterial(
            child.material
          );

        }
      }
    }
  );
}


// ============================================================
// DISPOSE MATERIAL
// ============================================================

function disposeMaterial(
  material
) {

  if (material.map) {

    material.map.dispose();

  }

  material.dispose();
}


// ============================================================
// RESIZE
// ============================================================

function resizeDesigner() {

  if (
    !renderer ||
    !camera
  ) {

    return;
  }


  const canvas =
    renderer.domElement;


  const width =
    canvas.clientWidth ||
    canvas.parentElement?.clientWidth ||
    900;


  const height =
    canvas.clientHeight ||
    canvas.parentElement?.clientHeight ||
    600;


  camera.aspect =
    width / height;


  camera.updateProjectionMatrix();


  renderer.setSize(
    width,
    height,
    false
  );
}


// ============================================================
// ANIMATION
// ============================================================

function animate() {

  requestAnimationFrame(
    animate
  );


  if (controls) {

    controls.update();

  }


  if (
    renderer &&
    scene &&
    camera
  ) {

    renderer.render(
      scene,
      camera
    );

  }
}