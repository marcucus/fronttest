import { IModule } from "../interfaces/IModule";
import { FullLocalRecipe } from "./recipes/FullLocalRecipe";
// import { FullDevelopmentRecipe } from "./recipes/FullDevelopmentRecipe";

export class DevelopmentModule implements IModule {
  build() {
    return new FullLocalRecipe().build();
  }
}
