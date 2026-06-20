import { Component, OnDestroy, HostListener, ElementRef } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthService } from "../../services/auth.service";
import { CarritoService } from "../../services/cart.service";

@Component({
  selector: "app-profile-menu",
  templateUrl: "./profile-menu.component.html",
  styleUrls: ["./profile-menu.component.css"],
})
export class ProfileMenuComponent implements OnDestroy {
  isMenuOpen = false;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private router: Router,
    private authService: AuthService,
    private cartService: CarritoService,
    private eRef: ElementRef
  ) {}

  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    if (this.isMenuOpen && !this.eRef.nativeElement.contains(event.target)) {
      this.isMenuOpen = false;
    }
  }

  getInitials(): string {
    const user = this.authService.getCurrentUser();
    if (user && user.name) {
      return user.name
        .split(" ")
        .map((n: any[]) => n[0])
        .join("")
        .toUpperCase();
    }
    return "U";
  }

  getDisplayName(): string {
    const user = this.authService.getCurrentUser();
    return user?.name || "Usuario";
  }

  getDebugInfo(): string {
    const user = this.authService.getCurrentUser();
    if (!user) return 'No user data';
    return `Role: ${user.role || 'none'}, Email: ${user.email || 'none'}, Username: ${user.username || 'none'}`;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // ESTE MeTODO DEBE SOLO NAVEGAR, NO CERRAR SESIÓN
  viewProfile() {
    this.router.navigate(["/profile"]); // ← Solo esto
    this.isMenuOpen = false;
  }

  goToOrderHistory() {
    this.router.navigate(["/order-history"]);
    this.isMenuOpen = false;
  }

  goToCart() {
    this.router.navigate(["/cart-full"]);
    this.isMenuOpen = false;
  }

  goToWishlist() {
    this.router.navigate(["/wishlist"]);
    this.isMenuOpen = false;
  }

  isAdmin(): boolean {
    const user = this.authService.getCurrentUser();
    if (!user) return false;
    
    if (user.role && user.role.toLowerCase() === 'admin') return true;
    if (user.username === 'admin_user' || user.username === 'administrador') return true;
    if (user.email === 'admin@example.com') return true;
    
    return false;
  }

  goToAdminPanel() {
    this.router.navigate(["/admin"]);
    this.isMenuOpen = false;
  }

  // SOLO ESTE MeTODO DEBE CERRAR SESIÓN
  logout() {
    this.authService.logout(); // ← El logout va aquí
    this.isMenuOpen = false;
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
