import express from 'express'
import { NodemailerMailAdapter } from './adpters/nodemailer/nodemailer-mail-adapter';
import { PrismaFeedbacksRepository } from './repositories/prisma/PrismaFeedbacksRepository';
import { SubmitFeedbackUseCase } from './use-cases/SubmitFeedback-use-case';

export const routes = express.Router();

routes.post("/feedbacks", async (req, res) => {
  console.log(req.body); 
  
  const {type, comment, screenshot} = req.body;

  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
  const nodemailerMailAdapter = new NodemailerMailAdapter();

  const submitFeedbackUseCase = new SubmitFeedbackUseCase(prismaFeedbacksRepository, nodemailerMailAdapter);

  await submitFeedbackUseCase.execute({type, comment, screenshot});  

  return res.status(201).send();
});