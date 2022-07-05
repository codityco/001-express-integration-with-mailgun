import { Request, Response, NextFunction } from "express";
import { MailGunService } from "../services/MailgunService";
import { constants } from "http2";

export class UserController {
  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const mailgunService = new MailGunService();
      const result = await mailgunService.send();

      res.status(constants.HTTP_STATUS_OK).send(result.data);
    } catch (err) {
      console.log(err);
    }
  };
}
