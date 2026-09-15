import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

class MockAudioContext {
  constructor() {
    this.state = 'running';
  }

  resume() {
    return Promise.resolve();
  }
}

globalThis.AudioContext = MockAudioContext;
globalThis.webkitAudioContext = MockAudioContext;

vi.mock('use-sound', () => ({
  default: () => [vi.fn()],
}));
