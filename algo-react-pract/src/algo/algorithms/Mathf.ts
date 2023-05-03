import { VectorTypes } from "./Vector";

type OperatorType = (val1: number, val2: number) => number;
type MatrixType = number[][] | Matrix;

type innerMatrixInfo = (x: number, y: number) => any;
type outerMatrixInfo = (x: number) => any;

export class Mathf {
  public static Add = (val1: number, val2: number): number => val1 + val2;
  public static Sub = (val1: number, val2: number): number => val1 - val2;
  public static Div = (val1: number, val2: number): number => val1 / val2;
  public static Mul = (val1: number, val2: number): number => val1 * val2;
  public static Mod = (val1: number, val2: number): number => val1 % val2;
  public static Pow = (val1: number, val2: number): number => val1 ** val2;

  public static Sqre = (value: number): number => this.Pow(value, 2);
  public static Cube = (value: number): number => this.Pow(value, 3);
  public static Invr = (value: number): number => value * -1;

  public static SubAll = (numList: number[]): number =>
    this.CalculateAll(numList, this.Sub);
  public static SumAll = (numList: number[]): number =>
    this.CalculateAll(numList);
  public static Fraction = (
    numerator: number,
    denominator: number,
    whole: number = 0
  ): Fraction => new Fraction(numerator, denominator, whole);

  public static CalculateAll = (
    numList: number[],
    operator: OperatorType = this.Add
  ) => {
    let total: number = numList[0];
    for (let num: number = 1; num < numList.length; num++)
      total = operator(total, numList[num]);
    return total;
  };

  public static Clamp = (value: number, min: number, max: number): number => {
    if (value <= min) return min;
    if (value >= max) return max;
    return value;
  };
  public static Clamp01 = (value: number): number => this.Clamp(value, 0, 1);

  public static Round = (val: number, roundBy: number = 0): number => {
    let totalZeros: number = 1;
    for (let x: number = 0; x < roundBy; x++) totalZeros *= 10;
    return roundBy <= 0 ? val : Math.round(val * totalZeros) / totalZeros;
  };

  public static EuclideanDistance = <V extends VectorTypes>(
    point1: V,
    point2: V,
    roundBy: number = 0
  ): number => {
    let total: number = 0;
    let scalars1: Array<number> = [...point1.ToArray()];
    let scalars2: Array<number> = [...point2.ToArray()];

    for (let i in scalars1) total += this.Sqre(scalars1[i] - scalars2[i]);
    return this.Round(Math.sqrt(total), roundBy);
  };

  public static DistanceDotProduct = (
    distanceA: number,
    distanceB: number,
    angle: number
  ): number => Math.abs(distanceA) * Math.abs(distanceB) * Math.cos(angle);

  public static VectorDotProduct = <V extends VectorTypes>(
    origin: V,
    point1: V,
    point2: V,
    angle: number
  ): number =>
    this.EuclideanDistance(origin, point1) *
    Math.abs(this.EuclideanDistance(origin, point2)) *
    Math.cos(angle);

  public static CrossProduct = <V extends VectorTypes>(
    point1: V,
    point2: V
  ): number[] => {
    const points1: number[] = [...point1.ToArray()];
    const points2: number[] = [...point2.ToArray()];
    let outerSize: number = point1.ToArray().length;
    let parts: Array<Array<number>> = new Array(outerSize);
    for (let n = 0; n < outerSize; n++) {
      parts[n] = [];
      parts[n].push(points1[n]);
      parts[n].push(points2[n]);
    }

    let resultArr: number[] = [];

    for (let outer in parts) {
      const pivot: number = Number(outer);
      let jIndex: Flipper<number> = new Flipper(0, 1);
      let result1 = 1;
      let result2 = 1;

      for (let inner in parts) {
        if (pivot === Number(inner)) continue;
        if (point1.dimension === 3) {
          result1 *= parts[inner][jIndex.Current()];
          jIndex.Flip();
          result2 *= parts[inner][jIndex.Current()];
        }
      }
      // Multiply the middle or J of IJK values to -1
      resultArr[outer] = result1 - result2;
    }
    return resultArr;
  };
}

class Fraction {
  public constructor(
    private numerator: number,
    private denominator: number,
    private whole: number = 0
  ) {}
  public SetNumerator = (value: number): void => {
    this.numerator = value;
  };
  public SetDenominator = (value: number): void => {
    this.denominator = value;
  };
  public SetWhole = (value: number): void => {
    this.whole = value;
  };

  public GetNumerator = (): number => this.numerator;
  public GetDenominator = (): number => this.denominator;
  public GetWhole = (): number => this.whole;

  public ToString = (): string =>
    `${this.whole || ""}[${this.numerator}/${this.denominator}]`;
}

export class Flipper<T = any> {
  private currentValue: T;
  public constructor(private readonly value1: T, private readonly value2: T) {
    this.currentValue = value1;
  }
  public readonly Current = (): T => this.currentValue;
  public Flip = (): T | undefined =>
    (this.currentValue =
      this.currentValue === this.value1 ? this.value2 : this.value1);
}

export class Matrix {
  private matrixArr: number[][] = [];

  // [Row or X] [Column or Y]
  public constructor(
    public readonly rows: number,
    public readonly columns: number,
    array2d: number[][] | undefined = undefined
  ) {
    this.matrixArr = new Array(rows);
    this.Reset();
    if (array2d !== undefined) this.ArrayPopulate(array2d);
  }

  private static numMisatch(
    currLen: number,
    otherLen: number,
    otherPos: string,
    currPos: string = otherPos
  ): string {
    return `The provided "${otherPos}" is not equal to the source "${currPos}"!
        Provided ${otherPos}(${otherLen}), Source ${currPos}(${currLen})`;
  }

  public Reset(value: number = 0): void {
    this.Foreach(
      (x) => (this.matrixArr[x] = new Array(this.columns)),
      (x, y) => (this.matrixArr[x][y] = value)
    );
  }

  public readonly GetRow = (x: number): number[] => this.matrixArr[x];
  public readonly GetRowCol = (x: number, y: number): number =>
    this.matrixArr[x][y];
  public readonly GetArray = (): number[][] => this.matrixArr;
  public readonly SetXY = (x: number, y: number, value: number): void => {
    this.matrixArr[x][y] = value;
  };

  public GetType<M extends MatrixType>(
    source: M,
    arrCallBack: (arr: number[][]) => number[][],
    matCallBack: (matrix: Matrix) => Matrix
  ): M {
    if (source instanceof Array) return arrCallBack(source) as M;
    if (source instanceof Matrix) return matCallBack(source) as M;
    throw new TypeError();
  }
  public readonly Foreach = (
    outerCallBack: outerMatrixInfo | undefined = undefined,
    innerCallBack: innerMatrixInfo | undefined = undefined
  ) => {
    for (let x: number = 0; x < this.rows; x++) {
      if (outerCallBack) outerCallBack(x);
      for (let y: number = 0; y < this.columns; y++)
        if (innerCallBack) innerCallBack(x, y);
    }
  };

  public Populate = (other: MatrixType): Matrix =>
    this.GetType(
      other,
      (arr) => this.ArrayPopulate(arr).GetArray(),
      (mat) => this.MatrixPopulate(mat)
    ) as Matrix;

  private MatrixPopulate(matrix: Matrix) {
    if (matrix.rows !== this.rows)
      throw new Error(Matrix.numMisatch(this.rows, matrix.rows, "ROW"));

    this.Foreach(
      (x) => {
        if (this.matrixArr[x].length !== this.GetRow(x).length) {
          this.Reset();
          throw new Error(
            Matrix.numMisatch(
              this.matrixArr[x].length,
              matrix.columns,
              "COLUMN"
            )
          );
        }
      },
      (x, y) => (this.matrixArr[x][y] = matrix.GetRowCol(x, y))
    );

    return this;
  }

  private ArrayPopulate(matrix: number[][]) {
    if (matrix.length !== this.rows)
      throw new Error(Matrix.numMisatch(this.rows, matrix.length, "ROW"));

    this.Foreach(
      (x) => {
        if (this.matrixArr[x].length !== matrix[x].length) {
          this.Reset();
          throw new Error(
            Matrix.numMisatch(
              this.matrixArr[x].length,
              matrix[x].length,
              "COLUMN"
            )
          );
        }
      },
      (x, y) => (this.matrixArr[x][y] = matrix[x][y])
    );

    return this;
  }

  public Mult = <M extends MatrixType>(other: M): M =>
    this.GetType(
      other,
      (arr) => this.ArrMult(arr),
      (mat) => this.MatMult(mat)
    ) as M;

  public Add = <M extends MatrixType>(other: M): M =>
    this.GetType(
      other,
      (arr) => this.ArrMult(arr),
      (mat) => this.MatAdd(mat)
    ) as M;

  private MatrixAS(matrixB: Matrix, one: number = -1) {
    if (this.rows !== matrixB.rows)
      throw new Error(Matrix.numMisatch(this.rows, matrixB.rows, "ROW"));

    let matrixC: Matrix = new Matrix(this.rows, this.columns);

    this.Foreach(
      (x) => {
        if (this.columns !== matrixB.columns) {
          this.Reset();
          throw new Error(
            Matrix.numMisatch(this.columns, matrixB.columns, "COLUMN")
          );
        }
      },
      (x, y) => {
        matrixC.GetArray()[x][y] =
          this.matrixArr[x][y] + one * matrixB.GetRowCol(x, y);
      }
    );

    return matrixC;
  }

  // private AddSubCalc(rowOfB: number, colsOfB: number, matBcallBack: (Bz: number, By: number) => number) {
  //     if(this.rows !== rowOfB)
  //         throw new Error(Matrix.numMisatch(this.rows, rowOfB, "ROW"));

  //     let matrixC: Matrix = new Matrix(this.rows, this.columns);

  //     this.Foreach( x => {
  //             if(this.columns !== colsOfB){
  //                 this.Reset();
  //                 throw new Error(Matrix.numMisatch(this.columns, colsOfB, "COLUMN"));
  //             }
  //         }, (x, y) => { matrixC.GetArray()[x][y] = this.matrixArr[x][y] + matBcallBack(x, y); }
  //     );

  //     return matrixC;
  // }

  private MultiplyCalc(
    rowOfB: number,
    colOfB: number,
    matBcallBack: (Bz: number, By: number) => number
  ) {
    if (this.columns !== rowOfB)
      throw new Error(Matrix.numMisatch(this.rows, colOfB, "COLUMN", "ROW"));

    const matrixC: Matrix = new Matrix(this.rows, colOfB);

    for (let x: number = 0; x < this.rows; x++)
      for (let y: number = 0; y < colOfB; y++)
        for (let z: number = 0; z < this.columns; z++)
          matrixC.GetArray()[x][y] += this.matrixArr[x][z] * matBcallBack(z, y);

    return matrixC;
  }

  private MatMult(matrixB: Matrix): Matrix {
    return this.MultiplyCalc(matrixB.rows, matrixB.columns, (z, y) =>
      matrixB.GetRowCol(z, y)
    );
  }

  private ArrMult(matrixB: number[][]): number[][] {
    return this.MultiplyCalc(
      matrixB.length,
      matrixB[0].length,
      (z, y) => matrixB[z][y]
    ).GetArray();
  }

  private MatAdd(matrixB: Matrix): Matrix {
    return this.MatrixAS(matrixB, 1);
  }

  private MatSub(matrixB: Matrix): Matrix {
    return this.MatrixAS(matrixB);
  }
}
