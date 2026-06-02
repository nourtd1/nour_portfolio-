import Application from '../Application';
import Resources from '../Utils/Resources';
import ComputerSetup from './Computer';
import MonitorScreen from './MonitorScreen';
import Floor from './Floor';
import AudioManager from '../Audio/AudioManager';
export default class World {
    application: Application;
    scene: THREE.Scene;
    resources: Resources;

    // Objects in the scene
    floor: Floor;
    computerSetup: ComputerSetup;
    monitorScreen: MonitorScreen;
    audioManager: AudioManager;

    constructor() {
        this.application = new Application();
        this.scene = this.application.scene;
        this.resources = this.application.resources;
        // Wait for resources
        this.resources.on('ready', () => {
            // 2026 scene — only the gaming setup on a dark floor.
            // Henry's baked Environment, Decor and CoffeeSteam are removed.
            this.floor = new Floor();
            this.computerSetup = new ComputerSetup();
            this.monitorScreen = new MonitorScreen();
            this.audioManager = new AudioManager();
        });
    }

    update() {
        if (this.monitorScreen) this.monitorScreen.update();
        if (this.audioManager) this.audioManager.update();
    }
}
