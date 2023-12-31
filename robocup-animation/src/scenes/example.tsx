import { makeScene2D } from "@motion-canvas/2d/lib/scenes";
import { Node, Circle, Grid, Line } from "@motion-canvas/2d/lib/components";
import { all, delay, waitFor } from "@motion-canvas/core/lib/flow";
import { Vector2 } from "@motion-canvas/core/lib/types";
import { createRef } from "@motion-canvas/core/lib/utils";
import { createSignal } from "@motion-canvas/core/lib/signals";
import { Img } from "@motion-canvas/2d";
import { Path, Rect } from "@motion-canvas/2d";
import mapImg from "../../../images/map2.png";
import {
  deepLerp,
  easeInCirc,
  easeInExpo,
  easeInOutExpo,
  easeInQuad,
  easeOutCubic,
  easeOutExpo,
  easeOutQuad,
  linear,
} from "@motion-canvas/core";
const RED = "#ff6470";
const GREEN = "#99C47A";
const BLUE = "#68ABDF";

export default makeScene2D(function* (view) {
  const offset = new Vector2(-752, -320);
  const robotWidth = 60;
  const robotHeight = 50;

  const topRightWheel_offset = new Vector2(
    robotWidth / 2 - 10,
    robotHeight / 2 + 3
  );
  const topLeftWheel_offset = new Vector2(
    -robotWidth / 2 + 10,
    robotHeight / 2 + 3
  );
  const bottomRightWheel_offset = new Vector2(
    robotWidth / 2 - 10,
    -robotHeight / 2 - 3
  );
  const bottomLeftWheel_offset = new Vector2(
    -robotWidth / 2 + 10,
    -robotHeight / 2 - 3
  );

  view.add(<Img src={mapImg} />);

  // First Robot (Robot1)
  const pathData1 =
    "m1717.5,330.71c-.08-4.03-.17-25.87-.28-40-1.37-40.85-6.95-62.86-10.72-79-15.66-67.05-77.09-119.55-94-134-8.41-7.18-80.19-67.48-167-76-36.84-3.62-75,2-75,2-23.28,3.43-40.77,8.69-48,11-27.67,8.83-47.03,19.59-62,28-28,18-33,22-60,40,0,0-12,6.98-31.97,23.77-2.28,1.92-4.63,3.95-7.03,7.23-7.29,9.99-7.43,20.59-7.54,28.82-.13,9.15-.3,20.95,7.54,32.18,11.73,16.8,31.93,18.79,35.38,19.12,7.63.75,13.66-.45,16.62-1.12,39.1-8.97,96.15-54.77,110-66,12.39-10.05,26.84-22.1,49.18-28.93,15.99-4.9,25.36-3.85,31.82-2.07,2.86.79,19.56,5.72,28,21,9.27,16.78-.98,28.75,8,42,3.71,5.47,7.18,5.96,31,15,44.21,16.78,43.65,19.41,65,25,9.7,2.54,19.29,5.49,29,8,15.09,3.9,20.59,4.92,26,10,7.99,7.5,9.48,17.96,10,22,2.2,17.08-7.29,20.82-16,49-4.09,13.22-12.24,45.52-14,53-.44,1.87-1.76,7.62-6.01,13.66,0,0-.51.72-.99,1.34-8.28,10.62-29.57,10.65-35,23-.55,1.25-.8,2.31-1.18,3.92-1.92,8.16-.22,14.64.18,17.08,1.74,10.73-9.81,16.49-16,31-7.31,17.14,2.81,23.21-2,41-6.34,23.42-30.06,35.78-37,39-3.65,1.7-32.58,14.55-62,0-23.49-11.62-32.44-33.35-36-42-6.58-15.98-5.81-34.54-4-71,1.47-29.65.01-59.47,3-89,1.02-10.12,2.31-20.29-4-27-8.02-8.53-22.33-5.11-47-3-42.01,3.6-40.12-3.3-59,1-9.09,2.07-9.53,3.51-62,36-28,17-39.13,20.61-63,36-10.34,6.66-16.75,11.22-27,12-15.95,1.21-34.19-7.24-44-23-.7-1.13-13.23-21.91-5-41,7.69-17.82,26.48-17.96,31-37,2.03-8.55-.05-15.73-1-19-5.96-20.58-26.28-29.85-31-32-16.77-7.65-18.74.06-57-5-19.32-2.55-27.8-5.7-37,0-9.97,6.18-13.19,18.04-14,21,1,15,1.27,15.18,2,37,.74,22.18-3.47,27.83-5.48,29.58-.12.1-.29.24-.52.42-6.46,4.89-17.18,4.52-23,0-5.11-3.97-5.48-10.42-6-23-.43-10.41.87-13.94,2-28,.66-8.2.77-16.13,1-32,.19-13.46.02-19.95,0-30-.12-49.26-.18-73.9,0-79,.45-13.15,1.05-21.9-5-27-6.03-5.08-16.97-5.1-23,0-5.1,4.31-5.17,11-5,26,.48,41.04,1,65,1,65,.06,1.12.04,6.08,0,16-.02,6.36-.06,8.35-1,11-2.26,6.38-7.42,9.92-9,11-6.87,4.71-14.22,4.37-24,4-11-.41-22-.56-33-1-30.6-1.23-34.2,3.52-46-1-11.66-4.47-11.33-18.21-25-22-2.11-.58-4.74-.72-10-1-24.89-1.31-27.78,3.59-35,0-10.82-5.38-8.43-18.46-21-23-1.5-.54-3.05-.9-11-1-28.01-.34-32.02,3.88-38,0-9.7-6.29-4.55-20.9-15-26-3.03-1.48-4.83-.91-15,0-20.47,1.84-30.7,2.76-35,0-8.92-5.73-4.73-16.36-16-25-4.99-3.83-8.47-3.77-15-6-15.39-5.24-21-14.02-37-28-11.87-10.37-21.26-16.45-36-26-25.94-16.8-48.36-25.79-54-28-6.14-2.41-34.84-13.39-75-18-37.72-4.33-66.47-.84-73,0-34.73,4.49-59.79,14.32-74,20-36.9,14.74-62.1,32.48-71,39-31.49,23.07-50.83,46.32-57,54-6.5,8.09-29.21,37.23-46,81-9.59,25-13.97,46.23-16,58-1.69,9.79-4,20-4,35v41";
  const pathData2 =
    "m.5,187.36c.08,4.03.17,25.87.28,40,1.37,40.85,6.95,62.86,10.72,79,15.66,67.05,77.09,119.55,94,134,8.41,7.18,80.19,67.48,167,76,36.84,3.62,75-2,75-2,23.28-3.43,40.77-8.69,48-11,27.67-8.83,47.03-19.59,62-28,28-18,33-22,60-40,0,0,12-6.98,31.97-23.77,2.28-1.92,4.63-3.95,7.03-7.23,7.29-9.99,7.43-20.59,7.54-28.82.13-9.15.3-20.95-7.54-32.18-11.73-16.8-31.93-18.79-35.38-19.12-7.63-.75-13.66.45-16.62,1.13-39.1,8.97-96.15,54.77-110,66-12.39,10.05-26.84,22.1-49.18,28.93-15.99,4.9-25.36,3.85-31.82,2.07-2.86-.79-19.56-5.72-28-21-9.27-16.78.98-28.75-8-42-3.71-5.47-7.18-5.96-31-15-44.21-16.78-43.65-19.41-65-25-9.7-2.54-19.29-5.49-29-8-15.09-3.9-20.59-4.92-26-10-7.99-7.5-9.48-17.96-10-22-2.2-17.08,7.29-20.82,16-49,4.09-13.22,12.24-45.52,14-53,.44-1.87,1.76-7.62,6.01-13.66,0,0,.51-.72.99-1.34,8.28-10.62,29.57-10.65,35-23,.55-1.25.8-2.31,1.18-3.92,1.92-8.16.22-14.64-.18-17.08-1.74-10.73,9.81-16.49,16-31,7.31-17.14-2.81-23.21,2-41,6.34-23.42,30.06-35.78,37-39,3.65-1.7,32.58-14.55,62,0,23.49,11.62,32.44,33.35,36,42,6.58,15.98,5.81,34.54,4,71-1.47,29.65-.01,59.47-3,89-1.02,10.12-2.31,20.29,4,27,8.02,8.53,22.33,5.11,47,3,42.01-3.6,40.12,3.3,59-1,9.09-2.07,9.53-3.51,62-36,28-17,39.13-20.61,63-36,10.34-6.66,16.75-11.22,27-12,15.95-1.21,34.19,7.24,44,23,.7,1.13,13.23,21.91,5,41-7.69,17.82-26.48,17.96-31,37-2.03,8.55.05,15.73,1,19,5.96,20.58,26.28,29.85,31,32,16.77,7.65,18.74-.06,57,5,19.32,2.55,27.8,5.7,37,0,9.97-6.18,13.19-18.04,14-21-1-15-1.27-15.18-2-37-.74-22.18,3.47-27.83,5.48-29.58.12-.1.29-.24.52-.42,6.46-4.89,17.18-4.52,23,0,5.11,3.97,5.48,10.42,6,23,.43,10.41-.87,13.94-2,28-.66,8.2-.77,16.13-1,32-.19,13.46-.02,19.95,0,30,.12,49.26.18,73.9,0,79-.45,13.15-1.05,21.9,5,27,6.03,5.08,16.97,5.1,23,0,5.1-4.31,5.17-11,5-26-.48-41.04-1-65-1-65-.06-1.12-.04-6.08,0-16,.02-6.36.06-8.35,1-11,2.26-6.38,7.42-9.92,9-11,6.87-4.71,14.22-4.37,24-4,11,.41,22,.56,33,1,30.6,1.23,34.2-3.52,46,1,11.66,4.47,11.33,18.21,25,22,2.11.58,4.74.72,10,1,24.89,1.31,27.78-3.59,35,0,10.82,5.38,8.43,18.46,21,23,1.5.54,3.05.9,11,1,28.01.34,32.02-3.88,38,0,9.7,6.29,4.55,20.9,15,26,3.03,1.48,4.83.91,15,0,20.47-1.84,30.7-2.76,35,0,8.92,5.73,4.73,16.36,16,25,4.99,3.83,8.47,3.77,15,6,15.39,5.24,21,14.02,37,28,11.87,10.37,21.26,16.45,36,26,25.94,16.8,48.36,25.79,54,28,6.14,2.41,34.84,13.39,75,18,37.72,4.33,66.47.84,73,0,34.73-4.49,59.79-14.32,74-20,36.9-14.74,62.1-32.48,71-39,31.49-23.07,50.83-46.32,57-54,6.5-8.09,29.21-37.23,46-81,9.59-25,13.97-46.23,16-58,1.69-9.79,4-20,4-35,0-15,0-24.18,0-41";

  const group1 = createRef<Node>();
  const path1 = createRef<Path>();
  const progressRobot1 = createSignal(0);
  const getAngle1 = (precentage: number) =>
    path1().getPointAtPercentage(precentage).normal.flipped.perpendicular
      .degrees;
  view.add(
    <Node ref={group1} x={-100}>
      <Path
        ref={path1}
        lineWidth={6}
        // stroke={"red"}
        position={[-755, -320]}
        data={pathData1}
      />
      <Node
        position={() =>
          offset.add(path1().getPointAtPercentage(progressRobot1()).position)
        }
        rotation={() => getAngle1(progressRobot1())}
      >
        <Rect width={robotWidth} height={robotHeight} fill={"lightseagreen"} />
        <Rect
          width={20}
          height={10}
          fill={"red"}
          position={topRightWheel_offset}
        />
        <Rect
          width={20}
          height={10}
          fill={"red"}
          position={topLeftWheel_offset}
        />
        <Rect
          width={20}
          height={10}
          fill={"red"}
          position={bottomRightWheel_offset}
        />
        <Rect
          width={20}
          height={10}
          fill={"red"}
          position={bottomLeftWheel_offset}
        />

        <Line
          stroke={"white"}
          lineWidth={7}
          endArrow
          arrowSize={13}
          points={[Vector2.zero, Vector2.right.scale(robotWidth / 2)]}
        />
      </Node>
    </Node>
  );
  // Second Robot (Robot2)
  const group2 = createRef<Node>();
  const path2 = createRef<Path>();
  const progressRobot2 = createSignal(0);
  const getAngle2 = (precentage: number) =>
    path2().getPointAtPercentage(precentage).normal.flipped.perpendicular
      .degrees;
  view.add(
    <Node ref={group2} x={-100} y={134}>
      <Path
        ref={path2}
        lineWidth={6}
        // stroke={"green"}
        position={[-755, -320]}
        data={pathData2}
      />
      <Node
        position={() =>
          offset.add(path2().getPointAtPercentage(progressRobot2()).position)
        }
        rotation={() => getAngle2(progressRobot2())}
      >
        <Rect width={robotWidth} height={robotHeight} fill={"orange"} />
        <Rect
          width={20}
          height={10}
          fill={"red"}
          position={topRightWheel_offset}
        />
        <Rect
          width={20}
          height={10}
          fill={"red"}
          position={topLeftWheel_offset}
        />
        <Rect
          width={20}
          height={10}
          fill={"red"}
          position={bottomRightWheel_offset}
        />
        <Rect
          width={20}
          height={10}
          fill={"red"}
          position={bottomLeftWheel_offset}
        />

        <Line
          stroke={"white"}
          lineWidth={7}
          endArrow
          arrowSize={13}
          points={[Vector2.zero, Vector2.right.scale(robotWidth / 2)]}
        />
      </Node>
    </Node>
  );

  // part 1
  // yield* progressRobot1(0.39,8,linear)
  // part 2
  // yield* progressRobot1(0.25,2,linear)
  // part 3
  // yield* progressRobot1(0.17, 2,linear );
  // part 4
  // yield* progressRobot1(0,2,linear)

  // yield* progressRobot1(1-0.25, 2,linear);
  const x = 3;
  const robot1Ainmation = progressRobot1(0, 0, linear)
    .to(0.25, 2.5 *x)
    .to(0.29, 1 *x) // awal nos dora
    .to(0.35, 1.4 *x) // cercle
    .to(0.39, 1.7*x) // wrench
    .to(0.5, 2*x) // ba3d e zouz 5tout

    .to(0.6, 2*x) // dora l5rayba fel wst

    .to(0.65, 1*x) // chtar loul
    .to(0.68, 0.35*x) // partie mestwya ejryyy feha
    .to(0.71, 0.7*x) // chtar theni
    .to(0.74, 0.7*x) // kamalna dora l5ayba

    .to(0.83, 1.4*x) // 5touut met9att3aa
    .to(0.98, 1.4*x)
    .to(0.999, 1.4*x, easeOutCubic); // total duration 16.29
  
  const robot2Animation = progressRobot2(0,0,linear)
  .to(0.98, 14*x)
  .to(0.999, 1.4*x, easeOutCubic);;
  
  yield* waitFor(1.5);
  yield* all(robot1Ainmation, robot2Animation);
  yield* waitFor(0.25);

  // rewind

  yield* all(progressRobot1(0, 1), progressRobot2(0, 1));
  yield* waitFor(0.25);
});
