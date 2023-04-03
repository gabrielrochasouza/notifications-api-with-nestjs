import Content from './content';

describe('Tests of content', () => {
  it('Should be able to create a notification content', () => {
    const content = new Content('Novo conteúdo criado');
    expect(content).toBeTruthy();
  });

  it('Should not be able to create content with less than 5 characters', () => {
    expect(() => new Content('aa')).toThrow();
  });

  it('Should not be able to create content with more than 100 characters', () => {
    expect(() => new Content('a'.repeat(122))).toThrow();
  });
});
