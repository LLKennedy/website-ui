import React from 'react';
import { render } from '@testing-library/react';
import Technologies, { paintCanvas, TechnologiesProps, TechnologiesState } from './Technologies';
import { Mock } from 'moq.ts';

it('renders correctly', async () => {
    let techRef = React.createRef<Technologies>();
    const tech = render(<Technologies ref={techRef} />);
    expect(tech).toMatchSnapshot();
    let real = techRef.current;
    expect(real).not.toBe(null);
    expect(real).not.toBe(undefined);
});

it('paints without error correctly', async () => {
    const fakeHeight = 1000;
    const fakeWidth = 10000;
    const circleHeight = fakeHeight / 8;
    let canvas = new Mock<HTMLCanvasElement>();
    let ctx = new Mock<CanvasRenderingContext2D>();
    let props: TechnologiesProps = {
        horizonHeightPercent: 50,
        horizontalBars: 1,
        lineStyle: "cyan",
        scrollSpeed: 30,
        vanishingPointHeightExtraPercent: 10,
        verticalBarGapPercent: 50,
        verticalBars: 1
    };
    let fakeRef = React.createRef<HTMLCanvasElement>();
    let state: TechnologiesState = {
        canvasRef: fakeRef,
        step: 0,
    };
    let grad = new Mock<CanvasGradient>();

    grad.setup(instance => instance.addColorStop(0, "red")).returns();
    grad.setup(instance => instance.addColorStop(1, "orange")).returns();

    const gradObj = grad.object();
    expect(gradObj).not.toBeUndefined();

    ctx.setup(instance => instance.clearRect(0, 0, fakeWidth, fakeHeight)).returns();
    ctx.setup(instance => instance.createLinearGradient(0, 0, 0, circleHeight)).returns(gradObj);
    ctx.setup(instance => instance.beginPath()).returns();
    ctx.setup(instance => instance.arc(fakeWidth / 2, circleHeight, circleHeight, 0, Math.PI * 2)).returns();
    ctx.setup(instance => instance.fill()).returns();
    let validStartCoords = [[4875, 137.5], [4875, 162.5], [4875, 187.5], [4875, 212.5], [0, 500], [0, 501], [5000, 1000]];
    let validEndCoords = [[5125, 137.5], [5125, 162.5], [5125, 187.5], [5125, 212.5], [10000, 500], [10000, 501], [5000, 500]];
    ctx.setup(instance => instance.moveTo).returns((x: number, y: number) => {
        expect(validStartCoords).toContainEqual([x, y]);
    })
    ctx.setup(instance => instance.lineTo).returns((x: number, y: number) => {
        expect(validEndCoords).toContainEqual([x, y]);
    })
    ctx.setup(instance => instance.stroke()).returns();


    canvas.setup(instance => instance.clientHeight).returns(fakeHeight);
    canvas.setup(instance => instance.clientWidth).returns(fakeWidth);
    canvas.setup(instance => instance.getContext("2d")).returns(ctx.object())

    paintCanvas(canvas.object(), props, state);
})