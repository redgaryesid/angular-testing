import { SpectatorPipe, createPipeFactory } from '@ngneat/spectator/jest';

import { ReversePipe } from './reverse.pipe';

describe('ReversePipe', () => {
    let spectator: SpectatorPipe<ReversePipe>;
    const createPipe = createPipeFactory(ReversePipe);

    it('should reverse a string', () => {
        spectator = createPipe(`{{ 'Hello' | reverse }}`); // Create the pipe with the template string
        expect(spectator.element).toHaveText('olleH');
    });

    it('should reverse a string with spaces', () => {
        spectator = createPipe(`{{ 'Hello World' | reverse }}`);
        expect(spectator.element).toHaveText('dlroW olleH');
    });

    it('should reverse a string with special characters', () => {
        spectator = createPipe(`{{ '123!@#' | reverse }}`);
        expect(spectator.element).toHaveText('#@!321');
    });

    it('should return an empty string when given an empty string', () => {
        spectator = createPipe(`{{ '' | reverse }}`);
        expect(spectator.element).toHaveText('');
    });

    it('should reverse a single character string', () => {
        spectator = createPipe(`{{ 'A' | reverse }}`);
        expect(spectator.element).toHaveText('A');
    });
});