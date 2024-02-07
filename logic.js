const sceneCanvas = document.getElementById('sceneCanvas');
const ctx = sceneCanvas.getContext('2d');
const objects = [];
let selectedObjectIndex = -1;

function addObject() {
    const name = document.getElementById('objectName').value || 'Object';
    const scale = parseFloat(document.getElementById('objectScale').value) || 1;
    const posX = parseFloat(document.getElementById('objectPosX').value) || 0;
    const posY = parseFloat(document.getElementById('objectPosY').value) || 0;
    const color = document.getElementById('objectColor').value || '#000000';

    objects.push({ name, scale, posX, posY, color });
    renderScene();
    renderGameObjectList();
}

function removeSelectedObject() {
    if (selectedObjectIndex !== -1) {
        objects.splice(selectedObjectIndex, 1);
        selectedObjectIndex = -1;
        renderScene();
        renderGameObjectList();
        clearPropertiesPanel();
    }
}

function renderScene() {
    ctx.clearRect(0, 0, sceneCanvas.width, sceneCanvas.height);
    objects.forEach(obj => {
        ctx.save();
        ctx.translate(obj.posX, obj.posY);
        ctx.scale(obj.scale, obj.scale);
        ctx.fillStyle = obj.color;
        ctx.fillRect(-20, -20, 40, 40); // Example object
        ctx.restore();
    });
}

function renderGameObjectList() {
    const gameObjectList = document.getElementById('objects');
    gameObjectList.innerHTML = '';
    objects.forEach((obj, index) => {
        const li = document.createElement('li');
        li.textContent = obj.name;
        li.onclick = () => {
            selectObject(index);
        };
        gameObjectList.appendChild(li);
    });
}

function selectObject(index) {
    selectedObjectIndex = index;
    const obj = objects[selectedObjectIndex];
    document.getElementById('objectName').value = obj.name;
    document.getElementById('objectScale').value = obj.scale;
    document.getElementById('objectPosX').value = obj.posX;
    document.getElementById('objectPosY').value = obj.posY;
    document.getElementById('objectColor').value = obj.color;
}

function updateObject() {
    if (selectedObjectIndex !== -1) {
        const obj = objects[selectedObjectIndex];
        obj.name = document.getElementById('objectName').value;
        obj.scale = parseFloat(document.getElementById('objectScale').value);
        obj.posX = parseFloat(document.getElementById('objectPosX').value);
        obj.posY = parseFloat(document.getElementById('objectPosY').value);
        obj.color = document.getElementById('objectColor').value;
        renderScene();
        renderGameObjectList();
    }
}

function clearPropertiesPanel() {
    document.getElementById('objectName').value = '';
    document.getElementById('objectScale').value = '';
    document.getElementById('objectPosX').value = '';
    document.getElementById('objectPosY').value = '';
    document.getElementById('objectColor').value = '#000000';
}

document.getElementById('addGOButton').addEventListener('click', addObject);
document.getElementById('removeGOButton').addEventListener('click', removeSelectedObject);
document.getElementById('updateGOButton').addEventListener('click', updateObject);

renderScene();
