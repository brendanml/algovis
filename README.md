# Land Grid Pathfinding Visualization

A simple web-based tool to visualize pathfinding algorithms on a grid with various terrain types.

## Description

This project allows you to explore how different pathfinding algorithms work on a grid representing land with different terrains. You can set start and goal points, modify terrain types, and watch algorithms like BFS, DFS, A\*, and UCS find the optimal path.

Once a path is found it will display the generated path cost as well as the number of states reached in finding it.

## Features

- **Terrain Types**: Grass, Hills, Mountains, and Cliffs with varying traversal costs.
- **Algorithms**:
  - **BFS** (Breadth-First Search)
  - **DFS** (Depth-First Search)
  - **A\*** (A-Star Search)
  - **UCS** (Uniform Cost Search)
- **Visualization**: Step-by-step animation of the algorithm's process.
- **Interactive Grid**: Click to set start/goal points and change terrains.
- **Keyboard Shortcuts**: Quick selection of tools and algorithms.

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge, etc.)

### Installation

1. **Download the Files**: Ensure you have the following files in the same directory:
   - `index.html`
   - `style.css`
   - `app.js`
2. **Open the Application**:
   - Open `index.html` in your web browser.

## Usage

### Setting Up the Grid

1. **Select Terrain or Points**:
   - Click on a selection button in the toolbar or use keyboard shortcuts.
     - **Start Point**: "Select Start (s)"
     - **Goal Point**: "Select Goal (g)"
     - **Mountain**: "Select Mountain (m)"
     - **Hills**: "Select Hills (h)"
     - **Grass**: "Select Grass (x)"
     - **Cliff**: "Select Cliff (c)"
2. **Modify the Grid**:
   - Click on cells in the grid to apply the selected terrain or set start/goal points.

### Choosing an Algorithm

- Click on an algorithm button or use keyboard shortcuts:
  - **BFS**: "BFS (b)"
  - **DFS**: "DFS (d)"
  - **A\***: "A\* (a)"
  - **UCS**: "UCS (u)"

### Running the Algorithm

- Click the "Start Search (Shift)" button or press the **Shift** key.
- The algorithm will visualize its search process on the grid.
- **States Explored** and **Path Cost** will be displayed below the grid.

#### Path Cost and States Explored
- Path cost is determined by cost to traverse onto tile:
  - Grass (light green): 1
  - Hills (dark green): 2
  - Mountains (gray): 3
  - Cliff (black): 100
- States explored: Number of states reached (darker white dots). Excludes frontier nodes.

### Resetting

- Click "Reset Grid (r)" or press **r** to clear the grid and start fresh.

## Controls and Shortcuts

- **Terrain and Points Selection**:
  - **s**: Select Start Point
  - **g**: Select Goal Point
  - **m**: Select Mountain Terrain
  - **h**: Select Hills Terrain
  - **x**: Select Grass Terrain
  - **c**: Select Cliff Terrain
- **Algorithm Selection**:
  - **b**: Breadth-First Search (BFS)
  - **d**: Depth-First Search (DFS)
  - **a**: A-Star Search (A\*)
  - **u**: Uniform Cost Search (UCS)
- **Other Controls**:
  - **Shift**: Start Search
  - **r**: Reset Grid

## Technologies Used

- **HTML**: Structure of the application.
- **CSS**: Styling and layout.
- **JavaScript (jQuery)**: Interactive functionality and algorithm implementations.

## License

This project is open-source and available under the [MIT License](LICENSE).

## Acknowledgments

- Inspired by common pathfinding visualization tools used in computer science education.