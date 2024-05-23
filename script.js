const variant = 3327;
const variantString = variant.toString();
const n1 = parseInt(variantString[0]);
const n2 = parseInt(variantString[1]);
const n3 = parseInt(variantString[2]);
const n4 = parseInt(variantString[3]);

const n = 10 + n3;

let stepeniDirIn = [];
let stepeniDirOut = [];
let stepeniUndir = [];
let solo = [];
let isolated = [];

let matrix = [];
let koef = 1 - n3 * 0.02 - n4 * 0.005 - 0.25;
for (let i = 0; i < n; i++) {
    let row = []; 
    for (let j = 0; j < n; j++) { 
        let elem = (Math.random() * 2) * koef;
        row.push(Math.floor(elem));
    }
    matrix.push(row); 
}
console.log(matrix);

let undirMatrix = [];
for (let i = 0; i < n; i++) {
    let row = [];
    for (let j = 0; j < n; j++) { 
        row.push(matrix[i][j] || matrix[j][i]);
    }
    undirMatrix.push(row);
}
console.log(undirMatrix);

for(let i = 0; i < n; i++)
    {
        stepeniDirIn[i] = 0;
        stepeniDirOut[i] = 0;
        stepeniUndir[i] = 0;
        for(let j = 0; j < n; j++)
            {
                if(matrix[i][j] === 1) stepeniDirOut[i]++;
                if(matrix[j][i] === 1) stepeniDirIn[i]++;
                if(undirMatrix[i][j] === 1) stepeniUndir[i]++;
            }
            if(stepeniUndir[i] === 1) solo.push(i+1);
            if(stepeniUndir[i] === 0) isolated.push(i+1);
    }
console.log('Степені: ' + stepeniUndir);
console.log('Напівстепені виходу: ' + stepeniDirOut);
console.log('Напівстепені заходу: ' + stepeniDirIn);

if(stepeniUndir.every(value => value === stepeniUndir[0])){
    console.log('Ненапрямлений граф однорідний, ступінь однорідності: ' + stepeniUndir[0]);
}
else console.log('Ненапрямлений граф неоднорідний');
if(stepeniDirIn.every(value => value === stepeniDirIn[0]) && stepeniDirOut.every(value => value === stepeniDirOut[0])){
    console.log('Напрямлений граф однорідний, ступіні однорідності (виходу, заходу): ' + stepeniDirOut[0] + ',' + stepeniDirIn[0]);
}
else console.log('Напрямлений граф неоднорідний');
console.log('Висячі вершини: ' + solo);
console.log('Ізольовані вешини: ' + isolated);
let canvasArrows = document.getElementById('graphCanvasWithArrows');
let ctxArrow = canvasArrows.getContext('2d');
 // Розміщення вершин у колі
 const nodePositions = [];
 const radius = 450;
 const centerX = 500;
 const centerY = 500;
 const angleIncrement = (2 * Math.PI) / (n - 1);      
        
 for (let i = 0; i < n - 1; i++) {
    const x = centerX + radius * Math.cos(i * angleIncrement);
    const y = centerY + radius * Math.sin(i * angleIncrement);
    nodePositions.push({ x, y });
} 
const x = centerX;
const y = centerY;
nodePositions.push({ x, y });

// Малюємо зв'язки між вершинами
ctxArrow.strokeStyle = 'black';
for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
        // Малюємо лінію між вершинами (зв'язок), якщо існує зв'язок між ними
        if (matrix[i][j] == 1) {
            if(i != j)
            {
                ctxArrow.beginPath();
                ctxArrow.moveTo(nodePositions[j].x, nodePositions[j].y);
                if((nodePositions[j].x < centerX && nodePositions[i].x < centerX) || (nodePositions[j].x > centerX && nodePositions[i].x > centerX))
                {
                    ctxArrow.lineTo(nodePositions[i].x + 20, nodePositions[i].y);
                }
                else {
                    ctxArrow.lineTo(nodePositions[i].x, nodePositions[i].y + 20);
                }
                ctxArrow.stroke();
                const angle = Math.atan2(nodePositions[j].y - nodePositions[i].y, nodePositions[j].x - nodePositions[i].x);
                const offsetX = Math.cos(angle) * 30;
                const offsetY = Math.sin(angle) * 30;          
                drawArrowhead(ctxArrow, nodePositions[j].x - offsetX, nodePositions[j].y - offsetY, angle);
            }
            else {
                selfArrow(i);
            }
        }
        }
    }      

// Малюємо вершини
for (let i = 0; i < n; i++) {
    ctxArrow.fillStyle = 'red';
    ctxArrow.beginPath();
    ctxArrow.arc(nodePositions[i].x, nodePositions[i].y, 30, 0, Math.PI * 2);
    ctxArrow.fill();
    ctxArrow.closePath();
    ctxArrow.fillStyle = 'white'; 
    ctxArrow.font = '24px Arial';
    ctxArrow.textAlign = 'center';
    ctxArrow.textBaseline = 'middle';
    ctxArrow.fillText(`${i+1}`, nodePositions[i].x, nodePositions[i].y);
}       
        
function drawArrowhead(ctx, x, y, angle) {
    const arrowheadSize = 15;
    ctxArrow.save();
    ctxArrow.translate(x, y);
    ctxArrow.rotate(angle);
    ctxArrow.beginPath();
    ctxArrow.moveTo(0, 0);
    ctxArrow.lineTo(-arrowheadSize, arrowheadSize / 2);
    ctxArrow.lineTo(-arrowheadSize, -arrowheadSize / 2);
    ctxArrow.closePath();
    ctxArrow.fill();
    ctxArrow.restore();
}


function selfArrow(i) {
    const arrowheadSize = 15;
    let x, y;

    // Визначаємо зміщення для початку стрілки в залежності від положення ноди на канвасі
    const offsetX = nodePositions[i].x < canvasArrows.width / 2 ? -30 : 30;

    // Визначаємо напрямок стрілки в залежності від положення ноди на канвасі
    const angle = nodePositions[i].x < canvasArrows.width / 2 ? Math.PI / 4 : Math.PI * 3 / 4;

    // Розраховуємо координати початку стрілки
    x = nodePositions[i].x + offsetX;
    y = nodePositions[i].y;

    ctxArrow.beginPath();
    ctxArrow.moveTo(nodePositions[i].x, nodePositions[i].y);
    ctxArrow.lineTo(x, y);
    ctxArrow.stroke();
    drawArrowhead(ctxArrow, x, y, angle);

    ctxArrow.strokeStyle = 'black';
    ctxArrow.beginPath();
    ctxArrow.arc(x, y-15, 10, Math.PI / 1.3, Math.PI * 4.5/2);
    ctxArrow.stroke();
    ctxArrow.closePath();
}

function selfCircle(i) {
    let x, y;

    const offsetX = nodePositions[i].x < canvas.width / 2 ? -30 : 30;


    x = nodePositions[i].x + offsetX;
    y = nodePositions[i].y;

    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.arc(x, y-15, 10, Math.PI / 1.3, Math.PI * 4.5);
    ctx.stroke();
    ctx.closePath();
}
matrix = [];
koef = 1 - n3 * 0.005 - n4 * 0.005 - 0.27;
for (let i = 0; i < n; i++) {
    let row = []; 
    for (let j = 0; j < n; j++) { 
        let elem = (Math.random() * 2) * koef;
        row.push(Math.floor(elem));
    }
    matrix.push(row); 
}
console.log(matrix);
stepeniDirIn = [];
stepeniDirOut = [];
for(let i = 0; i < n; i++)
    {
        stepeniDirIn[i] = 0;
        stepeniDirOut[i] = 0;
        for(let j = 0; j < n; j++)
            {
                if(matrix[i][j] === 1) stepeniDirOut[i]++;
                if(matrix[j][i] === 1) stepeniDirIn[i]++;
            }
            if(stepeniUndir[i] === 1) solo.push(i+1);
    }
console.log('Напівстепені виходу: ' + stepeniDirOut);
console.log('Напівстепені заходу: ' + stepeniDirIn);

let paths2 = [];
let paths3 = [];
for(let i = 0; i < n; i++)
    {
        for(let j = 0; j < n; j++)
            {
                if(matrix[i][j] === 1 && i != j) 
                    {
                        paths2.push(`${i+1} - ${j+1}`);
                        for(let q = 0; q < n; q++)
                            {
                                if(matrix[j][q] === 1 && q != i && q != j) paths3.push(`${i+1} - ${j+1} - ${q+1}`);
                            }
                    }
            }
    }
    console.log(paths2);
    console.log(paths3);
    let checkAccess = (i, j, visited = new Set()) => {
        if (matrix[i][j] === 1) return true;
        visited.add(i);
        for (let q = 0; q < n; q++) {
            if (matrix[i][q] === 1 && !visited.has(q)) {
                if (checkAccess(q, j, visited)) return true;
            }
        }  
        return false
    }
    
let matrixAccess = [];
for(let i = 0; i < n; i++)
    {
        let row = [];
        for(let j = 0; j < n; j++)
            {
                if(checkAccess(i,j)) row.push(1);
                else row.push(0);
            }
        matrixAccess.push(row);
    }
console.log('Матриця досяжності: ');
console.log(matrixAccess);

function printMatrix(matrix) {
    matrix.forEach(row => {
        console.log(row.join(' '));
    });
}

//Знаходить матрицю сильної зв'язності
function strongConnectivityMatrix(matrix) {
    let stack = [];
    let visited = new Array(n).fill(false);

    //Заповнення порядку закінчення вершин
    let fillOrder = (v, visited, stack) => {
        visited[v] = true;
        for (let i = 0; i < n; i++) {
            if (matrix[v][i] && !visited[i]) {
                fillOrder(i, visited, stack);
            }
        }
        stack.push(v);
    }

    for (let i = 0; i < n; i++) {
        if (!visited[i]) {
            fillOrder(i, visited, stack);
        }
    }

    //Транспонування графа
    let transposedMatrix = [];
    for (let i = 0; i < n; i++) {
        transposedMatrix.push([]);
        for (let j = 0; j < n; j++) {
            transposedMatrix[i][j] = matrix[j][i];
        }
    }

    //Обхід в глибину в транспонованому графі згідно порядку закінчення вершин
    let dfs = (v, visited, component) => {
        visited[v] = true;
        component.push(v);
        for (let i = 0; i < n; i++) {
            if (transposedMatrix[v][i] && !visited[i]) {
                dfs(i, visited, component);
            }
        }
    }

    //Знаходження компонент
    let components = [];
    visited.fill(false);
    while (stack.length > 0) {
        let v = stack.pop();
        if (!visited[v]) {
            let component = [];
            dfs(v, visited, component);
            components.push(component);
        }
    }

    //Побудова матриці сильної зв'язності
    let connectivityMatrix = Array.from({ length: n }, () => Array.from({ length: n }, () => 0));
    components.forEach(component => {
        component.forEach(vertex => {
            component.forEach(neighbor => {
                if (matrix[vertex][neighbor]) {
                    connectivityMatrix[vertex][neighbor] = 1;
                }
            });
        });
    });

    return connectivityMatrix;
}

//Знаходить компоненти сильної зв'язності
function findStronglyConnectedComponents(matrix) {
    let stack = [];
    let visited = new Array(n).fill(false);

    //Заповнення порядку закінчення вершин
    let fillOrder = (v, visited, stack) => {
        visited[v] = true;
        for (let i = 0; i < n; i++) {
            if (matrix[v][i] && !visited[i]) {
                fillOrder(i, visited, stack);
            }
        }
        stack.push(v);
    }

    for (let i = 0; i < n; i++) {
        if (!visited[i]) {
            fillOrder(i, visited, stack);
        }
    }

    //Транспонування графа
    let transposedMatrix = [];
    for (let i = 0; i < n; i++) {
        transposedMatrix.push([]);
        for (let j = 0; j < n; j++) {
            transposedMatrix[i][j] = matrix[j][i];
        }
    }

    //Обхід в глибину в транспонованому графі згідно порядку закінчення вершин
    let dfs = (v, visited, component) => {
        visited[v] = true;
        component.push(v);
        for (let i = 0; i < n; i++) {
            if (transposedMatrix[v][i] && !visited[i]) {
                dfs(i, visited, component);
            }
        }
    }

    //Знаходження компонент
    let components = [];
    visited.fill(false);
    while (stack.length > 0) {
        let v = stack.pop();
        if (!visited[v]) {
            let component = [];
            dfs(v, visited, component);
            components.push(component);
        }
    }

    return components;
}
let strongConnectivity = strongConnectivityMatrix(matrix);
console.log("\nМатриця сильної зв'язності:");
printMatrix(strongConnectivity);

let stronglyConnectedComponents = findStronglyConnectedComponents(matrix);
console.log("\nКомпоненти сильної зв'язності:");
stronglyConnectedComponents.forEach((component, index) => {
    console.log(`Компонента ${index + 1}: ${component.join(', ')}`);
});

// Функція для побудови графа конденсації
function buildCondensationGraph(matrix, components) {
    let condensationGraph = [];
    let componentMap = new Map(); // Відображення між вершинами графа і компонентами

    // Створення вершин для кожної компоненти
    components.forEach((component, index) => {
        let componentVertex = `C${index + 1}`;
        condensationGraph.push([]);
        componentMap.set(componentVertex, component);
    });

    // Додавання ребер між компонентами
    for (let i = 0; i < components.length; i++) {
        let component1 = components[i];
        for (let j = 0; j < components.length; j++) {
            if (i !== j) {
                let component2 = components[j];
                // Перевірка наявності ребра між компонентами
                let isConnected = false;
                for (let vertex1 of component1) {
                    for (let vertex2 of component2) {
                        if (matrix[vertex1][vertex2]) {
                            isConnected = true;
                            break;
                        }
                    }
                    if (isConnected) break;
                }
                // Додавання ребра, якщо компоненти зв'язані
                if (isConnected) {
                    condensationGraph[i].push(j);
                }
            }
        }
    }

    return { graph: condensationGraph, componentMap: componentMap };
}

// Використання функції побудови графа конденсації
let condensationGraphData = buildCondensationGraph(matrix, stronglyConnectedComponents);
let condensationGraph = condensationGraphData.graph;
let componentMap = condensationGraphData.componentMap;

// Вивід графа конденсації
console.log("\nГраф конденсації:");
condensationGraph.forEach((neighbors, index) => {
    let componentVertex = `C${index + 1}`;
    let componentVertices = componentMap.get(componentVertex);
    let neighborComponents = neighbors.map(neighborIndex => `C${neighborIndex + 1}`);
    console.log(`${componentVertex}: ${componentVertices.join(', ')} -> ${neighborComponents.join(', ')}`);
});

// Малюємо граф на canvas
const canvas = document.getElementById('graphCanvas');
const ctx = canvas.getContext('2d');

// Малюємо зв'язки між вершинами
ctx.strokeStyle = 'black';
for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
        // Малюємо лінію між вершинами (зв'язок), якщо існує зв'язок між ними
        if (undirMatrix[i][j] == 1) {
            if(i != j)
            {
            ctx.beginPath();
            ctx.moveTo(nodePositions[i].x, nodePositions[i].y);
            ctx.lineTo(nodePositions[j].x, nodePositions[j].y);
            ctx.stroke();
            }
            else{
                selfCircle(i);
            }
            
        }
    }
}        

// Малюємо вершини
for (let i = 0; i < n; i++) {
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(nodePositions[i].x, nodePositions[i].y, 30, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    ctx.fillStyle = 'white'; 
    ctx.font = '24px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${i+1}`, nodePositions[i].x, nodePositions[i].y);
}
        
        
        
        
// Малюємо граф на canvas
 canvasArrows = document.getElementById('graphCanvasWithArrows2');
 ctxArrow = canvasArrows.getContext('2d');

// Малюємо зв'язки між вершинами
ctxArrow.strokeStyle = 'black';
for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
        // Малюємо лінію між вершинами (зв'язок), якщо існує зв'язок між ними
        if (matrix[i][j] == 1) {
            if(i != j)
            {
                ctxArrow.beginPath();
                ctxArrow.moveTo(nodePositions[j].x, nodePositions[j].y);
                if((nodePositions[j].x < centerX && nodePositions[i].x < centerX) || (nodePositions[j].x > centerX && nodePositions[i].x > centerX))
                {
                    ctxArrow.lineTo(nodePositions[i].x + 20, nodePositions[i].y);
                }
                else {
                    ctxArrow.lineTo(nodePositions[i].x, nodePositions[i].y + 20);
                }
                ctxArrow.stroke();
                const angle = Math.atan2(nodePositions[j].y - nodePositions[i].y, nodePositions[j].x - nodePositions[i].x);
                const offsetX = Math.cos(angle) * 30;
                const offsetY = Math.sin(angle) * 30;          
                drawArrowhead(ctxArrow, nodePositions[j].x - offsetX, nodePositions[j].y - offsetY, angle);
            }
            else {
                selfArrow(i);
            }
        }
        }
    }      

// Малюємо вершини
for (let i = 0; i < n; i++) {
    ctxArrow.fillStyle = 'red';
    ctxArrow.beginPath();
    ctxArrow.arc(nodePositions[i].x, nodePositions[i].y, 30, 0, Math.PI * 2);
    ctxArrow.fill();
    ctxArrow.closePath();
    ctxArrow.fillStyle = 'white'; 
    ctxArrow.font = '24px Arial';
    ctxArrow.textAlign = 'center';
    ctxArrow.textBaseline = 'middle';
    ctxArrow.fillText(`${i+1}`, nodePositions[i].x, nodePositions[i].y);
}       
        
function drawArrowhead(ctx, x, y, angle) {
    const arrowheadSize = 15;
    ctxArrow.save();
    ctxArrow.translate(x, y);
    ctxArrow.rotate(angle);
    ctxArrow.beginPath();
    ctxArrow.moveTo(0, 0);
    ctxArrow.lineTo(-arrowheadSize, arrowheadSize / 2);
    ctxArrow.lineTo(-arrowheadSize, -arrowheadSize / 2);
    ctxArrow.closePath();
    ctxArrow.fill();
    ctxArrow.restore();
}


function selfArrow(i) {
    const arrowheadSize = 15;
    let x, y;

    // Визначаємо зміщення для початку стрілки в залежності від положення ноди на канвасі
    const offsetX = nodePositions[i].x < canvasArrows.width / 2 ? -30 : 30;

    // Визначаємо напрямок стрілки в залежності від положення ноди на канвасі
    const angle = nodePositions[i].x < canvasArrows.width / 2 ? Math.PI / 4 : Math.PI * 3 / 4;

    // Розраховуємо координати початку стрілки
    x = nodePositions[i].x + offsetX;
    y = nodePositions[i].y;

    ctxArrow.beginPath();
    ctxArrow.moveTo(nodePositions[i].x, nodePositions[i].y);
    ctxArrow.lineTo(x, y);
    ctxArrow.stroke();
    drawArrowhead(ctxArrow, x, y, angle);

    ctxArrow.strokeStyle = 'black';
    ctxArrow.beginPath();
    ctxArrow.arc(x, y-15, 10, Math.PI / 1.3, Math.PI * 4.5/2);
    ctxArrow.stroke();
    ctxArrow.closePath();
}

function selfCircle(i) {
    let x, y;

    const offsetX = nodePositions[i].x < canvas.width / 2 ? -30 : 30;


    x = nodePositions[i].x + offsetX;
    y = nodePositions[i].y;

    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.arc(x, y-15, 10, Math.PI / 1.3, Math.PI * 4.5);
    ctx.stroke();
    ctx.closePath();
}

canvasCond = document.getElementById('graphCanvasCondensation');
const ctxCond = canvasCond.getContext('2d');
ctxCond.strokeStyle = 'blue';
ctxCond.lineWidth = 2;
condensationGraph.forEach((neighbors, index) => {
    let componentVertex = `C${index + 1}`;
    let startPoint = nodePositions[index];
    neighbors.forEach(neighborIndex => {
        let endPoint = nodePositions[neighborIndex];
        ctxCond.beginPath();
        ctxCond.moveTo(startPoint.x, startPoint.y);
        ctxCond.lineTo(endPoint.x, endPoint.y);
        ctxCond.stroke();
    });
});

// Малюємо вершини компонент
ctxCond.fillStyle = 'blue'; // Встановлюємо колір заливки
ctxCond.strokeStyle = 'black';
ctxCond.lineWidth = 1;
condensationGraph.forEach((_, index) => {
    let componentVertex = `C${index + 1}`;
    let point = nodePositions[index];
    ctxCond.beginPath();
    ctxCond.arc(point.x, point.y, 20, 0, Math.PI * 2);
    ctxCond.fill(); // Заливаємо вершину
    ctxCond.stroke();
    ctxCond.closePath();
    ctxCond.fillStyle = 'white'; // Перед малюванням тексту, змінюємо колір заливки на білий
    ctxCond.font = '16px Arial';
    ctxCond.textAlign = 'center';
    ctxCond.textBaseline = 'middle';
    ctxCond.fillText(componentVertex, point.x, point.y);
    ctxCond.fillStyle = 'blue'; // Повертаємо колір заливки для наступних вершин
});