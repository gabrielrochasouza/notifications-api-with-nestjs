export default class Content {
  private readonly content: string;

  get value(): string {
    return this.content;
  }

  validateContent(content: string): boolean {
    return content.length > 5 && content.length <= 100;
  }

  constructor(content) {
    const isContentValid = this.validateContent(content);
    if (!isContentValid) {
      throw new Error('Conteúdo inválido');
    }
    this.content = content;
  }
}
