import Loader from '../Loader';
import dummyMap from '$static/model/dummy.glb';
import beachMap from '$static/model/beach2.glb';
import * as BABYLON from 'babylonjs';
import { Mesh } from 'babylonjs';

export default class DummyMap extends Loader {
  protected url: [string, string] = ['./', dummyMap];

  protected onSet(): void {
    this.addEventHandler('onLoad', ({ assets }) => {
      assets.addAllToScene();
      assets
        .getNodes()
        .filter((node) => node.name.includes('Cross'))
        .forEach((cross) => {
          this.share.crossPoints.push(cross as Mesh);
        });
    });
    this.load();
  }
}
