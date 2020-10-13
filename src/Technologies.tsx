import React from 'react';
import './Technologies.css'

export interface TechnologiesProps {
    horizontalBars?: number;
    verticalBars?: number;
    scrollSpeed?: number;
    horizonHeightPercent?: number;
}

interface TechnologiesState {
    step: number;
    canvasRef: React.RefObject<HTMLCanvasElement>;
}

export default class Technologies extends React.Component<TechnologiesProps, TechnologiesState> {
    public static defaultProps = {
        horizontalBars: 40,
        verticalBars: 40,
        scrollSpeed: 10,
        horizonHeightPercent: 50
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
        this.drawHorizontalLines(context, canvas.height, canvas.width, this.props.horizontalBars as number, this.props.horizonHeightPercent as number, this.state.step);
        requestAnimationFrame(this.paint);
    }
    drawHorizontalLines(ctx: CanvasRenderingContext2D, height: number, width: number, numBars: number, horizonPercent: number, step: number) {
        ctx.lineWidth = 1;
        ctx.strokeStyle = "magenta";
        let bottom = height;

        let flatGap = (horizonPercent / 100) * height / numBars;
        for (let i = 0; i < numBars; i++) {
            let newH = bottom - (40 * Math.log2(i * flatGap));
            ctx.beginPath();
            ctx.moveTo(0, newH);
            ctx.lineTo(width, newH);
            ctx.stroke();
        }
    }
}