import { Roll } from '.';

describe('Roll', () => {
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
      expect(roll.isDoubles).toBeTruthy();
    }
  });
});
