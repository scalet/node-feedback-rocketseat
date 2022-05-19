import { SubmitFeedbackUseCase } from "./SubmitFeedback-use-case";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase (
  {create: async () => {}},
  {sendMail: async () => {}}
);

describe("Submit feedback", () => {
  
  it ("should be able to submit a feedback", async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'Test example comment',
      screenshot: 'data:image/png;base64:iqfej2j89fj8923jf89j2893jf9'
    })).resolves.not.toThrow();

    //Check if email and create feedback have been called
    //Because testing those external tools is not our duty   
    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();

  });

  it ("should not be able to submit a feedback without type", async () => {
    await expect(submitFeedback.execute({
      type: '',
      comment: 'Test example comment',
      screenshot: 'data:image/png;base64:iqfej2j89fj8923jf89j2893jf9'
    })).rejects.toThrow();
  });

  it ("should not be able to submit a feedback without comment", async () => {
    await expect(submitFeedback.execute({
      type: 'OTHER',
      comment: '',
      screenshot: 'data:image/png;base64:iqfej2j89fj8923jf89j2893jf9'
    })).rejects.toThrow();
  });

  it ("should not be able to submit a feedback with an invalid screenshot", async () => {
    await expect(submitFeedback.execute({
      type: 'IDEA',
      comment: 'Test example comment',
      screenshot: 'image.png'
    })).rejects.toThrow();
  });
});