import CameraMod from '$/module/CameraMod';
import DebugMod from '$/module/DebugMod';
import AppRoot from './AppRoot';
import appConfig from './config';

export default class App extends AppRoot {
  constructor(root: HTMLElement, config: appConfig) {
    super(root, config);

    this.appendMember(CameraMod);
    this.appendMember(DebugMod);
  }
}
