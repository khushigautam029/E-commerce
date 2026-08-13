const STATUS_CODES = {
    // Success
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,

    // Client Errors
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    UNPROCESSABLE_ENTITY: 422,

    // Server Errors
    INTERNAL_SERVER_ERROR: 500,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
};

const MESSAGES = {
    // Authentication
    REGISTER_SUCCESS: "User registered successfully.",
    LOGIN_SUCCESS: "Login successful.",
    LOGOUT_SUCCESS: "Logout successful.",

    // Validation
    VALIDATION_ERROR: "Validation failed.",
    INVALID_CREDENTIALS: "Invalid username, phone number, or password.",
    USER_ALREADY_EXISTS: "User already exists.",
    USER_NOT_FOUND: "User not found.",

    // Token
    TOKEN_REQUIRED: "Access token is required.",
    INVALID_TOKEN: "Invalid or expired token.",
    ACCESS_DENIED: "Access denied.",

    // Server
    SERVER_ERROR: "Internal server error.",
    DATABASE_ERROR: "Database error occurred.",

    // General
    SUCCESS: "Success.",
    FAILED: "Failed.",

    // Product
    PRODUCT_CREATED: "Product added successfully.",
    PRODUCT_UPDATED: "Product updated successfully.",
    PRODUCT_DELETED: "Product deleted successfully.",
    PRODUCT_NOT_FOUND: "Product not found.",
    PRODUCT_ALREADY_EXISTS: "Product already exists.",
    PRODUCT_FETCHED: "Products fetched successfully.",

    ORDER_CREATED: "Order placed successfully.",
    ORDER_FETCHED: "Orders fetched successfully.",
    ORDER_UPDATED: "Order updated successfully.",
    ORDER_DELETED: "Order deleted successfully.",
    ORDER_NOT_FOUND: "Order not found.",

    // Cart
    CART_FETCHED: "Cart fetched successfully.",
    CART_ITEM_ADDED: "Product added to cart.",
    CART_ITEM_UPDATED: "Cart updated successfully.",
    CART_ITEM_REMOVED: "Item removed from cart.",
    CART_CLEARED: "Cart cleared successfully.",
    CART_EMPTY: "Your cart is empty.",
    CART_ITEM_NOT_FOUND: "Cart item not found.",

    // Profile

    PROFILE_FETCHED: "Profile fetched successfully.",
    PROFILE_UPDATED: "Profile updated successfully.",
    PASSWORD_CHANGED: "Password changed successfully.",
    ACCOUNT_DELETED: "Account deleted successfully.",
    INCORRECT_PASSWORD: "Current password is incorrect.",
};

module.exports = {
    STATUS_CODES,
    MESSAGES,
};