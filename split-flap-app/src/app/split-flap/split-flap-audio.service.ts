import { Inject, Injectable } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { Howl } from 'howler';

@Injectable({
	providedIn: 'root',
})
export class SplitFlapAudioService {
	private sounds: Howl[];
	private isRunning: boolean = false;

	constructor(@Inject(APP_BASE_HREF) public baseHref: string) {
		const flipStart = new Howl({
			src: [baseHref + './assets/sounds/Splitflap-start.mp3'],
			loop: false,
			preload: true,
			onend: () => {
				if (this.isRunning) {
					this.sounds[1].play();
				}
			},
		});

		const flipLoop = new Howl({
			src: [baseHref + './assets/sounds/Splitflap-loop.mp3'],
			loop: true,
			preload: true,
		});

		const flipEnd = new Howl({
			src: [baseHref + './assets/sounds/Splitflap-end.mp3'],
			loop: false,
			preload: true,
		});

		this.sounds = [flipStart, flipLoop, flipEnd];
	}

	public start() {
		if (!this.isRunning) {
			this.isRunning = true;
			this.sounds[0].play();
		}
	}

	public stop() {
		this.isRunning = false;
		this.sounds[1].stop();
		this.sounds[2].play();
	}
}
