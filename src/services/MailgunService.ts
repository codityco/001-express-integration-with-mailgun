import axios, { AxiosResponse } from "axios";
import mjml2html from "mjml";
import fs from "fs/promises";
import path from "path";
import FormData from "form-data";

export class MailGunService {
  private API_KEY = "...";
  private DOMAIN = "...";

  public async getTemplate(): Promise<string> {
    const template = await fs.readFile(
      path.join(__dirname, "../templates/basic.mjml"),
      {
        encoding: "utf-8",
      }
    );

    return mjml2html(template).html;
  }

  public async send(): Promise<AxiosResponse> {
    const html = await this.getTemplate();

    return axios({
      method: "post",
      url: `https://api.mailgun.net/v3/${this.DOMAIN}/messages`,
      auth: {
        username: "api",
        password: this.API_KEY,
      },
      params: {
        from: `Nick Devs <nick@${this.DOMAIN}>`,
        to: "nick@nickdevs.co",
        text: "Some awesome email text",
        // html,
      },
    });
  }

  public async sendFormData(): Promise<AxiosResponse> {
    const html = await this.getTemplate();

    const form = new FormData();
    form.append("from", `Nick Devs <nick@${this.DOMAIN}>`);
    form.append("to", "nick@nickdevs.co");
    form.append("subject", "Some Awesome Email");
    form.append("text", "Text Content");
    form.append("html", html);

    return axios.post(
      `https://api.mailgun.net/v3/${this.DOMAIN}/messages`,
      form,
      {
        auth: {
          username: "api",
          password: this.API_KEY,
        },
      }
    );
  }
}
