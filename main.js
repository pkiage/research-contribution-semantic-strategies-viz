import './style.css';
import data from './data.json';
import * as d3 from 'd3';

// define helper functions

// get the angle between two points
const getAngle = (anchor, point) => {
    let a = Math.atan2(point.y - anchor.y, point.x - anchor.x);
    if (a < 0) a += 2 * Math.PI; //angle is now in radians

    a -= Math.PI / 2; //shift by 90deg
    //restore value in range 0-2pi instead of -pi/2-3pi/2
    if (a < 0) a += 2 * Math.PI;
    if (a < 0) a += 2 * Math.PI;
    a = Math.abs(Math.PI * 2 - a); //invert rotation
    a = (a * 180) / Math.PI; //convert to deg

    return a;
};

// rotate a point
const radialPoint = (x, y) => [
    (y = +y) * Math.cos((x -= Math.PI / 2)),
    y * Math.sin(x)
];

// rotate a point scaling the radius
const nodePoint = (x, y, scale) => [
    y * Math.cos((x -= Math.PI / 2)) * scale,
    y * Math.sin(x) * scale
];

//   get the distance between two points
const getHypot = (p1, p2) => Math.hypot(p2.x - p1.x, p2.y - p1.y);

// define variables
const w = window.innerWidth;
const h = window.innerHeight;

const margin = { top: 25, right: 80, bottom: 20, left: 80 };
const width = w - margin.right - margin.left;
const height = h - margin.top - margin.bottom;

const radius = (height / 2) * 0.8;

const center = { x: (w / 2) * 0.95, y: h / 2 };

const scale = 2.3;

const strategyWidth = 210;
let strategyTitleWidth = 150;

const strategyTitlesPos = [
    { x: width - width / 4 + strategyTitleWidth, y: height / 4 - 10 },
    {
        x: width - width / 4 + strategyTitleWidth + 30,
        y: height - height / 4 + 15
    },
    { x: width / 4 - strategyTitleWidth - 30, y: height - height / 4 },
    { x: width / 4 - strategyTitleWidth - 50, y: height / 4 - 30 }
];

// const footerText = ``;

// initialize layout items

// initialize strategy tree object
const tree = d3
    .tree()
    .size([2 * Math.PI, (radius / scale) * 1.6])
    .separation((a, b) => (a.parent == b.parent ? 1 : 2) / a.depth);

// initialize svg object
const svg = d3
    .select('.main')
    .append('svg')
    .attr('width', width + margin.right + margin.left)
    .attr('height', height + margin.top + margin.bottom);

// insert header
const header = d3
    .select('.main')
    .append('h1')
    .text('Research Contribution');

/*const footer = d3
    .select('.main')
    .append('div')
    .html(footerText)
    .attr('class', 'footer');
*/

// initialize svg group object
const g = svg
    .append('g')
    .attr('transform', `translate(${center.x},${center.y})`);

// load the external data
/*d3.json("data.json", function(error, data) {
    root = data;
    update(root);
});*/
const root = data;
update(root);

function update(source) {
    // update data array to include id
    Array.from(root.children).forEach((problem, ix) => {
        problem['id'] = ix;
        problem.children.forEach(strategy => {
            strategy['id'] = ix;
            strategy.children.forEach(value => {
                value['id'] = ix;
            });
        });
    });

    // declares a tree layout and assigns the size
    let nodes = d3.hierarchy(root, ({ children }) => children);
    nodes = tree(nodes);

    // define the tree links
    const link = g
        .selectAll('.link')
        .data(nodes.links())
        .enter()
        .append('path')
        .attr('class', ({ target }) => `link link-${target.data.id}`)
        .attr(
            'd',
            d3
                .linkRadial()
                .angle(({ x }) => x)
                .radius(({ y }) => y)
        );

    g.append('circle')
        .attr('r', () => {
            const nodes2Tier = nodes
                .descendants()
                .filter(({ depth }) => depth == 2);
            const p1 = nodes2Tier[0];
            const p2 = nodePoint(p1.x, p1.y, scale);
            const rad = getHypot({ x: 0, y: 0 }, { x: p2[0], y: p2[1] });
            return rad;
        })
        .style('fill', 'none')
        .attr('class', 'main-circle');

    //   create node groups
    const node = g
        .selectAll('.node')
        .data(nodes.descendants())
        .enter()
        .append('g')
        .attr('class', d => `node node-${d.data.id}`)
        .attr('transform', ({ depth, x, y }) => {
            if (depth == 3) {
                return `translate(${radialPoint(x, y)})`;
            }
        });

    node.append('circle')
        .attr('r', ({ depth }) => {
            if (depth == 3) {
                return 2;
            } else if (depth == 2) {
                return 5;
            } else {
                return 0;
            }
        })
        .attr('cx', ({ depth, x, y }) => {
            if (depth == 2) {
                const point = nodePoint(x, y, scale);
                return point[0];
            }
        })
        .attr('cy', ({ depth, x, y }) => {
            if (depth == 2) {
                const point = nodePoint(x, y, scale);
                return point[1];
            }
        })
        .attr('stroke', 'white')
        .attr('stroke-width', 1);

    node.append('text')
        .attr('dy', '0.31em')
        .attr('x', ({ x, children }) => (x < Math.PI === !children ? 6 : -6))
        .attr('text-anchor', ({ x, children }) =>
            x < Math.PI === !children ? 'start' : 'end'
        )
        .attr(
            'transform',
            ({ x }) =>
                `rotate(${((x < Math.PI ? x - Math.PI / 2 : x + Math.PI / 2) *
                    180) /
                    Math.PI})`
        )
        .text(d => {
            if (d.depth == 3) {
                return d.data.name;
            }
        })
        .style('font-size', () => {
            const size = radius / (radius * scale);
            return `${size.toFixed(2)}em`;
        });

    d3.select('.strategies').attr(
        'style',
        () => `left: ${center.x}px; top: ${center.y}px;`
    );

    // insert strategy text
    const strategy = d3
        .select('.strategies')
        .selectAll('.strategy')
        .data(() => {
            const nodesStrategies = nodes
                .descendants()
                .filter(({ depth }) => depth == 2);
            return nodesStrategies;
        })
        .enter()
        .append('div')
        .attr('class', 'strategy')
        .attr('style', d => {
            const point = nodePoint(d.x, d.y, scale);
            const stringLen = d.data.name.length;
            const angle = getAngle(
                { x: 0, y: 0 },
                { x: point[0], y: point[1] }
            );
            let align;
            let left;
            let top;

            if (angle > 180 && angle < 360) {
                align = 'right';
                left = point[0] - strategyWidth - 15;
            } else {
                align = 'left';
                left = point[0] + 15;
            }

            if (stringLen > 50 && stringLen < 80) {
                top = point[1] - 10;
            } else if (stringLen > 80) {
                top = point[1] - 15;
            } else {
                top = point[1] - 8;
            }

            return `left: ${left}px; top: ${top}px; text-align: ${align}; width: ${strategyWidth}px;`;
        })
        .append('span')
        .attr('class', d => `text text-${d.data.id}`)
        .text(d => d.data.name);

    //   insert strategy titles
    const strategyTitle = d3
        .select('.main')
        .selectAll('.strategy-title')
        .data(() => {
            const nodeTitles = nodes
                .descendants()
                .filter(({ depth }) => depth == 1);
            return nodeTitles;
        })
        .enter()
        .append('div')
        .attr('class', d => `strategy-title node-${d.data.id}`)
        .attr('style', (d, ix) => {
            const stringLen = d.data.name.length;
            if (stringLen < 20) {
                strategyTitleWidth = 90;
            } else if (stringLen > 25) {
                strategyTitleWidth = 200;
            }

            return `left: ${strategyTitlesPos[ix].x}px; top: ${strategyTitlesPos[ix].y}px; width: ${strategyTitleWidth}px;`;
        })
        .text(d => d.data.name);
}
