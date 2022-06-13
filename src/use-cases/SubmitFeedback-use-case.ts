import { FeedbacksRepository } from "../repositories/FeedbacksRepository";
import { MailAdapter } from "../adpters/mail-adapter"

interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase {
  constructor (
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter
  ) {}

  async execute (request: SubmitFeedbackUseCaseRequest) {

    const {type, comment, screenshot} = request;

    if (!type) {
      throw new Error("Type is requerid.")
    }

    if (!comment) {
      throw new Error("Type is requerid.")
    }

    if (screenshot && !screenshot.startsWith("data:image/png;base64")) {
      throw new Error("Invalid screenshot format.");
    }

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot}
    );

    

    await this.mailAdapter.sendMail({
      subject: 'Novo feedabck MailAdapter',
      body: [
            `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
            `<p>Tipo do feedback: ${type}</p>`,
            `<p>Comentário: ${comment}</p>`,
             `<p>Imagem:` + (screenshot ? `<img height="400" width="800" src="${screenshot}">` : `Nenhuma imagem enviada`) + `</p>`,
            `</div>`
          ].join('\n')
    });
  }
}