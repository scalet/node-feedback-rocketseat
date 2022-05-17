import { prisma } from "../../prisma";
import { FeedbacksRepository, FeedbacksCreateData } from "../FeedbacksRepository";

export class PrismaFeedbacksRepository implements FeedbacksRepository {
  async  create ({type, comment, screenshot}: FeedbacksCreateData) {
    await prisma.feedback.create({
      data: {
        type,
        comment,
        screenshot
      }
    }); 
  };
}