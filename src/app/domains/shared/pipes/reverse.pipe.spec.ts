import { SpectatorPipe, createPipeFactory } from '@ngneat/spectator/jest';

import { ReversePipe } from './reverse.pipe';

describe('ReversePipe', () => {
    let spectator: SpectatorPipe<ReversePipe>;
    const createPipe = createPipeFactory(ReversePipe);

    it('should reverse a string', () => {
        spectator = createPipe(`{{ 'Hello' | reverse }}`); // Create the pipe with the template string
        expect(spectator.element).toHaveText('olleH');
    });
});