import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { qualysService } from "../shared/qualysService";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    const reports = await qualysService.getReports();
    context.res = {
      status: 200,
      body: reports,
    };
  } catch (error) {
    context.res = {
      status: 500,
      body: { error: "Failed to fetch reports" },
    };
  }
};

export default httpTrigger;