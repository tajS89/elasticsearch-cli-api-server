import { UploadOption, CommandFunction } from "../commands";
import { uploadData } from "./../../utils/uploadData";

export const upload: CommandFunction<UploadOption> = async (
  option: UploadOption,
): Promise<void> => {
  await uploadData(option.src);
};
