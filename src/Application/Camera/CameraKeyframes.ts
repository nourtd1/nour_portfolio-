import * as THREE from 'three';
import { CameraKey } from './Camera';
import Time from '../Utils/Time';
import Application from '../Application';
import Mouse from '../Utils/Mouse';
import Sizes from '../Utils/Sizes';

export class CameraKeyframeInstance {
    position: THREE.Vector3;
    focalPoint: THREE.Vector3;

    constructor(keyframe: CameraKeyframe) {
        this.position = keyframe.position;
        this.focalPoint = keyframe.focalPoint;
    }

    update() {}
}

const keys: { [key in CameraKey]: CameraKeyframe } = {
    idle: {
        position: new THREE.Vector3(-5200, 3200, 5200),
        focalPoint: new THREE.Vector3(0, 780, 0),
    },
    monitor: {
        position: new THREE.Vector3(0, 1150, 1600),
        focalPoint: new THREE.Vector3(0, 1150, 0),
    },
    desk: {
        position: new THREE.Vector3(0, 1150, 1800),
        focalPoint: new THREE.Vector3(0, 1000, 0),
    },
    loading: {
        position: new THREE.Vector3(-35000, 35000, 35000),
        focalPoint: new THREE.Vector3(0, -5000, 0),
    },
    orbitControlsStart: {
        position: new THREE.Vector3(-5200, 3200, 5200),
        focalPoint: new THREE.Vector3(0, 780, 0),
    },
};

export class MonitorKeyframe extends CameraKeyframeInstance {
    application: Application;
    sizes: Sizes;
    targetPos: THREE.Vector3;
    origin: THREE.Vector3;

    constructor() {
        const keyframe = keys.monitor;
        super(keyframe);
        this.application = new Application();
        this.sizes = this.application.sizes;
        this.origin = new THREE.Vector3().copy(keyframe.position);
        this.targetPos = new THREE.Vector3().copy(keyframe.position);
    }

    update() {
        const aspect = this.sizes.height / this.sizes.width;
        const additionalZoom = this.sizes.width < 768 ? 0 : 750;
        this.targetPos.z = this.origin.z + aspect * 950 - additionalZoom;
        this.position.copy(this.targetPos);
    }
}

export class LoadingKeyframe extends CameraKeyframeInstance {
    constructor() {
        const keyframe = keys.loading;
        super(keyframe);
    }

    update() {}
}

export class DeskKeyframe extends CameraKeyframeInstance {
    origin: THREE.Vector3;
    application: Application;
    mouse: Mouse;
    sizes: Sizes;
    targetFoc: THREE.Vector3;
    targetPos: THREE.Vector3;

    constructor() {
        const keyframe = keys.desk;
        super(keyframe);
        this.application = new Application();
        this.mouse = this.application.mouse;
        this.sizes = this.application.sizes;
        this.origin = new THREE.Vector3().copy(keyframe.position);
        this.targetFoc = new THREE.Vector3().copy(keyframe.focalPoint);
        this.targetPos = new THREE.Vector3().copy(keyframe.position);
    }

    update() {
        const parallaxX = (this.mouse.x - this.sizes.width / 2) * 0.22;
        const parallaxY = -(this.mouse.y - this.sizes.height / 2) * 0.12;

        this.targetFoc.x += (parallaxX - this.targetFoc.x) * 0.05;
        this.targetFoc.y +=
            (this.origin.y - 350 + parallaxY - this.targetFoc.y) * 0.05;

        this.targetPos.x += (parallaxX * 0.55 - this.targetPos.x) * 0.025;
        this.targetPos.y +=
            (this.origin.y + parallaxY * 0.35 - this.targetPos.y) * 0.025;

        const aspect = this.sizes.height / this.sizes.width;
        this.targetPos.z = this.origin.z + aspect * 900 - 600;

        this.focalPoint.copy(this.targetFoc);
        this.position.copy(this.targetPos);
    }
}

export class IdleKeyframe extends CameraKeyframeInstance {
    time: Time;
    origin: THREE.Vector3;

    constructor() {
        const keyframe = keys.idle;
        super(keyframe);
        this.origin = new THREE.Vector3().copy(keyframe.position);
        this.time = new Time();
    }

    update() {
        this.position.x =
            Math.sin((this.time.elapsed + 19000) * 0.00008) * this.origin.x;
        this.position.y =
            Math.sin((this.time.elapsed + 1000) * 0.000004) * 450 +
            this.origin.y;
        this.position.z = this.origin.z;
    }
}

export class OrbitControlsStart extends CameraKeyframeInstance {
    constructor() {
        const keyframe = keys.orbitControlsStart;
        super(keyframe);
    }

    update() {}
}
