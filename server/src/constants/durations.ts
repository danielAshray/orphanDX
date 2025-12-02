class Durations {
  private static readonly _1hMs = 1000 * 60 * 60;

  public static readonly _1h = this._1hMs;
  public static readonly _3d = this._1hMs * 24 * 3;
  public static readonly _7d = this._1hMs * 24 * 7;
  public static readonly _30d = this._1hMs * 24 * 30;
}

export default Durations;
