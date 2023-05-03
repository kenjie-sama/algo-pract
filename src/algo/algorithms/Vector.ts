import { Mathf } from "./Mathf";

export type VectorTypes = Vector2 | Vector3;


export interface IVector<V>{
    magnitude: number;
    dimension: number;
    ToArray: () => number[];
    ToString: () => string;
    Concat: (other: V) => number[];
}
export class Vector2 implements IVector<Vector2>{
    public static readonly zero: Vector2 = new Vector2(0, 0);
    public static readonly one: Vector2 = new Vector2(1, 1); 
    public static readonly up: Vector2 = new Vector2(0, 1); 
    public static readonly right: Vector2 = new Vector2(1, 0); 
    public static ToVector2 = (array: Array<number>): Vector2 => new Vector2(...array);
    
    public readonly magnitude: number = Math.sqrt(Mathf.Sqre(this.x) + Mathf.Sqre(this.y))
    public readonly dimension: number = 2;

    public constructor(public x: number = 0, public y: number = 0){}

    public ToArray = (): number[] => [this.x, this.y]
    public ToString = () => `V3 = (x = ${this.x}, y = ${this.y})`;

    public Concat = (other: Vector2): number[] => [...this.ToArray(), ...other.ToArray()];
    
    public static Add = (a: Vector2, b: Vector2): Vector2 => new Vector2(a.x + b.x, a.y + b.y);
    public static Sub = (a: Vector2, b: Vector2): Vector2 => new Vector2(a.x - b.x, a.y - b.y);
    public static Mul = (a: Vector2, b: number): Vector2 => new Vector2(a.x * b, a.y * b);
    public static Div = (a: Vector2, b: number): Vector2 => new Vector2(a.x / b, a.y / b);
}


export class Vector3 implements IVector<Vector3>{
    public static readonly zero: Vector3 = new Vector3(0, 0, 0);
    public static readonly one: Vector3 = new Vector3(1, 1, 1);
    public static readonly up: Vector3 = new Vector3(0, 1, 0);
    public static readonly right: Vector3 = new Vector3(1, 0, 0);
    public static readonly forward: Vector3 = new Vector3(0, 0, 1);


    public readonly magnitude: number = Math.sqrt(Mathf.Sqre(this.x) + Mathf.Sqre(this.y) + Mathf.Sqre(this.z))
    public readonly dimension: number = 3;

    public constructor(public x: number = 0, public y: number = 0, public z: number = 0){    }

    public ToArray = (): number[] => [this.x, this.y, this.z]
    public ToString = () => `V3 = (x = ${this.x}, y = ${this.y}, z = ${this.z})`;
    public Concat = (other: Vector3): number[] => [...this.ToArray(), ...other.ToArray()];
    
    public static Add = (a: Vector3, b: Vector3): Vector3 => new Vector3(a.x + b.x, a.y + b.y, a.z + b.z);
    public static Sub = (a: Vector3, b: Vector3): Vector3 => new Vector3(a.x - b.x, a.y - b.y, a.z - b.z);
    public static Mul = (a: Vector3, b: number): Vector3 => new Vector3(a.x * b, a.y * b, a.z * b);
    public static Div = (a: Vector3, b: number): Vector3 => new Vector3(a.x / b, a.y / b, a.z / b);

    public static ToVector3 = (array: Array<number>): Vector3 => new Vector3(...array);

    public static CrossProduct = (point1: Vector3, point2: Vector3): Vector3 => new Vector3(
        (point1.y * point2.z) - (point2.y * point1.z),
        Mathf.Invr((point1.x * point2.z) - (point2.x * point1.z)),
        (point1.x * point2.y) - (point2.x * point1.y),
    );
}

