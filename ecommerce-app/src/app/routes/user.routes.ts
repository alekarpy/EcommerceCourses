import { Routes } from "@angular/router";
import { AuthGuard } from "../guards/auth.guard";

/**
 * Rutas del módulo de Usuario/Perfil
 * Estas rutas se cargan de forma diferida (lazy loading)
 * Solo se cargan cuando el usuario accede a alguna de estas rutas
 */
export const USER_ROUTES: Routes = [
  {
    path: "profile",
    loadComponent: () =>
      import("../components/profile/profile.component").then(
        (m) => m.ProfileComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "order-history",
    loadComponent: () =>
      import("../components/order-history/order-history.component").then(
        (m) => m.OrderHistoryComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "wishlist",
    loadComponent: () =>
      import("../pages/wishlist/wishlist.component").then(
        (m) => m.WishlistComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "cart",
    loadComponent: () =>
      import("../pages/cart/cart.component").then((m) => m.CartComponent),
    canActivate: [AuthGuard],
  },
  {
    path: "cart-full",
    loadComponent: () =>
      import("../pages/cart-full/cart-full.component").then(
        (m) => m.CartFullComponent
      ),
    canActivate: [AuthGuard],
  },
];






