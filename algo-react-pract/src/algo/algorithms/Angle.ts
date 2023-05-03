import { Vector2, Vector3, VectorTypes } from "./Vector";

export abstract class Angle<V extends VectorTypes>{
    private angle: number;
    public constructor(orign: V, point1: V, point2: V){
        this.angle = 0;
    }

    // public ToRadians = (angle: Degree): Radians => {
    //     return new Radians(0);
    // };
    // public ToDegrees = () => 0;
    public ToFloat = () => 0;
    // public ToString = () => 0;
}

// U+00B0

// export class Degree<V extends VectorTypes> extends Angle<V>{
//     public constructor(orign: V, point1: V, point2: V){
//         super(orign, point1, point2)
//     }
// }


// export class Radians<V extends VectorTypes> extends Angle<V>{
//     public constructor(orign: V, point1: V, point2: V){
//         super(orign, point1, point2)
//     }
// }
