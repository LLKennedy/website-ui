import React from 'react';
import './Technologies.css'

export interface TechnologiesProps {
    horizontalBars?: number;
    verticalBars?: number;
    scrollSpeed?: number;
    horizonHeightPercent?: number;
}
const framesPerStep = 30;

interface TechnologiesState {
    step: number;
    canvasRef: React.RefObject<HTMLCanvasElement>;
}

export default class Technologies extends React.Component<TechnologiesProps, TechnologiesState> {
    public static defaultProps = {
        horizontalBars: 40,
        verticalBars: 40,
        scrollSpeed: 10,
        horizonHeightPercent: 60
    }
    // ctx: CanvasRenderingContext2D;
    constructor(props: TechnologiesProps | Readonly<TechnologiesProps>) {
        super(props);
        this.state = {
            canvasRef: React.createRef<HTMLCanvasElement>(),
            step: 0
        };
        this.paint = this.paint.bind(this);
    }
    render() {
        // useEffect(() => {
        //     let canvas = this?.state?.canvasRef.current;
        //     let context = canvas?.getContext("2d");
        //     context?.beginPath();
        //     context?.arc(50, 50, 50, 0, 2 * Math.PI);
        //     context?.fill();
        // })
        return (
            <div className="Technologies">
                <canvas ref={this?.state?.canvasRef} className="Technologies-canvas" />
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
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        let context = canvas.getContext("2d");
        if (context === null) {
            return
        }
        // context.scale(window.devicePixelRatio, window.devicePixelRatio);
        context.clearRect(0, 0, canvas.width, canvas.height);
        if (context.fillStyle) {
            context.fillStyle = "black";
            context.fillRect(0, 0, canvas.width, canvas.height);
        }
        context.beginPath();
        context.fillStyle = "red";
        context.arc(50, 50, 50, 0, 2 * Math.PI);
        context.fill();
        drawLines(context, canvas.height, canvas.width, this.props.horizontalBars as number, this.props.horizonHeightPercent as number, this.state.step);
        this.setState({
            step: (this.state.step + 1) % (this.props.horizontalBars as number * framesPerStep)
        })
        requestAnimationFrame(this.paint);
    }
}

function drawLines(ctx: CanvasRenderingContext2D, height: number, width: number, numBars: number, horizonPercent: number, step: number) {
    ctx.lineWidth = 1;
    const expbase = 1.3;
    let upperLim = (horizonPercent / 100) * height
    let toBottom = Math.log2(height - upperLim) / Math.log2(expbase);
    drawHorizontalLine(ctx, upperLim, width, "magenta");
    let frameBars = numBars * framesPerStep
    for (let i = 0; i < numBars; i++) {
        let stepLineY = Math.pow(expbase, toBottom * (((step + (i * framesPerStep)) % frameBars)) / frameBars)
        drawHorizontalLine(ctx, upperLim + stepLineY, width, "magenta");
    }
}

function drawHorizontalLine(ctx: CanvasRenderingContext2D, height: number, width: number, stroke: string | CanvasGradient | CanvasPattern) {
    ctx.strokeStyle = stroke;
    ctx.beginPath();
    ctx.moveTo(0, height);
    ctx.lineTo(width, height);
    ctx.stroke();
}