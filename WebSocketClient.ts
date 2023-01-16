export default class WebSocketClient {
  private wss;
  private methods: { method: string; callback: (data: any) => void }[];

  constructor(websocket: WebSocket) {
    this.wss = websocket;
    this.methods = [];
    this.wss.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(event, data, data.method, this.methods);

      const methods = this.methods.filter((m) => m.method === data.method);
      if (methods) {
        methods.forEach((m) => m.callback(data));
      }
    };
  }

  public on(method: string, callback: (data: any) => void) {
    this.methods.push({ method, callback });
  }

  public send(method: string, data: any) {
    this.wss.send(JSON.stringify({ method, ...data }));
  }
}
