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

const scrollMultiplier = 900;

export default class Technologies extends React.Component<TechnologiesProps, TechnologiesState> {
    public static defaultProps: TechnologiesProps = {
        horizontalBars: 25,
        verticalBars: 80,
        verticalBarGapPercent: 10,
        scrollSpeed: 30,
        horizonHeightPercent: 40,
        vanishingPointHeightExtraPercent: 7,
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
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
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