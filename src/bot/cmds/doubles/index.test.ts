import { Roll, TriplesRoll } from './Roll';

describe('Roll', () => {
  describe('doubles', () => {
    it('rolls 2 numbers', () => {
      for (let i = 0; i < 10; i++) {
        const roll = new Roll();
        expect(roll.roll).toMatch(/^[0-9]{2}$/);
      }
    });

    it('matches doubles', () => {
      for (let i = 0; i < 10; i++) {
        const roll = new Roll();
        roll.roll = `${i}${i}`;
        expect(roll.isOnlySameNumbers).toBeTruthy();
      }
    });

    it("doesn't match non-doubles", () => {
      const roll = new Roll();
      roll.roll = `63`;
      expect(roll.isOnlySameNumbers).toBeFalsy();
    });
  });

  describe('triples', () => {
    it('rolls 3 numbers', () => {
      for (let i = 0; i < 10; i++) {
        const roll = new TriplesRoll();
        expect(roll.roll).toMatch(/^[0-9]{3}$/);
      }
    });

    it('matches triples', () => {
      for (let i = 0; i < 10; i++) {
        const roll = new TriplesRoll();
        roll.roll = `${i}${i}${i}`;
        expect(roll.isOnlySameNumbers).toBeTruthy();
      }
    });

    it("doesn't match non-triples", () => {
      const roll = new TriplesRoll();
      roll.roll = `634`;
      expect(roll.isOnlySameNumbers).toBeFalsy();
    });
  });
});
