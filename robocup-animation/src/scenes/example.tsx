import { makeScene2D } from "@motion-canvas/2d/lib/scenes";
import { Node, Circle, Grid, Line } from "@motion-canvas/2d/lib/components";
import { all, delay, waitFor } from "@motion-canvas/core/lib/flow";
import { Vector2 } from "@motion-canvas/core/lib/types";
import { createRef } from "@motion-canvas/core/lib/utils";
import { createSignal } from "@motion-canvas/core/lib/signals";
import { Img } from "@motion-canvas/2d";
import { Path, Rect } from "@motion-canvas/2d";
import mapImg from "../../../images/map7.png";
import path2 from "./path2.svg";
import path1 from "./path1.svg";

import {
  deepLerp,
  easeInBack,
  easeInCirc,
  easeInExpo,
  easeInOutExpo,
  easeInQuad,
  easeOutCubic,
  easeOutExpo,
  easeOutQuad,
  easeOutSine,
  linear,
} from "@motion-canvas/core";
const RED = "#ff6470";
const GREEN = "#99C47A";
const BLUE = "#68ABDF";
const PATH1 = await extractPathDataFromUrl(path1);
const PATH2 = await extractPathDataFromUrl(path2);
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
  const pathData1 = PATH1;
  // "m306.58,308.86c-.23-24.08-.46-48.15-.69-72.23,16.55.73,28.81-8.79,29.58-17.2.68-7.41-12.39-13.5-30.96-22.01-67.72-31.05-95.92-41.38-94.93-48.84.3-2.29,3.49-5.3,17.89-7.57,28.43-14.22,56.87-28.43,85.3-42.65,22.37-7.05,27.06-11.91,26.83-15.13-.53-7.41-26.95-4.58-36.46-19.95-10.8-17.46,12.11-39.22,3.44-53.66-7.72-12.86-31.99-5.72-77.04-4.13C171.27,7.56,163.24-2.67,91.27.68c-26.79,1.25-40.32,1.94-46.78,5.5C-9.42,35.89-22.93,186.85,52.74,273.09c57.05,65.02,158.23,85.77,253.83,52.28";

  const pathData2 = PATH2;
  // "M36.75,0l.08,48.91c-.15,17.29.23,26.53-7.96,31.23-.85.49-6.63,3.93-14.51,6.77-3.31,1.19-6.96,2.26-9.17,5.73-.51.79-1.88,2.95-1.53,5.35.57,3.95,5.43,6.1,11.92,9.02,4.03,1.81,10.67,4.81,20.18,9.17,9.25,4.32,16.78,8,22,10.59,21.92,10.88,33.02,16.05,35.32,17.38,1.45.84,6.04,3.53,12.54,6.42,2.3,1.02,4.22,1.8,5.5,2.29.73-.28,4.34-1.59,8.25.15.5.22,5.13,2.38,5.96,7.34.88,5.21-3.21,8.92-3.67,9.32-3.58,3.14-8.05,2.69-11.95,2.94-2.71.17-4.65.66-22.9,9.9-15.66,7.93-19.33,10.16-33.78,17.43-2.29,1.15-6.39,3.13-14.57,7.12-6.8,3.32-10.28,5.01-14.21,6.52-1.86.71-5.65,2.12-8.98,3.32-4.42,1.6-7.02,2.5-10.16,4.58-2.63,1.74-4.8,3.22-4.97,5.51-.17,2.24,1.67,4.05,2.47,4.84,2.55,2.51,5.48,3.04,8.73,3.82,2.27.54,9.4,2.23,14.94,4.79,5.1,2.36,8.16,3.78,10.09,7.03,1.83,3.08.53,4.24.46,19.57-.02,4.06.04,10.97.04,10.97,0,0,.26,19.55.23,24.65s2.72,7.25,12.7,7.22c9.97-.03,90.68-2.18,90.68-2.18,0,0,147.06.31,159.9.76,12.84.46,17.26,4.44,24,11.01,6.74,6.57,21.4,21.25,30.42,26.75s17.43,6.42,25.68,6.42,12.99-.92,22.01-5.96c7.49-4.19,23.33-17.38,43.11-36.23"
  const robot1_initial_pos = new Vector2(-150, 140);

  const robot2_initial_pos = new Vector2(-102, -40);

  const group1 = createRef<Node>();
  const path1 = createRef<Path>();
  const progressRobot1 = createSignal(0);
  const getAngle1 = (precentage: number) =>
    path1().getPointAtPercentage(precentage).normal.flipped.perpendicular
      .degrees;
  view.add(
    <Node ref={group1} x={robot1_initial_pos.x} y={robot1_initial_pos.y}>
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
    <Node ref={group2} x={robot2_initial_pos.x} y={robot2_initial_pos.y}>
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
  let lastTo = 0;
  const constantSpeed = (to: number, speed: number): [number, number] => {
    const time = ((to - lastTo) * 100) / speed;
    lastTo = to;
    return [to, time];
  };
  const sleep = (delaySec: number): [number, number] => {
    return [lastTo, delaySec];
  };
  const stopMissionMarker = 0.523;
  const stopMissionDelaySec = 1;

  lastTo = 0; // IMPORTANT !!!!!!!!!!
  const robot1Ainmation = progressRobot1(0, 0, linear)
    .to(...constantSpeed(0.2, 13)) // partie loula
    .to(...constantSpeed(0.27 - 0.01, 10)) // 9bal hexagon bchwaya
    .to(...constantSpeed(0.38, 6)) // ba3d el hexagon bethabt
    .to(...constantSpeed(0.43, 10)) // 9bal dora imin 1
    .to(...constantSpeed(0.448, 5)) // fi wst dora imin 1
    .to(...constantSpeed(0.48, 10)) // line (9bal dora imin 2)
    .to(...constantSpeed(0.498, 5)) // fi wst dora imin 2

    .to(...constantSpeed(stopMissionMarker-0.006, 7))
    .to(...sleep(stopMissionDelaySec))

    .to(...constantSpeed(0.548, 5)) // 9bal el dora
    .to(...constantSpeed(0.61, 3)) // ba3d el dora
    .to(...constantSpeed(0.635, 5)) // 9bal el ---

    .to(...constantSpeed(0.72, 3)) // ba3d el ----
    .to(...constantSpeed(0.741, 5)) // 9bal sinus

    .to(...constantSpeed(0.827, 10)) //ba3d el sinus

    .to(...constantSpeed(0.856, 10)) // 9bal dora imin 3
    .to(...constantSpeed(0.89, 5))
    .to(...constantSpeed(0.988, 5)) //zigzag
    .to(...constantSpeed(1, 2.5), easeOutQuad) //zigzag

    .to(...sleep(1));

  // .to(0.25, 2.5 *x)
  // .to(0.29, 1 *x) // awal nos dora
  // .to(0.35, 1.4 *x) // cercle
  // .to(0.39, 1.7*x) // wrench
  // .to(0.5, 2*x) // ba3d e zouz 5tout

  // .to(0.6, 2*x) // dora l5rayba fel wst

  // .to(0.65, 1*x) // chtar loul
  // .to(0.68, 0.35*x) // partie mestwya ejryyy feha
  // .to(0.71, 0.7*x) // chtar theni
  // .to(0.74, 0.7*x) // kamalna dora l5ayba

  // .to(0.83, 1.4*x) // 5touut met9att3aa
  // .to(0.98, 1.4*x)
  // .to(0.999, 1.4*x, easeOutCubic); // total duration 16.29

  lastTo = 0; // IMPORTANT !!!!!!!!!!
  const robot2Animation = progressRobot2(0, 0, linear)
    .to(...constantSpeed(0.2, 13)) // partie loula
    .to(...constantSpeed(0.27 - 0.01, 8)) // 9bal hexagon bchwaya
    .to(...constantSpeed(0.38, 5)) // ba3d el hexagon bethabt
    .to(...constantSpeed(0.43, 10)) // 9bal dora imin 1
    .to(...constantSpeed(0.448, 5)) // fi wst dora imin 1
    .to(...constantSpeed(0.48, 10)) // line (9bal dora imin 2)
    .to(...constantSpeed(0.498, 5)) // fi wst dora imin 2

    .to(...constantSpeed(stopMissionMarker, 7))
    .to(...sleep(stopMissionDelaySec))

    .to(...constantSpeed(0.548, 5)) // 9bal el dora
    .to(...constantSpeed(0.61, 4)) // ba3d el dora
    .to(...constantSpeed(0.635, 5)) // 9bal el ---

    .to(...constantSpeed(0.72, 5)) // ba3d el ----
    .to(...constantSpeed(0.741, 5)) // 9bal sinus

    .to(...constantSpeed(0.827, 8)) //ba3d el sinus

    .to(...constantSpeed(0.856, 10)) // 9bal dora imin 3
    .to(...constantSpeed(0.89, 5))
    .to(...constantSpeed(0.988, 5)) //zigzag
    .to(...constantSpeed(1, 2.5), easeOutQuad) //zigzag

    .to(...sleep(1));

  // yield* waitFor(1.5);
  yield* all(robot1Ainmation, robot2Animation);
  yield* waitFor(0.25);

  // rewind

  yield* all(progressRobot1(0, 1), progressRobot2(0, 1));
  yield* waitFor(0.25);
});

async function extractPathDataFromUrl(svgUrl: string) {
  const response = await fetch(svgUrl);
  const svgText = await response.text();

  // Parse the SVG string as XML
  const parser = new DOMParser();
  const svgDoc = parser.parseFromString(svgText, "image/svg+xml");

  // Extract the 'd' attribute from the 'path' tag
  const pathElement = svgDoc.querySelector("path");
  if (pathElement) {
    return pathElement.getAttribute("d");
  } else {
    throw new Error("No path element found in the SVG");
  }
}

function constrain(value: number, a: number, b: number) {
  const min = Math.min(a, b);
  const max = Math.max(a, b);
  return Math.max(min, Math.min(max, value));
}
