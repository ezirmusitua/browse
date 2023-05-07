export class Config {
  static instance: Config = null as any;
  private _raw: Record<string, any> = null as any;

  constructor() {
    if (!Config.instance) {
      Config.instance = this;
    }
    return Config.instance;
  }

  init(_raw: Record<string, any>) {
    if (this._raw) throw new Error("Already initialized");
    this._raw = _raw;
  }

  get(field: string) {
    return this._raw[field];
  }
}
