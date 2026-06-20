import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, BehaviorSubject, of } from "rxjs";
import { tap, timeout, catchError } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { Product } from "./admin-product.service";

// Re-exportar Product para que pueda ser usado en otros componentes
export type { Product } from "./admin-product.service";

export interface Wishlist {
  _id?: string;
  user: string;
  products: Product[];
  createdAt?: string;
  updatedAt?: string;
}

export interface WishlistResponse {
  success: boolean;
  data: Wishlist;
  message?: string;
}

export interface WishlistCheckResponse {
  success: boolean;
  data: {
    isInWishlist: boolean;
  };
}

export interface WishlistCountResponse {
  success: boolean;
  data: {
    count: number;
  };
}

@Injectable({
  providedIn: "root",
})
export class WishlistService {
  private apiUrl = `${environment.apiUrl}/wishlist`;
  private wishlistSubject = new BehaviorSubject<Wishlist | null>(null);
  public wishlist$ = this.wishlistSubject.asObservable();

  constructor(private http: HttpClient) {
    // Cargar wishlist inicial si el usuario está autenticado
    if (this.isAuthenticated()) {
      this.loadWishlist().subscribe({
        next: (response) => {
          this.wishlistSubject.next(response.data);
        },
        error: (error) => {
          console.error("Error al cargar wishlist inicial:", error);
        },
      });
    }
  }

  private isAuthenticated(): boolean {
    return !!localStorage.getItem("token");
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("💝 [WishlistService] No hay token disponible");
    }
    return new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    });
  }

  /**
   * Obtener la wishlist del usuario
   */
  getWishlist(): Observable<WishlistResponse> {
    console.log("💝 [WishlistService] getWishlist() → Obteniendo wishlist");
    return this.http
      .get<WishlistResponse>(this.apiUrl, {
        headers: this.getHeaders(),
      })
      .pipe(
        timeout(10000), // Timeout de 10 segundos
        catchError((error) => {
          console.error("❌ [WishlistService] Error en petición HTTP:", error);
          // Retornar un observable con respuesta vacía
          return of({
            success: false,
            data: {
              user: "",
              products: [],
            },
          } as WishlistResponse);
        })
      );
  }

  /**
   * Cargar wishlist y actualizar el estado interno
   */
  loadWishlist(): Observable<WishlistResponse> {
    return this.getWishlist().pipe(
      tap({
        next: (response) => {
          this.wishlistSubject.next(response.data);
        },
        error: (error) => {
          console.error("Error al cargar wishlist:", error);
          this.wishlistSubject.next(null);
        },
      })
    );
  }

  /**
   * Agregar producto a la wishlist
   */
  addToWishlist(productId: string): Observable<WishlistResponse> {
    console.log(
      "💝 [WishlistService] addToWishlist() → Agregando producto:",
      productId
    );
    console.log("💝 [WishlistService] URL:", this.apiUrl);
    console.log("💝 [WishlistService] Headers:", this.getHeaders().keys());

    return this.http
      .post<WishlistResponse>(
        this.apiUrl,
        { productId },
        {
          headers: this.getHeaders(),
        }
      )
      .pipe(
        tap({
          next: (response) => {
            console.log("💝 [WishlistService] Respuesta exitosa:", response);
            this.wishlistSubject.next(response.data);
          },
          error: (error) => {
            console.error(
              "💝 [WishlistService] Error en addToWishlist:",
              error
            );
            console.error("💝 [WishlistService] Error status:", error.status);
            console.error("💝 [WishlistService] Error message:", error.message);
            console.error("💝 [WishlistService] Error body:", error.error);
          },
        })
      );
  }

  /**
   * Eliminar producto de la wishlist
   */
  removeFromWishlist(productId: string): Observable<WishlistResponse> {
    console.log(
      "💝 [WishlistService] removeFromWishlist() → Eliminando producto:",
      productId
    );
    return this.http
      .delete<WishlistResponse>(`${this.apiUrl}/${productId}`, {
        headers: this.getHeaders(),
      })
      .pipe(
        tap((response) => {
          this.wishlistSubject.next(response.data);
        })
      );
  }

  /**
   * Limpiar toda la wishlist
   */
  clearWishlist(): Observable<WishlistResponse> {
    console.log("💝 [WishlistService] clearWishlist() → Limpiando wishlist");
    return this.http
      .delete<WishlistResponse>(this.apiUrl, {
        headers: this.getHeaders(),
      })
      .pipe(
        tap((response) => {
          this.wishlistSubject.next(response.data);
        })
      );
  }

  /**
   * Verificar si un producto está en la wishlist
   */
  checkProductInWishlist(productId: string): Observable<WishlistCheckResponse> {
    console.log(
      "💝 [WishlistService] checkProductInWishlist() → Verificando producto:",
      productId
    );
    return this.http.get<WishlistCheckResponse>(
      `${this.apiUrl}/check/${productId}`,
      {
        headers: this.getHeaders(),
      }
    );
  }

  /**
   * Obtener la cantidad de productos en la wishlist
   */
  getWishlistCount(): Observable<WishlistCountResponse> {
    console.log(
      "💝 [WishlistService] getWishlistCount() → Obteniendo cantidad"
    );
    return this.http.get<WishlistCountResponse>(`${this.apiUrl}/count`, {
      headers: this.getHeaders(),
    });
  }

  /**
   * Obtener el estado actual de la wishlist (sincrónico)
   */
  getCurrentWishlist(): Wishlist | null {
    return this.wishlistSubject.value;
  }

  /**
   * Verificar si un producto está en la wishlist (sincrónico, basado en el estado actual)
   */
  isProductInWishlist(productId: string): boolean {
    const wishlist = this.wishlistSubject.value;
    if (!wishlist || !wishlist.products) {
      return false;
    }
    return wishlist.products.some((product) => product._id === productId);
  }

  /**
   * Obtener la cantidad de productos (sincrónico, basado en el estado actual)
   */
  getCurrentCount(): number {
    const wishlist = this.wishlistSubject.value;
    return wishlist?.products?.length || 0;
  }
}






