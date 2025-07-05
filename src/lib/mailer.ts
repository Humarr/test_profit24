// import nodemailer from 'nodemailer'
// import { SESClient } from '@aws-sdk/client-ses'

// const ses = new SESClient({
    //   region: process.env.AWS_SES_REGION,
    //   credentials: {
//     accessKeyId: process.env.AWS_SES_ACCESS_KEY!,
//     secretAccessKey: process.env.AWS_SES_SECRET_KEY!,
//   },
// })

// export const transporter = nodemailer.createTransport({
    //   SES: { ses },
    // })
    
    import nodemailer from 'nodemailer'
    import { SESClient, SendRawEmailCommand, SendRawEmailCommandInput } from '@aws-sdk/client-ses';
    
    class SESWrapper {
      client: SESClient;
      constructor(client: SESClient) {
        this.client = client;
      }
    
      sendRawEmail(params: SendRawEmailCommandInput) {
        return {
          promise: () => this.client.send(new SendRawEmailCommand(params)),
        };
      }
    }
    
    const sesClient = new SESClient({
      region: process.env.AWS_SES_REGION,
      credentials: {
        accessKeyId: process.env.AWS_SES_ACCESS_KEY!,
        secretAccessKey: process.env.AWS_SES_SECRET_KEY!,
      },
    });
    
    const sesWrapper = new SESWrapper(sesClient);
    
    export const transporter = nodemailer.createTransport({
      SES: sesWrapper,
    });
    