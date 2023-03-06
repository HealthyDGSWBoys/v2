import appConfig from './config';
import * as BABYLON from 'babylonjs';
import Module from './Module';
import EventFall from '$/lib/event/EventFall';
import BabyEvent from '$/lib/event/BabyEvent';
import UpdateEventMessage from '$/lib/event/message/UpdateEventMessage';
import { EventMessageImpl } from '$/lib/event/message/EventMessage';

export default class AppRoot extends EventFall {
  private root: HTMLElement;
  private canvas: HTMLCanvasElement;
  private config: appConfig;
  private engine: BABYLON.Engine;
  private scene: BABYLON.Scene;

  private running: boolean = false;
  constructor(root: HTMLElement, config: appConfig) {
    super(EventFall.MakeMotherlessFall());
    this.root = root;
    this.config = config;
    this.canvas = document.createElement('canvas');
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.root.appendChild(this.canvas);

    this.engine = this.buildEngine(this.canvas);
    this.scene = new BABYLON.Scene(this.engine);

    this.debug();
    this.engine.runRenderLoop(this.loop.bind(this));
  }

  private buildEngine = (canvas: HTMLCanvasElement): BABYLON.Engine => {
    if (BABYLON.WebGPUEngine.IsSupported) {
      return new BABYLON.WebGPUEngine(canvas);
    } else {
      return new BABYLON.Engine(this.canvas);
    }
  };
  private debug() {
    if (this.config.debugUI) {
      this.scene.debugLayer.show({ overlay: true });
    } else {
      this.scene.debugLayer.hide();
    }
  }
  private loop() {
    if (this.running) {
      this.generateEvent(new BabyEvent('update', new UpdateEventMessage(10)));
      this.scene.render();
    }
  }
  protected appendMember(
    Member: new (parent: EventFall, scene: BABYLON.Scene) => Module
  ) {
    const member = new Member(this, this.scene);
    this.children.push(member);
  }
  public run() {
    this.generateEvent(new BabyEvent('setting', new EventMessageImpl()));
    this.running = true;
  }
  public pause() {
    this.running = false;
  }
  protected isRoot = () => true;
}
