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

interface TechnologiesState {
    step: number;
    canvasRef: React.RefObject<HTMLCanvasElement>;
}

interface techIcon {
    techURL: string;
    imgURL: string;
    name: string;
}

const scrollMultiplier = 900;
const Text1 = "I'm a software developer and systems integrator. I have experience designing, implementing, maintaining, operating and upgrading software for its entire lifecycle. These are a few of the technologies I use on a regular basis:"
const Text2 = "Besides my technical skills, I enjoy sci-fi and fantasy novels, the entire audiovisual aesthetic of Synthwave/Vaporwave, and thought-provoking or artistic video games such as Outer Wilds, Riven, KSP and Transistor."
const technologies: techIcon[] = [
    {
        name: "React",
        techURL: "https://reactjs.org/",
        imgURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png",
    },
    {
        name: "Node.JS",
        techURL: "https://nodejs.org/",
        imgURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1920px-Node.js_logo.svg.png",
    },
    {
        name: "TypeScript",
        techURL: "https://www.typescriptlang.org/",
        imgURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/TypeScript_Logo.png/220px-TypeScript_Logo.png",
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
        name: "GitHub",
        techURL: "",
        imgURL: "",
    },
    {
        name: "GitLab",
        techURL: "",
        imgURL: "",
    },
    {
        name: "PostgreSQL",
        techURL: "",
        imgURL: "",
    },
    {
        name: "PowerShell",
        techURL: "",
        imgURL: "",
    },
    {
        name: "Bash",
        techURL: "",
        imgURL: "",
    },
    {
        name: "Windows",
        techURL: "",
        imgURL: "",
    },
    {
        name: "CentOS",
        techURL: "",
        imgURL: "",
    },
    {
        name: "Docker",
        techURL: "",
        imgURL: "",
    },
    {
        name: "Consul",
        techURL: "",
        imgURL: "",
    },
    {
        name: "VS Code",
        techURL: "",
        imgURL: "",
    },
    {
        name: "Travis CI",
        techURL: "",
        imgURL: "",
    },
];

export default class Technologies extends React.Component<TechnologiesProps, TechnologiesState> {
    public static defaultProps: TechnologiesProps = {
        horizontalBars: 25,
        verticalBars: 80,
        verticalBarGapPercent: 7,
        scrollSpeed: 30,
        horizonHeightPercent: 20,
        vanishingPointHeightExtraPercent: 5,
        lineStyle: "magenta"
    }
    // ctx: CanvasRenderingContext2D;
    constructor(props: TechnologiesProps | Readonly<TechnologiesProps>) {
        super(props);
        this.state = {
            canvasRef: React.createRef<HTMLCanvasElement>(),
            step: 0
        };
        this.paint = this.paint.bind(this);
        this.frames = this.frames.bind(this);
    }
    render() {
        return (
            <div className="Technologies">
                <canvas ref={this?.state?.canvasRef} className="Technologies-canvas" />
                <div className="Technologies-overlay">
                    <div className="Technologies-textwrapper">
                        <header className="Technologies-text">{Text1}</header>
                        {renderTechnologies()}
                        <header className="Technologies-text">{Text2}</header>
                    </div>
                </div>
            </div>
        )
    }
    componentDidMount() {
        requestAnimationFrame(this.paint);
    }
    paint() {
        let canvas = this?.state?.canvasRef.current;
        if (canvas === undefined || canvas === null) {
            return
        }
        canvas = canvas as HTMLCanvasElement;
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        let context = canvas.getContext("2d");
        if (context === null) {
            return
        }
        context.clearRect(0, 0, canvas.width, canvas.height);
        if (context.fillStyle) {
            context.fillStyle = "black";
            context.fillRect(0, 0, canvas.width, canvas.height);
        }
        context.beginPath();
        context.fillStyle = "red";
        context.arc(50, 50, 50, 0, 2 * Math.PI);
        context.fill();
        drawLines(context, canvas.height, canvas.width, this.props, this.state);
        this.setState({
            step: (this.state.step + 1) % this.frames()
        })
        requestAnimationFrame(this.paint);
    }
    frames(): number {
        return scrollMultiplier / this.props.scrollSpeed;
    }
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

function renderTechnologies(): JSX.Element[] {
    let elems: JSX.Element[] = [];
    for (let i = 0; i < technologies.length / 8; i++) {
        console.log(i);
        elems.push(
            <div className="Technologies-icons">
                {renderTechRow(i)}
            </div>);
    }
    return elems;
}

function renderTechRow(i: number): JSX.Element[] {
    let innerElems: JSX.Element[] = [];
    for (let j = i * 8; j < (i * 8) + 8 && j < technologies.length; j++) {
        console.log(i, j)
        let tech = technologies[j];
        innerElems.push(
            <a href={tech.techURL}>
                <img className="Technologies-img" alt={tech.name} src={tech.imgURL} />
            </a>
        )
    }
    return innerElems
}