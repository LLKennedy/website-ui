import React from 'react';
import './Technologies.css'

export interface TechnologiesProps {
    horizontalBars: number;
    verticalBars: number;
    verticalBarGapPercent: number;
    scrollSpeed: number;
    horizonHeightPercent: number;
    vanishingPointHeightExtraPercent: number;
    lineStyle: string | CanvasGradient | CanvasPattern;
}

export interface TechnologiesState {
    step: number;
    canvasRef: React.RefObject<HTMLCanvasElement>;
}

export interface techIcon {
    techURL: string;
    imgURL: string;
    name: string;
}

const scrollMultiplier = 900;

const workStartDate = new Date(2016, 3);
const Text1_1 = "I'm a software developer and systems integrator. I have "
const Text1_2 = " years of experience designing, implementing, maintaining, operating and upgrading software for its entire lifecycle. These are a few of the technologies I use on a regular basis:"
const Text2 = "Besides my technical skills, I enjoy sci-fi and fantasy novels, the entire audiovisual aesthetic of Synthwave/Vaporwave, and thought-provoking or artistic video games such as Outer Wilds, Riven, KSP and Transistor."
const technologies: techIcon[] = [
    {
        name: "Bash",
        techURL: "https://www.gnu.org/software/bash/",
        imgURL: "https://www.linuxjournal.com/sites/default/files/styles/850x500/public/nodeimage/story/Gnu-bash-logo_1.png",
    },
    {
        name: "CentOS",
        techURL: "https://www.centos.org/",
        imgURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/CentOS_Graphical_Symbol.svg/1024px-CentOS_Graphical_Symbol.svg.png",
    },
    {
        name: "Consul",
        techURL: "https://www.consul.io/",
        imgURL: "https://i1.wp.com/www.stefreitag.de/wp/wp-content/uploads/2019/01/consul-vertical-color.png?resize=678%2C675&ssl=1",
    },
    {
        name: "Docker",
        techURL: "https://www.docker.com/",
        imgURL: "https://www.docker.com/sites/default/files/mono-vertical.png",
    },
    {
        name: "GitHub",
        techURL: "https://github.com/",
        imgURL: "https://maxcdn.icons8.com/Share/icon/nolan/logos/github1600.png",
    },
    {
        name: "GitLab",
        techURL: "https://gitlab.com",
        imgURL: "https://upload.wikimedia.org/wikipedia/commons/1/18/GitLab_Logo.svg",
    },
    {
        name: "Go",
        techURL: "https://golang.org/",
        imgURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Go_Logo_Aqua.svg/1200px-Go_Logo_Aqua.svg.png",
    },
    {
        name: ".NET Core",
        techURL: "https://dotnet.microsoft.com/",
        imgURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/.NET_Core_Logo.svg/1200px-.NET_Core_Logo.svg.png",
    },
    {
        name: "Node.JS",
        techURL: "https://nodejs.org/",
        imgURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1920px-Node.js_logo.svg.png",
    },
    {
        name: "PostgreSQL",
        techURL: "https://www.postgresql.org/",
        imgURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/1200px-Postgresql_elephant.svg.png",
    },
    {
        name: "PowerShell",
        techURL: "https://docs.microsoft.com/en-us/powershell/",
        imgURL: "https://docs.microsoft.com/en-us/powershell/media/index/powershell_128.svg",
    },
    {
        name: "React",
        techURL: "https://reactjs.org/",
        imgURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png",
    },
    {
        name: "Travis CI",
        techURL: "https://travis-ci.com/",
        imgURL: "https://miro.medium.com/max/501/1*IP7q20j8JJK6dB2Jy1pcig.png",
    },
    {
        name: "TypeScript",
        techURL: "https://www.typescriptlang.org/",
        imgURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/TypeScript_Logo.png/220px-TypeScript_Logo.png",
    },
    {
        name: "VS Code",
        techURL: "https://code.visualstudio.com/",
        imgURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Visual_Studio_Code_1.35_icon.svg/1200px-Visual_Studio_Code_1.35_icon.svg.png",
    },
    {
        name: "Windows",
        techURL: "https://www.microsoft.com/en-us/windows",
        imgURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Windows_logo_%E2%80%93_2012_%28dark_blue%29.svg/90px-Windows_logo_%E2%80%93_2012_%28dark_blue%29.svg.png",
    },
];

export default class Technologies extends React.Component<TechnologiesProps, TechnologiesState> {
    public static defaultProps: TechnologiesProps = {
        horizontalBars: 50,
        verticalBars: 200,
        verticalBarGapPercent: 7,
        scrollSpeed: 30,
        horizonHeightPercent: 45,
        vanishingPointHeightExtraPercent: 5,
        lineStyle: "magenta"
    }
    constructor(props: TechnologiesProps | Readonly<TechnologiesProps>) {
        super(props);
        this.state = {
            canvasRef: React.createRef<HTMLCanvasElement>(),
            step: 0
        };
        this.paint = this.paint.bind(this);
    }
    render() {
        return (
            <div className="Technologies">
                <canvas ref={this?.state?.canvasRef} className="Technologies-canvas" />
                <div className="Technologies-overlay">
                    <div className="Technologies-textwrapper">
                        <header className="Technologies-text">{Text1_1 + (new Date().getFullYear() - workStartDate.getFullYear()) + Text1_2}</header>
                        {renderTechnologies()}
                    </div>
                    <div className="Technologies-textwrapper-bottom">
                        <header className="Technologies-text">{Text2}</header>
                    </div>
                </div>
            </div>
        )
    }
    componentDidMount() {
        requestAnimationFrame(this.paint);
    }
    public paint() {
        let canvas = this?.state?.canvasRef.current;
        if (canvas === undefined || canvas === null) {
            return;
        }
        paintCanvas(canvas, this.props, this.state);
        this.setState({
            step: (this.state.step + 1) % frames(this.props)
        })
        requestAnimationFrame(this.paint);
    }
}

function frames(props: Readonly<TechnologiesProps>): number {
    return scrollMultiplier / props.scrollSpeed;
}

export function paintCanvas(canvas: HTMLCanvasElement, props: Readonly<TechnologiesProps>, state: Readonly<TechnologiesState>) {
    canvas = canvas as HTMLCanvasElement;
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    let context = canvas.getContext("2d");
    if (context === null) {
        return
    }
    const bgColour = "#000033";
    context.clearRect(0, 0, canvas.width, canvas.height);
    if (context.fillStyle) {
        context.fillStyle = bgColour;
        context.fillRect(0, 0, canvas.width, canvas.height);
    }
    const circleHeight = canvas.height / 8;
    let grad = context.createLinearGradient(0, 0, 0, circleHeight);
    grad.addColorStop(0, "red");
    grad.addColorStop(1, "orange");
    drawSun(context, grad, canvas.width / 2, circleHeight, circleHeight, [
        {
            y: 45,
            width: circleHeight / 80,
        },
        {
            y: 35,
            width: circleHeight / 40,
        },
        {
            y: 25,
            width: circleHeight / 20,
        },
        {
            y: 15,
            width: circleHeight / 10,
        },
    ], bgColour);
    drawLines(context, canvas.height, canvas.width, props, state);
}

function drawLines(ctx: CanvasRenderingContext2D, height: number, width: number, props: Readonly<TechnologiesProps>, state: Readonly<TechnologiesState>) {
    ctx.lineWidth = 1;
    const upperLim = (1 - (props.horizonHeightPercent / 100)) * height
    const toBottom = Math.log2(height - upperLim)
    drawHorizontalLine(ctx, upperLim, width, props.lineStyle);
    const frameBars = props.horizontalBars * scrollMultiplier / props.scrollSpeed
    for (let i = 0; i < props.horizontalBars; i++) {
        const stepLineY = Math.pow(2, toBottom * (((state.step + (i * scrollMultiplier / props.scrollSpeed)) % frameBars)) / frameBars)
        drawHorizontalLine(ctx, upperLim + stepLineY, width, props.lineStyle);
    }
    const oneGap = (props.verticalBarGapPercent / 100) * width;
    const totalWidth = (props.verticalBars - 1) * oneGap;
    const vertStart = (-totalWidth / 2) + (width / 2);
    for (let i = 0; i < props.verticalBars; i++) {
        drawVerticalLine(ctx, height, (props.vanishingPointHeightExtraPercent / 100) * height, width, upperLim, vertStart + (i * oneGap), props.lineStyle);
    }
}

function drawHorizontalLine(ctx: CanvasRenderingContext2D, height: number, width: number, stroke: string | CanvasGradient | CanvasPattern) {
    ctx.strokeStyle = stroke;
    ctx.beginPath();
    ctx.moveTo(0, height);
    ctx.lineTo(width, height);
    ctx.stroke();
}

function drawVerticalLine(ctx: CanvasRenderingContext2D, height: number, vanishingExtraHeight: number, width: number, originY: number, startX: number, stroke: string | CanvasGradient | CanvasPattern) {
    ctx.strokeStyle = stroke;
    const originX = width / 2;
    const horizonHeight = height - originY;
    const vanishingHeight = horizonHeight + vanishingExtraHeight;
    const angle = Math.atan(vanishingHeight / (originX - startX));
    // const partialX = startX + (vanishingExtraHeight / Math.tan(angle));
    const dstX = startX + (horizonHeight / Math.tan(angle));
    ctx.beginPath();
    ctx.moveTo(startX, height);
    ctx.lineTo(dstX, originY);
    ctx.stroke();
}

function drawSun(ctx: CanvasRenderingContext2D, fill: string | CanvasGradient | CanvasPattern, centreX: number, centreY: number, radius: number, bands: { y: number, width: number }[], background: string | CanvasGradient | CanvasPattern) {
    ctx.beginPath();
    ctx.fillStyle = fill;
    ctx.arc(centreX, centreY, radius, 0, 2 * Math.PI);
    ctx.fill();
    for (let i = 0; i < bands.length; i++) {
        let band = bands[i];
        let dstY = (centreY + radius) - (band.y / 100) * 2 * radius;
        ctx.beginPath();
        ctx.lineWidth = band.width;
        ctx.strokeStyle = background;
        ctx.moveTo(centreX - radius, dstY);
        ctx.lineTo(centreX + radius, dstY);
        ctx.stroke();
    }
}

function renderTechnologies(): JSX.Element[] {
    let elems: JSX.Element[] = [];
    for (let i = 0; i < technologies.length / 8; i++) {
        let id = "technologies-row-" + i
        elems.push(
            <div className="Technologies-icons" key={id}>
                {renderTechRow(i)}
            </div>);
    }
    return elems;
}

function renderTechRow(i: number): JSX.Element[] {
    let innerElems: JSX.Element[] = [];
    for (let j = i * 8; j < (i * 8) + 8 && j < technologies.length; j++) {
        let tech = technologies[j];
        let id = "technologies-row-" + i + "-item-" + j;
        innerElems.push(
            <a href={tech.techURL} key={id}>
                <img className="Technologies-img" alt={tech.name} src={tech.imgURL} />
            </a>
        )
    }
    return innerElems
}