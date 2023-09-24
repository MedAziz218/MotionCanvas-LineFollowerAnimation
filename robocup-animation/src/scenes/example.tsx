import { makeScene2D } from "@motion-canvas/2d/lib/scenes";
import { Node, Circle, Grid, Line } from "@motion-canvas/2d/lib/components";
import { all, delay, waitFor } from "@motion-canvas/core/lib/flow";
import { Vector2 } from "@motion-canvas/core/lib/types";
import { createRef } from "@motion-canvas/core/lib/utils";
import { createSignal } from "@motion-canvas/core/lib/signals";
import { Img } from "@motion-canvas/2d";
import { Path, Rect } from "@motion-canvas/2d";
import mapImg from "../../../images/map2.png";
import { deepLerp, easeInCirc, easeInExpo, easeInOutExpo, easeOutExpo, linear } from "@motion-canvas/core";
const RED = "#ff6470";
const GREEN = "#99C47A";
const BLUE = "#68ABDF";

export default makeScene2D(function* (view) {
  const group = createRef<Node>();
  const scale = createSignal(1);

  const group2 = createRef<Node>();
  const path = createRef<Path>();
  
  const progress = createSignal(1);
  const getAngle = (precentage:number) => path().getPointAtPercentage(precentage).normal.flipped.perpendicular.degrees
  const offset = new Vector2(-752,-320)
  
  view.add(<Img src={mapImg} />);
  view.add(
    <Node ref={group} x={-100}>
      <Path
        ref={path}
        lineWidth={6}
        // stroke={"red"}
        position={[-752,-320]}
        data={
          // 'M -180 -21 C -180 -54.1371 -153.1371 -81 -120 -81 C -86.8629 -81 -60 -54.1371 -60 -21 C -60 12.1371 -33.1371 33 0 33 C 33.1371 33 48 3 48 -21 C 48 -45 30 -69 0 -69 C -30 -69 -48 -45 -48 -21 C -48 3 -33.1371 33 0 33 C 39 34.5 60 12 60 -21 C 60 -54.1371 86.8629 -81 120 -81 C 153.1371 -81 180 -54.1371 180 -21 C 180 12.1371 153.1371 39 120 39 L -120 39 C -153.1371 39 -180 12.1371 -180 -21 Z'
          "M .5 328.18 .5 271.69 13.5 209.69 41.5 152.69 79.5 100.69 131.5 56.69 188.5 24.69 253.5 6.69 318.31 .5 385.5 12.69 446.5 38.69 506.5 78.69 553.5 110.69 574.5 134.69 618.5 134.69 638.5 161.69 687.5 162.69 706.5 184.69 749.5 184.69 781.5 206.69 863.5 206.69 882.5 206.69 890.5 194.04 890.5 85.69 908.5 70.69 921.5 86.73 921.5 286.69 938.5 298.69 952.5 288.69 955.5 215.69 969.5 208.69 1059.26 209.18 1098.5 256.69 1067.5 286.69 1057.5 315.69 1066.5 342.69 1090.5 361.69 1121.31 361.69 1240.5 288.69 1266.5 279.69 1371.5 280.69 1371.5 473.1 1409.5 512.69 1469.85 512.69 1511.5 472.69 1511.5 423.57 1530.5 399.69 1521.5 382.69 1563.5 359.69 1596.5 251.69 1596.5 230.04 1574.5 212.69 1513.5 189.69 1442.5 164.69 1434.5 119.69 1409.5 97.69 1370.5 98.69 1315.5 131.69 1259.5 164.69 1208.5 194.69 1167.5 185.69 1147.5 150.69 1164.5 106.69 1213.5 74.69 1268.5 35.69 1323.5 13.69 1387.3 .5 1449.5 4.69 1513.5 18.69 1569.5 45.69 1618.5 82.69 1662.5 131.69 1695.5 190.69 1712.5 250.69 1717.5 289.69 1717.5 333.69"
        }
        
      />
      <Rect
      
        size={75}
        fill={"lightseagreen"}
        position={() => offset.add( path().getPointAtPercentage(progress()).position   ) }
        rotation={() => getAngle(progress()) }
      />
    </Node>
  );
  
  let last = null
  if (last){
    return 
  }

  // part 1
  yield* progress(0.39,8,linear)
  // part 2 
  yield* progress(0.25,2,linear)
  // part 3
  yield* progress(0.17, 2,linear );
  // part 4
  yield* progress(0,2,linear)
  
  // yield* progress(1-0.25, 2,linear);
  

  yield* waitFor(.25)

  // rewind
  yield* progress(1,1.5,)
  yield* waitFor(.25)


 
});
