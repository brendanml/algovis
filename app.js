$(document).ready(function() {

    let gridSize = 10;
    let startCell = null;
    let goalCell = null;
    let selecting = 'start';
    let selectedAlgorithm = 'bfs';
    let selectedColor = "#1D84B5";
    let tileWeights = [1, 2, 7];

    // Create the grid with weights
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            let cell = $('<div class="cell"></div>');
            cell.attr('data-row', row);
            cell.attr('data-col', col);
            
            // give tile costs
            let weight = tileWeights[Math.floor(Math.random()*tileWeights.length)];
            cell.attr('data-weight', weight);

            // cell.text(weight); // Display the weight in the cell
            
            $('#grid').append(cell);
        }
    }


    // handle clicking grid cells
    $('.cell').click(function() {
        let row = parseInt($(this).attr('data-row'));
        let col = parseInt($(this).attr('data-col'));

        if (selecting === 'start') {
            if (startCell) {
                getCell(startCell.row, startCell.col).removeClass('start');
                getCell(startCell.row, startCell.col).empty()
            }
            startCell = { row: row, col: col };
            $(this).addClass('start').append('<div class="start-marker"></div>');
            // UPDATE BELOW
        } else if (selecting === 'goal') {
            if (goalCell) {
                getCell(goalCell.row, goalCell.col).removeClass('goal');
                getCell(goalCell.row, goalCell.col).empty()
            }
            goalCell = { row: row, col: col };
            $(this).addClass('goal').append('<div class="goal-marker"></div>');
        } else if (selecting === 'mountain') {
            $(this).attr('data-weight', 7);
        } else if (selecting === 'cliff') {
            $(this).attr('data-weight', 100);
        } else if (selecting === 'grass') {
            $(this).attr('data-weight', 1);
        } else if (selecting === 'hills') {
            $(this).attr('data-weight', 2);
        }

    });
    
// Toolbar even handlers
function selectStart() {
    selecting = 'start';
    $('.select-button').css('background-color', '');
    $('#select-start').css('background-color', selectedColor);
}

function selectGoal() {
    selecting = 'goal';
    $('.select-button').css('background-color', '');
    $('#select-goal').css('background-color', selectedColor);
}

function selectMountain() {
    selecting = 'mountain';
    $('.select-button').css('background-color', '');
    $('#select-mountain').css('background-color', selectedColor);
}

function selectCliff() {
    selecting = 'cliff';
    $('.select-button').css('background-color', '');
    $('#select-cliff').css('background-color', selectedColor);
}

function selectGrass() {
    selecting = 'grass';
    $('.select-button').css('background-color', '');
    $('#select-grass').css('background-color', selectedColor);
}

function selectHills() {
    selecting = 'hills';
    $('.select-button').css('background-color', '');
    $('#select-hills').css('background-color', selectedColor);
}

// Functions for selecting algorithms
function selectDFS() {
    selectedAlgorithm = 'dfs';
    $('.algorithm').removeClass('active');
    $('.algorithm-button').css('background-color', '');
    $('#dfs').addClass('active');
    $('#dfs').css('background-color', selectedColor);
}

function selectBFS() {
    selectedAlgorithm = 'bfs';
    $('.algorithm').removeClass('active');
    $('.algorithm-button').css('background-color', '');
    $('#bfs').addClass('active');
    $('#bfs').css('background-color', selectedColor);
}

function selectAStar() {
    selectedAlgorithm = 'astar';
    $('.algorithm').removeClass('active');
    $('.algorithm-button').css('background-color', '');
    $('#astar').addClass('active');
    $('#astar').css('background-color', selectedColor);
}
function selectUcs() {
    selectedAlgorithm = 'ucs';
    $('.algorithm').removeClass('active');
    $('.algorithm-button').css('background-color', '');
    $('#ucs').addClass('active');
    $('#ucs').css('background-color', selectedColor);
}

// grid cell click buttons
$('#select-start').click(selectStart);
$('#select-goal').click(selectGoal);
$('#select-mountain').click(selectMountain);
$('#select-cliff').click(selectCliff);
$('#select-grass').click(selectGrass);
$('#select-hills').click(selectHills);

// algorithm buttons
$('#dfs').click(selectDFS);
$('#bfs').click(selectBFS);
$('#astar').click(selectAStar);
$('#ucs').click(selectUcs);

// buttons to enable editing grid cells
$('#start').click(selectStart);
$('#goal').click(selectGoal);
$('#mountain').click(selectMountain);
$('#cliff').click(selectCliff);
$('#grass').click(selectGrass);
$('#hills').click(selectHills);

// Keyboard shortcuts
$(document).keydown(function(e) {
    switch (e.key.toLowerCase()) {
        // Terrain selection shortcuts
        case 's':
            selectStart();
            break;
        case 'g':
            selectGoal();
            break;
        case 'm':
            selectMountain();
            break;
        case 'c':
            selectCliff();
            break;
        case 'h':
            selectHills();
            break;
        case 'x':
            selectGrass();
            break;
        // Algorithm selection shortcuts
        case 'd':
            selectDFS();
            break;
        case 'b':
            selectBFS();
            break;
        case 'a':
            selectAStar();
            break;
        case 'u':
            selectUcs();
            break;
        case 'r':
            $('#reset-grid').click();
            break;
        case 'shift':
            $('#start-search').click();
            break;
    }
});

// start search w/ algo button
$('#start-search').click(function() {
    if (!startCell || !goalCell) {
        alert('Please select both start and goal cells.');
        return;
    }
    resetVisualization();
    clearSearch();
    if (selectedAlgorithm === 'bfs') {
        bfs();
    } else if (selectedAlgorithm === 'dfs') {
        dfs();
    } else if (selectedAlgorithm === 'astar') {
        astar();
    } else if (selectedAlgorithm === 'ucs') {
        ucs();
    }
});


    $('#reset-grid').click(function() {
        resetGrid();
    });

    function resetGrid() {
        $('.cell').removeClass('start goal visited frontier path');
        $('.cell').find('.start-marker').remove();
        $('.cell').empty();
        startCell = null;
        goalCell = null;
    }

    function clearSearch()  {
        if($('.cell').hasClass('visited') || $('.cell').hasClass('frontier') || $('.cell').hasClass('path')) {

            $('.cell').removeClass('visited frontier path');
            $('.cell').find('.visited-marker').remove();
            $('.cell').find('.frontier-marker').remove();
            $('.cell').find('.path-marker').remove();
        }
    }

    function resetVisualization() {
        $('.cell').removeClass('visited frontier path');
        $('.cell').find('.visited-marker').remove();
        $('.cell').find('.frontier-marker').remove();
        $('.cell').find('.path-marker').remove();
    }

    function getCell(row, col) {
        return $('.cell[data-row=' + row + '][data-col=' + col + ']');
    }

    function getNeighbors(row, col) {
        let neighbors = [];
        let dirs = [
            { row: -1, col: 0 }, // up
            { row: 1, col: 0 },  // down
            { row: 0, col: -1 }, // left
            { row: 0, col: 1 }   // right
        ];
        dirs.forEach(function(dir) {
            let nRow = row + dir.row;
            let nCol = col + dir.col;
            if (nRow >= 0 && nRow < gridSize && nCol >= 0 && nCol < gridSize) {
                neighbors.push({ row: nRow, col: nCol });
            }
        });
        return neighbors;
    }

    // BFS Algorithm
    function bfs() {
        let visited = [];
        let statesExplored = 0
        for (let row = 0; row < gridSize; row++) {
            visited[row] = [];
            for (let col = 0; col < gridSize; col++) {
                visited[row][col] = false;
            }
        }

        let queue = [];
        let cameFrom = [];
        for (let row = 0; row < gridSize; row++) {
            cameFrom[row] = [];
            for (let col = 0; col < gridSize; col++) {
                cameFrom[row][col] = null;
            }
        }

        queue.push(startCell);
        visited[startCell.row][startCell.col] = true;

        function bfsStep() {
            if (queue.length === 0) {
                alert('No path found.');
                return;
            }

            let current = queue.shift();
            let row = current.row;
            let col = current.col;
            statesExplored++;
            $('#states-explored').text('States Explored: ' + statesExplored); // <-- Update UI

            // Visualize the current node as visited
            if (!(row === startCell.row && col === startCell.col)) {
                getCell(row, col).removeClass('frontier').addClass('visited').append('<div class="visited-marker"></div>');
            }

            if (row === goalCell.row && col === goalCell.col) {
                // Found the goal
                reconstructPath(cameFrom, current);
                return;
            }

            let neighbors = getNeighbors(row, col);
            neighbors.forEach(function(neighbor) {
                let nRow = neighbor.row;
                let nCol = neighbor.col;
                if (!visited[nRow][nCol]) {
                    visited[nRow][nCol] = true;
                    queue.push({ row: nRow, col: nCol });
                    cameFrom[nRow][nCol] = current;
                    // Visualize the neighbor as frontier
                    getCell(nRow, nCol).addClass('frontier').append('<div class="frontier-marker"></div>');
                }
            });

            // Continue BFS after a delay
            setTimeout(bfsStep, 50);
        }

        bfsStep();
    }

    // UCS Algorithm
    function ucs() {
        let frontier = [];
        let statesExplored = 0;
        let cameFrom = [];
        let costSoFar = [];

        for (let row = 0; row < gridSize; row++) {
            cameFrom[row] = [];
            costSoFar[row] = [];
            for (let col = 0; col < gridSize; col++) {
                cameFrom[row][col] = null;
                costSoFar[row][col] = Infinity;
            }
        }

        costSoFar[startCell.row][startCell.col] = 0;
        frontier.push({ cell: startCell, priority: 0 });

        function ucsStep() {
            if (frontier.length === 0) {
                alert('No path found.');
                isAnimating = false;
                return;
            }

            // Get the node in frontier with the lowest cost
            frontier.sort((a, b) => a.priority - b.priority);
            let currentData = frontier.shift();
            let current = currentData.cell;
            statesExplored++;
            $('#states-explored').text('States Explored: ' + statesExplored);
            let row = current.row;
            let col = current.col;

            // Visualize the current node as visited
            if (!(row === startCell.row && col === startCell.col)) {
                getCell(row, col).removeClass('frontier').addClass('visited').append('<div class="visited-marker"></div>');
            }

            if (row === goalCell.row && col === goalCell.col) {
                // Found the goal
                reconstructPath(cameFrom, current);
                console.log('Total states explored:', statesExplored); // <-- Output total states
                $('#states-explored').text('States Explored: ' + statesExplored); // <-- Update UI
                return;
            }

            let neighbors = getNeighbors(row, col);
            neighbors.forEach(function(neighbor) {
                let nRow = neighbor.row;
                let nCol = neighbor.col;

                let cellWeight = parseInt(getCell(nRow, nCol).attr('data-weight'));
                if (cellWeight === Infinity) return; // Skip impassable cells

                let newCost = costSoFar[row][col] + cellWeight;

                if (newCost < costSoFar[nRow][nCol]) {
                    costSoFar[nRow][nCol] = newCost;
                    cameFrom[nRow][nCol] = current;
                    frontier.push({ cell: neighbor, priority: newCost });
                    getCell(nRow, nCol).addClass('frontier').append('<div class="frontier-marker"></div>');
                }
            });

            setTimeout(ucsStep, 50);
        }

        ucsStep();
    }

    // DFS Algorithm
    function dfs() {
        let visited = [];
        let statesExplored = 0;
        for (let row = 0; row < gridSize; row++) {
            visited[row] = [];
            for (let col = 0; col < gridSize; col++) {
                visited[row][col] = false;
            }
        }

        let stack = [];
        let cameFrom = [];
        for (let row = 0; row < gridSize; row++) {
            cameFrom[row] = [];
            for (let col = 0; col < gridSize; col++) {
                cameFrom[row][col] = null;
            }
        }

        stack.push(startCell);

        function dfsStep() {
            if (stack.length === 0) {
                alert('No path found.');
                return;
            }

            let current = stack.pop();
            let row = current.row;
            let col = current.col;
            statesExplored++;
            $('#states-explored').text('States Explored: ' + statesExplored); // <-- Update UI

            if (visited[row][col]) {
                setTimeout(dfsStep, 0);
                return;
            }

            visited[row][col] = true;

            // Visualize the current node as visited
            if (!(row === startCell.row && col === startCell.col)) {
                getCell(row, col).removeClass('frontier').addClass('visited').append('<div class="visited-marker"></div>');
            }

            if (row === goalCell.row && col === goalCell.col) {
                // Found the goal
                $('#states-explored').text('States Explored: ' + statesExplored); // <-- Update UI
                reconstructPath(cameFrom, current);
                return;
            }

            let neighbors = getNeighbors(row, col);
            neighbors.forEach(function(neighbor) {
                let nRow = neighbor.row;
                let nCol = neighbor.col;
                if (!visited[nRow][nCol]) {
                    stack.push({ row: nRow, col: nCol });
                    cameFrom[nRow][nCol] = current;
                    // Visualize the neighbor as frontier
                    getCell(nRow, nCol).addClass('frontier').append('<div class="frontier-marker"></div>');
                }
            });

            // Continue DFS after a delay
            setTimeout(dfsStep, 50);
        }

        dfsStep();
    }

    // A* Algorithm
    function astar() {
        let openSet = [];
        let cameFrom = [];
        let gScore = [];
        let fScore = [];
        let statesExplored = 0;

        for (let row = 0; row < gridSize; row++) {
            cameFrom[row] = [];
            gScore[row] = [];
            fScore[row] = [];
            for (let col = 0; col < gridSize; col++) {
                cameFrom[row][col] = null;
                gScore[row][col] = Infinity;
                fScore[row][col] = Infinity;
            }
        }

        gScore[startCell.row][startCell.col] = 0;
        fScore[startCell.row][startCell.col] = heuristic(startCell, goalCell);
        statesExplored++;
        
        openSet.push(startCell);

        function astarStep() {
            if (openSet.length === 0) {
                alert('No path found.');
                return;
            }

            // Get the node in openSet having the lowest fScore[] value
            let currentIndex = 0;
            for (let i = 0; i < openSet.length; i++) {
                let cell = openSet[i];
                if (fScore[cell.row][cell.col] < fScore[openSet[currentIndex].row][openSet[currentIndex].col]) {
                    currentIndex = i;
                }
            }

            let current = openSet.splice(currentIndex, 1)[0];
            let row = current.row;
            let col = current.col;
            statesExplored++;

            // Visualize the current node as visited
            if (!(row === startCell.row && col === startCell.col)) {
                getCell(row, col).removeClass('frontier').addClass('visited').append('<div class="visited-marker"></div>');
            }

            if (row === goalCell.row && col === goalCell.col) {
                // Found the goal
                $('#states-explored').text('States Explored: ' + statesExplored);
                reconstructPath(cameFrom, current);
                return;
            }

            let neighbors = getNeighbors(row, col);
            neighbors.forEach(function(neighbor) {
                let nRow = neighbor.row;
                let nCol = neighbor.col;

                let tentative_gScore = gScore[row][col] + parseInt(getCell(nRow, nCol).attr('data-weight'));


                if (tentative_gScore < gScore[nRow][nCol]) {
                    // This path to neighbor is better than any previous one
                    cameFrom[nRow][nCol] = current;
                    gScore[nRow][nCol] = tentative_gScore;
                    fScore[nRow][nCol] = gScore[nRow][nCol] + heuristic(neighbor, goalCell);

                    // If neighbor not in openSet, add it
                    if (!isInOpenSet(openSet, neighbor)) {
                        openSet.push(neighbor);
                        getCell(nRow, nCol).addClass('frontier').append('<div class="frontier-marker"></div>');
                    }
                }
            });

            // Continue A* after a delay
            setTimeout(astarStep, 100);
        }

        astarStep();
    }

    // manhattan
    function heuristic(a, b) { 
        return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
    }

    function isInOpenSet(openSet, cell) {
        for (let i = 0; i < openSet.length; i++) {
            if (openSet[i].row === cell.row && openSet[i].col === cell.col) {
                return true;
            }
        }
        return false;
    }

function reconstructPath(cameFrom, current) {
    let path = [];
    let totalCost = 0;

    while (current) {
        path.push(current);
        let prev = cameFrom[current.row][current.col];
        if (prev) {
            let weight = parseInt(getCell(current.row, current.col).attr('data-weight'));
            totalCost += weight;
        }
        current = prev;
    }

    path.reverse();

    // update path cost ui
    console.log('Path cost:', totalCost);
    $('#path-cost').text('Path Cost: ' + totalCost);

    animatePath(path);
}

    function animatePath(path) {
        let index = 0;
        function next() {
            if (index >= path.length) return;
            let cell = path[index];
            if (!(cell.row === startCell.row && cell.col === startCell.col) &&
                !(cell.row === goalCell.row && cell.col === goalCell.col)) {
                if(getCell(cell.row, cell.col).hasClass('visited')){
                    getCell(cell.row, cell.col).empty();
                }
                if(getCell(cell.row, cell.col).hasClass('frontier')){
                    getCell(cell.row, cell.col).empty();
                }
                getCell(cell.row, cell.col).append('<div class="path-marker"></div>');
            }
            index++;
            setTimeout(next, 100);
        }
        next();
    }
});
