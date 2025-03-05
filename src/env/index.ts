interface Env {
  TG_BOT_TOKEN: string;
  TG_CHANNEL_ID: string;
}

const env = {
  TG_BOT_TOKEN: "",
  TG_CHANNEL_ID: "",
} satisfies Env;

export default env;
