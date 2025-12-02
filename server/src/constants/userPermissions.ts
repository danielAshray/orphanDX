import { UserRoles } from "./userRoles";

class UserPermissions {
  static readonly ADMIN = {
    manageLab: true,
    manageProviders: true,
    managePatients: true,
    manageOrders: true,
    viewRevenue: true,
  };

  static readonly LAB = {
    manageClinics: true,
    manageOrders: true,
    viewRevenue: true,
    managePatients: false,
    manageProviders: false,
  };

  static readonly PROVIDER = {
    managePatients: true,
    manageOrders: true,
    viewRevenue: false,
  };

  static get(role: UserRoles) {
    switch (role) {
      case UserRoles.ADMIN:
        return UserPermissions.ADMIN;
      case UserRoles.LAB:
        return UserPermissions.LAB;
      case UserRoles.PROVIDER:
        return UserPermissions.PROVIDER;
      default:
        return {};
    }
  }
}

export default UserPermissions;
