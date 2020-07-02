import {HideEmailPipe} from './hide-email.pipe';

describe('HideEmailPipe', () => {
  let pipe: HideEmailPipe;

  beforeEach(() => {
    pipe = new HideEmailPipe();
  });

  describe('transform', () => {
    it('should hide the email address', () => {
      expect(pipe.transform('aliobaji@techhive.io')).toEqual('a******i@t******e.io');
      expect(pipe.transform('ali@techhive.io')).toEqual('***@t******e.io');
      expect(pipe.transform('ali@alio.io')).toEqual('***@****.io');
      expect(pipe.transform('anything.anything123123')).toEqual('anything.anything123123');
    });
  });
});
