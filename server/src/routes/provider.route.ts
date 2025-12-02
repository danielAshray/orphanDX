import { Router } from "express";
import { ApiPaths } from "../constants/apiPaths";
import ProviderController from "../controllers/provider.controller";

class ProviderRoutes {
  public router: Router;
  private controller = new ProviderController();

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(ApiPaths.Provider.GET_PROVIDER_BY_ID, this.controller.getProviderById);
    this.router.get(ApiPaths.Provider.GET_PROVIDERS, this.controller.getProviders);
    this.router.post(ApiPaths.Provider.POST_PROVIDER, this.controller.postProvider);
  }
}

export default new ProviderRoutes().router;
