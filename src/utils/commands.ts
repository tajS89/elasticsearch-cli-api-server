import { upload } from "../command/upload";

export type UploadOption = {
  src: string;
};

type Options = {
  flag: string;
  description: string;
  required?: boolean;
};

export type CommandFunction<T> = (option: T) => Promise<void>;

export type CommandArgs = {
  command: "upload"
  description: string;
  options?: Options[];
  action: CommandFunction<UploadOption>;
}

export const commands: CommandArgs[] = [
  {
    command: "upload",
    description: "upload data to es index",
    options: [
      {
        flag: "-l, --src <string>",
        description: "provide location to the ndjson",
        required: true,
      },
    ],
    action: upload,
  },
];
