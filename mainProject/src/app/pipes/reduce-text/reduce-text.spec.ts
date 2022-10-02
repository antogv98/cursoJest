import { ReduceTextPipe } from './reduce-text.pipe';
describe('ReduceTextPipe', () => {
  let pipe: ReduceTextPipe;

  beforeEach(() => {
    pipe = new ReduceTextPipe();
  });

  it('should create', () => {
    expect(pipe).toBeTruthy;
  });

  it('transform works correctly', () => {
    const texto = 'Hello this is a test to check the pipe';
    const newText = pipe.transform(texto, 5);
    expect(newText.length).toBe(5);
  });
});
