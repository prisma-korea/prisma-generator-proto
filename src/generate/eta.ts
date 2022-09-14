import * as eta from "eta";
import * as path from "path";

type TemplateData = {
  [key: string]: unknown;
};

eta.configure({
  root: path.join(__dirname, "../../"),
});

export const renderFile = eta.renderFile;

export async function generate(
  templatePath: string,
  templateData: TemplateData
): Promise<string> {
  const result = await eta.renderFile(templatePath, templateData);
  if (typeof result !== "string") {
    throw new Error("Could not fill the template.");
  }
  return result;
}
