import { describe, it } from 'mocha';
import chai from 'chai';

const expect = chai.expect;

describe('Fast-Food-Fast Test Suite', () => {
  describe('Test setup', () => {
    it('should return true when setup is true', () => {
      const setup = true;
      expect(setup).to.be.true;
    });
  });
});
