import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { qualysService } from "../shared/qualysService";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    try {
        const detections = await qualysService.getHostDetections();
        
        context.res = {
            status: 200,
            body: detections
        };
    } catch (error) {
        context.res = {
            status: 500,
            body: {
                message: "Failed to fetch scan data",
                error: error instanceof Error ? error.message : "Unknown error"
            }
        };
    }
};

export default httpTrigger;